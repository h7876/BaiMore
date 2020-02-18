import React, {Component} from 'react';
// eslint-disable-next-line
import navbar from './navbar.css';
import { Link } from 'react-router-dom';
import AuthOptions from '../Auth/AuthOptions';

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
                <div className="AuthOptions">
                <AuthOptions cartid={this.props.cartid}/>
                </div>
                <nav>
                <div id="toggle">
                <input type="checkbox"/>
                <span></span>
                <span></span>
                <span></span>
                    <ul id="menu">
                        
                    <div className="mobileauth"><AuthOptions/></div>
                  
                        <a href="/"><li>Home</li></a>
                        <a href="/account"><li>Account</li></a>
                        <a href="/products/categories/women"><li>Women</li></a>
                        <a href="/products/categories/men"><li>Men</li></a>
                        <a href="/products/categories/hoodies"><li>Hoodies</li></a>
                        <a href="/products/categories/jackets"><li>Jackets</li></a>
                        <a href="/products/categories/accessories"><li>Accessories</li></a>
                        <a href="/products/categories/socks"><li>Socks</li></a>
                        <a href="/products/categories/new"><li>New</li></a>
                        <a href="/products/categories/popular"><li>Popular</li></a>
                    </ul>
                </div>
                </nav>
            <div className="topbar">
            </div>
            <div className="title">
            <Link to="/">
            BaiMore
            </Link>
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