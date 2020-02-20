//TODO: Add comma to cart total.

import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import cart from './cart.css'
import { app } from 'firebase';
import Checkout from '../Checkout/Checkout';


class Cart extends Component {
   
    constructor(){
        super();
        this.state = {
            cart: [],
            user: [],
            edit: false,
            itemtoedit: '',
            newquantity: [],
            prices: [],
            checkout: false
        }
        this.getCart = this.getCart.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editToggle = this.editToggle.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.updateItemQuantity = this.updateItemQuantity.bind(this);
        this.clearCart = this.clearCart.bind(this);
        this.checkoutBack = this.checkoutBack.bind(this);
    }
    componentDidMount(){
        this.getCart();
        console.log(this.props)

    }

//Toggles quantity to be an input field
editToggle(el){
    this.setState({edit: !this.state.edit, itemtoedit: el.productcode})
}
cancelEdit(){
    this.setState({edit:!this.state.edit})
}
//handles the new quantity input
handleQuantityChange(event){
    this.setState({newquantity: event.target.value})
}

//Retrieves all the items from the logged in user's cart    
getCart(){
    let cart = [];
    axios.get(`/api/cart/${this.props.cartid}`).then((req)=> {
        console.log(req)
        this.setState({cart: req.data})
    }).then(()=> this.state.cart.map((el, i)=> {
        let price = parseFloat(el.price * el.quantity)
        cart.push(price)
        this.setState({prices: cart})
    }))
}
//Deletes item from cart entirely
deleteItem(el){
    console.log(el)
    let cartid = parseInt(this.props.cartid)
    let productcode = parseInt(el.productcode)
    axios.delete(`/api/cart/deleteitem/${productcode}/${cartid}`).then((req)=> {
        alert('Item Deleted!')
        this.getCart()
    })
}
//Updates quantity for item in cart
updateItemQuantity(){
    let quantity = parseInt(this.state.newquantity);
    let productcode = parseInt(this.state.itemtoedit);
    axios.put(`/api/cart/${this.props.cartid}`, {quantity, productcode}).then(()=> {
        alert('Quantity Updated')
        this.setState({edit:false}, this.getCart())
    })
}

clearCart(){
    let cartid = parseInt(this.props.cartid)
    axios.delete(`/api/cart/delete/${cartid}`).then(
        (req)=> {
            this.getCart()
        }
    )
}
checkoutBack(){
    this.setState({checkout:false})
}
    render(){

        let productname = this.state.cart.map((el, i)=> {
            return(
                <div key={i+el}>
                    <div className="cartproductname">{el.productname}</div> 
                </div>
                )})
        let quantity = this.state.cart.map((el, i)=> {
            return(
                <div key={i+el}>
                    {this.state.edit == true && this.state.itemtoedit == el.productcode ?
                    <div className="cartquantity">
                      <input placeholder={el.quantity} onChange={this.handleQuantityChange}></input> 
                    </div>   
                    : 
                    <div className="cartquantity">
                        {el.quantity}
                    </div>  
                    }
                </div>
                )
            })
        let price = this.state.cart.map((el, i)=> {
            return(
                <div key={i+el}>
                    <div className="cartproductprice">${el.price}</div> 
                </div>
                )})
        let quantitybutton = this.state.cart.map((el, i)=> {
            return (
                <div key={el+i}>
                    {this.state.edit == true && this.state.itemtoedit == el.productcode ?
                    <button onClick={()=>this.updateItemQuantity()}>Save</button> 
                    :
                    <button onClick={()=> {this.editToggle(el)}}>Edit Quantity</button> }
                </div>
            )
        })
        let deletebutton = this.state.cart.map((el, i)=> {
            return (
          
                <div key={el + i}>
                    {this.state.edit == true && this.state.itemtoedit == el.productcode ? 
                    <button onClick={()=>this.cancelEdit()}>Cancel</button>
                    :
                    <button onClick={()=>this.deleteItem(el)}>Remove</button>
                    }
                    </div>
               
            )
        })

        let savebutton = this.state.cart.map((el, i)=> {
            return (
                <div key={el + i}>
                    <button onClick={()=>this.updateItemQuantity()}>Save</button>
                </div>
            )
        })

       let pricetotal = this.state.prices.reduce((acc, val)=>{return(acc + val)}, 0).toFixed(2)

        return(
            <div>
                {!this.state.checkout ?
                <div>
                <Navbar viewCart={this.props.viewCart} cartquantity={this.props.cartquantity} toggleView={this.props.toggleView}/>
                        <div className="productflex">
                            <div className="productnamecolumn" >
                                <h3>Product</h3><br/>
                                {productname}                               
                            </div>
                            <div className="productpricecolumn" >
                                <h3> Item Price</h3><br/>
                                {price}
                            </div>
                            <div className="quantitycolumn" >
                                <h3>Quantity</h3><br/>
                                {quantity}
                            </div>
                            
                            <div className="editquantitycolumn"> {quantitybutton}</div>
                            <div className="deletebuttoncolumn">{deletebutton}</div> 
                        </div> 
                        <div className="total"><h3>Total: ${pricetotal}</h3></div>
                        <button className="checkoutbutton" onClick={()=> {this.setState({checkout: true})}}>Checkout</button>
                        </div>
                        : <Checkout checkouttotal={Math.round(pricetotal * 100)} clearcart={this.clearCart} checkoutBack={this.checkoutBack} toggleView={this.props.toggleView}/>}
            </div>
        )
    }
}
export default Cart;