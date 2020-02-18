import React, { Component } from 'react';
//eslint-disable-next-line
import auth from './auth.css'
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';

class AuthOptions extends Component{
    componentDidMount(){
        this.authCheck();
      }

    constructor(){
        super();
        this.state = {
            uid:'',
            quantity:''
        }
        this.authCheck = this.authCheck.bind(this);
        this.signUserOut = this.signUserOut.bind(this);
        this.getCartQuantity = this.getCartQuantity.bind(this);
    }

    getCartQuantity(){
        let cartid= this.props.cartid
        axios.get(`/api/cart/quantity/${cartid}`).then((req)=> {
            console.log(req.data[0].sum)
            this.setState({quantity:req.data[0].sum}, this.forceUpdate())
        })
    }

    authCheck(){
        firebase.auth().onAuthStateChanged((user)=> {
          if (user) {
            // User is signed in.
            //var displayName = user.displayName;
            var email = user.email;
           // var emailVerified = user.emailVerified;
           // var photoURL = user.photoURL;
           // var isAnonymous = user.isAnonymous;
            var uid = user.uid;
           // var providerData = user.providerData;
            console.log(email)
            this.setState({uid:uid}, (()=> this.getCartQuantity()))
          } else {
            
          }
        })
      }
      signUserOut(){
        firebase.auth().signOut().then(()=> {
            this.setState({uid:''}, (()=> this.forceUpdate()))
          })
      }

    render(){

        return(
            
            <div>
                {this.state.uid ?
                 <div>
                     <Link to='/cart'>
                 <div className="cart">
                    <button>Cart ({this.state.quantity}) </button>
                </div></Link>
                 <div className="logout">
                    <button onClick={this.signUserOut}>Log Out</button>
                </div></div>
                :
                <div>
                <Link to='/login'>
                <div className="login">
                    <button>Login</button>
                </div>
                </Link>
                <Link to='/signup'>
                    <div className="signup">
                        <button>Sign Up</button>
                    </div> 
                </Link>
                </div>
               }
            </div>
            
        )
    }
} export default AuthOptions;

