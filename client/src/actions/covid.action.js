import axios from "axios";
import {
  HTTP_COVID_SUCCESS,
  HTTP_COVID_FETCHING,
  HTTP_COVID_FAILED,
  server,
} from "../constants";

const setStateCovidToSuccess = (payload) => ({
  type: HTTP_COVID_SUCCESS,
  payload: payload,
});

const  setStateCovidToFetching = () => ({
  type: HTTP_COVID_FETCHING,
});

const setStatCovidToFailed = () => ({
  type: HTTP_COVID_FAILED,
});

