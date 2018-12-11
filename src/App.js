import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Product from './components/Productpage/Product'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={Home}/>
        <Route path='/product/:productcode' component={Product}/>
      </div>
      </Router>
    );
  }
}

export default App;
