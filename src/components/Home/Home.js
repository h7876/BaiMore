import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Slideshow from '../Slideshow/Slideshow';
import Card from '../Card/Card.js';
// eslint-disable-next-line
import home from './home.css'

 class Home extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Navbar/>
                <Slideshow/>
                <Card/>
            </div>
        )
    }
}
export default Home;
