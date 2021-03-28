import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "./myAxios";

/*

export default function Plantfinder() {
    const [joke, setJoke] = useState("");

    const getJoke = () => {
        axios
            .get("https://official-joke-api.appspot.com/random_joke")
            .then((response) => {
                console.log(response);
                setJoke(response.data.setup + "  " + response.data.punchline);
            });
    };
    return (
        <div>
            Hello Test <button onClick={getJoke}>Get Joke Right Now</button>
            {joke}
            <Link className="linkHomeSearch" to="/">
                Back
            </Link>
        </div>
    );
}


*/

export default function PlantFinder() {
    const [plant, setPlant] = useState("coconut");

    const getPlant = () => {
        axios.get(`/api/findplants/${plant}`).then((response) => {
            console.log(response);
            setPlant(response.data);
        });
    };
    return (
        <div className="plantFinder">
            Hello Test <button onClick={getPlant}>Get plants here</button>
            {plant}
            <Link className="linkHomeSearch" to="/">
                Back
            </Link>
        </div>
    );
}

/// request.session.user.id
/// post rquest in route dann an state weitergeben (frage bei trefle an den customer client)
/// get route im browser

/// browser route in browser einbinden

// planten in datenbank ein
