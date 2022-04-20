const express = require('express')
const ext = require('./externals');
const utils = require('./utils');

const app = express.Router();
exports.app = app;


app.post('/admin/getUsersList', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	let where = "";
	let arr = [];
	if(req.body.status) arr.push(`users.status='${req.body.status}'`);
	if(req.body.search) arr.push(`( users.nick LIKE '%${req.body.search}%' OR users.email LIKE '%${req.body.search}%')`);
	if(req.body.levels?.length) {
		arr.push(`( ${
			req.body.levels.map((el) => `users.level = '${el}'`).join(" OR ")	
		} )`);
	}
	if(req.body.merchant) arr.push(`users.merchant IS NOT NULL`);
	if(arr.length){
		where = "WHERE " + arr.join(" AND ")
	}
	let query = `
		SELECT users.id, users.nick, users.email, users.phone,
			users.country, users.level, SUM(transactions.amount) as credit,
			users.created, deletedUsers.deletedTime, suspendedUsers.suspendedTime,
			users.firstName, users.surName, users.adress1, users.adress2,
			users.postalCode, users.city, users.stateRegion, users.compantName,
			users.merchant,
			(SELECT SUM(popularity) FROM patterns WHERE patterns.owner=users.id) as downloads,
			(SELECT COUNT(*) FROM patterns WHERE patterns.owner=users.id ) as uploads
		FROM users
		LEFT JOIN transactions
		ON transactions.userId=users.id
		LEFT JOIN deletedUsers
		ON deletedUsers.userId = users.id
		LEFT JOIN suspendedUsers
		ON suspendedUsers.userId = users.id
		${where}
		GROUP BY users.id
	`;
	let users = await ext.db(query);
	res.json({ status: "ok", users });
});

app.post('/getPolicy', async (req, res) => {
	if(!req.body.country){
		res.json({ status: "error", msg : "no country" })
		return;
	}
	let policy = await ext.db(`SELECT * FROM policy WHERE country='${ req.body.country }'`);
	res.json({ status: "ok", policy: policy[0] });
});

app.post('/admin/setPolicy', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(!req.body.country){
		res.json({ status: "error", msg : "no country" })
		return;
	}
	let policy = await ext.db(`SELECT * FROM policy WHERE country='${ req.body.country }'`);
	if( policy[0] ){
		await ext.db(`UPDATE policy SET policy='${req.body.policy}' WHERE id=${policy[0].id}`)
	}else{
		await ext.db("INSERT INTO policy SET ?", {country: req.body.country, policy: req.body.policy });
	}
	res.json({ status: "ok", msg: "policy updated" });
});

app.post('/admin/getAllCreditProducts', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	let products = await ext.db(`SELECT * FROM creditProducts`);
	res.json({ status: "ok", products });
});

app.post('/admin/setCreditProduct', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(!req.body.name){
		res.json({ status: "error", msg : "no name" })
		return;
	}
	if(!req.body.cost){
		res.json({ status: "error", msg : "no cost" })
		return;
	}
	if(!req.body.recharge){
		res.json({ status: "error", msg : "no recharge" })
		return;
	}
	if(!req.body.bonus){
		res.json({ status: "error", msg : "no bonus" })
		return;
	}
	let product = await ext.db(`SELECT * FROM creditProducts WHERE name='${ req.body.name }'`);
	if( product[0] ){
		await ext.db(
			`UPDATE creditProducts SET
			cost='${req.body.cost}', recharge='${req.body.recharge}', bonus='${req.body.bonus}'
			WHERE id=${product[0].id}`
		);
	}else{
		await ext.db("INSERT INTO creditProducts SET ?", {
			name:req.body.name, cost: req.body.cost, recharge: req.body.recharge, bonus: req.body.bonus
		});
	}
	res.json({ status: "ok", msg: "credit product updated" });
});

