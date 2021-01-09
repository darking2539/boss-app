import { HTTP_TOPMUSIC_FETCHING, HTTP_TOPMUSIC_SUCCESS, HTTP_TOPMUSIC_FAILED } from "../constants"

const initialState = {
    result: null,
    isFetching: false,
    isError: false
}

export default (state = initialState, { type, payload, data }) => {
    switch (type) {

    case HTTP_TOPMUSIC_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false, data: null }

    case HTTP_TOPMUSIC_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false, data: data }

    case HTTP_TOPMUSIC_FAILED:
        return { ...state, result: null, isFetching: false, isError: true, data: data }
        

    default:
        return state
    }
}
