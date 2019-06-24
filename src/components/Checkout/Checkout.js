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
        this.handleName = this.handleName.bind(this);
        this.handleAddressL1 = this.handleAddressL1.bind(this);
        this.handleAddressL2 = this.handleAddressL2.bind(this);
        this.handleAddressCity = this.handleAddressCity.bind(this);
        this.handleAddressState = this.handleAddressState.bind(this);
        this.handleAddressZip = this.handleAddressZip.bind(this);
        this.handleAddressCountry = this.handleAddressCountry.bind(this);
    }

    handleName(event) {
        this.setState({name: event.target.value});
      }

    handleAddressL1(event) {
        this.setState({address_line1: event.target.value});
      }
    handleAddressL2(event) {
        this.setState({address_line2: event.target.value});
      }

    handleAddressCity(event) {
        this.setState({address_city: event.target.value});
      }

      handleAddressState(event) {
        this.setState({address_state: event.target.value});
      }

    handleAddressZip(event) {
        this.setState({address_zip: event.target.value});
      }
      handleAddressCountry(event) {
        this.setState({address_country: event.target.value});
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
        if (this.state.complete) return <h1>Purchase Complete</h1>;
        return(
            <div>
                <Navbar/>
                <div className="checkout">
                    <div className="address-flexbox">
                    <h3>Shipping Address:</h3>
                    <input placeholder="Full Name" type="text" onChange={this.handleName}></input>
                    <input placeholder="Address Line 1" type="text" onChange={this.handleAddressL1}></input>
                    <input placeholder="Address Line 2" type="text" onChange={this.handleAddressL2}></input>
                    <input placeholder="City" type="text" onChange={this.handleAddressCity}></input>
                    <input placeholder="State" type="text" onChange={this.handleAddressState}></input>
                    <input placeholder="Zip" type="number" onChange={this.handleAddressZip}></input>
                    
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