// import React from "react"

import ReactDOM from "react-dom";

// setup redux

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxPromise from "redux-promise";
import reducer from "./reducers.js";

// setup store

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

// import custom components

import Welcome from "./Welcome.js";
import App from "./App.js";

// Differentiate between looged in and logged out using the URL

if (location.pathname === "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    let provider = (
        <Provider store={store}>
            <App />
        </Provider>
    );
    ReactDOM.render(provider, document.querySelector("main"));
}
