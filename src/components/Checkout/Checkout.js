import React, { Component } from 'react';
import checkout from './checkout.css'
import Navbar from '../Navbar/Navbar';
import {CardElement, injectStripe} from 'react-stripe-elements';

class Checkout extends Component {
    constructor(props){
        super(props)
        this.state = {
            complete: false
        }
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        let { token } = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: token.id
        });
      
        if (response.ok) {
            this.setState({complete:true})
        }
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