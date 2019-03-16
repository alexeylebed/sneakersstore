import React, {Component} from "react";
import Axios from "axios";
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class Reg extends Component {

    errConfig = [
        "Unsuccessful registration attempt. This e-mail is already registered.", 
        "E-mail format you provided is incorrect", 
        "You must specify e-mail", 
        "You must specify password",
        "You must specify your name" 
    ];

    state = {
        authFailed: false,
        authErr: this.errConfig[0]
    };

    handleClick = () => {
        if(this.checkFormats()){
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value;
            console.log('check format is successful')
            Axios.post("/register", {name: name, email: email, password: password , cart: this.props.catalog.cart}).then(res => {
                if(res.data === "exists"){
                    this.setState({authFailed: true, authErr: this.errConfig[0]})
                } else {
                    console.log(res.data)
                    this.props.new_user(res.data);
                    this.props.handleRedirect();
                }
            })
        } 
    }

    checkFormats = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        if(this.checkEmail(email) && this.checkPassword(password) && this.checkName(name)){
            this.setState({authFailed: false})
            return true;
        } else {
            return false;
        }
    }

    checkEmail = (email) => {
        if(email.length > 0){
            return true;
        } else {
            this.setState({authFailed: true, authErr: this.errConfig[2]})
        }
    }

    checkPassword = (password) => {
        if(password.length > 0){
            return true;
        } else {
            this.setState({authFailed: true, authErr: this.errConfig[3]})
        }
    }

    checkName = (name) => {
        if(name.length > 0){
            return true;
        } else {
            this.setState({authFailed: true, authErr: this.errConfig[4]})
        }
    }

    render(){
        return(
            <div className = 'auth__countainer'>
                <input className = "auth__input" type = 'text' name = 'name' id = 'name' placeholder = "Enter your name"></input>
                <input className = "auth__input" type = 'email' name = 'email' id = 'email' placeholder = "Enter your e-mail"></input>
                <input className = "auth__input" type = 'password' name = 'password' id = 'password' placeholder = "Enter your password"></input>
                <div className = 'reg_error'>{this.state.authFailed ? this.state.authErr : ""}</div>
                <div className = 'reg__button' onClick = {this.handleClick}>register</div>
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

export default connect(mapStateToProps, dispatchStateToProps)(Reg);


