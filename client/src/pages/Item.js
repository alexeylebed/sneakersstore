import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import * as actionCreators from "../redux/actions";
import {bindActionCreators} from "redux";
import StarsItem from "../components/catalog/Starts_item";
import ItemCat from "../components/catalog/Item"

class Item extends Component {

    state = {
        selectedId: this.props.match.params.itemId,
        sizeIsSelected: false,
        selectedSizeId:"",
        data: [],
        error: "",
        displayModal: "none"
    }

    loadContent = () =>{
        this.props.getItem("/api/" + this.props.match.params.itemId).then(() =>{
            this.props.getCatalog("/api/catalog/" + this.props.catalog.dataItem[0].category).then(() => {
                const rndArr = this.generateRnd();
                let resultArr = [];
                rndArr.forEach(item =>{
                    resultArr.push(this.props.catalog.data[item])
                })
                this.setState({data: resultArr});
           })
        })
    }

     componentDidMount(){
        this.loadContent()
     }

     componentDidUpdate(prevProps){
         if(this.props.match.params.itemId !== prevProps.match.params.itemId){
            this.loadContent();
         }
     }

     generateRnd = () => {
         let resultArr = []
         for(let i = 0 ; i < 4; i++){
            let a = Math.floor(Math.random()*(this.props.catalog.data.length-1));
            if(resultArr.indexOf(a) === -1){
                resultArr.push(a)
            } else {
                i--;
            }
         }
         return resultArr;
     }


     handleAddToCart = () => {
        if(!this.state.sizeIsSelected){
            this.setState({error : "You must select the size!"})
        } else {
            this.setState({displayModal: "block"})
            const data = {
                item: this.props.catalog.dataItem[0],
                selectedSizeId: this.state.selectedSizeId,
                qty: 1
            }
            this.props.addToCart(data)
            setTimeout(() => {this.props.cartIsChanged(this.props.catalog.cart)} , 100)
            
        }
     }
     
     handleSizeSelected = (e) => {
        this.setState({selectedSizeId: e.target.id, sizeIsSelected: true, error: ""})
     }

     closeModal = () =>{
        this.setState({displayModal: "none"})
     }

    render(){
        if(this.props.catalog.dataItem.length > 0){
            return(
                <div>
                    <div className ='container'>
                        <div className = 'topBlock'>
                            <div className = 'imgBlock'>
                                <div className = "smallImages">
                                    <img className = "item__smallPhoto" src = {window.location.origin + "/catalog/img/" + this.props.catalog.dataItem[0].imgId} alt = 'img'></img>
                                    <img className = "item__smallPhoto" src = {window.location.origin + "/catalog/img/" + this.props.catalog.dataItem[0].imgId} alt = 'img'></img>
                                    <img className = "item__smallPhoto" src = {window.location.origin + "/catalog/img/" + this.props.catalog.dataItem[0].imgId} alt = 'img'></img>
                                </div>
                                <div className = 'bigImage'> <img className = "item__photo" src = {window.location.origin + "/catalog/img/" + this.props.catalog.dataItem[0].imgId} alt = 'img'></img></div>
                            </div>
                            <div className = 'infoBlock'>
                                <div className = 'infoBlock__brand'>{this.props.catalog.dataItem[0].brand}</div>
                                <div className = 'infoBlock__title'>{this.props.catalog.dataItem[0].title}</div>
                                <StarsItem rating = {this.props.catalog.dataItem[0].rating} reviews = {this.props.catalog.dataItem[0].reviews} />
                                <div className = 'infoBlock__price'>${this.props.catalog.dataItem[0].price}</div>
                                <div className = 'infoBlock__sizesWrapper'>
                                    <div className = 'infoBlock__sizesTitle'>Size: Please select</div>
                                    <div className = "infoBlock__sizes">
                                    {this.props.catalog.dataItem[0].sizes.map((item, index) =>(
                                        <div key = {index} 
                                            id = {index} 
                                            className = {parseInt(this.state.selectedSizeId) === index ? 'infoBlock__size_selected' :'infoBlock__size'} 
                                            onClick = {this.handleSizeSelected}>{item}</div>
                                    ))}
                                    </div>
                                </div>
                                <div className = 'actionButton' onClick = {this.handleAddToCart}>Add to cart</div>
                                <div className = 'actionButton_errorMessage'>{this.state.error}</div>
                                <div className = "infoBlock_detailsWrapper">
                                    <div className = "infoBlock_detailsTitle">Product details</div>
                                    <div className = "infoBlock_details">{this.props.catalog.dataItem[0].details}</div>
                                    <div className = "infoBlock__productFeaturesWrapper">
                                    {this.props.catalog.dataItem[0].productFeatures.map((item, index) =>(
                                        <div   key = {index} className = "infoBlock__productFeatureWrapper">
                                                <div className = 'infoBlock__bullet'></div>
                                                <div className = 'infoBlock__productFeature'>{item}</div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'bottomBlock'>
                            <div className = 'bottomBlock_title'>Customers also liked</div>
                            <div className = "bottomBlock_itemsWrapper">
                                {this.state.data.map((item, index) =>(
                                    <ItemCat  key = {index} {...item} />
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className = 'modal' style = {{"display" : this.state.displayModal}}>
                        <div className = 'modal__content'>
                                <img className = 'modal__closeModal' src = "/item/closemodal" alt = 'close' onClick = {this.closeModal}></img>
                                <div className = "modal__title">You've added a product to the cart</div>
                                <div className = 'modal__buttonsWrapper'>
                                    <Link to = "/cart" className = "modal__checkout">view bag and checkout</Link>
                                    <div className = "modal__continue" onClick = {this.closeModal}>continue shopping</div>
                                </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(<div>Loading</div>)
        }
    };
};

const mapStateToProps = (store) =>{
    return({
        catalog: store.catalog,
        newCatalog: store.newCatalog
    })
}

const dispatchStateToProps = (dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, dispatchStateToProps)(Item);
