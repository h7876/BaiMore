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
import {Elements, StripeProvider} from 'react-stripe-elements';
import {toast, ToastContainer} from 'react-toastify';
import {css} from 'glamor';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  constructor(props){
    super(props);
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
        var uid = user.uid;
        this.setState({uid:uid}, (()=> this.getCartId(uid)))
      } else {
        console.log("Please Log In")
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
        <StripeProvider apiKey="pk_test_AH1aYOINzkuPuos8rpEG3IJV00uGd3ELkp">
        <Elements>
        <Route path='/cart/' component={(props) => <Cart {...props} cartid={this.state.cartid}/>}/>
        </Elements>
        </StripeProvider>
        <ToastContainer 
          autoClose={3000} 
          className='toast-container'
          toastClassName="dark-toast"
          progressClassName={css({height: "5px"})}
        />
        <Route path='/checkout' component={Checkout}/>
        
      </div>
      </Router>
    );
  }
}

export default App;
