import {
    HTTP_SHOW_DEVICE_SUCCESS,
    HTTP_SHOW_DEVICE_FETCHING,
    HTTP_SHOW_DEVICE_FAILED,
  } from "../constants";
  
  const initialState = {
    result: null,
    isFetching: false,
    isError: false,  
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_SHOW_DEVICE_SUCCESS:        
        return { ...state, result: payload, isFetching: false, isError: false };
      case HTTP_SHOW_DEVICE_FAILED:
        return { ...state, result: null, isFetching: false, isError: true };
      case HTTP_SHOW_DEVICE_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false };
      default:
        return state;
    }
  };
  