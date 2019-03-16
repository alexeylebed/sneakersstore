import React, {Component} from "react"
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";

class Profile extends Component {
    state = {
        authResponseIsGotten: false,
        auth: false
    }


    render(){
        if(this.props.location.redirectFrom === 'auth'){
            if(this.props.catalog.user !== {}){
                return (
                    <div className = 'container'>
                         <div>{this.props.catalog.user.name}</div>
                         <div>{this.props.catalog.user.email}</div>
                    </div>
                );
            } else {
                return(
                    <div className = 'container'>Profile is loading</div>
                );
            }
        } else {
            if(!this.props.catalog.user.email){
                console.log('redirect from profile to auth')
                return <Redirect to = "/auth" />
            } else {
               console.log(this.props.catalog.user)
               return (
                   <div className = 'container'>
                        <div>{this.props.catalog.user.name}</div>
                        <div>{this.props.catalog.user.email}</div>
                   </div>
               );
            }
        }
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

export default connect(mapStateToProps, dispatchStateToProps)(Profile);


