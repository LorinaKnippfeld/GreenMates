// import React from "react"

import ReactDOM from "react-dom";

// import custom components

import Welcome from "./Welcome.js";
import Logo from "./Logo.js";

// Differentiate between looged in and logged out using the URL

if (location.pathname === "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<Logo />, document.querySelector("main"));
}
