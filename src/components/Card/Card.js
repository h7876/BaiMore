import React, {Component} from 'react';
// eslint-disable-next-line
import card from './card.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Card extends Component {

  componentDidMount(){
    this.getProducts();
  }

  constructor(){
    super();
    this.state ={
      products: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
      realProducts: []
    }
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts(){
    axios.get("/api/products/").then((req)=> {
      console.log(req.data);
      this.setState({realProducts: req.data}, this.forceUpdate())
    })
  }

  render(){
    const productsToDisplay = this.state.realProducts.map((el, i)=> {
      return(
        <div className="card" key={el + i}>
         <button onClick={(()=> this.props.viewProduct(el.productcode))}>
          <img src={el.image} alt="Product" width="260" ></img>
          </button>
          <p>{el.productname+ ' '}{' ' + `${"$"}`+ el.price}</p>
        </div>
      )
    })
    return(
      <div>
        <div className="flexbox">
      {productsToDisplay}
        </div>
      </div>
    )
  }
}

export default Card;
