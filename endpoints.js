module.exports = function (app) {
	const multer = require("multer");
	const upload = multer({ dest: "uploads/" });
	const { exec } = require('child_process');
	const verifier = require('./verify');
	const signer = require('./sign');
	app.post('/Siged-api/sign', upload.single("file"), sign);
	function sign(req, res) {
		console.log(req.file);

		if(exec('yarn run generate')) {
			signer.Sign(req.file, req.body, res);	
		} else {
			console.log('generate keys failed');
		}

	}

	app.post('/Siged-api/verified', upload.single("file"), verify);
		function verify(req, res) {
			// console.log(req.file.path);
			verifier.verify(req.file.path, req.body, res);
		}

}
