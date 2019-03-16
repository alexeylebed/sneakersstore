import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Catalog from "./pages/Catalog";
import "./css/style.css";
import store from "./redux/store";
import {Provider} from 'react-redux';
import Footer from "./components/Footer";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AuthReg from "./pages/AuthReg";
import LoadDB from "./components/LoadDB";
import Checkout from "./pages/Checkout";



class App extends Component {
  render() {  
    return (
      <Provider store = {store}>
          <Router>
            <div className = 'content'>
                <div className = 'contentUp'>
                    <Navbar />
                    <Route exact path = '/' component = {Catalog} />
                    <Route exact path = '/item/:itemId' component = {Item} />
                    <Route exact path = '/catalog/:section' component = {Catalog} />
                    <Route exact path = "/catalog/:section/item/:itemId" component = {Item} /> 
                    <Route exact path = "/cart" component = {Cart}/> 
                    <Route exact path = "/loadb" component = {LoadDB} /> 
                    <Route path = "/profile" component = {Profile}/>
                    <Route exact path = "/auth" component = {AuthReg} />
                    <Route exact path = "/register" component = {AuthReg}/>
                    <Route exact path = "/checkout" component = {Checkout}/> 

                </div>
                <Footer />
            </div>
          </Router>
      </Provider>
    );
  }
}

export default App; 
