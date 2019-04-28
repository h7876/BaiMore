import React, {Component} from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import product from './product.css';

 class Product extends Component {

    componentDidMount(){
        this.getProduct();
        console.log(this.props)
    }
    componentWillMount(){
        this.topOfPage();
    }
   
    constructor(){
        super();
        this.state ={
            product: [],
            quantity: ""
        }
        this.getProduct = this.getProduct.bind(this);
        this.topOfPage = this.topOfPage.bind(this);
    }


    getProduct(){
        let productcode = this.props.match.params.productcode
        axios.get(`/api/product/${productcode}`).then((req)=> {
            this.setState({product: req.data[0]})
        })
    }

    addToCart(){
        let productcode = this.props.match.params.productcode;

    }

    topOfPage(){
            window.scrollTo(0, 0);
    }

    render(){
        const {
            quantity
        } = this.state;
        const updateByPropertyName = (propertyName, value)  => ({
            [propertyName]: value
          });
        return(
            <div>
                <Navbar/>
                <div className="singleproductflex">
                    <div className="singleproductcontainer">
                        <div className="singleproductimg">
                            <img src={this.state.product.image} alt={this.state.product.productname} height="auto" width="auto"></img>
                        </div>
                        <div className="productdetails">
                            <div className="singleproductname">
                                <h1>{this.state.product.productname}</h1>
                            </div>
                            <div className="singleproductprice">
                            <div className="singleline">
                                <p>${this.state.product.price}</p>
                               <input type="text" value={this.state.quantity}  maxLength="4" onChange={event => this.setState(updateByPropertyName('quantity', event.target.value))}></input><button>Add To Cart</button>
                               </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }   
}
export default Product;