import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Slideshow from '../Slideshow/Slideshow';

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
            </div>
        )
    }
}
export default Home;