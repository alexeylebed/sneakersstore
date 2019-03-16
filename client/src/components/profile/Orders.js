import React, {Component} from "react";
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class Orders extends Component {

    render(){
        if(!this.props.catalog.user.orders || this.props.catalog.user.orders.length === 0){
            return(
                <div className = "profileContainer">
                    <div className = 'profile_addressWrapper'>
                        <div className = "profile_sectionTitle">You have no orders yet</div>
                    </div>
                </div>
            );
        }
        return(
            <div className = "profileContainer">
                <div className = 'profile_addressWrapper'>
                    <div className = "profile_sectionTitle">Orders</div>
                    {this.props.catalog.user.orders.map((order, index) => (
                        <div key = {index} className = 'orders__orderWrapper'>
                            <div className = 'orders__infoblockWrapper orders__infoblockWrapperId'>
                                <div className = "orders__order__title ">Order Id</div>
                                <div className = "orders__order__value">{order._id}</div>
                            </div>
                            <div className = 'orders__infoblockWrapper'>
                                <div className = "orders__order__title">Order Date</div>
                                <div className = "orders__order__value">{order.date ? order.date.split("T")[0] : "unknown"}</div>
                            </div>
                            <div className = 'orders__infoblockWrapper'>
                                <div className = "orders__order__title">Order Amount</div>
                                <div className = "orders__order__value orders__order__totalAmount">${order.total}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
};

const mapStateToProps = (store) =>{
    return({
        catalog: store.catalog,
        newCatalog: store.newCatalog
    })
}

const dispatchStateToProps = (dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, dispatchStateToProps)(Orders);


