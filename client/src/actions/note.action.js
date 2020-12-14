import axios from "axios";
import {
  HTTP_NOTE_FETCHING,
  HTTP_NOTE_SUCCESS,
  HTTP_NOTE_FAILED,
  HTTP_NOTEVIEW_FETCHING, 
  HTTP_NOTEVIEW_SUCCESS, 
  HTTP_NOTEVIEW_FAILED 
} from "../constants";

const setStateNoteToSuccess = (payload) => ({
  type: HTTP_NOTE_SUCCESS,
  payload: payload,
});

const setStateNoteToFetching = () => ({
  type: HTTP_NOTE_FETCHING,
});

const setStateNoteToFailed = () => ({
  type: HTTP_NOTE_FAILED,
});

const setStateNoteViewToSuccess = (payload) => ({
  type: HTTP_NOTEVIEW_SUCCESS,
  payload: payload,
});

const setStateNoteViewToFetching = () => ({
  type: HTTP_NOTEVIEW_FETCHING,
});

const setStateNoteViewToFailed = () => ({
  type: HTTP_NOTEVIEW_FAILED,
});

export const AddNote = (history, value) => {
  return (dispatch, getState) => {
    axios
      .post("/api/note/create", value)
      .then((result) => {
        console.log(result);
        getState().appReducer.app.forceUpdate()
        history.push("/note");
      })
      .catch((error) => {
        //alert(JSON.stringify(error));
        //dispatch(setStateNoteToFailed());
      });
  };
};


export const getAllNote = () => {
  return (dispatch, getState) => {
    dispatch(setStateNoteToFetching());
    axios
      .get("/api/note/getallnote")
      .then((result) => {
        console.log(result);
        dispatch(setStateNoteToSuccess(result.data));
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        dispatch(setStateNoteToFailed());
      });
  };
};

export const ShowNote = () => {
  return (dispatch, getState) => {
    dispatch(setStateNoteToFetching());
    axios
      .post("/api/note/getnote", { userid : localStorage.getItem('userid') })
      .then((result) => {
        console.log(result);
        dispatch(setStateNoteToSuccess(result.data));
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        dispatch(setStateNoteToFailed());
      });
  };
};


export const setNoteid  = (history, noteid) => {
  return (dispatch, getState) => {  
    dispatch(setStateNoteViewToFetching());
    axios
      .post("/api/note/getnote/byid", { noteid : noteid })
      .then((result) => {
        console.log(result.data[0]);
        dispatch(setStateNoteViewToSuccess(result.data[0]));
        getState().appReducer.app.forceUpdate()
        history.push("/noteviewver");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        dispatch(setStateNoteViewToFailed());
      });
  };
};

export const deleteNote  = (history, noteid) => {
  return (dispatch, getState) => {  
    console.log(noteid)
    axios
      .post("/api/note/deletenote", { noteid : noteid })
      .then((result) => {
          console.log(result)
          getState().appReducer.app.forceUpdate()
          history.push("/note");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
};

export const EditNote  = (history, value) => {
  return async (dispatch, getState) => {  
    //console.log(value)
    dispatch(setStateNoteViewToFetching());
    await axios.put("/api/note/editnote", value);
    axios
      .put("/api/note/editnote", value)
      .then((result) => {
          dispatch(setStateNoteViewToSuccess(result.data));
          getState().appReducer.app.forceUpdate()
          history.push("/noteviewver");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
};


