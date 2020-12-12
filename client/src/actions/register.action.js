import {HTTP_REGISTER_FETCHING, HTTP_REGISTER_SUCCESS, HTTP_REGISTER_FAILED, server} from "../constants"
import { httpClient} from './../utils/HttpClient'
import axios from 'axios'

export const setRegisterStateToFetching = () => ({
    type: HTTP_REGISTER_FETCHING,
    
})

export const setRegisterStateToSuccess = (payload) => ({
    type: HTTP_REGISTER_SUCCESS,
    payload
})

export const setRegisterStateToFailed = (data) => ({
    type: HTTP_REGISTER_FAILED,
    data
    
})

export const register = (history,credentail) => {
    return async (dispatch, getState) => {
        dispatch(setRegisterStateToFetching())
        try {
            let result = await axios.post("/api/v2/authen/register", credentail)
            //alert(JSON.stringify(result.data))

        
        if (result.data.result === 'OK') {
            //sucess
            dispatch(setRegisterStateToSuccess(result.data))
            //alert(JSON.stringify(result.data))
            setTimeout( () =>  {history.push("/login")} ,1500)
            getState().appReducer.app.forceUpdate()

        } else {
            //failed
            console.log(result.data)
            dispatch(setRegisterStateToFailed(result.data));
        }
        } catch (error) {
            //failed
            dispatch(setRegisterStateToFailed());
            
        }
        
        
    }
    
}