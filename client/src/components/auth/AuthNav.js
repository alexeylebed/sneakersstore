import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AuthNav extends Component {
    render(){
        return(
            <div className = 'authNav__wrapper'>
                <Link to = '/auth' className = {window.location.pathname === '/auth' ? 'authNav__element_active' :  'authNav__element'}>Sign In</Link>
                <Link to = '/register' className = {window.location.pathname === '/register' ? 'authNav__element_active' :  'authNav__element'}>Register</Link>
                <Link to="/" className = "auth_close"><img src = "/item/closemodal" alt = 'close'></img></Link>
            </div>
        );
    };
};

export default AuthNav; 