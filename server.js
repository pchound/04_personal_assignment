const dotenv = require("dotenv");
const express = require("express");

const swaggerJSDoc = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.json())
var database

const options ={
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node JS API Project for mongodb',
      version: '1.0.0'
    },
    servers:[
      {
        api: 'http://localhost:3000/'
      }
    ]
  },
  apis: ['./mongodb.js']
}
//const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc))






const contacts_route = require('./routes/contactsRoute.js');
let PORT = process.env.PORT || 3000;


app.use(contacts_route);


app.listen(PORT,()=>
{
    console.log('The server is running at port ' + PORT);
});