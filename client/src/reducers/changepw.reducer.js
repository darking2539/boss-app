import { HTTP_CHANGEPW_FETCHING, HTTP_CHANGEPW_SUCCESS, HTTP_CHANGEPW_FAILED } from "../constants"

const initialState = {
    result: null,
    isFetching: false,
    isError: false
}

export default (state = initialState, { type, data }) => {
    switch (type) {

    case HTTP_CHANGEPW_FETCHING:
        return { ...state, result: null, isFetching: true, isError: false, data: null }

    case HTTP_CHANGEPW_SUCCESS:
        return { ...state, result: true, isFetching: false, isError: false, data: data }

    case HTTP_CHANGEPW_FAILED:
        return { ...state, result: null, isFetching: false, isError: true, data: data }
        

    default:
        return state
    }
}
