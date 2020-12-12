import { HTTP_NOTEVIEW_FETCHING, HTTP_NOTEVIEW_SUCCESS, HTTP_NOTEVIEW_FAILED } from "../constants"

const initialState = {
    result: null,
    isFetching: false,
    isError: false
}

export default (state = initialState, { type, payload, data }) => {
    switch (type) {

    case HTTP_NOTEVIEW_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false, data: null }

    case HTTP_NOTEVIEW_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false, data: data }

    case HTTP_NOTEVIEW_FAILED:
        return { ...state, result: null, isFetching: false, isError: true, data: data }
        

    default:
        return state
    }
}
