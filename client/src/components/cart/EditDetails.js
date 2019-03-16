import React , {Component}  from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class EditDetails extends Component {
    render(){
        return(
            <div className = 'cartDetails__parent'>
                <div><span className = 'cartDetails__detailsTitle'>Name: </span>{this.props.catalog.user.name}</div>
                <div><span className = 'cartDetails__detailsTitle'>E-mail: </span>{this.props.catalog.user.email}</div>
                <div><span className = 'cartDetails__detailsTitle'>Phone number: </span>{this.props.catalog.user.phone ? this.props.catalog.user.phone : "Not specified" }</div>
                <Link to = "/profile/contact" className = "address__button_edit" id = 'addcontact'>edit contact info</Link>
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

export default connect(mapStateToProps, dispatchStateToProps)(EditDetails);
