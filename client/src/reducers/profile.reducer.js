import { HTTP_PROFILE_FETCHING, HTTP_PROFILE_SUCCESS, HTTP_PROFILE_FAILED } from "../constants"

const initialState = {
    result: null,
    isFetching: false,
    isError: false
}

export default (state = initialState, { type, payload, data }) => {
    switch (type) {

    case HTTP_PROFILE_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false, data: null }

    case HTTP_PROFILE_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false, data: data }

    case HTTP_PROFILE_FAILED:
        return { ...state, result: null, isFetching: false, isError: true, data: data }
        

    default:
        return state
    }
}
