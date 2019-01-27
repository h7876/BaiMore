import React, { Component } from 'react';
import firebase from 'firebase';

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
                Email: <input type="text" onChange={event => this.setState(updateByPropertyName('email', event.target.value))}></input>
                Password: <input type="text" onChange={event => this.setState(updateByPropertyName('password', event.target.value))}></input>
                <button onClick={this.logInExistingUser}>Log In</button>
            </div>
        )
    }
}
export default Login;