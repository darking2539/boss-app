import {
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FAILED,
  server,
  YES,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import  Axios  from 'axios'

export const setLoginStateToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
});

export const setLoginStateToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload
});

export const setLoginStatetoFailed = (payload) => ({
  type: HTTP_LOGIN_FAILED,
  payload
});

export const autoLogin = (history) => {
    return () => {    
      if (localStorage.getItem(server.LOGIN_PASSED)  === YES){      
        setTimeout(()=>history.push("/profile"), 10)         
      }
    } 
}

export const login = (history, credential,result) => {
  return async (dispatch, getState) => {
    dispatch(setLoginStateToFetching());
    //let result = await httpClient.post(server.LOGIN_URL, credential); //for deployment
    result = await Axios.post('/api/v2/authen/login', credential); //for development
    //alert(JSON.stringify(result.data))

    if (result.data.success === true ) {
      localStorage.setItem(server.LOGIN_PASSED, YES);
      localStorage.setItem("userid", result.data.email);
      localStorage.setItem("iduser", result.data.userid);
      getState().appReducer.app.forceUpdate()
      history.push("/profile");
      dispatch(setLoginStateToSuccess(result.data));
    } else {
      dispatch(setLoginStatetoFailed(result.data));
    }
  };
};
