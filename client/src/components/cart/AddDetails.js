import React , {Component}  from "react";
import {Link} from 'react-router-dom';

class AddDetails extends Component {
    render(){
        return(
            <div>
                <div className = "address__noaddress">You have no saved contact details</div>
                <Link to = "/profile/contact" className = "address__button_edit" id = 'addcontact'>add contact info</Link>
            </div>
        )
    }
}

export default AddDetails;
