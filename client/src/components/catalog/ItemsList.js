import React, {Component} from 'react';
import Item from './Item';
import {connect} from 'react-redux'
import * as actionCreators from "../../redux/actions";
import {bindActionCreators} from "redux";



class ItemsList extends Component{

    getCatalog = (path) =>{
        this.props.getCatalog(path)
            .then(() => {
                this.props.cutCatalog(this.props.catalog.data)
        });
    }

    componentDidMount(){
        this.getCatalog("/api" + window.location.pathname)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.section !== this.props.section) {
            this.getCatalog("/api" + window.location.pathname)
        }
      }

    render(){
        if(this.props.catalog.newData.length > 0){
            return(
                <div className = 'container'>
                    <div className = 'itemsWrapper'>
                        {this.props.catalog.newData[this.props.catalog.currentPage - 1].map((item, index) =>(
                            <Item  key = {index} {...item} />
                            ))}
                    </div>
                </div>
            );
        } else {
            return(<div>Loading...</div>)
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

export default connect(mapStateToProps, dispatchStateToProps)(ItemsList);
