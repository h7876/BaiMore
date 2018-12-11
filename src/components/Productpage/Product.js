import React, {Component} from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

 class Product extends Component {
   
    constructor(){
        super();
        this.state ={
            product: []
        }
    }


    getProduct(){
        let productcode = this.props.match.params
    }

    render(){
        return(
            
            <div>
                <Navbar/>
                <div className="productcontainer">
                    More things
                </div>
            </div>
        )
    }   
}
export default Product;