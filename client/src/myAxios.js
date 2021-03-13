// setup my own axios for csrf-token inclusion

import axios from "axios";

var myAxios = axios.create({
    xsrfHeaderName: "csrf-token",
    xsrfCookieName: "mytoken",
});

export default myAxios;
