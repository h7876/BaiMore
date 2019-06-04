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
    db.reload().then((db)=> {app.set('db', db)})
    console.log('DB Connected!')
    
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
    let {userid, email, firstname, lastname, phone, cartid} = req.body;
    req.app.get('db').addUser([userid, email, firstname, lastname, phone, cartid]).then(ok=> {
        res.sendStatus(200);
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})
//Create a users's cart
app.post('/api/users/addcart',(req, res)=> {
    let {cartid} = req.body;
    req.app.get('db').addCart([cartid]).then(ok=> {
        res.sendStatus(200);
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})
//Get a cart
app.get('/api/cart/:cartid', (req, res)=> {
    cartid = req.params.cartid
    dbInstance=req.app.get('db');
    dbInstance.getSingleUserCart([cartid]).then(productsincart=> {
        res.status(200).send(productsincart)
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})
//Get Cart ID
app.get('/api/cartid/:userid',(req, res)=> {
     dbInstance = req.app.get('db');
     userid = req.params.userid
    dbInstance.getCartId([userid]).then(cartid=> {
        res.status(200).send(cartid)
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})

//add an item to a user's cart
app.post('/api/cart/:cartid', (req, res)=> {
    const cartid = req.params.cartid
    let {productcode, quantity} = req.body
    req.app.get('db').addItemToCart([quantity, cartid, productcode]).then(ok=> {
        res.sendStatus(200);
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})
app.delete('/api/cart/deleteitem', (req, res)=> {
    let {productcode, cartid} = req.body
    req.app.get('db').deleteItemFromCart([cartid, productcode]).then(ok=>{
        res.sendStatus(200);
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})

app.listen(SERVER_PORT, ()=> {
    console.log(`Things are happening on port: ${SERVER_PORT}`)
});
