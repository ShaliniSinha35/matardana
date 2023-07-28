import  Reducer  from "./Reducer";
import { legacy_createStore as createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';

const store=createStore(Reducer,composeWithDevTools());
export default store;