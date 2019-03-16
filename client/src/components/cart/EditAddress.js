import React , {Component}  from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class EditAddress extends Component {
    render(){
        return(
            <div className = 'cartDetails__parent'>
                <div><span className = 'cartDetails__detailsTitle'>Address: </span>{this.props.catalog.user.address}</div>
                <Link to = "/profile/address" className = "address__button_edit"  id = 'addcontact'>edit address</Link>
            </div>
        )
    }
}
const mapStateToProps = (store) =>{
    return({
        catalog: store.catalog
    })
}

const dispatchStateToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, dispatchStateToProps)(EditAddress);
