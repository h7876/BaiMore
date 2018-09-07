require('dotenv').config();
const express = require('express')
, session = require('express')
, massive = require('massive')
, bodyParser = require('body-parser');

const {
    SERVER_PORT,
    CONNECTION_STRING
} = process.env;

const app = express();
app.use(bodyParser.json());

massive(CONNECTION_STRING).then((db)=> {
    console.log('DB Connected!')
    app.set('db', db)
});

app.listen(SERVER_PORT, ()=> {
    console.log(`Magic is happening on port: ${SERVER_PORT}`)
});