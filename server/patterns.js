const express = require('express')
const ext = require('./externals');
const utils = require('./utils');
const axios = require('axios');

const app = express.Router();
exports.app = app;

app.post('/uploadSvg', async function(req, res) {
	if( !(await utils.checkAuth(req, res)) ) return;
	if(req.files.file.name?.match(/\.\w+?$/)[0] != '.svg'){
		res.json({ status: "error", msg : 'only svq files avaliable' })
		return;
	}
	let query = "INSERT INTO patterns SET ?",
	values = {
		owner: req.authUser.id,
		svg: req.files.file.data
	};
	ext.db(query, values);
	res.json({ status: "ok", msg : "svg uploaded" });
});
app.post('/updateSvg', async function(req, res) {
	if( !(await utils.checkAuth(req, res)) ) return;
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id='${ req.authUser.id }'`);
	if(!pattern[0] || pattern[0].owner != req.authUser.id ){
		res.json({ status: "error", msg : 'wrong owner' })
		return;
	}
	await ext.db(`UPDATE patterns SET svg='${req.body.svg}', plt=NULL WHERE id='${pattern[0].id}'`);
	res.json({ status: "ok", msg : "svg updated" });
});
app.post('/deletePattern/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id='${ req.params.id }'`);
	if(!pattern[0] || pattern[0].owner != req.authUser.id){
		res.json({ status: "error", msg : 'wrong owner' })
		return;
	}
	if(pattern[0].published){
		res.json({ status: "error", msg : 'archive pattern before delete' })
		return;
	}
	await ext.db(`DELETE FROM patterns WHERE id='${pattern[0].id}'`);
	res.json({ status: "ok", msg: "sucess deleted" });
});
app.post('/publishPattern/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id='${ req.params.id }'`);
	if(!pattern[0] || pattern[0].owner != req.authUser.id){
		res.json({ status: "error", msg : 'wrong owner' })
		return;
	}
	await ext.db(`UPDATE patterns SET published = 1 WHERE id='${pattern[0].id}'`);
	res.json({ status: "ok" });
});
app.post('/archivePattern/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id='${ req.params.id }'`);
	if(!pattern[0] || pattern[0].owner != req.authUser.id){
		res.json({ status: "error", msg : 'wrong owner' })
		return;
	}
	await ext.db(`UPDATE patterns SET published = 0 WHERE id='${pattern[0].id}'`);
	res.json({ status: "ok" });
});
app.post('/setPatternPrice/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id='${ req.params.id }'`);
	if(!pattern[0] || pattern[0].owner != req.authUser.id){
		res.json({ status: "error", msg : 'wrong owner' })
		return;
	}
	let price = parseFloat(req.body.price);
	if(isNaN(price)){
		res.json({ status: "error", msg : 'wrong price' })
		return;
	}
	await ext.db(`UPDATE patterns SET price=${price} WHERE id='${pattern[0].id}'`);
	res.json({ status: "ok" });
});
app.post('/saveTags/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id='${ req.params.id }'`);
	if(!pattern[0] || pattern[0].owner != req.authUser.id){
		res.json({ status: "error", msg : 'wrong owner' })
		return;
	}
	await ext.db(`UPDATE patterns SET tags='${req.body.tags}' WHERE id='${pattern[0].id}'`);
	res.json({ status: "ok" });
});
app.post('/patternsList', async (req, res) => {
	if(req.body.order == "new"){
		let patterns = await ext.db(`SELECT id, price FROM patterns WHERE published=1 ORDER BY updated DESC`);
		res.json({ status: "ok", patterns : patterns });
	}else if(req.body.order == "most rated"){
		let patterns = await ext.db(`
			SELECT patterns.id, patterns.price, AVG(patternRating.rating) AS avgRating FROM patterns
			LEFT JOIN patternRating
			ON patterns.id=patternRating.patternId
			GROUP BY patterns.id
			ORDER BY rating DESC
		`);
		res.json({ status: "ok", patterns : patterns });
	}else if(req.body.order == "popular"){
		let patterns = await ext.db(`SELECT id, price FROM patterns WHERE published=1 ORDER BY popularity DESC`);
		res.json({ status: "ok", patterns : patterns });
	}else if(req.body.tags){
		let patterns = await ext.db(`SELECT id, price FROM patterns WHERE published=1 AND tags LIKE '%${req.body.tags}%'`);
		res.json({ status: "ok", patterns : patterns });
	}else{
		let patterns = await ext.db(`SELECT id, price FROM patterns WHERE published=1`);
		res.json({ status: "ok", patterns : patterns });
	}
});
app.post('/myPatternsList', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let patterns = await ext.db(`SELECT id, published, price, tags FROM patterns WHERE owner='${ req.body.id }'`);
	res.json({ status: "ok", patterns : patterns });
});
app.get('/patternSvg/:id', async (req, res) => {
	let img = await ext.db(`SELECT * FROM patterns WHERE id='${ req.params.id }'`);
	if(!img[0])return;
	res.setHeader("Content-Type", "image/svg+xml");
	res.end(img[0].svg);
});

