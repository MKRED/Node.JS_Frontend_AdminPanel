let portStr = "";
exports.setPortStr = function (port){
	if(port == 80){
		portStr = "";
	}else{
		portStr = ":"+port;
	}
}
exports.getAppUrl = function (req){
	var isLocal = (req.connection.localAddress === req.connection.remoteAddress);
	if(isLocal){
		return "http://localhost"+portStr;
	}else{
		return "http://13.125.52.166"+portStr;
	}
}

const ext = require('./externals');
exports.checkAuth = checkAuth;
function checkAuth(req, res){
	return new Promise(async (resolve, reject) => {
		if(!req.body.id){
			res.json({ status: "error", msg : 'empty id' })
			return resolve(false);
		}
		let getUser = await ext.db(`
			SELECT users.*, deletedUsers.deletedTime FROM users
			LEFT JOIN deletedUsers ON users.id = deletedUsers.userId
			WHERE users.id='${req.body.id}'
		`);
		if(!getUser[0]){
			res.json({ status: "error", msg : 'user not exist' })
			return resolve(false);
		}
		if(getUser[0].deletedTime){
			res.json({ status: "error", msg : 'account deleted' })
			return resolve(false);
		}
		if(getUser[0].jwt != req.body.jwt){
			res.json({ status: "error", msg : 'wrong jwt' })
			return resolve(false);
		}
		req.authUser = getUser[0];
		resolve(true);
	});
}
exports.checkAdmin = function(req, res){
	return new Promise(async (resolve, reject) => {
		if( !(await checkAuth(req, res)) ) return resolve(false);
		if(req.authUser.level != "admin" && req.authUser.level != "superAdmin"){
			res.json({ status: "error", msg : 'for admins only' })
			return resolve(false);
		}
		resolve(true);
	});
}
