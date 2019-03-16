import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from "../redux/actions";
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import AddDetails from "../components/cart/AddDetails";
import AddAddress from "../components/cart/AddAddress";
import EditAddress from "../components/cart/EditAddress";
import EditDetails from "../components/cart/EditDetails";

class Cart extends Component {

    state = {
        subtotal: 0,
        tax: 0,
        total: 0,
        checkout: false,
        auth: false,
        noAddressDisplay: false
    }

    
    handleCheckout = () => {
        if(this.props.catalog.user !== "nouser"){
            if(!this.props.catalog.user.address){
                this.setState({noAddressDisplay: true})
            } else {
                const order = {
                    cart: this.props.catalog.cart,
                    subtotal: parseFloat(this.state.subtotal),
                    tax: parseFloat(this.state.tax),
                    total: parseFloat(this.state.total),
                }
                console.log(order);
                this.props.checkout(order).then((res) => {
                    console.log(res)
                    this.setState({checkout: true})
                });
            }
        } else {
            const order = {
                cart: this.props.catalog.cart,
                subtotal: parseFloat(this.state.subtotal),
                tax: parseFloat(this.state.tax),
                total: parseFloat(this.state.total),
            }
            console.log(order);
            this.props.checkout(order).then((res) => {
                console.log(res)
                this.setState({checkout: true})
            });
        }

    }

    closeModal = () => {
        this.setState({displayModal: "none"});
    }


    incrementCart = (e) =>{
        this.props.incrementCart(e.target.id);
        this.cartIsChanged(this.props.catalog.cart)
    }

    decrementCart = (e) =>{
        this.props.decrementCart(e.target.id);
        this.cartIsChanged(this.props.catalog.cart)
    }

    cartIsChanged = (body) => {
        this.props.cartIsChanged(body)
    }

    deleteItem = (e) =>{
        this.props.deleteItem(parseInt(e.target.id));
        setTimeout(() => { this.cartIsChanged(this.props.catalog.cart)}, 100)
       
    }


    setAmounts = () =>{
        let subtotal = 0;
        if(this.props.catalog.cart){
            this.props.catalog.cart.forEach(item =>{
                subtotal = subtotal + item.qty*item.item.price;
            })
        }
        this.setState({subtotal: subtotal, tax: (subtotal*0.18).toFixed(2), total: (subtotal*1.18).toFixed(2)})
    }

    setUser = () => {
        if(this.props.catalog.user && this.props.catalog.user !== 'nouser'){
            this.setState({auth: true});
        }
    }

    componentDidMount(){
        this.setAmounts();
        this.props.loadCart()
        this.props.loadUser()
    }
    
    componentDidUpdate(prevState){
        if(this.props.catalog.cart !== prevState.catalog.cart){
            this.setAmounts();
        }
        if(this.props.catalog.user !== prevState.catalog.user){
            this.setUser();
        }
    }

