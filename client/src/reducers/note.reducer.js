import { HTTP_NOTE_FETCHING, HTTP_NOTE_SUCCESS, HTTP_NOTE_FAILED } from "../constants"

const initialState = {
    result: null,
    isFetching: false,
    isError: false
}

export default (state = initialState, { type, payload, data }) => {
    switch (type) {

    case HTTP_NOTE_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false, data: null }

    case HTTP_NOTE_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false, data: data }

    case HTTP_NOTE_FAILED:
        return { ...state, result: null, isFetching: false, isError: true, data: data }
        

    default:
        return state
    }
}
