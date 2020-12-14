import axios from "axios";
import {
  HTTP_ADMIN_SUCCESS,
  HTTP_ADMIN_FETCHING,
  HTTP_ADMIN_FAILED,
  server,
} from "../constants";

const setStateAdminToSuccess = (payload) => ({
  type: HTTP_ADMIN_SUCCESS,
  payload: payload,
});

const  setStateAdminToFetching = () => ({
  type: HTTP_ADMIN_FETCHING,
});

const setStatAdminToFailed = () => ({
  type: HTTP_ADMIN_FAILED,
});

const doGetAllUser = (dispatch)=>{
    axios.get("/api/profile/admin").then(result=>{
        dispatch(setStateAdminToSuccess(result.data))
    }).catch(error=>{
        alert(JSON.stringify(error))
        dispatch(setStatAdminToFailed())
    })
}

export const getAllUser = ()=>{
  return dispatch=>{
    dispatch(setStateAdminToFetching());
    doGetAllUser(dispatch);
  }
}

export const deleteUser  = (history, userid) => {
  return (dispatch, getState) => {  
    console.log(userid)
    axios
      .post("/api/profile/admindelete", { userid : userid })
      .then((result) => {
        doGetAllUser(dispatch);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
};

