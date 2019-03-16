import React, {Component} from "react";
import Stars from "./Stars"
import {Link} from 'react-router-dom';

class Item extends Component {
    render(){
        return(
            <Link to = {"/item/" + this.props.id} className = 'itemCatalogView'>
                <div className = 'itemCatalogView__photoWrapper'>
                    <img className = "itemCatalogView__photo" src = {window.location.origin + "/catalog/img/" + this.props.imgId} alt = 'img'></img>
                </div>
                <div className = "itemCatalogView__brand">{this.props.brand}</div>
                <div className = "itemCatalogView__title">{this.props.title}</div>
                <div className = "itemCatalogView__price">${this.props.price}</div>
                <Stars rating = {this.props.rating} reviews = {this.props.reviews} />
            </Link>
        )
    }
}

export default Item;

//<Link to = {window.location.pathname !== "/" ? (window.location.pathname + "/" + this.props.id) : (window.location.pathname + this.props.id)} className = 'itemCatalogView'>