const mysql = require('mysql');
let connection = null;
function reconnect(){
	let tmpConnection = mysql.createConnection({
	  host: 'inogrow.crrlrirxrmz1.ap-northeast-2.rds.amazonaws.com',
	  user: 'admin',
	  password: 'dev8282!',
	  database: 'inogrow',
	  timezone: 'utc'
	});
	tmpConnection.on('error', function(err) {
	  console.log("mysql connection error");
	  console.log("err.code", err.code);
	  console.log(err);
	});
	tmpConnection.on('connect', function(e) {
		tmpConnection.query(`SET FOREIGN_KEY_CHECKS=0;`, function (err, rows, fields) {
			if (err) throw err;
			let oldConnection = connection;
			connection = tmpConnection;
			oldConnection?.end();
			setTimeout(() => {
				reconnect();
			}, 1000*60*60);
		})
	});
	tmpConnection.connect();
}
reconnect();

exports.db = function (query, values){
	return new Promise((resolve, reject) => {
		if(!values){
			connection.query(query, function (err, rows, fields) {
				if (err) throw err;
				resolve(rows)
			})
		}else{
			connection.query(query, values, function (err, rows, fields) {
				if (err) throw err;
				resolve(rows)
			})
		}
	});
};
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'inogrowserver@gmail.com',
    pass: 'ZRNkLQv3e2dSJPdQ'
  }
});
exports.mail = function(par){
	let mailOptions = {
		from: 'inogrowserver@gmail.com',
		...par
	};
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}
