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
                    Green Mates is here to help you keeping track on the plants
                    you own, retrieve care instructions and share and connect
                    with plant friends online. <br></br>
                    <br></br>Join today and start growing your personal
                    happiness garden.<br></br> <br></br>Green thumbs guaranteed.
                </p>
            </div>
        );
    }
}
