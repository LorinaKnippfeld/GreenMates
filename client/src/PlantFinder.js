import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./myAxios";
import { useDispatch, useSelector } from "react-redux";
import { getClientToken } from "./actions.js";

export default function PlantFinder() {
    const [plant, setPlant] = useState("");
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const queryUrl = location.href.startsWith("https://planti-vz.herokuapp.com")
        ? `https://trefle.io/api/v1/plants/search?token=${token}&q=${query}`
        : `/api/findplants/${query}`;
    console.log("first", queryUrl);

    useEffect(() => {
        dispatch(getClientToken());
    }, []);

    const getPlant = () => {
        console.log(queryUrl);
        axios.get(queryUrl).then((response) => {
            console.log(response);
            setPlant(response.data);
        });
    };
    return (
        <div>
            <div className="plantFinder">
                Hello Test <button onClick={getPlant}>Get plants here</button>
                <input onChange={(e) => setQuery(e.target.value)} />
                {!plant && <div>Please search</div>}
                {plant &&
                    plant.map((plantItem) => {
                        return (
                            <div className="plantResult" key={plantItem.id}>
                                <img
                                    className="resultImage"
                                    src={plantItem.image_url}
                                />
                                {plantItem.common_name}
                                {plantItem.scientific_name}{" "}
                            </div>
                        );
                    })}
            </div>
            <Link className="linkHomeSearch" to="/">
                Back
            </Link>
        </div>
    );
}

// planten in datenbank ein