app.post('/admin/getTransactions', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	let where = "";
	let arr = [];
	if(req.body.code) arr.push(`transactions.id='${req.body.code}'`);
	if(req.body.name) arr.push(`users.nick LIKE '%${req.body.name}%'`);
	if(req.body.dateFrom) arr.push(`transactions.created <= '${req.body.dateFrom}'`);
	if(req.body.dateTo) arr.push(`transactions.created >= '${req.body.dateTo}'`);
	if(req.body.description) arr.push(`transactions.description = '${req.body.description}'`);
	if(req.body.status) arr.push(`transactions.status = '${req.body.status}'`);
	if(req.body.products?.length) {
		arr.push(`( ${
			req.body.products.map((el) => `users.productName= '${el}'`).join(" OR ")	
		} )`);
	}
	if(arr.length){
		where = `WHERE ( ${ arr.join(" AND ") } ) `;
	}
	let query = `
		SELECT transactions.id, transactions.created,
		transactions.amount, transactions.netAmount,
		transactions.externalId, transactions.description,
		(SELECT SUM(amount) FROM transactions t WHERE t.userId=transactions.userId AND t.created <= transactions.created) as hoarding,
		users.nick, users.productName
		FROM inogrow.transactions
		LEFT JOIN users
		ON  users.id = transactions.userId
		${where}
	`;
	let transactions = await ext.db(query);
	res.json({ status: "ok", transactions });
});

app.post('/admin/giftCredit', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(!req.body.amount){
		res.json({ status: "error", msg : "no amount" })
		return;
	}
	if(!req.body.code){
		res.json({ status: "error", msg : "no code" })
		return;
	}
	let user = await ext.db(`SELECT id FROM users WHERE id='${ req.body.code }'`);
	if(!user[0]){
		res.json({ status: "error", msg : "user not exist" })
		return;
	}
	await ext.db("INSERT INTO transactions SET ?",
	{
		userId: user[0].id,
		amount: req.body.amount,
		description: "gift"
	});
	res.json({ status: "ok", msg: "gift credit added" });
});

app.post('/admin/removeMerchantRight', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(!req.body.code){
		res.json({ status: "error", msg : "no code" })
		return;
	}
	let user = await ext.db(`SELECT id FROM users WHERE id='${ req.body.code }'`);
	if(!user[0]){
		res.json({ status: "error", msg : "user not exist" })
		return;
	}
	await ext.db(`UPDATE users SET merchant=NULL WHERE id='${ req.body.code }'`);
	res.json({ status: "ok", msg: "merchant right removed" });
});

app.post('/admin/adminsList', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	let admins = await ext.db(`SELECT id, level, email, lastAccess FROM users WHERE level='admin' OR level='superAdmin'`);
	res.json({ status: "ok", admins });
});

const crypto = require('crypto');

app.post('/admin/createAdmin', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(req.authUser.level != "superAdmin"){
		res.json({ status: "error", msg : "for sueper admin only" })
		return;
	}
	if(!req.body.email){
		res.json({ status: "error", msg : "no email" })
		return;
	}
	if(!req.body.pass){
		res.json({ status: "error", msg : "no pass" })
		return;
	}
	let user = await ext.db(`SELECT id FROM users WHERE email='${ req.body.email }'`);
	if(user[0]){
		res.json({ status: "error", msg : "email exist" })
		return;
	}
	await ext.db("INSERT INTO users SET ?",
	{
		email: req.body.email,
		nick: req.body.email,
		sha256pass: crypto.createHash('sha256').update(req.body.pass).digest("hex"),
		level: "admin",
		loginMethod: "internal",
		emailConfirm: true
	});
	res.json({ status: "ok", msg: "admin created" });
});

app.post('/admin/deleteAdmin', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(req.authUser.level != "superAdmin"){
		res.json({ status: "error", msg : "for sueper admin only" })
		return;
	}
	if(!req.body.code){
		res.json({ status: "error", msg : "no code" })
		return;
	}
	let user = await ext.db(`SELECT id FROM users WHERE id='${ req.body.code }'`);
	if(!user[0]){
		res.json({ status: "error", msg : "user not exist" })
		return;
	}
	await ext.db(`DELETE FROM users WHERE id='${ req.body.code }'`);
	res.json({ status: "ok", msg: "userDeleted" });
});

const pp = require('./payPal');
const axios = require('axios');

