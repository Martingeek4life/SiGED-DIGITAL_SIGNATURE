const app = require('express')()
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const DB_connexion = require('./DB_connection/Db_connection')
const bodyParser = require('body-parser');
DB_connexion.DbConnexion();

http.createServer(app).listen(3000)
console.log("Listening at:// port:%s (HTTP)", 3000)

app.use('/Siged-api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./endpoints')(app)
