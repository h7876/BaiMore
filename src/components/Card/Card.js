import React, {Component} from 'react';
// eslint-disable-next-line
import card from './card.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import Masonry from 'react-masonry-css';

class Card extends Component {

  componentDidMount(){
    this.getProducts();
  }

  constructor(){
    super();
    this.state ={
      products: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
      realProducts: [],
      reRender: false
    }
    this.getProducts = this.getProducts.bind(this);
    this.forceResize =this.forceResize.bind(this);
    
  }

  forceResize(){
    this.setState({reRender: true})
  }

  getProducts(){
    axios.get("/api/products/").then((req)=> {
      console.log(req.data);
      this.setState({realProducts: req.data}, this.forceUpdate())
    })
  }

  render(){
    const sizes = {
      default: 6,
      1900: 5,
      1750: 4,
      1500: 3,
      1000:2,
      600:1

    }
    return(

      <Masonry
         breakpointCols={sizes}>
          {this.state.realProducts.map((el, i)=> 
            <div className="element" key={el + i}>
            <button onClick={(()=> this.props.viewProduct(el.productcode))}>
            <img src={el.image} alt="Product" width="260" ></img>
            </button>
            <p>{el.productname+ ' '}{' ' + `${"$"}`+ el.price}</p>
        </div>
     )}
      </Masonry>)}}

export default Card;