app.post('/admin/approvePayOut', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(req.authUser.level != "superAdmin"){
		res.json({ status: "error", msg : "for sueper admin only" })
		return;
	}
	if(!req.body.code){
		res.json({ status: "error", msg : "no code" })
		return;
	}
	let trans = await ext.db(`SELECT * FROM transactions WHERE id='${ req.body.code }'`);
	if(!trans[0]){
		res.json({ status: "error", msg : "wrong code" })
		return;
	}
	if(trans[0].description != "payout"){
		res.json({ status: "error", msg : "transaction not payout" })
		return;
	}
	if(trans[0].status != "created"){
		res.json({ status: "error", msg : "payout wrong status" })
		return;
	}
	let axiosRes = await axios({
		url: "https://api-m.sandbox.paypal.com/v1/payments/payouts",
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Accept-Language': 'en_US',
			"Authorization" : `Bearer ${await pp.getPpToken()}`
		},
		"data": {
			"sender_batch_header": {
				"recipient_type": "EMAIL",
				"email_subject": "You got money form plofix!",
				"email_message": "You received a payment. Thanks for using our service!"
			},
			"items": [
				{
					"amount": {
						"value": -trans[0].amount,
						"currency": "USD"
					},
					"recipient_wallet": "PAYPAL",
					"receiver": trans[0].ppEmail
				}
			]
		}
	}).catch((e)=>{
		res.json({ status: "error", error: e.response.data });
	});
	if(!axiosRes) return;
	let { data } = axiosRes;
	let externalId = data.batch_header.payout_batch_id
	await ext.db(`UPDATE transactions SET status='approved', externalId='${externalId}'  WHERE id=${trans[0].id}`)
	res.json({ status: "ok", msg: "payout sent" });
});

app.post('/admin/cancelPayOut', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(req.authUser.level != "superAdmin"){
		res.json({ status: "error", msg : "for sueper admin only" })
		return;
	}
	if(!req.body.code){
		res.json({ status: "error", msg : "no code" })
		return;
	}
	let trans = await ext.db(`SELECT * FROM transactions WHERE id='${ req.body.code }'`);
	if(!trans[0]){
		res.json({ status: "error", msg : "wrong code" })
		return;
	}
	if(trans[0].description != "payout"){
		res.json({ status: "error", msg : "transaction not payout" })
		return;
	}
	if(trans[0].status != "created"){
		res.json({ status: "error", msg : "payout wrong status" })
		return;
	}
	await ext.db(`DELETE FROM transactions WHERE id=${trans[0].id}`)
	res.json({ status: "ok", msg: "payout canceled" });
});

app.post('/admin/getPatternsList', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	let where = "";
	let arr = [];
	if(req.body.region) arr.push(`carModels.region LIKE '%${req.body.region}%'`);
	if(req.body.make) arr.push(`carModels.make LIKE '%${req.body.make}%'`);
	if(req.body.year) arr.push(`carModels.year LIKE '%${req.body.year}%'`);
	if(req.body.model) arr.push(`carModels.model LIKE '%${req.body.model}%'`);
	if(req.body.submodel) arr.push(`carModels.submodel LIKE '%${req.body.submodel}%'`);
	if(req.body.series) arr.push(`carModels.series LIKE '%${req.body.series}%'`);
	if(req.body.nick) arr.push(`users.nick LIKE '%${req.body.nick}%'`);

	if(req.body.status) arr.push(`patterns.status = '${req.body.status}'`);
	if(req.body.priceFrom) arr.push(`patterns.price >= '${req.body.priceFrom}'`);
	if(req.body.priceTo) arr.push(`patterns.price <= '${req.body.priceTo}'`);
	if(req.body.earningSumFrom) arr.push(`patterns.earningSum >= '${req.body.earningSumFrom}'`);
	if(req.body.earningSumTo) arr.push(`patterns.earningSum <= '${req.body.earningSumTo}'`);
	if(req.body.sizeFrom) arr.push(`patterns.size >= '${req.body.sizeFrom}'`);
	if(req.body.sizeTo) arr.push(`patterns.size <= '${req.body.sizeTo}'`);
	if(req.body.dateFrom) arr.push(`patterns.updated <= '${req.body.dateFrom}'`);
	if(req.body.dateTo) arr.push(`patterns.updated >= '${req.body.dateTo}'`);

	if(req.body.sponsor) arr.push(`sponsorAd.id  IS NOT NULL`);

	if(arr.length){
		where = "WHERE " + arr.join(" AND ")
	}
	let query = `
		SELECT
		patterns.id, patterns.price,  patterns.downloads,  patterns.size, patterns.updated,
		users.nick,
		carModels.region, carModels.make, carModels.year, carModels.model, carModels.submodel, carModels.series,
		carPlaces.side, carPlaces.part, carPlaces.subPart,
		sponsorAd.profit, sponsorAd.credit, sponsorAd.paypal, sponsorAd.start, sponsorAd.end
		FROM inogrow.patterns
		LEFT JOIN users
		ON patterns.owner=users.id
		LEFT JOIN carModels
		ON patterns.carModel=carModels.id
		LEFT JOIN carPlaces
		ON patterns.carPlace=carPlaces.id
		LEFT JOIN sponsorAd
		ON patterns.id=sponsorAd.patId
		${where}
	`;
	let pats = await ext.db(query);
	res.json({ status: "ok", pats });
});

