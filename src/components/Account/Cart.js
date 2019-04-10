import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import cart from './cart.css'
class Cart extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            cart: [],
            user: [],
            edit: false,
            cartitemid: []
        }
        this.getCart = this.getCart.bind(this);
    }

    componentDidMount(){
        this.getCart();
        console.log(this.props)

    }

    //Replace 2617 with cartid
getCart(){
    axios.get('/api/cart/2617').then((req)=> {
        console.log(req.data)
        this.setState({cart: req.data})
    }).then(()=> console.log(this.state.cart))
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
                <div key={el + i}><button>Remove</button></div>
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