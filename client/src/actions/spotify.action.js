import axios from "axios";
import qs from "qs";
import {
  HTTP_SPOTIFY_SUCCESS,
  HTTP_SPOTIFY_FETCHING,
  HTTP_SPOTIFY_FAILED,
  HTTP_TOPMUSIC_SUCCESS,
  HTTP_TOPMUSIC_FETCHING,
  HTTP_TOPMUSIC_FAILED,
} from "../constants";

var clientId = "0dad778342ae4714b447cbfb1259e3be";
var clientSecret = "96442ff478924d7cac5bb26f043c5500";
var encodedData = window.btoa(clientId + ":" + clientSecret);

const setStateSpotifyToSuccess = (payload) => ({
  type: HTTP_SPOTIFY_SUCCESS,
  payload: payload,
});

const setStateSpotifyToFetching = () => ({
  type: HTTP_SPOTIFY_FETCHING,
});

const setStatSpotifyToFailed = () => ({
  type: HTTP_SPOTIFY_FAILED,
});

const setStatetopMusicToSuccess = (payload) => ({
  type: HTTP_TOPMUSIC_SUCCESS,
  payload: payload,
});

const setStatetopMusicToFetching = () => ({
  type: HTTP_TOPMUSIC_FETCHING,
});

const setStattopMusicToFailed = () => ({
  type: HTTP_TOPMUSIC_FAILED,
});



export const refreshToken = (refresh_token) => {
  const header = {
    headers: {
      Authorization: "Basic" + " " + encodedData,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const get_token = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  });

  axios
    .post("https://accounts.spotify.com/api/token", get_token, header)
    .then((result) => {
      //console.log(result.data.access_token);
      localStorage.removeItem('access_token');
      localStorage.setItem("access_token",result.data.access_token);
    });
};

export const getProfile = (data) => {
  return (dispatch, getState) => {
    
    //refresh access_token
    refreshToken(data.refresh_token);
    
    dispatch(setStateSpotifyToFetching());
    const header = {
      headers: {
        Authorization: data.token_type + " " + localStorage.getItem("access_token"),
      },
    };

    axios.get("https://api.spotify.com/v1/me", header).then((result) => {
      //console.log(result);
      dispatch(setStateSpotifyToSuccess(result.data));
    });

    //refresh access_token
    refreshToken(data.refresh_token);
  };
};

export const top5Music = () => {
  return (dispatch, getState) => {
    
    const header = {
      headers: {
        Authorization: 'Bearer' + " " + localStorage.getItem("access_token"),
      },
    };
    
    dispatch(setStatetopMusicToFetching()); 
    axios.get("https://api.spotify.com/v1/me/top/tracks", header).then((result) => {
      console.log(result.data.items)
      dispatch(setStatetopMusicToSuccess(result.data.items)); 
    
    });
  };
};