app.get('/patternPlt/:id', async (req, res) => {
	let img = await ext.db(`SELECT * FROM patterns WHERE id='${ req.params.id }'`);
	if(!img[0]){
		res.json({ status: "error", msg : 'pattern not exist' });
		return;
	}
	if(!img[0].plt){
		const convert = await axios({
			method: 'post',
			url: 'https://vector.express/api/v2/public/convert/svg/uniconvertor/plt',
			data: img[0].svg,
			headers: {'Content-Type': 'image/svg+xml' }
		});
		const plt = await axios({
			method: 'get',
			url: convert.data.resultUrl
		})
		ext.db(`UPDATE patterns SET ? WHERE id='${img[0].id}'`, {
			plt: plt.data
		});
		res.setHeader("Content-Type", 'application/octet-stream');
		res.end(plt.data);
	}else {
		res.setHeader("Content-Type", 'application/octet-stream');
		res.end(img[0].plt);
	}
});
app.post('/patternInfo/:id', async (req, res) => {
	let pattern = await ext.db(`
		SELECT
			patterns.updated,
			patterns.price,
			patterns.tags,
			AVG(patternRating.rating) AS avgRating
		FROM patterns
		LEFT JOIN patternRating
		ON patterns.id=patternRating.patternId
		WHERE patterns.id=${ req.params.id }
	`);
	if(!pattern[0]){
		res.json({ status: "error", msg : 'pattern not exist' });
		return;
	}
	res.send(pattern[0]);
	ext.db(`UPDATE patterns SET popularity=popularity+1, updated=updated WHERE id=${req.params.id}`);
});
app.post('/patternComments/:id', async (req, res) => {
	let comments = await ext.db(`
		SELECT
			users.nick,
			patternComments.msg,
			patternComments.created
		FROM patternComments
		LEFT JOIN users
		ON patternComments.userID=users.id
		WHERE patternComments.patternId=${ req.params.id }
		ORDER BY patternComments.created DESC
	`);
	res.send(comments);
});
app.post('/getYourRating', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id=${req.body.patternId}`);
	if(!pattern[0]){
		res.json({ status: "error", msg : 'pattern not exist' });
		return;
	}
	let rating = await ext.db(`SELECT * FROM patternRating WHERE userId=${req.authUser.id} AND patternId=${req.body.patternId}`);
	if(rating[0]){
		res.json({ status: "ok", rating : rating[0].rating });
	}else{
		res.json({ status: "ok", rating : null });
	}
});
app.post('/setYourRating', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id=${req.body.patternId}`);
	if(!pattern[0]){
		res.json({ status: "error", msg : 'pattern not exist' });
		return;
	}
	let ratingInt = parseInt(req.body.rating);
	if(ratingInt<1 || ratingInt>5 || isNaN(ratingInt)){
		res.json({ status: "error", msg : 'wrong rating' })
		return;
	}
	let rating = await ext.db(`SELECT * FROM patternRating WHERE userId=${req.authUser.id} AND patternId=${req.body.patternId}`);
	if(rating[0]){
		await ext.db(`UPDATE patternRating SET rating='${req.body.rating}' WHERE id=${rating[0].id}`);
	}else{
		await ext.db("INSERT INTO patternRating SET ?",
		{
			userId: req.authUser.id,
			rating: ratingInt,
			patternId: req.body.patternId
		});
	}
	res.json({ status: "ok", msg : "rating updated" });
});
app.post('/addComment', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	if(!req.body.msg){
		res.json({ status: "error", msg : 'empty msg' });
	}
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id=${req.body.patternId}`);
	if(!pattern[0]){
		res.json({ status: "error", msg : 'pattern not exist' });
		return;
	}
	await ext.db("INSERT INTO patternComments SET ?",
	{
		userId: req.authUser.id,
		msg: req.body.msg,
		patternId: req.body.patternId
	});
	res.json({ status: "ok", msg : "comment added" });
});
app.post('/addToFavorites', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id=${req.body.patternId}`);
	if(!pattern[0]){
		res.json({ status: "error", msg : 'pattern not exist' });
		return;
	}
	let favorite = await ext.db(`SELECT * FROM favoritePatterns WHERE userId=${req.authUser.id} AND patternId=${req.body.patternId}`);
	if(favorite[0]){
		await ext.db(`UPDATE favoritePatterns SET created=CURRENT_TIMESTAMP WHERE id=${favorite[0].id}`);
	}else{
		await ext.db("INSERT INTO favoritePatterns SET ?",
		{
			userId: req.authUser.id,
			patternId: req.body.patternId
		});
	}
	res.json({ status: "ok", msg : "added to favorites" });
});
app.post('/favoritePatternsList', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let patterns = await ext.db(`
		SELECT patterns.id, patterns.price FROM favoritePatterns
		LEFT JOIN patterns
		ON favoritePatterns.patternId=patterns.id
		WHERE favoritePatterns.userId=${req.authUser.id}
		ORDER BY favoritePatterns.created DESC
	`);
	res.json({ status: "ok", patterns });
});
