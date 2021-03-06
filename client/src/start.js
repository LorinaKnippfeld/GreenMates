// import React from "react"

import ReactDOM from "react-dom";

// import custom components

import Register from "./register.js";
import Welcome from "./welcome.js";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

function HelloWorld() {
    return <div>Hello, World!</div>;
}
