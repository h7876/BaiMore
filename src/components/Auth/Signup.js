import React, { Component } from 'react';
import base from '../../Base';
import firebase from 'firebase';
import {auth} from '../Firebase/firebase';
import axios from 'axios';


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

        firebase.auth().createUserWithEmailAndPassword(email, password).then((authUser)=> {
                let {email, firstname, lastname, phone} = this.state;
                let userid = authUser.user.uid;
                axios.post('/api/users/', {userid, email, firstname, lastname, phone}).then(()=> {
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
                
                    First Name: <input type="text" onChange={event => this.setState(updateByPropertyName('firstname', event.target.value))}></input> <br/><br/>
                    Last Name:  <input type="text" onChange={event => this.setState(updateByPropertyName('lastname', event.target.value))}></input><br/><br/>
                    Email: <input type="text" onChange={event => this.setState(updateByPropertyName('email', event.target.value))}></input> <br/><br/>
                    Password:  <input type="text" onChange={event => this.setState(updateByPropertyName('password', event.target.value))}></input><br/><br/>
                    Phone:  <input type="number" onChange={event => this.setState(updateByPropertyName('phone', event.target.value))}></input><br/><br/>
                    <button onClick={this.createUser}>Submit</button>
                
            </div>
        )
    }
}
export default Signup;