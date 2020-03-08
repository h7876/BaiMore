import React, {Component} from 'react';
// eslint-disable-next-line
import card from './card.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MasonryInfiniteScroller from 'react-masonry-infinite';

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
    return(

      <MasonryInfiniteScroller
        className="container" sizes={[{ columns: 1, gutter: 15 }, { mq: '768px', columns: 2, gutter: 15 }, { mq: '1024px', columns: 6, gutter: 15 }]} position='true'>
          {this.state.realProducts.map((el, i)=> 
            <div className="card" key={el + i}>
            <button onClick={(()=> this.props.viewProduct(el.productcode))}>
            <img src={el.image} alt="Product" width="260" ></img>
            </button>
            <p>{el.productname+ ' '}{' ' + `${"$"}`+ el.price}</p>
        </div>
     )}
      </MasonryInfiniteScroller>)}}

export default Card;
