const express = require('express')
const ext = require('./externals');
const utils = require('./utils');

const app = express.Router();
exports.app = app;

app.post('/getCarRegions', async (req, res) => {
	let regions = await ext.db(`SELECT DISTINCT region FROM carModels`);
	res.json({ status: "ok", regions });
});
app.post('/addCarModel', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	if( !req.body.region ){
		res.json({ status: "error", msg: "region can't be empty" });
		return;	
	}
	if( !req.body.make ){
		res.json({ status: "error", msg: "make can't be empty" });
		return;	
	}
	if( !req.body.model ){
		res.json({ status: "error", msg: "model can't be empty" });
		return;	
	}
	await ext.db("INSERT INTO carModels SET ?",
	{
		region: req.body.region,
		make: req.body.make,
		model: req.body.model,
		addedBy: req.authUser.id
	});
	res.json({ status: "ok", msg: "Car model successfully added" });
});
app.post('/getCarMakes', async (req, res) => {
	let reqStr = `SELECT DISTINCT make FROM carModels`;
	if(req.body.region) reqStr += ` WHERE region='${req.body.region}'`
	let makes = await ext.db(reqStr);
	res.json({ status: "ok", makes });
});
app.post('/getCarModels', async (req, res) => {
	let reqStr = `SELECT DISTINCT model FROM carModels`;
	if(req.body.region) { 
		reqStr += ` WHERE region='${req.body.region}'`
		if(req.body.make) { 
			reqStr += ` AND make='${req.body.make}'`
		}
	} else if(req.body.make) { 
		reqStr += ` WHERE make='${req.body.make}'`
	}
	let models = await ext.db(reqStr);
	res.json({ status: "ok", models });
});
