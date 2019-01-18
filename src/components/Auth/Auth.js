import React, { Component } from 'react';
import auth from './auth.css'

class Auth extends Component{

    constructor(){
        super();
        this.state = {
            
        }
    }

    render(){
        return(
            <div>
                <div className="login">
                    <button>Login</button>
                </div>
            </div>

        )
    }
} export default Auth;