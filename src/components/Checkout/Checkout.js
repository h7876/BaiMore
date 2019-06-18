import React, { Component } from 'react';
import checkout from './checkout.css'
import Navbar from '../Navbar/Navbar';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class Checkout extends Component {
    constructor(props){
        super(props)
        this.state = {
            complete: false,
            amount: 2000,
            currency: "usd",
            description: "BaiMore Test"
        }
        this.submit = this.submit.bind(this);
    }

   async submit(ev){
        let { token } = await this.props.stripe.createToken({name: "Name"});
        let {amount, currency, description} = this.state;
        axios.post('/charge', {token, amount, currency, description}).then(()=> {
            this.setState({complete: true})
        })
    }

    render(){
        if (this.state.complete) return <h1>Purchase Complete</h1>;
        return(
            
            <div>
                {/* <Navbar/> */}
                <div className="checkout">
                    <CardElement/>
                    <button onClick={this.submit}>Send</button>
                </div>
            </div>
        )
    }
} 

export default injectStripe(Checkout)