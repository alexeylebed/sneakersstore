import React, {Component} from "react";
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class Info extends Component {

    state = {
        edit: false
    }

    setEditTrue = () => {
        this.setState({edit: true})
    }

    setEditFalse= () => {
        this.setState({edit: false})
    }

    saveContactInfo = (e) => {
        this.setEditFalse();
        const newName = document.getElementById('profile__nameInput').value;
        this.props.changeName(newName).then((res) => {
            console.log(res);
        })
    }

    render(){
        //console.log(this.props.catalog.user)
        if(this.props.catalog.user.name){
            return(
                <div className = "profileContainer">
                    <div className = 'profile_addressWrapper'>
                        <div className = "profile_sectionTitle">Contact info</div>
                        <div className = "auth__input profile_addressNonEdit" style = {{"display": this.state.edit ? "none" : "block" }}>{this.props.catalog.user.name}</div>
                        <div className = 'profile_addAddressButton profile_saveButton' style = {{"display": !this.state.edit ? "block" : "none" }} onClick = {this.setEditTrue}>EDIT</div>
                        <input id = "profile__nameInput" className = 'auth__input profile_input' style = {{"display": this.state.edit ? "block" : "none" }} placeholder = "Enter your name"></input>
                        <div className = 'profile_addAddressButton profile_saveButton' style = {{"display": this.state.edit ? "block" : "none" }} onClick = {this.saveContactInfo}>save</div>
                        <div className = "auth__input profile_addressNonEdit" style = {{"display": this.state.edit ? "none" : "block" }}>{this.props.catalog.user.email}</div>
                    </div>
                </div>
            )   
        } else {
            return(
                <div className = "profileContainer">Error! Something went wrong :(</div>
            )
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

export default connect(mapStateToProps, dispatchStateToProps)(Info);


