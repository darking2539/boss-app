import axios from 'axios'
import {
  HTTP_SHOW_DEVICE_SUCCESS,
  HTTP_SHOW_DEVICE_FETCHING,
  HTTP_SHOW_DEVICE_FAILED,
  server
} from "../constants";

const setStateStockToSuccess = payload => ({
  type: HTTP_SHOW_DEVICE_SUCCESS,
  payload: payload
});

const setStateStockToFetching = () => ({
  type: HTTP_SHOW_DEVICE_FETCHING
});

const setStateStockToFailed = () => ({
  type: HTTP_SHOW_DEVICE_FAILED
});

const doGetDevice = (dispatch)=>{
    console.log("testboss")
    axios.post("/api/show-device", {userid : localStorage.getItem('userid')}).then(result=>{
        dispatch(setStateStockToSuccess(result.data))
    }).catch(error=>{
        alert(JSON.stringify(error))
        dispatch(setStateStockToFailed())
    })
}

export const getDevice = ()=>{
  return dispatch=>{
    dispatch(setStateStockToFetching());
    doGetDevice(dispatch);
  }
}


export const getDeviceByKeyword = (event) =>{
  return dispatch => {
    var keyword = event.target.value;
    console.log(keyword)
    dispatch(setStateStockToFetching());

    if (keyword !== null && keyword !== ""){
      axios.post("/api/show-device/keyword", { projectcode: keyword, userid : localStorage.getItem('userid') } ).then(result => {
        dispatch(setStateStockToSuccess(result.data))
        console.log(result.data)
      })
    }else{
        doGetDevice(dispatch);
    }
  }
}

export const deleteDevice  = (value) =>{
    return async (dispatch,getState) => {
        var data = value;
        dispatch(setStateStockToFetching());
        console.log(data)
        const result = await axios.post("/api/show-device/delete", { id: data })
        console.log(result)
        doGetDevice(dispatch);
    }
  }

  export const editDevice  = (value) =>{
    return async (dispatch,getState) => {
        dispatch(setStateStockToFetching());

        const result = await axios.put("/api/show-device/edit", value)
        console.log(result)
        doGetDevice(dispatch);
    }
  }