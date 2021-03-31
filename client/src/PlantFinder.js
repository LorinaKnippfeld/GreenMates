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
    const queryUrl = location.href.startsWith(
        "https://green-mates.herokuapp.com/"
    )
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

    const addPlant = async (
        plant_id,
        common_name,
        scientific_name,
        image_url
    ) => {
        await axios.post("/api/plant-garden/add-plant/", {
            plant_id,
            common_name,
            scientific_name,
            image_url,
        });
    };

    return (
        <div className="findPlants">
            <h1>Plant Search</h1>
            <h2>Search for plants here and add them to your garden.</h2>
            <div className="logo"></div>
            <div className="plantFinder">
                <button className="plantFinderButton" onClick={getPlant}>
                    Search
                </button>
                <input onChange={(e) => setQuery(e.target.value)} />
                {!plant && (
                    <div id="pleaseSearch">Please type here to search</div>
                )}
                <div className="plantResultWrapper">
                    {plant &&
                        plant.map((plantItem) => {
                            return (
                                <div className="plantResult" key={plantItem.id}>
                                    <img
                                        className="resultImage"
                                        src={plantItem.image_url}
                                    />
                                    <h3> {plantItem.common_name} </h3>
                                    <br></br>
                                    <h4> {plantItem.scientific_name} </h4>
                                    <button
                                        onClick={() =>
                                            addPlant(
                                                plantItem.id,
                                                plantItem.common_name,
                                                plantItem.scientific_name,
                                                plantItem.image_url
                                            )
                                        }
                                    >
                                        Add plant
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
            <Link className="linkHomeSearch" to="/plant-garden">
                Back
            </Link>
        </div>
    );
}
