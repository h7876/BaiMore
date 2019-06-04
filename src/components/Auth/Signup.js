import React, { Component } from 'react';
import firebase from 'firebase';
import {auth} from '../Firebase/firebase';
import axios from 'axios';
import signup from './signup.css';
import Navbar from '../Navbar/Navbar';


class Signup extends Component {
    constructor(){
        super();
        this.state = {
            firstname: "",
            lastname:"",
            email:'',
            password:"",
            phone: ""
        }
       this.createUser = this.createUser.bind(this);
    }

        createUser(){
        const {
            email,
            password,
          } = this.state;
        let cartid = Math.floor(10000000 + Math.random() * 90000000);
        firebase.auth().createUserWithEmailAndPassword(email, password).then((authUser)=> {
                let {email, firstname, lastname, phone} = this.state;
                let userid = authUser.user.uid;
                axios.post('/api/users/', {userid, email, firstname, lastname, phone, cartid}).then(()=> {
                        window.location.replace('/')
                })
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
          })
    }
    
    render(){
        const {
            firstname,
            lastname,
            email,
            password,
            phone
          } = this.state;
          const updateByPropertyName = (propertyName, value)  => ({
            [propertyName]: value
          });
        return(
            <div>
                <Navbar/>
                <div className="signupfields"> 
                    <h1>Sign Up</h1>
                    <input type="text" placeholder="First Name" onChange={event => this.setState(updateByPropertyName('firstname', event.target.value))}></input><br/><br/>
                    <input type="text" placeholder="Last Name" onChange={event => this.setState(updateByPropertyName('lastname', event.target.value))}></input><br/><br/>
                    <input type="text" placeholder="Email" onChange={event => this.setState(updateByPropertyName('email', event.target.value))}></input><br/><br/>
                    <input type="password" placeholder="Password" onChange={event => this.setState(updateByPropertyName('password', event.target.value))}></input><br/><br/>
                    <input type="number" placeholder="Phone Number" onChange={event => this.setState(updateByPropertyName('phone', event.target.value))}></input><br/><br/>
                    <button onClick={this.createUser}>Submit</button>
                </div>
            </div> 
        )
    }
}
export default Signup;