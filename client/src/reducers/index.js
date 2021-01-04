import {combineReducers} from "redux"
import registerReducer from './register.reducer'
import loginReducer from './login.reducer'
import appReducer from './app.reducer'
import stockReducer from './stock.reducer'
import showdeviceReducer from './showdevice.reducer'
import noteReducer from './note.reducer'
import noteviewReducer from './noteview.reducer'
import profileReducer from './profile.reducer'
import adminReducer from './admin.reducer'
import covidReducer from './covid.reducer'
import changepwReducer from './changepw.reducer'

export default combineReducers({registerReducer, 
    loginReducer, 
    appReducer,
    stockReducer,
    showdeviceReducer,
    noteReducer,
    noteviewReducer,
    profileReducer,
    adminReducer,
    covidReducer,
    changepwReducer})