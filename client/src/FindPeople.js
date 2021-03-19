// import React & axios

import { useState, useEffect } from "react";
import axios from "./myAxios.js";
import { Link } from "react-router-dom";

// set up the class component

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    // use useEffect to render once data has changed

    useEffect(() => {
        if (!query) {
            return;
        }

        let ignore = false;

        (async () => {
            const { data } = await axios.get("/api/friendsearch/" + query);
            console.log(ignore, query, "this was ignored");
            if (!ignore) {
                setUsers(data.found_people);
            }
        })();

        return () => {
            ignore = true;
        };
    }, [query]);

    return (
        <div>
            <label htmlFor="user-search">Search Plantis:</label>
            <input
                id="search"
                type="text"
                onChange={(event) => {
                    setQuery(event.target.value);
                }}
                className="profile-search-input"
            />
            <div>
                {users.map((users, index) => (
                    <div key={index} className="profile-search-results">
                        <Link to={"/users/" + users.id}>
                            <p>
                                {users.firstname} {users.lastname}
                            </p>
                        </Link>
                    </div>
                ))}
                {!users.length && query && <li>Sorry. Nothing found.</li>}
            </div>
        </div>
    );
}
