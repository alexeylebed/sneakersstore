import React, {Component} from "react";
import  {Link} from "react-router-dom";
import {connect} from 'react-redux'
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";


class Checkout extends Component{
    state = {
        displayModal: "block"
    }

    render(){
        console.log(this.props.catalog.cart)
        console.log(this.props.catalog.user)
        return(
            <div className = 'modal' style = {{"display" : this.state.displayModal}}>
                <div className = 'modal__content'>
                    <img className = 'modal__closeModal' src = "/item/closemodal" alt = 'close' onClick = {this.closeModal}></img>
                    <div className = "modal__title">Success! You've done your order!</div>
                    <div className = 'modal__buttonsWrapper'>
                        <Link to = "/profile/orders" className = "modal__checkout" onClick = {this.closeModal}>continue shopping</Link>
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

export default connect(mapStateToProps, dispatchStateToProps)(Checkout);



