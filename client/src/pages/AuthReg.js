import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
import AuthNav from "../components/auth/AuthNav";
import Auth from "../components/auth/Auth";
import Reg from "../components/auth/Reg";
import {BrowserRouter as Switch, Route} from "react-router-dom";

class AuthReg extends Component{
    state = {
        redirect: false
    }
    handleRedirect = () => {
        console.log('redirect from auth/reg to Profile')
        this.setState({
            redirect: true
        });
        
    }
    unmountComponent = () => {
        this.unmountComponentAtNode()
    }
    render(){
        return (this.state.redirect ? <Redirect to={{pathname: "/profile" , redirectFrom: "auth"}} /> :
            <div className = "modal__auth">
                <div className = 'modal__contentAuth'>
                    <div>
                        <AuthNav />
                        <Switch>
                            <div>
                                <Route exact path = "/auth" component = {() => <Auth handleRedirect={this.handleRedirect}/> }  />
                                <Route exact path = "/register" component = {() => <Reg handleRedirect={this.handleRedirect}/> } />
                            </div>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthReg;

