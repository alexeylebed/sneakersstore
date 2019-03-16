import React, {Component} from "react";
import axios from "axios";

class LoadDB extends Component {

    componentWillMount(){
        axios.get('/loadb').then(res => {
            console.log(res)
        })
    }
    render(){
        return(
            <div className  = 'container'>
                 <div className = 'DBLOAD'>DB Load Request Sent</div>
            </div>
        );
    }
}

export default LoadDB;
