import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Product from './components/Productpage/Product'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import firebase from 'firebase';
import axios from 'axios';
import {Elements, StripeProvider} from 'react-stripe-elements'


class App extends Component {
  constructor(){
    super();
    this.state = {
      uid: [],
      cartid: []
    }
    this.authCheck = this.authCheck.bind(this);
    this.getCartId = this.getCartId.bind(this);
  }
  componentDidMount(){
    this.authCheck();
  }

  getCartId(uid){
    axios.get(`/api/cartid/${uid}`).then((req)=> {
        console.log(req.data[0].cartid)
        this.setState({cartid:req.data[0].cartid}, this.setState())
    })
 }

  authCheck(){
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        //var displayName = user.displayName;
       // var email = user.email;
        //var emailVerified = user.emailVerified;
        //var photoURL = user.photoURL;
       // var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        //var providerData = user.providerData;
        console.log('I AM ON THE ROOT LEVEL ' + uid)
        this.setState({uid:uid}, (()=> this.getCartId(uid)))
      } else {
        console.log('error authenticating')
      }
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={Home}/>
        <Route path='/product/:productcode' component={(props) => <Product {...props} cartid={this.state.cartid}/>}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/login' component={Login}/>
        <Route path='/cart/' component={(props) => <Cart {...props} cartid={this.state.cartid}/>}/><StripeProvider apiKey="pk_test_AH1aYOINzkuPuos8rpEG3IJV00uGd3ELkp">
        <Elements>
        <Route path='/checkout' component={Checkout}/>
        </Elements>
        </StripeProvider>
      </div>
      </Router>
    );
  }
}

export default App;
