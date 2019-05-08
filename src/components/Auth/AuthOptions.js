import React, { Component } from 'react';
//eslint-disable-next-line
import auth from './auth.css'
import { Link } from 'react-router-dom';
import firebase from 'firebase';

class AuthOptions extends Component{
    componentDidMount(){
        this.authCheck();
      }

    constructor(){
        super();
        this.state = {
            uid:''
        }
        this.authCheck = this.authCheck.bind(this);
        this.signUserOut = this.signUserOut.bind(this);
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
            this.setState({uid:uid}, (()=> this.forceUpdate()))
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
                    <button>Cart</button>
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

