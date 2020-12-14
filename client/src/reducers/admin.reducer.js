import { HTTP_ADMIN_FETCHING, HTTP_ADMIN_SUCCESS, HTTP_ADMIN_FAILED } from "../constants"

const initialState = {
    result: null,
    isFetching: false,
    isError: false
}

export default (state = initialState, { type, payload, data }) => {
    switch (type) {

    case HTTP_ADMIN_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false, data: null }

    case HTTP_ADMIN_SUCCESS:
        return { ...state, result: payload, isFetching: false, isError: false, data: data }

    case HTTP_ADMIN_FAILED:
        return { ...state, result: null, isFetching: false, isError: true, data: data }
        

    default:
        return state
    }
}
