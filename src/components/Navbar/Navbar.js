import React, {Component} from 'react';
// eslint-disable-next-line
import navbar from './navbar.css';

class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            menuOpen: false
        }
    }

    render(){
        return(
            <div>
            <div className="topbar">
            </div>
            <div className="title">
            BaiMore
            </div>
            <div className="welcome"></div>
            <div className="flex-container">
            <button className="button">Women</button>
            <button className="button">Men</button>
            <button className="button">Hoodies</button>
            <button className="button">Jackets</button>
            <button className="button">Accessories</button>
            <button className="button">Socks</button>
            <button className="button">New</button>
            <button className="button">Popular</button>
            </div>
            </div>
        )
    }
}

export default Navbar;