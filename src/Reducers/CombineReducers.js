import {combineReducers} from 'redux';
import CountReducer from './CountReduer';
import AuthReducer from './AuthReducer';
import ThemeReducer from './ThemeReducer';
import CartReducer from './CartReducer';



export default combineReducers({
    CountReducer,
    AuthReducer,
    ThemeReducer,
    CartReducer
})