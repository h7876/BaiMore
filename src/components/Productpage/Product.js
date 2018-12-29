import React, {Component} from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import product from './product.css';

 class Product extends Component {

    componentDidMount(){
        this.getProduct();
    }
   
    constructor(){
        super();
        this.state ={
            product: []
        }
        this.getProduct = this.getProduct.bind(this);
    }


    getProduct(){
        let productcode = this.props.match.params.productcode
        axios.get(`/api/product/${productcode}`).then((req)=> {
            this.setState({product: req.data[0]})
        })
    }

    render(){
        return(
            <div>
                <Navbar/>
                <div className="singleproductflex">
                    <div className="singleproductcontainer">
                        <div className="singleproductimg">
                            <img src={this.state.product.image} alt={this.state.product.productname} height="auto" width="auto"></img>
                        </div>
                        <div className="singleproductname">
                            <h1>{this.state.product.productname}</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}
export default Product;