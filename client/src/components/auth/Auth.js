import React, {Component} from "react";
import Axios from "axios";
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class Auth extends Component {
    errConfig = [
        "Sign In attempt is failed. Credentials are wrong.", 
        "E-mail format you provided is incorrect", 
        "You must specify e-mail", 
        "You must specify password" 
    ];

    state = {
        authFailed: false,
        authErr: this.errConfig[0]
    };


    handleClick = () => {
        if(this.checkFormats()){
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const cart = this.props.catalog.cart
            console.log('check format is successful')
            Axios.post("/auth" , {email, password, cart})
                 .then(res => {
                     if(res.data === "failed"){
                        this.setState({authFailed: true, authErr: this.errConfig[0]})
                     } else {
                        this.props.handleRedirect();
                        this.props.loadStore_user(res.data)
                     };
                    })
        } 
    }

    checkFormats = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(this.checkEmail(email) && this.checkPassword(password)){
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

    render(){
        console.log(this.props)
        return(
            <div className = 'auth__countainer'>
                <input className = "auth__input" type = 'email' name = 'email' id = 'email' placeholder = "Enter your e-mail"></input>
                <input className = "auth__input" type = 'password' name = 'password' id = 'password' placeholder = "Enter your password"></input>
                <div className = 'auth_error'>{this.state.authFailed ? this.state.authErr : ""}</div>
                <button className = 'auth__button' onClick={this.handleClick}>sign in</button>
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

export default connect(mapStateToProps, dispatchStateToProps)(Auth);


