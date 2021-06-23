module.exports = function (app) {
	const multer = require("multer");
	const upload = multer({ dest: "uploads/" });
	const { exec } = require('child_process');
	const signer = require('./sign');
	app.post('/Siged-api/sign', upload.single("file"), sign);
	function sign(req, res) {
		// console.log(req.file.path);
		
		if(exec('yarn run generate')) {
			signer.Sign(req.file, req.body, res);	
		} else {
			console.log('generate keys failed');
		}

	}

}
