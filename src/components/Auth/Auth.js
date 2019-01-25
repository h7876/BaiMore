import React, { Component } from 'react';
import auth from './auth.css'
import { Link } from 'react-router-dom';

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
                <Link to='/signup'>
                    <div className="signup">
                        <button>Sign Up</button>
                    </div> 
                </Link>
            </div>

        )
    }
} export default Auth;