import { httpClient } from "./../utils/HttpClient";
import axios from 'axios'
import {
  HTTP_STOCK_SUCCESS,
  HTTP_STOCK_FETCHING,
  HTTP_STOCK_FAILED,
  server
} from "../constants";

const setStateStockToSuccess = payload => ({
  type: HTTP_STOCK_SUCCESS,
  payload: payload
});

const setStateStockToFetching = () => ({
  type: HTTP_STOCK_FETCHING
});

const setStateStockToFailed = () => ({
  type: HTTP_STOCK_FAILED
});

const doGetProducts = (dispatch)=>{
    //console.log("testboss")
    axios.get("/api/iot-received").then(result=>{
        dispatch(setStateStockToSuccess(result.data))
    }).catch(error=>{
        alert(JSON.stringify(error))
        dispatch(setStateStockToFailed())
    })
}

export const getProducts = ()=>{
  return dispatch=>{
    dispatch(setStateStockToFetching());
    doGetProducts(dispatch);
  }
}


export const getProductByKeyword = (event) =>{
  return dispatch => {
    var keyword = event.target.value;
    console.log()
    dispatch(setStateStockToFetching());

    if (keyword !== null && keyword !== ""){
      axios.post("/api/iot-received/keyword", { DevEUI: keyword } ).then(result => {
        dispatch(setStateStockToSuccess(result.data))
        console.log(result.data)
      })
    }else{
      doGetProducts(dispatch);
    }
  }
}