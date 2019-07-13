import React, { Component } from 'react';
import checkout from './checkout.css'
import Navbar from '../Navbar/Navbar';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class Checkout extends Component {
    componentDidMount(){
       
    }
    constructor(props){
        super(props)
        this.state = {
            complete: false,
            amount: this.props.checkouttotal,
            currency: "usd",
            description: "BaiMore Test",
            name: "",
            address_line1: "",
            address_line2: "",
            address_city: "",
            address_state: "",
            address_zip: "",
            address_country: "US"
        }
        this.submit = this.submit.bind(this);
    }


   async submit(ev){
       let {name, address_line1, address_line2, address_city, address_state, address_zip, address_country} = this.state
        let { token } = await this.props.stripe.createToken({name: name, address_line1: address_line1,
        address_line2: address_line2,
        address_city: address_city,
        address_state: address_state,
        address_zip: address_zip,
        address_country: address_country});
        let {amount, currency, description} = this.state;
        axios.post('/charge', {token, amount, currency, description}).then(()=> {
            this.setState({complete: true})
        })
    }

    render(){
      const updateByPropertyName = (propertyName, value) => ({
        [propertyName]: value
       });
        if (this.state.complete) return <h1>Purchase Complete</h1>;
        return(
            <div>
                <Navbar/>
                <div className="checkout">
                    <div className="address-flexbox">
                    <h3>Shipping Address:</h3>
                    <input placeholder="Full Name" type="text" onChange={event => this.setState(updateByPropertyName('name', event.target.value))}></input>
                    <input placeholder="Address Line 1" type="text" onChange={event => this.setState(updateByPropertyName('address_line1', event.target.value))}></input>
                    <input placeholder="Address Line 2" type="text" onChange={event => this.setState(updateByPropertyName('address_line2', event.target.value))}></input>
                    <input placeholder="City" type="text" onChange={event => this.setState(updateByPropertyName('address_city', event.target.value))}></input>
                    <input placeholder="State" type="text" onChange={event => this.setState(updateByPropertyName('address_state', event.target.value))}></input>
                    <input placeholder="Zip" type="number" onChange={event => this.setState(updateByPropertyName('address_zip', event.target.value))}></input>
                    
                    <h3>Payment Details:</h3>
                    <CardElement/>
                    <button onClick={this.submit}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
} 

export default injectStripe(Checkout)