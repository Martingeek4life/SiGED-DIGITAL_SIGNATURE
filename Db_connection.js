function DbConnexion() {

	var mongoose = require('mongoose');

	//Set up default mongoose connection
	var mongoDB = 'mongodb://127.0.0.1/my_database';
	mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
	    console.log('Successfully connected to MongoDB Atlas!');
	})
	 .catch((error) => {
	    console.log('Unable to connect to MongoDB Atlas!');
	    console.error(error);
	});
}
module.exports = { DbConnexion };