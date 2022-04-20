const express = require('express')
const ext = require('./externals');
const utils = require('./utils');

const app = express.Router();
exports.app = app;

app.post('/getUserAdminRights', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let rights = await ext.db(`SELECT *, NULL AS id FROM adminRights WHERE userId='${ req.authUser.id }'`);
	res.json({ status: "ok", adminRights: rights[0] });
});
app.post('/getAdminList', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let admins = await ext.db(`
		SELECT
			users.nick,
			adminRights.superVisor,
			adminRights.approvePattern,
			adminRights.approveCarModel,
			adminRights.approveComment,
			adminRights.moneyReturn
		FROM adminRights
		LEFT JOIN users
		ON adminRights.userId = users.id
	`);
	res.json({ status: "ok", admins });
});
app.post('/addAdmin', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let newAdmin = await ext.db(`SELECT * FROM users WHERE nick='${req.body.nick}'`);
	if(!newAdmin[0]){
		res.json({ status: "error", msg : "can't find exist" })
		return;
	}
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId='${newAdmin[0].id}'`);
	if(userIsAdmin[0]){
		res.json({ status: "error", msg : 'user already admin' })
		return;
	}
	let currentAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId='${req.authUser.id}'`);
	if(!currentAdmin[0]){
		res.json({ status: "error", msg : 'no enought rights' })
		return;
	}
	await ext.db("INSERT INTO adminRights SET ?", {userId: newAdmin[0].id});
	res.json({ status: "ok" });
});
app.post('/removeAdmin', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let removeAdmin = await ext.db(`SELECT * FROM users WHERE nick='${req.body.nick}'`);
	if(!removeAdmin[0]){
		res.json({ status: "error", msg : 'user not exist' })
		return;
	}
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId='${removeAdmin[0].id}'`);
	if(!userIsAdmin[0]){
		res.json({ status: "error", msg : 'user not in admin list' })
		return;
	}
	let currentAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId='${req.authUser.id}'`);
	if(!currentAdmin[0] || !currentAdmin[0].superVisor){
		res.json({ status: "error", msg : 'no enought rights' })
		return;
	}
	await ext.db(`DELETE FROM adminRights WHERE id='${removeAdmin[0].id}'`);
	res.json({ status: "ok" });
});
app.post('/changeAdminRight', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let adminInUsers = await ext.db(`SELECT * FROM users WHERE nick='${req.body.nick}'`);
	if(!adminInUsers[0]){
		res.json({ status: "error", msg : 'user not exist' })
		return;
	}
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId=${adminInUsers[0].id}`);
	if(!userIsAdmin[0]){
		res.json({ status: "error", msg : 'user not in admin list' })
		return;
	}
	let currentAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId=${req.authUser.id}`);
	if(!currentAdmin[0]?.superVisor && !currentAdmin[0]?.[req.body.right]){
		res.json({ status: "error", msg : 'no enought rights' })
		return;
	}
	if(req.body.status){
		await ext.db(`UPDATE adminRights SET ${req.body.right}=${req.authUser.id} WHERE id=${userIsAdmin[0].id}`)
	}else{
		await ext.db(`UPDATE adminRights SET ${req.body.right}=0 WHERE id=${userIsAdmin[0].id}`);
	}
	res.json({ status: "ok" });
});
app.post('/approvalPatternsList', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let patterns = await ext.db(`SELECT id FROM patterns WHERE approved IS NULL`);
	res.json({ status: "ok", patterns : patterns });
});
app.post('/approvePattern/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId=${req.authUser.id}`);
	if(!userIsAdmin[0]?.approvePattern){
		res.json({ status: "error", msg : `user don't have enough rights` })
		return;
	}
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id='${ req.params.id }'`);
	if(!pattern[0] || pattern[0].approved){
		res.json({ status: "error", msg : 'no pattern or pattern approved' })
		return;
	}
	await ext.db(`UPDATE patterns SET approved=${req.authUser.id} WHERE id=${pattern[0].id}`);
	res.json({ status: "ok" });
});
app.post('/adminDeletePattern/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId=${req.authUser.id}`);
	if(!userIsAdmin[0]?.approvePattern){
		res.json({ status: "error", msg : `user don't have enough rights` })
		return;
	}
	let pattern = await ext.db(`SELECT * FROM patterns WHERE id='${ req.params.id }'`);
	if(!pattern[0] || pattern[0].approved){
		res.json({ status: "error", msg : 'no pattern or pattern approved' })
		return;
	}
	await ext.db(`DELETE FROM patterns WHERE id='${pattern[0].id}'`);
	res.json({ status: "ok", msg: "sucess deleted" });
});
app.post('/approvalCarModelsList', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let carModels = await ext.db(`SELECT * FROM carModels WHERE approved IS NULL`);
	res.json({ status: "ok", carModels });
});
app.post('/approveCarModel/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId=${req.authUser.id}`);
	if(!userIsAdmin[0]?.approveCarModel){
		res.json({ status: "error", msg : `user don't have enough rights` })
		return;
	}
	let carModel = await ext.db(`SELECT * FROM carModels WHERE id='${ req.params.id }'`);
	if(!carModel[0] || carModel[0].approved){
		res.json({ status: "error", msg : 'no car model or car model approved' })
		return;
	}
	await ext.db(`UPDATE carModels SET approved=${req.authUser.id} WHERE id=${carModel[0].id}`);
	res.json({ status: "ok" });
});
app.post('/deleteCarModel/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId=${req.authUser.id}`);
	if(!userIsAdmin[0]?.approveCarModel){
		res.json({ status: "error", msg : `user don't have enough rights` })
		return;
	}
	let carModel = await ext.db(`SELECT * FROM carModels WHERE id='${ req.params.id }'`);
	if(!carModel[0] || carModel[0].approved){
		res.json({ status: "error", msg : 'no car model or car model approved' })
		return;
	}
	await ext.db(`DELETE FROM carModels WHERE id='${carModel[0].id}'`);
	res.json({ status: "ok" });
});
app.post('/approvalCommentsList', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let comments = await ext.db(`
		SELECT
			users.nick,
			patternComments.id,
			patternComments.msg,
			patternComments.created,
			patternComments.patternId
		FROM patternComments
		LEFT JOIN users
		ON patternComments.userID=users.id
		WHERE patternComments.approved IS NULL
		ORDER BY patternComments.created ASC
	`);
	res.send(comments);
});
app.post('/approveComment/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId=${req.authUser.id}`);
	if(!userIsAdmin[0]?.approveComment){
		res.json({ status: "error", msg : `user don't have enough rights` })
		return;
	}
	let comment = await ext.db(`SELECT * FROM patternComments WHERE id='${ req.params.id }'`);
	if(!comment[0] || comment[0].approved){
		res.json({ status: "error", msg : 'no comment or comment approved' })
		return;
	}
	await ext.db(`UPDATE patternComments SET approved=${req.authUser.id} WHERE id=${comment[0].id}`);
	res.json({ status: "ok" });
});
app.post('/adminDeleteComment/:id', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId=${req.authUser.id}`);
	if(!userIsAdmin[0]?.approveComment){
		res.json({ status: "error", msg : `user don't have enough rights` })
		return;
	}
	let comment = await ext.db(`SELECT * FROM patternComments WHERE id='${ req.params.id }'`);
	if(!comment[0] || comment[0].approved){
		res.json({ status: "error", msg : 'no comment or comment approved' })
		return;
	}
	await ext.db(`DELETE FROM patternComments WHERE id=${comment[0].id}`);
	res.json({ status: "ok" });
});
app.post('/getDeletedUsers', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let users = await ext.db(`
		SELECT deletedUsers.*, SUM(transactions.amount) FROM deletedUsers
		LEFT JOIN transactions
		ON transactions.userId=deletedUsers.userId
		GROUP BY deletedUsers.id
		ORDER BY deletedUsers.deletedTime ASC
	`);
	res.send(users);
});
app.post('/moneyReturned/:userId', async (req, res) => {
	if( !(await utils.checkAuth(req, res)) ) return;
	let userIsAdmin = await ext.db(`SELECT * FROM adminRights WHERE userId=${req.authUser.id}`);
	if(!userIsAdmin[0]?.moneyReturn){
		res.json({ status: "error", msg : `user don't have enough rights` })
		return;
	}
	let db = await ext.db(`SELECT SUM(amount) FROM transactions WHERE userId='${req.params.userId}'`);
	let balance = db[0]?.['SUM(amount)'];
	if(!balance){
		res.json({ status: "error", msg : 'user have no blance' })
		return;
	}
	await ext.db("INSERT INTO transactions SET ?",
	{
		userId: req.params.userId,
		amount: -balance,
		description: `Money returned by admin id: ${req.authUser.id}`
	});
	res.json({ status: "ok" });
});
