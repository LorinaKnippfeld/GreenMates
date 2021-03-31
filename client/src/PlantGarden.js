import React from "react";
import { Link } from "react-router-dom";
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
            <h2>Plant Garden</h2>
            <h1>
                Welcome to your lovely plant garden, well done! Take good care
                of your green friends.
            </h1>
            <div className="logo"></div>
            <div className="gardenWrapper">
                {!myPlant && <div>No plants added yet</div>}
                {myPlant &&
                    myPlant.map((item) => {
                        return (
                            <div className="gardenOrganizer" key={item.id}>
                                <img src={item.image_url} />
                                <h3>{item.common_name} </h3>
                                <br></br>
                                <h4>{item.scientific_name}</h4>

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

            <Link className="linkHomeSearch" to="/">
                Back
            </Link>
            <Link id="findPlantsLink" to="/findplants">
                Click here to add plants to your garden
            </Link>
        </div>
    );
}
