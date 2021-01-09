import { HTTP_SPOTIFY_FETCHING, HTTP_SPOTIFY_SUCCESS, HTTP_SPOTIFY_FAILED } from "../constants"

const initialState = {
    result: null,
    isFetching: false,
    isError: false
}

export default (state = initialState, { type, payload, data }) => {
    switch (type) {

    case HTTP_SPOTIFY_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false, data: null }

    case HTTP_SPOTIFY_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false, data: data }

    case HTTP_SPOTIFY_FAILED:
        return { ...state, result: null, isFetching: false, isError: true, data: data }
        

    default:
        return state
    }
}
