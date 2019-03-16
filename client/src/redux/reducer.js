import * as Constants from "./constants"
import {lowToHigh} from "./sort";
import  {highToLow} from "./sort";
import  {defaultSort} from "./sort";

export const catalogReducer = (state = {data: [],  newData: [] , pages: 1, currentPage: 1, user: {}, dataItem: [], cart: [], orders: [],  is_loading : false}, action) => {
    switch(action.type){
        case Constants.CUT_CATALOG: {
            state = {...state, is_loading: false, newData: action.newCatalog, pages: action.newCatalog.length};
            return state
        }
        case Constants.INCREMENT: {
    
            if(state.currentPage < state.pages){
                state = {...state, currentPage: state.currentPage + 1};
            }
            return state
        }
        case Constants.DECREMENT: {
            if(state.currentPage > 1){
                state = {...state, currentPage: state.currentPage - 1};
            }
            return state
        }
        case Constants.NEW_USER: {
            state = {...state, user: action.data};
            return state
        }
        case Constants.CHANGE_ADDRESS_FULFILLED: {
            state = {...state, user: action.payload.data};
            return state
        }
        case Constants.CHANGE_NAME_FULFILLED: {
            state = {...state, user: action.payload.data};
            return state
        }
        case Constants.GET_CATALOG_PENDING: {
            state = {...state, is_loading: true};
            return state
        }
        case Constants.GET_CATALOG_FULFILLED: {
            state = {...state, is_loading: false, data: action.payload.data};
            return state
        }
        case Constants.GET_CATALOG_REJECTED: {
            state = {...state, is_loading: true, error: action.payload.message};
            return state
        }
        case Constants.GET_ITEM_PENDING: {
            state = {...state, is_loading: true};
            return state
        }
        case Constants.GET_ITEM_FULFILLED: {
            state = {...state, is_loading: false, dataItem: action.payload.data};
            return state
        }
        case Constants.GET_ITEM_REJECTED: {
            state = {...state, is_loading: true, error: action.payload.message};
            return state
        }
        case Constants.CART_IS_CHANGED_PENDING: {
            state = {...state, is_loading: true};
            return state
        }
        case Constants.CART_IS_CHANGED_FULFILLED: {
            state = {...state, is_loading: false,  user: action.payload.data, cart: action.payload.data.cart ? action.payload.data.cart : action.payload.data};
            return state
        }
        case Constants.CART_IS_CHANGED_REJECTED: {
            state = {...state, is_loading: false};
            return state
        }
        case Constants.LOAD_CART_FULFILLED: {
            state = {...state, is_loading: false, cart: action.payload.data};
            return state
        }
        case Constants.LOAD_USER_FULFILLED: {
            state = {...state, is_loading: false, user: action.payload.data};
            return state
        }
        case Constants.LOGOUT_FULFILLED: {
            state = {...state, user: [], cart: []};
            return state
        }
        case Constants.CHECKOUT_FULFILLED: {
            state = {...state, user: action.payload.data, cart: []};
            return state
        }
        case Constants.CHANGE_USER_FULFILLED: {
            state = {...state, user: action.payload.data};
            return state
        }
        case Constants.SORT_DEFAULT: {
             let newData = defaultSort(state.data);
             state = {...state, data : newData }
             return state;
        }
        case Constants.LOW_TO_HIGH: {
            let newData = lowToHigh(state.data);
            state = {...state, data : newData }
            return state;
        }
        case Constants.HIGH_TO_LOW: {
            let newData = highToLow(state.data);
            state = {...state, data : newData }
            return state;
        }

        case Constants.CLEAR_FILTER: {
            state = {...state, currentPage: 1};
            return state
        }

        case Constants.INCREMENT_CART: {
            let newQty = state.cart[action.index].qty + 1;
            let  newCart = [...state.cart];
            newCart[action.index].qty = newQty;
            state = {...state, cart: newCart};
            return state
        }

        case Constants.DECREMENT_CART: {
            if(state.cart[action.index].qty > 1){
                let newQty = state.cart[action.index].qty - 1;
                let  newCart = [...state.cart];
                newCart[action.index].qty = newQty;
                state = {...state, cart: newCart};
                return state
            } else {
                return state;
            }

        }
        case Constants.LOAD_STORE_USER: {
            const newCart = state.cart.length === 0 ? action.payload.cart : [...state.cart]
            state = {...state, user: action.payload, cart: newCart};
            return state
        }
      
        case Constants.DELETE_CART: {
            let newCart = state.cart.filter((item, index) =>{
                    return index !== action.index;
            })
            state = {...state, cart: newCart};
            return state
        }

        case Constants.ADD_TO_CART: {
            let newCart = [...state.cart];
            const ids = newCart.map(item  => {
                return item.item.id
            })
            const index = ids.indexOf(action.data.item.id);

            if(index === -1){
                newCart.push(action.data)
                state = {...state, cart: newCart};
                return state
            } else {
                if(newCart[index].selectedSizeId === action.data.selectedSizeId){
                    newCart[index].qty++
                    state = {...state, cart: newCart};
                    return state
                } else {
                    newCart.push(action.data)
                    state = {...state, cart: newCart};
                    return state
                }
            }
        }

        default: {
            return state;
        }
    }
}

export default catalogReducer;