import React from "react";
// import { Link } from "react-router-dom";
import axios from "./myAxios";
import { useState, useEffect } from "react";

export default function PlantFinder() {
    const [myPlant, setMyPlant] = useState("");

    useEffect(() => {
        axios.get("/api/plant-garden/").then((response) => {
            setMyPlant(response.data);
        });
    }, []);

    const deletePlant = async (id) => {
        await axios.post("/api/plant-garden/delete-plant/", {
            id,
        });

        setMyPlant(
            myPlant.filter((item) => {
                return item.id != id;
            })
        );
    };

    return (
        <div className="plantGarden">
            <h2>This is your plant garden.</h2>
            <div className="logo"></div>
            <div className="gardenOrganizer">
                {!myPlant && <div>No plants added yet</div>}
                {myPlant &&
                    myPlant.map((item) => {
                        return (
                            <div key={item.id}>
                                <p>
                                    {item.common_name}
                                    {item.scientific_name}
                                </p>
                                <img src={item.image_url} />
                                <button
                                    className="plantDeleteButton"
                                    onClick={(e) => deletePlant(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
