import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import cart from './cart.css'

class Cart extends Component {
    componentDidMount(){
        this.getCart();

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
        this.setState({cart: req.data})
    }).then(()=> console.log(this.state.cart))
}

    render(){
        let productname = this.state.cart.map((el, i)=> {
            return(
                <div key={i+el}>
                    <div className="productname">{el.productname}</div> 
                </div>
                )})
        let quantity = this.state.cart.map((el, i)=> {
            return(
                <div key={i+el}>
                    <div className="quantity">{el.quantity}</div> 
                </div>
                )})
        let price = this.state.cart.map((el, i)=> {
            return(
                <div key={i+el}>
                    <div className="productprice">{el.price}</div> 
                </div>
                )})
        return(
            <div>
                <Navbar/>
                   
                        <div className="productflex">
                            <div className="productnamecolumn" >
                                <h3>Product:</h3><br/>
                                {productname}
                            </div>
                            <div className="quantitycolumn" >
                             <h3>Quantity:</h3><br/>
                                {quantity}
                            </div>
                            <div className="productpricecolumn" >
                            <h3>Price:</h3><br/>
                            {price}
                            </div>
                        </div>
                    
            </div>
        )
    }
}
export default Cart;