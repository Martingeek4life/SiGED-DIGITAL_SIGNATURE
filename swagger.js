const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./endpoints.js']
const doc = {
    info: {
        version: "1.0.0",
    	title: "Qualysys SIGED Digital Signature REST API",
    	description: "this rest API is for SIGED Digital Signature build by Qualysys Consulting ..."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Sign",
            "description": "Apply Digital Signature on a document and save his MetaDatas"
        }
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        },
        petstore_auth: {
            type: "oauth2",
            authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
            flow: "implicit",
            scopes: {
                read_pets: "read your pets",
                write_pets: "modify pets in your account"
            }
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})