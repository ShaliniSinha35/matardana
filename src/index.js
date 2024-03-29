import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import store from './redux/store';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { rootReducer } from './redux/rootReducer.js';
// D:\React tutorial\resume-builder-project\src\redux\reducers\rootReducer.js
import { Provider } from 'react-redux';
import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { reduxFirestore, getFirestore } from 'redux-firestore';
import {ReactReduxFirebaseProvider,getFirebase} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';



const root = ReactDOM.createRoot(document.getElementById('root'));

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg9RbeMaMs8M1qAnF0OJZrZ-lBN5VIZDM",
  authDomain: "matardana-9cdaf.firebaseapp.com",
  projectId: "matardana-9cdaf",
  storageBucket: "matardana-9cdaf.appspot.com",
  messagingSenderId: "145970493841",
  appId: "1:145970493841:web:4eb880083b707840134230",
  measurementId: "G-D231B95M63"
};
firebase.initializeApp(firebaseConfig)
firebase.firestore()
const reduxStore = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),reduxFirestore(firebase)))
root.render(
 <>
  <Provider store={reduxStore}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
 </>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

