import React , {Component} from "react";

class Stars_item extends Component {
    state ={
        starsCount: 0
    }
    componentWillMount(){
        const calcRating = () =>{
            const starsCount = Math.floor(this.props.rating)
            this.setState({starsCount: starsCount})
        }
        calcRating();
    }
  
    render(){
        return(
            <div className = 'starsBlock starsBlock_Item'>
                <div className = "starsBlock__stars">
                    <img className = 'starItem' src = {this.state.starsCount > 0 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 1 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 2 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 3 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                    <img className = 'starItem' src = {this.state.starsCount > 4 ? window.location.origin + '/catalog/staractiveicon' : window.location.origin + '/catalog/starpassiveicon'} alt = '*'></img>
                </div>
                <div className = "itemStarsBlock_reviews">Reviews {this.props.reviews}</div>
            </div>
        );
    }
}

export default Stars_item ;