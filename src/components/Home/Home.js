import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Slideshow from '../Slideshow/Slideshow';
import Card from '../Card/Card.js';
// eslint-disable-next-line
import home from './home.css';
import firebase from 'firebase';
import axios from 'axios';

 class Home extends Component {
     componentDidMount(){
         this.authCheck();
     }
     constructor(){
         super();
         this.state={ 
             uid: [],
             cartid: [],
             
         }
         this.authCheck = this.authCheck.bind(this);
         this.getCartId = this.getCartId.bind(this);
     }

     getCartId(uid){
        axios.get(`/api/cartid/${uid}`).then((req)=> {
            console.log(req.data[0].cartid)
            this.setState({cartid:req.data.cartid})
        })
     }

     authCheck(){
        firebase.auth().onAuthStateChanged((user)=> {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(email)
            this.setState({uid:uid}, (()=> this.getCartId(uid)))
          } else {
            console.log('error authenticating')
          }
        })
      }
     
   
    render(){
        return(
            <div>
                {this.state.cartid}
                <Navbar/>
                <Slideshow/>
                <Card/>
            </div>
        )
    }
}
export default Home;
