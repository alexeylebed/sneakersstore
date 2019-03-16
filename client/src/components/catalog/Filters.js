import React, {Component} from "react";
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";

class Filters extends Component{
    filtersStates = ["Default", "Price Low to High", "Price High To Low"];

    state = {
        popup: false,
        currentFiliterId: 0
    };

    defineTitle = (section) =>{
        switch(section){
            case "men": return ("Men's sneakers")
            case "women": return ("Women's sneakers")
            case "kids": return ("Kids sneakers")
            default: return("Sneakers")
        }
    }
    incrementPage = () => {
        console.log('increment')
       this.props.increment()
    };

    decrementPage = () => {
        console.log('decrement')
        this.props.decrement()
     };

     sortDefault = () =>{
        console.log('sortDefault')
        this.props.sortDefault()
        this.props.cutCatalog(this.props.catalog.data);
        this.setState({currentFiliterId: 0})
     }

     lowToHigh = () =>{
        console.log('sortDefault')
        this.props.lowToHigh()
        this.props.cutCatalog(this.props.catalog.data);
        this.setState({currentFiliterId: 1})
     }

     highToLow = () =>{
        console.log('sortDefault')
        this.props.highToLow()
        this.props.cutCatalog(this.props.catalog.data);
        this.setState({currentFiliterId: 2})
     }


     handleClick =(e) =>{
         console.log('clicked')
         if(this.state.popup){
            this.setState({popup: false})
         } else {
            this.setState({popup: true})
         };
     };

     componentDidMount(){
         document.addEventListener('click' , (e) =>{
            if(e.target.id !== 'sortMethod_ArrowImg'){
                this.setState({popup: false})
            }
         })
     }  

    render(){
        return(
            <div className = 'filters'>
                <div className = "filtersLeft">
                    <div className = 'filtersLeft__title'>{this.defineTitle(this.props.section)}</div>
                    <div className = "filtersLeft__itemsCount">{this.props.catalog.data.length} items</div>
                </div>
                <div className = "filtersRight">
                    <div className = 'filtersRight__sort' id = 'sortBlock'>
                        <div className = 'filtersRight__sortTitle'>Sort by </div>
                        <div id = "sortPopup" className = 'filtersRight__sortMethod'>{this.filtersStates[this.state.currentFiliterId]}
                            <div className = 'filtersRight__sortMethodWrapper' style = {{"display": this.state.popup ? "block" : "none"}}>
                                <div className = 'filtersRight__sortMethodChoise' onClick = {this.sortDefault}>{this.filtersStates[0]}</div>
                                <div className = 'filtersRight__sortMethodChoise'onClick = {this.lowToHigh}>{this.filtersStates[1]}</div>
                                <div className = 'filtersRight__sortMethodChoise'onClick = {this.highToLow}>{this.filtersStates[2]}</div>
                            </div>
                        </div>
                        <button className = "filtersRight__changeMethod" id = "sortButton" onClick = {this.handleClick}>
                            <img src = '/catalog/polygon' 
                                 id = "sortMethod_ArrowImg" 
                                 className = {this.state.popup ? 'filtersRight__changeMethodBtn filtersRight__changeMethodBtn_rotate' : 'filtersRight__changeMethodBtn'} 
                                 alt = 'method'>
                            </img>
                        </button>
                    </div>
                    <div className = 'filtersRight__pages'>
                        <div className = 'filtersRight__pageTitle'>Page</div>
                        <img className = 'filtersRight__arrowDecrement' onClick = {this.decrementPage} src = {window.location.origin + "/catalog/arrowleft"} alt = 'dec'></img>
                        <div className = 'filtersRight__currentPageNumber'>{this.props.catalog.currentPage}</div>
                        <div className = 'filtersRight__pageTitle'> of </div>
                        <div className = 'filtersRight__pagesNumber'>{this.props.catalog.pages}</div>
                        <img className = 'filtersRight__arrowDecrement' onClick = {this.incrementPage} src = {window.location.origin + "/catalog/arrowright"} alt = 'inc'></img>
                    </div>
                </div>
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

export default connect(mapStateToProps, dispatchStateToProps)(Filters);

