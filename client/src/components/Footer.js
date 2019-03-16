import React, {Component} from 'react';

class Footer extends Component {
    render(){
        return(
            <div className = 'footer'>
                <div className = 'container__footer'>
                    <div className = 'footer__left'>
                            <div>© all rights reserved</div>
                            <div>Sneakers Store ltd. 2018 </div>
                    </div>
                    <div className ='footer__center'>
                        <div className = 'footer__centerElement'>Track Order</div>
                        <div className = 'footer__centerElement'>Delivery & returns</div>
                        <div className = 'footer__centerElement'>Payment Methods</div>
                        <div className = 'footer__centerElement'>Sizing chart</div>
                        <div className = 'footer__centerElement'>Contact us</div>
                    </div>
                    <div className = 'footerRight'>
                        <img className = 'socials' src = {window.location.origin + "/catalog/socials"} alt = 'socials'></img>
                    </div>
                </div>
            </div>
            );
    }
}

export default Footer;