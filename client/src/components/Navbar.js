import React , {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";


class Navbar extends Component{

    state = {
        cartCount: 0,
        display:"none"
    }

    componentDidMount(){
        this.props.loadCart()
    }

    componentDidUpdate(prevProps){
        let itemsCount = 0;
        if(this.props.catalog.cart){
            this.props.catalog.cart.forEach(item =>{
                itemsCount += item.qty
            })
        }
        if(prevProps.catalog.cart !== this.props.catalog.cart){
            this.setState({cartCount: itemsCount, display : (itemsCount === 0) ? "none" : "block"});
        }
    }

    render(){
        return(
            <div className = 'navbar__container'>
                <div className = 'navbar'>
                    <div className = "navbar__left">
                        <Link to = "/catalog/men" onClick = {this.props.clearFilter} className = {window.location.pathname === '/catalog/men' ? 'navbar__element navbar__element_active' : 'navbar__element'}>Men</Link>
                        <Link to = "/catalog/women" onClick = {this.props.clearFilter} className = {window.location.pathname === '/catalog/women' ? 'navbar__element navbar__element_active' : 'navbar__element'}>Women</Link>
                        <Link to = "/catalog/kids" onClick = {this.props.clearFilter} className = {window.location.pathname === '/catalog/kids' ? 'navbar__element navbar__element_active' : 'navbar__element'}>Kids</Link>
                    </div>
                    <div className = "navbar__center">
                        <Link to ='/' onClick = {this.props.clearFilter}><img className = "logo__img" src = '/icons/logo' alt = 'logo'></img></Link>
                    </div>
                    <div className = "navbar__right">
                        <Link to ='/profile'><img className = 'cartLogo' src = '/icons/profile' alt = 'profile'></img></Link>
                        <Link to ='/cart' className = 'cartWrapper'>
                            <img className = 'cartLogo' src = '/icons/cart' alt = 'cart'></img>
                            <div className = 'certItemsCount' style = {{"display" : this.state.display}}>{this.state.cartCount}</div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) =>{
    return({
        catalog: store.catalog,
        newCatalog: store.newCatalog
    })
}

const dispatchStateToProps = (dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, dispatchStateToProps)(Navbar);