app.post('/admin/patternSetStatus', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(!req.body.code){
		res.json({ status: "error", msg : "no code" })
		return;
	}
	if(!req.body.status || 
	!( req.body.status == "approved"
	|| req.body.status == "stop selling"
	|| req.body.status == "waiting"
	|| req.body.status == "rejected")){
		res.json({ status: "error", msg : "wrong status" })
		return;
	}
	let pat = await ext.db(`SELECT id FROM patterns WHERE id='${ req.body.code }'`);
	if(!pat[0]){
		res.json({ status: "error", msg : "wrong code" })
		return;
	}
	await ext.db(`UPDATE patterns SET status='${req.body.status}' WHERE id=${pat[0].id}`)
	res.json({ status: "ok", msg: "staus updated" });
});

app.post('/admin/getCarModelColumn', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(!req.body.column){
		res.json({ status: "error", msg : "no column" })
		return;
	}
	if(!["region", "make", "year", "model", "subModel", "series"].includes(req.body.column)){
		res.json({ status: "error", msg : "wrong column name" })
		return;
	}
	let reqStr = `SELECT DISTINCT ${req.body.column} FROM carModels WHERE ${req.body.column} IS NOT NULL`;
	let models = await ext.db(reqStr);
	res.json({ status: "ok", models });
});



app.post('/admin/getSponsorAdPrice', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	let price = await ext.db(`SELECT * FROM floatVariables WHERE name='sponsorAdPrice'`);
	res.json({ status: "ok", price: price[0].value });
});
app.post('/admin/setSponsorAdPrice', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	if(!req.body.price){
		res.json({ status: "error", msg : "no price" })
		return;
	}
	await ext.db(`UPDATE floatVariables SET value='${req.body.price}' WHERE name='sponsorAdPrice'`)
	res.json({ status: "ok", msg: "price updated" });
});



app.post('/admin/getUltrafitList', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	let where = "";
	let arr = [];
	if(req.body.search) arr.push(`( ultrafit.id LIKE '%${req.body.search}%' OR ultrafit.name LIKE '%${req.body.search}%' )`);
	if(arr.length){
		where = "WHERE " + arr.join(" AND ")
	}
	let query = `
		SELECT
		ultrafit.id, ultrafit.name, ultrafit.inventory, ultrafit.exposure, ultrafit.price,
		ultrafitCategory.name as category
		FROM inogrow.ultrafit
		LEFT JOIN ultrafitCategory
		ON ultrafitCategory.id = ultrafit.categoryId
		${where}
	`;
	let ult = await ext.db(query);
	res.json({ status: "ok", ult });
});
app.post('/admin/getUltrafitCategoryList', async (req, res) => {
	if( !(await utils.checkAdmin(req, res)) ) return;
	let where = "";
	let arr = [];
	if(req.body.dept) arr.push(`ultrafitCategory.dept = '${req.body.dept}'`);
	if(arr.length){
		where = "WHERE " + arr.join(" AND ")
	}
	let query = `
		SELECT * FROM ultrafitCategory
		${where}
	`;
	let category = await ext.db(query);
	res.json({ status: "ok", category });
});


app.post('/admin/ultrafitCreate', async function(req, res) {
	if( !(await utils.checkAdmin(req, res)) ) return;
	let query = "INSERT INTO ultrafit SET ?",
	values = {
		file: req?.files?.file?.data
	};
	ext.db(query, values);
	res.json({ status: "ok", msg : "ultrafit created" });
});

app.get('/admin/ultrafitImg/:id', async (req, res) => {
	let img = await ext.db(`SELECT * FROM ultrafit WHERE id='${ req.params.id }'`);
	if(!img[0])return;
	res.end(img[0].file);
});
