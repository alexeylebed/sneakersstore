import {GET_CATALOG} from "./constants";
import {GET_ITEM} from "./constants";

import {CUT_CATALOG} from "./constants";

import {INCREMENT} from "./constants";
import {DECREMENT} from "./constants";

import {SORT_DEFAULT} from "./constants";
import {LOW_TO_HIGH} from "./constants";
import {HIGH_TO_LOW } from "./constants";

import {CLEAR_FILTER} from "./constants";

import {ADD_TO_CART} from "./constants";

import {DECREMENT_CART} from "./constants";
import {INCREMENT_CART} from "./constants";
import {DELETE_CART} from "./constants";
import {CART_IS_CHANGED} from "./constants";
import {LOAD_CART} from "./constants";

import {LOAD_STORE_USER} from "./constants";

import {NEW_USER} from "./constants";
import {LOAD_USER} from "./constants";


import {LOGOUT} from "./constants";

import {CHANGE_ADDRESS} from "./constants";
import {CHECKOUT} from "./constants";
import {CHANGE_NAME} from "./constants";








import axios from 'axios';

export const getCatalog = (path) =>{
    return {
        type: GET_CATALOG,
        payload: axios.get(path)
    }
}

export const getItem = (path) =>{
    return {
        type: GET_ITEM,
        payload: axios.get(path)
    }
}

export const cartIsChanged = (body) =>{
    return {
        type: CART_IS_CHANGED,
        payload: axios.post("/cartupdated" , {
            body: body
        })
    }
}

export const checkout = (order) =>{
    return {
        type: CHECKOUT,
        payload: axios.post("/checkout" , {cart: order.cart, total: order.total, subtotal: order.subtotal, tax: order.tax})
    }
}


export const cutCatalog = (catalog) => {
    const  numOfArrs = Math.floor(catalog.length/8) + (catalog.length%8 === 0 ? 0 : 1);
    const newCatalog = [];

    for(let j = 0; j < numOfArrs; j++){
            newCatalog[j] = [];
    };

    for(let i = 0; i < catalog.length; i++){
        let catalogIndex = Math.floor(i/8)
        newCatalog[catalogIndex].push(catalog[i])
    };

    return {
        type: CUT_CATALOG,
        newCatalog: newCatalog
    }
}

export const increment = () =>{
    return {
        type: INCREMENT
    }
}

export const decrement = () =>{
    return {
        type: DECREMENT
    }
}

export const sortDefault = () =>{
    return {
        type: SORT_DEFAULT
    }
}

export const lowToHigh = () =>{
    return {
        type: LOW_TO_HIGH
    }
}

export const highToLow = () =>{
    return {
        type: HIGH_TO_LOW
    }
}

export const clearFilter = () =>{
    return {
        type: CLEAR_FILTER
    }
}

export const addToCart = (data) =>{ 
    console.log(data)
    return {
        type: ADD_TO_CART,
        data: data
    }
}

export const loadCart = () =>{ 
    return {
        type: LOAD_CART,
        payload: axios.get("/loadcart")
    }
}

export const logout = () =>{ 
    return {
        type: LOGOUT,
        payload: axios.get("/logout")
    }
}

export const loadUser= () =>{ 
    return {
        type: LOAD_USER,
        payload: axios.get("/loaduser")
    }
}
//getuser

export const incrementCart = (index) =>{
    return {
        type: INCREMENT_CART,
        index: index
    }
}

export const decrementCart = (index) =>{
    return {
        type: DECREMENT_CART,
        index: index
    }
}

export const deleteItem = (index) =>{
    return {
        type: DELETE_CART,
        index: index
    }
}

export const loadStore_user = (data) =>{
    return {
        type: LOAD_STORE_USER,
        payload: data
    }
}

export const new_user = (user) =>{
    return {
        type: NEW_USER,
        data: user
    }
}

export const changeAddress= (address) =>{ 
    return {
        type: CHANGE_ADDRESS,
        payload: axios.post("/changeaddress" , {address})
    }
}

export const changeName= (name) =>{ 
    return {
        type: CHANGE_NAME,
        payload: axios.post("/changename" , {name})
    }
}










