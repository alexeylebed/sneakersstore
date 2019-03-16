import React, {Component} from "react";
import {Link} from "react-router-dom"

class ProfileMenuItem extends Component {

    state = {
        icon: '',
        state: 'black'
    }

    loadState = () =>{
        switch(this.props.item){
            case "Contact info": return this.setState({icon: "contact"})
            case "Shipping address": return this.setState({icon: "address"})
            case "Orders": return this.setState({icon: "orders"})
            default: return this.state;
        }
    }

    componentWillMount(){
        this.loadState();
    }

    render(){
        return(
            <Link to = {"/profile/" + this.state.icon} className = {("/profile/" + this.state.icon) === window.location.pathname ? "profile_menu_parent_active" : "profile_menu_parent"}>
                <div className = 'profile__menu__contentWrapper'>
                    <img className = 'profile__menu__icon' src = {"/icons/profile/" + this.state.icon + this.state.state} alt = 'icon'></img>
                    <div className = 'profile__menu__title'>{this.props.item}</div>
                </div>
                <div className = "profile__menu__borderElement"></div>
            </Link>
        )
    }
}

export default ProfileMenuItem;

