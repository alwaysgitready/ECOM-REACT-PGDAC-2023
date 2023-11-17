import {createStore ,  applyMiddleware} from 'redux'
import CombineReducers from '../Reducers/CombineReducers';
import thunk from 'redux-thunk';


const persisted_state  = localStorage.getItem('reduxStore') ? JSON.parse(localStorage.getItem('reduxStore') ) : {};



const enhancer  = applyMiddleware(thunk)


const store  = createStore(
    CombineReducers,
    persisted_state,
    enhancer
)


export default store




