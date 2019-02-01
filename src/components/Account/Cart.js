import React, { Component } from 'react';
import axios from 'axios';

class Cart extends Component {
    componentDidMount(){
        this.getCart();
        console.log(this.state.cart)
    }
    constructor(){
        super();
        this.state = {
            cart: [],
            user: []
        }
        this.getCart = this.getCart.bind(this);
    }

getCart(){
    axios.get('/api/cart/').then((req)=> {
        console.log(req.data)
        this.setState({cart: req.data[0].productsincart})
    }).then(()=> console.log(this.state.cart))
}

    render(){
        let item = this.state.cart.map((el, i)=> {
            return(
                <div key={i+el}>{el[0]}</div>
            )
        })
        return(
            <div>{item}</div>
        )
    }
}
export default Cart;