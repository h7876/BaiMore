import React, {Component} from 'react';
// eslint-disable-next-line
import card from './card.css';

class Card extends Component {

  constructor(){
    super();
    this.state ={
      products: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
    }
  }

  render(){
    const productsToDisplay = this.state.products.map((el, i)=> {
      return(
        <div className="card" key={el + i}>
          {el}
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
