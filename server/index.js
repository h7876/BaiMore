require('dotenv').config();
const express = require('express')
, session = require('express-session')
, massive = require('massive')
, bodyParser = require('body-parser');

const {
    SERVER_PORT,
    CONNECTION_STRING,
    STRIPE_SK
} = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
const stripe = require("stripe")(STRIPE_SK);

massive(CONNECTION_STRING).then((db)=> {
    db.reload().then((db)=> {app.set('db', db)})
    console.log('DB Connected!')
    
});
//Get a list of all products
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
//Get a single product
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
app.get('/api/cart/quantity/:cartid', (req, res)=> {
    dbInstance = req.app.get('db');
    cartid = req.params.cartid
    dbInstance.getCartQuantity([cartid]).then(quantity=> {
        res.status(200).send(quantity)
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

//Update an item's quantity in the cart
app.put('/api/cart/:cartid', (req, res)=> {
    const cartid = req.params.cartid
    let {productcode, quantity} = req.body
    req.app.get('db').updateCartItemQuantity([quantity, cartid, productcode]).then(ok => {
        res.sendStatus(200);
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})

//Remove an item from a user's cart
app.delete('/api/cart/deleteitem/:productcode/:cartid', (req, res)=> {
    let productcode = req.params.productcode
    let cartid = req.params.cartid
    req.app.get('db').deleteItemFromCart([cartid, productcode]).then(ok=>{
        res.sendStatus(200);
    }).catch(err=> {
        res.status(500).send(err)
    })
})

//remove all items from user's cart
app.delete('/api/cart/delete/:cartid', (req, res)=> {
    let cartid = req.params.cartid
    req.app.get('db').deleteCart([cartid]).then(ok => {
        res.sendStatus(200)
    }).catch(err=> {
        res.status(500).send(err)
    })
})

//Stripe checkout
app.post("/charge", async (req, res) => {
    try {
        let {amount, currency, description} = req.body
      let {status} = await stripe.charges.create({
        amount,
        currency,
        description,
        source: req.body.token.id
      });
      res.json({status});
    } catch (err) {
      res.status(500).send(err);
    }
  });
  

app.listen(SERVER_PORT, ()=> {
    console.log(`Things are happening on port: ${SERVER_PORT}`)
});
