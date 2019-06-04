import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import cart from './cart.css'
class Cart extends Component {
   
    constructor(){
        super();
        this.state = {
            cart: [],
            user: [],
            edit: false
        }
        this.getCart = this.getCart.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentDidMount(){
        this.getCart();
        console.log(this.props)

    }
    componentDidUpdate(prevProps) {
        if (this.props.cartid !== prevProps.cartid) {
          this.getCart();
        }
      }
//Retrieves all the items from the logged in user's cart    
getCart(){
    axios.get(`/api/cart/${this.props.cartid}`).then((req)=> {
        console.log(req.data)
        this.setState({cart: req.data})
    }).then(()=> console.log(this.state.cart))
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
                    <div className="cartquantity">{el.quantity}
                    </div>   
                </div>
                )})
        let price = this.state.cart.map((el, i)=> {
            return(
                <div key={i+el}>
                    <div className="cartproductprice">${el.price}</div> 
                </div>
                )})
        let quantitybutton = this.state.cart.map((el, i)=> {
            return (
                <div key={el+i}><button>Edit Quantity</button></div>
            )
        })
        let deletebutton = this.state.cart.map((el, i)=> {
            return (
                <div key={el + i}><button onClick={()=>this.deleteItem(el)}>Remove</button></div>
            )
        })
        let savebutton = this.state.cart.map((el, i)=> {
            return (
                <div key={el + i}><button>Save</button></div>
                
            )
        })
        return(
            <div>
                <Navbar/>
                        <div className="productflex">
                            <div className="productnamecolumn" >
                                <h3>Product:</h3><br/>
                                {productname}
                            </div>
                            <div className="productpricecolumn" >
                                <h3>Price:</h3><br/>
                                {price}
                            </div>
                            <div className="quantitycolumn" >
                                <h3>Quantity:</h3><br/>
                                {quantity}
                            </div>
                            <div className="editquantitycolumn">{quantitybutton}</div>
                            <div className="deletebuttoncolumn">{deletebutton}</div>
                        </div>
            </div>
        )
    }
}
export default Cart;