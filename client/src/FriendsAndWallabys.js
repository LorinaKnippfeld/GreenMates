// import React & axios

import React from "react";
import { useState, useEffect } from "react";
import axios from "./myAxios";

// setup function

export default function FriendsAndWallabys(props) {
    useEffect(() => {
        dispatch(loadFriends());
    }, []);
}
