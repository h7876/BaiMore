require('dotenv').config();
const express = require('express')
, session = require('express-session')
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
//Product endpoints
app.get('/api/products/', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.getProducts()
    .then(products => {res.status(200).send(products);
        console.log(products);
   }).catch(err => {
    console.log(err);
    res.status(500).send(err)
});
})

app.get('/api/product/:productcode', (req, res)=> {
    const productcode = req.params.productcode
    const dbInstance = req.app.get('db');
    dbInstance.getProduct([productcode]).then(product => {
        res.status(200).send(product);
    }).catch(err=> {
        console.log(err);
        res.status(500).send(err)
    })
})
//Add User
app.post('/api/users/', (req, res)=> {
    let {userid, email, firstname, lastname, phone} = req.body;
    req.app.get('db').addUser([userid, email, firstname, lastname, phone]).then(ok=> {
        res.sendStatus(200);
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})
//Cart
app.get('/api/cart/', (req, res)=> {
    dbInstance=req.app.get('db');
    dbInstance.getUserCart().then(productsincart=> {
        res.status(200).send(productsincart)
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})
app.listen(SERVER_PORT, ()=> {
    console.log(`Magic is happening on port: ${SERVER_PORT}`)
});
