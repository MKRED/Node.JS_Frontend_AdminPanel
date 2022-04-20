const express = require('express')
const path = require("path");
const https = require('https');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const getPort = require('get-port');
const utils = require('./utils');

const app = express();
app.use(fileUpload());
app.use(express.json());

const userAccount = require('./userAccount');
app.use(userAccount.app);
const admin = require('./admin');
app.use(admin.app);
const adminOld = require('./adminOld');
app.use(adminOld.app);
const patterns = require('./patterns');
app.use(patterns.app);
const carModel = require('./carModel');
app.use(carModel.app);
const payPal = require('./payPal');
app.use(payPal.app);

app.use(express.static(path.join(__dirname, "../public")));
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

(async () => {
	const port = await getPort({port: [80, ...getPort.makeRange(4000, 4100)]});
	utils.setPortStr(port);
	const useHTTPS = false; //use HTTPS only for facebook login development! livereload not working!
	if(useHTTPS){
		const options = {
			key: fs.readFileSync(path.join(__dirname, "../cert/localhost.key")), // Replace with the path to your key
			cert: fs.readFileSync(path.join(__dirname, "../cert/localhost.crt")) // Replace with the path to your certificate
		}
		https.createServer(options, app).listen(port, () => {
			console.log(`Server started at https://localhost:${port}`)
		})
	}else{
		app.listen(port, () => { console.log(`API started, test web page - http://localhost:${port}/testApi`) })
	}
})();
