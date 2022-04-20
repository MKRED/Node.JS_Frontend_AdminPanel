const express = require('express')
const https = require('https');
const crypto = require('crypto');
const ext = require('./externals');
const utils = require('./utils');

const app = express.Router();
exports.app = app;

app.post('/register', async (req, res) => {
	if(!req.body.nick){
		res.json({ status: "error", msg : 'Empty nick' })
		return;
	}
	if(!req.body.email){
		res.json({ status: "error", msg : 'Empty email' })
		return;
	}
	let getUser = await ext.db(`SELECT * FROM users WHERE email='${req.body.email}'`);
	if(getUser[0]){
		res.json({ status: "error", msg : 'email exist' })
		return;
	}
	getUser = await ext.db(`SELECT * FROM users WHERE nick='${req.body.nick}'`);
	if(getUser[0]){
		res.json({ status: "error", msg : 'nick exist' })
		return;
	}
	const jwt = crypto.createHash('sha256').update(""+Math.random()+req.body.nick+req.body.email).digest("hex");
	const sha256pass = crypto.createHash('sha256').update(req.body.pass).digest("hex");
	let query = "INSERT INTO users SET ?",
	values = {
		loginMethod: 'internal',
		email: req.body.email,
		nick: req.body.nick,
		sha256pass,
		jwt,
		emailConfirm: jwt
	};
	ext.db(query, values);
	const url = `${utils.getAppUrl(req)}/activatemail/${req.body.email}/${jwt}`
	ext.mail({
		to: req.body.email,
		subject: 'Inogrow registration',
		html: `<h2>visit this link to confirm email</h2> <h3><a href="${url}">${url}</a></h3>`
	});
	res.json({ status: "ok", msg: 'check your email for continue registration' });
});
app.get('/activatemail/:email/:jwt', async (req, res) => {
	if(!req.params.email || !req.params.jwt) res.send("<h2>bad params</h2>");
	let getUser = await ext.db(`SELECT * FROM users WHERE email='${req.params.email}' AND loginMethod='internal'`);
	if(!getUser[0]){
		res.send("<h2>email not exist</h2>");
	}else if(getUser[0].emailConfirm == "confirmed"){
		res.send(`<h2>email already confirmed you can use <a href="${utils.getAppUrl(req)}">inogrow</a></h2>`);
	}else if(getUser[0].emailConfirm != req.params.jwt){
		res.send("<h2>bad email confirm code</h2>");
	}else {
		await ext.db(`UPDATE users SET emailConfirm = 'confirmed' WHERE email = '${req.params.email}'`);
		res.send(`<h2>email confirmed now you can use <a href="${utils.getAppUrl(req)}">inogrow</a></h2>`);
	}
})
app.post('/loginByPass', async (req, res) => {
	if(!req.body.email){
		res.json({ status: "error", msg : 'empty email' })
		return;
	}
	let getUser = await ext.db(`SELECT * FROM users WHERE email='${req.body.email}' AND loginMethod='internal'`);
	if(!getUser[0]){
		res.json({ status: "error", msg : 'user not exist' })
		return;
	}
	if(getUser[0].passErrors > 5){
		res.json({ status: "error", msg : 'User locked! To unlock user reset you password via email.' })
		return;
	}
	if(getUser[0].sha256pass == crypto.createHash('sha256').update(req.body.pass).digest("hex")){
		const jwt = crypto.createHash('sha256').update(""+Math.random()+getUser[0].nick+req.body.email).digest("hex");
		await ext.db(`UPDATE users SET jwt='${jwt}', passErrors=0 WHERE id=${getUser[0].id}`);
		res.json({ status: "ok", msg: 'success login', id:getUser[0].id, nick:getUser[0].nick, jwt, level:getUser[0].level });
		ext.db(`UPDATE users SET lastAccess=CURRENT_TIMESTAMP WHERE id=${getUser[0].id}`);
	}else{
		res.json({ status: "error", msg : 'wrong password' })
		ext.db(`UPDATE users SET passErrors=${++getUser[0].passErrors} WHERE id=${getUser[0].id}`);
	}
});
app.post('/loginByJwt', async (req, res) => {
	if(!req.body.id){
		res.json({ status: "error", msg : 'empty id' })
		return;
	}
	let getUser = await ext.db(`SELECT * FROM users WHERE id='${req.body.id}'`);
	if(!getUser[0]){
		res.json({ status: "error", msg : 'user not exist' })
	}else if(getUser[0].jwt == req.body.jwt){
		res.json({ status: "ok", msg: 'success login', nick:getUser[0].nick, level:getUser[0].level });
		ext.db(`UPDATE users SET lastAccess=CURRENT_TIMESTAMP WHERE id=${getUser[0].id}`);
	}else{
		res.json({ status: "error", msg : 'wrong jwt' })
	}
});
app.post('/resetPass', async (req, res) => {
	if(!req.body.email){
		res.json({ status: "error", msg : 'Empty email' })
		return;
	}
	let getUser = await ext.db(`SELECT * FROM users WHERE email='${req.body.email}' AND loginMethod='internal'`);
	if(!getUser[0]){
		res.json({ status: "error", msg : 'email not exist' })
		return;
	}
	const pass = Math.random().toString(36).slice(2);
	const jwt = crypto.createHash('sha256').update(""+Math.random()+req.body.nick+req.body.email).digest("hex");
	const sha256pass = crypto.createHash('sha256').update(pass).digest("hex");
	await ext.db(`UPDATE users SET jwt = '${jwt}', sha256pass='${sha256pass}', passErrors=0 WHERE id=${getUser[0].id}`);
	ext.mail({
		to: req.body.email,
		subject: 'Inogrow new password',
		html: `<h3>your new password is: ${pass}</h3>`
	});
	res.json({ status: "ok", msg: 'new password sent to your email' });
});
app.post('/changePass', async (req, res) => {
	if(!req.body.id){
		res.json({ status: "error", msg : 'login for change password' })
		return;
	}
	let getUser = await ext.db(`SELECT * FROM users WHERE id='${req.body.id}' AND loginMethod='internal'`);
	if(!getUser[0]){
		res.json({ status: "error", msg : 'login for change password' })
	}else if(getUser[0].sha256pass == crypto.createHash('sha256').update(req.body.oldPass).digest("hex")){
		const jwt = crypto.createHash('sha256').update(""+Math.random()+getUser[0].nick+getUser[0].email).digest("hex");
		const sha256pass = crypto.createHash('sha256').update(req.body.newPass).digest("hex");
		await ext.db(`UPDATE users SET jwt='${jwt}', sha256pass='${sha256pass}'
							WHERE id = '${req.body.id}'  AND loginMethod='internal'`);
		res.json({ status: "ok", msg: 'success password change', jwt });
	}else{
		res.json({ status: "error", msg : 'wrong password' })
	}
});
const googleClientId = "79014072757-0agrlo37va03vbgfngnveh35kf3ol1b1.apps.googleusercontent.com";
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(googleClientId);
app.post('/loginViaGoogle', async (req, res) => {
	const ticket = await client.verifyIdToken({
		idToken: req.body.id_token
	});
	const payload = ticket.getPayload();
	if(payload.aud != googleClientId){
		res.json({ status: "error", msg : 'wrong aud' })
		return;
	}
	if(payload.email_verified == false){
		res.json({ status: "error", msg : 'verify your google account email' })
		return;
	}
	let getUser = await ext.db(`SELECT * FROM users WHERE foreignId='${payload.sub}' AND loginMethod='google'`);
	const jwt = crypto.createHash('sha256').update(""+Math.random()+payload.name+payload.email).digest("hex");
	if(!getUser[0]){
		let testEmail = await ext.db(`SELECT * FROM users WHERE email='${payload.email}'`);
		if(testEmail[0]){
			res.json({ status: "error", msg : 'email exist' })
			return;
		}
		let testNick = await ext.db(`SELECT * FROM users WHERE nick='${payload.name}'`);
		if(testNick[0]){
			res.json({ status: "error", msg : 'nick exist' })
			return;
		}
		let query = "INSERT INTO users SET ?",
		values = {
			loginMethod: "google",
			foreignId: payload.sub,
			email: payload.email,
			nick: payload.name,
			jwt,
		};
		await ext.db(query, values);
		getUser = await ext.db(`SELECT * FROM users WHERE foreignId='${payload.sub}' AND loginMethod='google'`);
	}else {
		await ext.db(`UPDATE users SET jwt = '${jwt}' WHERE email = '${payload.email}'`);
		ext.db(`UPDATE users SET lastAccess=CURRENT_TIMESTAMP WHERE id=${getUser[0].id}`);
	}
	res.json({ status: "ok", msg: 'success login', id:getUser[0].id, nick:payload.name, jwt, level:getUser[0].level });
});
app.post('/loginViaFacebook', async (req, res) => {
	let url = `https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Cemail&access_token=${req.body.id_token}`;
	https.get(url, (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', async () => {
				const fbUser = JSON.parse(data);
				if(!fbUser || !fbUser.id || !fbUser.name || !fbUser.email) return;
				let getUser = await ext.db(`SELECT * FROM users WHERE foreignId='${fbUser.id}' AND loginMethod='facebook'`);
				const jwt = crypto.createHash('sha256').update(""+Math.random()+fbUser.name+fbUser.email).digest("hex");
				if(!getUser[0]){
					let testEmail = await ext.db(`SELECT * FROM users WHERE email='${fbUser.email}'`);
					if(testEmail[0]){
						res.json({ status: "error", msg : 'email exist' })
						return;
					}
					let testNick = await ext.db(`SELECT * FROM users WHERE nick='${fbUser.name}'`);
					if(testNick[0]){
						res.json({ status: "error", msg : 'nick exist' })
						return;
					}
					let query = "INSERT INTO users SET ?",
					values = {
						loginMethod: "facebook",
						foreignId: fbUser.id,
						email: fbUser.email,
						nick: fbUser.name,
						jwt,
					};
					await ext.db(query, values);
					getUser = await ext.db(`SELECT * FROM users WHERE foreignId='${fbUser.id}' AND loginMethod='facebook'`);
				}else {
					await ext.db(`UPDATE users SET jwt = '${jwt}' WHERE foreignId='${fbUser.id}' AND loginMethod='facebook'`);
					ext.db(`UPDATE users SET lastAccess=CURRENT_TIMESTAMP WHERE id=${getUser[0].id}`);
				}
				res.json({ status: "ok", msg: 'success login', id:getUser[0].id, nick:fbUser.name, jwt, level:getUser[0].level });
			});
		}).on("error", (err) => {
			console.log("Error facebook graph:" + err.message);
		});
});
app.post('/logOut', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	const jwt = crypto.createHash('sha256').update(""+Math.random()+req.authUser.nick+req.authUser.email).digest("hex");
	await ext.db(`UPDATE users SET jwt='${jwt}' WHERE id=${req.authUser.id}`);
	res.json({ status: "ok", msg : 'logged out' })
});
app.post('/deleteAccount', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	await ext.db("INSERT INTO deletedUsers SET ?", { 
		userId: req.authUser.id,
		moneyReturnAccount: req.body.moneyReturnAccount,
		reason: req.body.reason
	});
	res.json({ status: "ok" })
});
app.post('/getUserInfo', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	res.json({ status: "ok", user: req.authUser });
});
