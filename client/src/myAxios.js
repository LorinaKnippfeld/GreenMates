// setup my own axios for csrf-token inclusion

import axios from "axios";

var myAxios = axios.create({
    xsrfHeaderName: "csrf-token",
    xsrfCookieName: "mytoken",
});

var plantAxios = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "https://trefle.io",
    },
});

export default myAxios;
export { plantAxios };
