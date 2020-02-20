import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Slideshow from '../Slideshow/Slideshow';
import Card from '../Card/Card.js';
import Product from '../Productpage/Product'
import axios from 'axios';
import Cart from '../Cart/Cart';
// eslint-disable-next-line
import home from './home.css';

 class Home extends Component {
     componentDidMount(){
         this.getCartQuantity()
     }

    constructor(){
        super();
        this.state = {
            productPageToggle: true,
            quantity: '',
            productCode: '',
            currentView: 'mainView',
            cartid: ''
        }
        this.toggleView = this.toggleView.bind(this);
        this.getCartQuantity = this.getCartQuantity.bind(this);
        this.viewProduct = this.viewProduct.bind(this);
        this.viewCart = this.viewCart.bind(this);
        this.viewMain = this.viewMain.bind(this);
    }

    toggleView(view, cartid){
        this.setState({currentView: view, cartid: cartid})
    }


    getCartQuantity(){
        let cartid= this.props.cartid
        axios.get(`/api/cart/quantity/${cartid}`).then((req)=> {
            console.log(req.data[0].sum)
            this.setState({quantity:req.data[0].sum})
        })
    }
    viewProduct(productCode){
        this.setState({productCode:productCode, currentView:'productView'})
    }
    viewCart(){
        this.setState({currentView:'cartView'})
    }
    viewMain(){
        this.setState({currentView:'mainView'})
    }

    render(){

        if(this.state.currentView == 'mainView'){
            return(
                <div>
                    <Navbar cartid={this.props.cartid} cartquantity={this.state.quantity} toggleView={this.toggleView}/>
                    <Slideshow/>
                    <Card cartid={this.props.cartid} viewProduct={this.viewProduct} toggleView={this.props.toggleView} productCode={this.state.productCode}/>
                </div>
            )
        }

        if(this.state.currentView == 'productView'){
            return(
                <div>
                    <Navbar cartid={this.props.cartid} cartquantity={this.state.quantity} toggleView={this.toggleView}/>
                    <Product getCartQuantity={this.getCartQuantity} cartquantity={this.state.quantity} productCode={this.state.productCode} cartid={this.props.cartid} toggleView={this.toggleView}/>
                </div>
            )
        }
        if(this.state.currentView == 'cartView'){
            return(
                <div>
                    <Navbar cartid={this.state.cartid} cartquantity={this.state.quantity} toggleView={this.toggleView}/>
                    <Cart getCartQuantity={this.getCartQuantity} cartquantity={this.state.quantity} productCode={this.state.productCode} cartid={this.props.cartid} toggleView={this.toggleView}/>
                </div>
            )
        }
        
        
    }
}
export default Home;
