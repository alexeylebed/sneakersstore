import React, {Component} from "react";
import Filters from '../components/catalog/Filters';
import ItemsList from '../components/catalog/ItemsList';

class Catalog extends Component {
    render(){
        return(
            <div className = 'container'>
                <Filters section = {this.props.match.params.section}/>
                <ItemsList section = {this.props.match.params.section}/>
            </div>  
        );
    }
}

export default Catalog;

