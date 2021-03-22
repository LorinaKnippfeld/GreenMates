// import React & axios

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "./myAxios";

// setup function

export default function FriendsAndWallabys(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadFriends());
    }, []);
}
