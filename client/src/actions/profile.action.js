import axios from "axios";
import {
  HTTP_PROFILE_SUCCESS,
  HTTP_PROFILE_FETCHING,
  HTTP_PROFILE_FAILED,
  HTTP_CHANGEPW_FETCHING, 
  HTTP_CHANGEPW_SUCCESS, 
  HTTP_CHANGEPW_FAILED
} from "../constants";

const setStateProfileToSuccess = (payload) => ({
  type: HTTP_PROFILE_SUCCESS,
  payload: payload,
});

const setStateProfileToFetching = () => ({
  type: HTTP_PROFILE_FETCHING,
});

const setStatProfileToFailed = () => ({
  type: HTTP_PROFILE_FAILED,
});

const setStateChangepwToSuccess = (payload) => ({
  type: HTTP_CHANGEPW_SUCCESS,
  data: payload,
});

const setStateChangepwToFetching = () => ({
  type: HTTP_CHANGEPW_FETCHING,
});

const setStatChangepwToFailed = (payload) => ({
  type: HTTP_CHANGEPW_FAILED,
  data: payload,
});

export const ShowMain = (history) => {
  return (dispatch, getState) => {
    dispatch(setStateProfileToFetching());
    axios
      .post("/api/profile/getprofile", {
        userid: localStorage.getItem("userid"),
      })
      .then((result) => {
        console.log(result);
        dispatch(setStateProfileToSuccess(result.data));
        getState().appReducer.app.forceUpdate();
        history.push("/stock");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        dispatch(setStatProfileToFailed());
      });
  };
};


export const ShowProfile = (history) => {
  return (dispatch, getState) => {
    dispatch(setStateProfileToFetching());
    axios
      .post("/api/profile/getprofile", {
        userid: localStorage.getItem("userid"),
      })
      .then((result) => {
        console.log(result);
        dispatch(setStateProfileToSuccess(result.data));
        getState().appReducer.app.forceUpdate();
        history.push("/profile");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        dispatch(setStatProfileToFailed());
      });
  };
};

export const updateProfile = (value) => {
  return (dispatch, getState) => {
    axios
      .put("/api/profile/updateprofile", value)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
};

export const editEducation = (value) => {
  return (dispatch, getState) => {
    console.log(value)
    axios
      .put("/api/profile/editeducation", value)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
};

export const editLocation = (value) => {
  return (dispatch, getState) => {
    axios
      .put("/api/profile/editlocation", value )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
};

export const editSkills = (value) => {
  return (dispatch, getState) => {
    console.log(value)
    axios
      .put("/api/profile/editskills", value )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
};

export const editNotes = (value) => {
  return (dispatch, getState) => {
    axios
      .put("/api/profile/editnotes", value )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
};

export const changepassword = (value, history) => {
  return (dispatch, getState) => {
    dispatch(setStateChangepwToFetching());
    axios
      .post("/api/v2/authen/changepassword", value )
      .then((result) => {
        if (result.data.success === 'success'){
          dispatch(setStateChangepwToSuccess(result.data));
          setTimeout( () =>  {window.location.reload();} ,1500)
        } else{
          dispatch(setStatChangepwToFailed(result.data));
        }
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        dispatch(setStatChangepwToFailed());
      });
  };
};
