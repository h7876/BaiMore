import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Slideshow from '../Slideshow/Slideshow';
import Card from '../Card/Card.js';
// eslint-disable-next-line
import home from './home.css';

 class Home extends Component {
    render(){
        return(
            <div>
                <Navbar cartid={this.props.cartid}/>
                <Slideshow/>
                <Card cartid={this.props.cartid}/>
            </div>
        )
    }
}
export default Home;
