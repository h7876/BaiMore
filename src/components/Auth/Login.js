import React, { Component } from 'react';
import firebase from 'firebase';
import Navbar from '../Navbar/Navbar';
import login from './login.css';


class Login extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:''
        }
        this.logInExistingUser = this.logInExistingUser.bind(this);
    }

    logInExistingUser(){
        const {
        email,
        password
        } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(()=> {
            window.location.replace('/')
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
          });
    }

    render(){
        const {
            email,
            password
        } = this.state;

        const updateByPropertyName = (propertyName, value) => ({
            [propertyName]: value
        });

        return(
            <div>
                <Navbar/>
                <div className="loginfields"> 
                    <h1>Login</h1>
                    <input type="text" placeholder="Email" onChange={event => this.setState(updateByPropertyName('email', event.target.value))}></input><br/><br/>
                    <input type="password" placeholder="Password" onChange={event => this.setState(updateByPropertyName('password', event.target.value))}></input><br/><br/>
                    <button onClick={this.logInExistingUser}>Log In</button>
                </div>
            </div>
        )
    }
}
export default Login;