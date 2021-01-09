import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import "./spontify.css";
import { apiUrl, callBackUrl } from "./../../constants";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import * as profileaction from "./../../actions/profile.action";
import * as spotifyaction from "./../../actions/spotify.action";

var clientId = "0dad778342ae4714b447cbfb1259e3be";
var clientSecret = "96442ff478924d7cac5bb26f043c5500";
var encodedData = window.btoa(clientId + ":" + clientSecret);

export default function Spontify() {
  const topMusicReducer = useSelector(({ topMusicReducer }) => topMusicReducer);
  const spotifyReducer = useSelector(({ spotifyReducer }) => spotifyReducer);
  const dispatch = useDispatch();

  const [spotifyPhoto, setspotifyPhoto] = useState(
    "https://i.pinimg.com/564x/f5/1d/08/f51d08be05919290355ac004cdd5c2d6.jpg"
  );
  const [spotifyName, setspotifyName] = useState("Name");
  const [spotifyEmail, setspotifyEmail] = useState("Email");
  const [spotifyUser, setspotifyUser] = useState("User");
  const [topMusic, settopMusic] = useState([]);
  //fetching photos profile
  useEffect(async () => {
    dispatch(profileaction.ShowProfile());
  }, []);

  //fetching photos profile
  useEffect(async () => {
    if (spotifyReducer.result !== null) {
      setspotifyPhoto(spotifyReducer.result.images[0].url);
      setspotifyName(spotifyReducer.result.display_name);
      setspotifyEmail(spotifyReducer.result.email);
      setspotifyUser(spotifyReducer.result.external_urls.spotify);
    }

    if (topMusicReducer.result !== null) {
      settopMusic(topMusicReducer.result);
    }
  }, [spotifyReducer, topMusicReducer]);

  function Clickfunc() {
    const code = window.location.search.split("=")[1];
    const header = {
      headers: {
        Authorization: "Basic" + " " + encodedData,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const get_token = qs.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: `${callBackUrl}/spontify`,
    });

    axios
      .post("https://accounts.spotify.com/api/token", get_token, header)
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("access_token",result.data.access_token);
        dispatch(spotifyaction.getProfile(result.data));
      });
  }

  function renderRows() {
    const result = topMusic;
    let num = 1;
    console.log(result);
    if (result != null) {
      return result.map((d) => (
        <tr>
          <th scope="row">{num++}</th>
          <td>{d.name}</td>
          <td>{d.artists[0].name}</td>
          <td>{d.popularity}</td>
          <td>
            <ReactAudioPlayer
              style={{ width: 250, height: 60 }}
              src={d.preview_url}
              controls
            />
          </td>
        </tr>
      ));
    }
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Spotify API</h1>
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-3">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Spotify Actions</h3>
              </div>
              <div className="box-body box-profile text-center ">
                <a
                  className="btn btn-social bg-green"
                  href={`${apiUrl}/spontifylogin`}
                >
                  <i class="fa fa-spotify"></i>
                  Sign in with Spotify
                </a>
                <button
                  class="btn btn-info"
                  style={{ margin: 5 }}
                  onClick={Clickfunc}
                >
                  Load Profile
                </button>

                <button
                  class="btn btn-danger"
                  style={{ margin: 5 }}
                  onClick={() => {
                    dispatch(spotifyaction.top5Music());
                  }}
                >
                  Top User Music
                </button>
              </div>
            </div>

            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">About Me</h3>
              </div>
              <div className="box-body text-center">
                <img
                  className="profile-user-img img-responsive img-circle"
                  alt="User profile picture"
                  src={spotifyPhoto}
                  style={{ maxWidth: 200 }}
                />
                <p>{spotifyName}</p>
                <p>{spotifyEmail}</p>
                <button
                  className="btn btn-social bg-black"
                  onClick={() => window.open(spotifyUser)}
                >
                  <i class="fa fa-spotify"></i>View Spotify Link
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Top User Music</h3>
              </div>
              <div className="box-body">
                <div className="table-responsive mailbox-messages">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Music Tracks</th>
                        <th>Artists</th>
                        <th>Rating</th>
                        <th>Demo Musics</th>
                      </tr>
                    </thead>
                    <tbody>{renderRows()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
