import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const initState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initState, composeWithDevTools(
    applyMiddleware(...middleware)
));

export default store;