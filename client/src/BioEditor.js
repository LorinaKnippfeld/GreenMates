// import React & axios

import React from "react";
import axios from "./myAxios";

// set up the class component

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            draft: "",
            error: false,
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    saveBio() {
        axios.post("/api/user/bio", { bio: this.state.draft });
        this.setState({ isEditing: false });
        this.props.saveHandler(this.state.draft);
    }

    render() {
        const { isEditing } = this.state;
        const { bio } = this.props;

        if (isEditing) {
            return (
                <div className="bioEditor">
                    <textarea
                        name="draft"
                        onChange={(event) => this.handleChange(event)}
                    ></textarea>
                    <button onClick={() => this.saveBio()}>
                        Save your bio
                    </button>
                    <button onClick={() => this.setState({ isEditing: false })}>
                        x
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    {bio && <p>{bio}</p>}
                    <button onClick={() => this.setState({ isEditing: true })}>
                        {bio ? "edit" : "add bio"}
                    </button>
                </div>
            );
        }
    }
}