    render(){
        console.log(this.props)
        if(this.state.checkout){
            if(this.state.auth){
                return (<Redirect to = "/checkout" />);
            } else {
                return (<Redirect to = "/auth" />);
            }
        } else {
            if(this.props.catalog.cart && this.props.catalog.cart.length > 0){
                return(this.state.checkout ? <Redirect to = "/checkout" /> :
                    <div>
                        <div className = 'container'>
                            <div className = 'cartTitle'>Shopping Bag</div>
                            <div className = 'cartWrapper'>
                                <div className = 'cartContentLeftWrapper'>
                                    <div className = 'cartContentLeft'>
                                        <div className = 'titleGrid'>
                                            <div className = 'cartItemTitleItem'>Item</div>
                                            <div className = 'cartItemTitleQty'>Qty.</div>
                                            <div className = 'cartItemTitlePrice'>Price</div>
                                            <div className = 'cartItemTitleSubtotal'>Subtotal</div>
                                        </div>
                                        {this.props.catalog.cart.map((item, index) =>(
                                            <div key = {index} className = 'contentGrid'>
                                                <div className = 'cartItem__imageWrapper'><img className = 'cartItem__image' alt = 'img' src = {'/catalog/img/' + item.item.imgId}></img></div>
                                                <div key = {index} className = 'cartItem'>
                                                    <div className = 'cartItem__title'>{item.item.title}</div>
                                                    <div className = 'cartItem__size'>Size: {item.item.sizes[parseInt(item.selectedSizeId)]}</div>
                                                    <div className = 'cartItem__id'>ID: {item.item.id}</div>
                                                </div>
                                                <div className = 'cartItemQty'>
                                                    <div className = 'cartItem_decrement' id = {index} onClick = {this.decrementCart}>-</div>
                                                    <div className = 'cartItem_qty'>{item.qty}</div>
                                                    <div className = 'cartItem_increment'id = {index} onClick = {this.incrementCart}>+</div>
                                                </div>
                                                <div className = 'cartItemPrice'>${item.item.price}.00</div>
                                                <div className = 'cartItemSubtotal'>${item.item.price*item.qty}.00</div>
                                                <img className = 'deleteCartItem' src="/item/closemodal" alt = 'del' id = {index} onClick = {this.deleteItem}></img>
                                            </div>
                                        ))}
                                    </div>
                                    <div className =  'cart__userDetails'>
                                        <img src = "/icons/profilecart" alt = 'profile' className = 'cart__userDetailsProfileIcon'></img>
                                        <div className = {this.props.catalog.user.email ? 'cart__detailsTextBlock_3str' : 'cart__detailsTextBlock'}>
                                            <div className = 'cart__detailsTextTitle'>Contact Info</div>
                                            {this.props.catalog.user.email ? <EditDetails /> : <AddDetails />}
                                        </div>
                                    </div>
                                    <div className = 'cart__userAddress'>
                                        <img src = "/icons/locationcart" alt = 'location' className = 'cart__userDetailsProfileIcon'></img>
                                        <div className = {this.props.catalog.user.addresses ? 'cart__detailsTextBlock_3str' : 'cart__detailsTextBlock'}>
                                            <div className = 'cart__detailsTextTitle'>Shipping address</div>
                                            {this.props.catalog.user.address ? <EditAddress/> : <AddAddress />}
                                        </div>
                                    </div>
                                </div>
                                <div className = 'cartContentRight'>
                                    <div className = "cartContentRight__dataWrapper">
                                        <div className = "cartContentRight__titles">
                                            <div className = 'cartContentRight__element'>Subtotal</div>
                                            <div className = 'cartContentRight__element'>Tax</div>
                                            <div className = 'cartContentRight__element'>Shipping</div>
                                            <div className = 'cartContentRight__element cartContentRight__total'>Total</div>
                                        </div>
                                        <div className = "cartContentRight__numbers">
                                            <div className = 'cartContentRight__element'>${this.state.subtotal}</div>
                                            <div className = 'cartContentRight__element'>${this.state.tax}</div>
                                            <div className = 'cartContentRight__element'>Free</div>
                                            <div className = 'cartContentRight__element cartContentRight__total '>${this.state.total}</div>
                                        </div>
                                    </div>
                                    <div className = 'cartContentRight__actionButtonWrapper'>
                                        <div className = 'cartContentRight__actionButton' onClick = {this.handleCheckout}>Proceed to checkout</div>
                                    </div>
                                    <div className = 'cartContentRight__note_red' style ={{"display": !this.state.noAddressDisplay ? "none" : "block"}}>You have to specify your address!</div>
                                    <div className = 'cartContentRight__note'>VISA, Mastercard and PayPal are accepted</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className = 'container'>
                        <div className = 'cartTitle'>Shopping Bag</div>
                        <div className = 'defaultCart'>You have no items in your cart</div>
                        <Link className = 'defaultCartLink' to = '/'>Start Shopping </Link>
                    </div>
                )
            }
        }
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

export default connect(mapStateToProps, dispatchStateToProps)(Cart);