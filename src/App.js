import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Product from './components/Productpage/Product'
import Auth from './components/Auth/Auth'
import Signup from './components/Auth/Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={Home}/>
        <Route path='/product/:productcode' component={Product}/>
        <Route path='/auth' component={Auth}/>
        <Route path='/signup' component={Signup}/>
      </div>
      </Router>
    );
  }
}

export default App;
