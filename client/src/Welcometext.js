// import React & axios

import React from "react";

// set up the class component

export default class Welcometext extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="welcometext">
                <p>
                    We make it easy for you to connect and share with your plant
                    family and friends online. Join today and become part of the
                    worlds best social network ever!!
                </p>
            </div>
        );
    }
}
