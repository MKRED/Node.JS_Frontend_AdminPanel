const express = require('express')
const ext = require('./externals');
const utils = require('./utils');
const axios = require('axios');

const app = express.Router();
exports.app = app;

app.post('/getBalance', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let balance = await ext.db(`SELECT SUM(amount) FROM transactions WHERE userId=${req.authUser.id}`);
	res.json({ status: "ok", balance: balance[0]["SUM(amount)"] });
});
app.post('/getPremiumTime', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let premiumTime = await ext.db(`SELECT premiumTime FROM users WHERE id=${req.authUser.id}`);
	res.json({ status: "ok", premiumTime: premiumTime[0].premiumTime });
});
app.post('/buyPremium', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let sum = await ext.db(`SELECT SUM(amount) FROM transactions WHERE userId=${req.authUser.id}`);
	sum = sum[0]["SUM(amount)"];
	if(sum < 30){
		res.json({ status: "error", msg : 'balance not enought' });
		return;
	}
	await ext.db(`UPDATE users SET premiumTime=CURRENT_TIMESTAMP+INTERVAL 30 DAY WHERE id=${req.authUser.id}`);
	await ext.db("INSERT INTO transactions SET ?",
	{
		userId: req.authUser.id,
		amount: -30,
		description: "Buy premium account for 30 days"
	});
	res.json({ status: "ok"});
});
app.post('/transactionsList', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let transactions = await ext.db(`SELECT * FROM transactions WHERE userId=${req.authUser.id} ORDER BY created DESC`);
	res.json({ status: "ok", transactions });
});

let getPpToken = () => new Promise(async function(resolve, reject) {
	const { data: { access_token } } = await axios({
		url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Accept-Language': 'en_US',
			'content-type': 'application/x-www-form-urlencoded',
		},
		auth: {
			username: "AYYSLmlNokGo1WcxbFQPk-UG8o0XRgk4g5PZvGje7LhCfa-GmZhcf9G5cvYeub4zWAGPOj1YxSS2rZeb",
			password: "EHdAa4Xaob9IQMsPly0Vg0MA2FwGxbSQf2Z8OdkP4Ob4gw91Y4buREIJZIAjb3bwbVb-5OAOpTfdke9U",
		},
		params: {
			grant_type: 'client_credentials',
		},
    });
	resolve(access_token);
});
exports.getPpToken = getPpToken;
app.post('/addPpOrder', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	const { data } = await axios({
		url: "https://api.sandbox.paypal.com/v2/checkout/orders/"+req.body.orderId,
		method: 'get',
		headers: {
			Accept: 'application/json',
			'Accept-Language': 'en_US',
			"Authorization" : `Bearer ${await getPpToken()}`
		},
    });
	if(data.id != req.body.orderId){
		res.json({ status: "error", msg : 'order id error' });
		return;
	}
	if(data.status != "COMPLETED"){
		res.json({ status: "error", msg : 'order not completed' });
		return;
	}
	if(data.purchase_units[0].amount.currency_code != "USD"){
		res.json({ status: "error", msg : 'wrong currency code' });
		return;
	}
	let transactionSearch = await ext.db(`SELECT * FROM transactions WHERE externalId='${data.id}'`);
	if(transactionSearch[0]){
		res.json({ status: "error", msg : 'this transaction exist' })
		return;
	}
	let netAmount = data.purchase_units[0]?.seller_receivable_breakdown?.net_amount?.value || data.purchase_units[0].amount.value;
	await ext.db("INSERT INTO transactions SET ?",
	{
		userId: req.authUser.id,
		amount: data.purchase_units[0].amount.value,
		netAmount,
		description: "PayPal Order",
		externalId: data.id
	});
	res.json({ status: "ok" });
});
