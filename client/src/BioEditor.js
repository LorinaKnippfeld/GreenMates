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

    async saveBio() {
        const response = await axios.post("/api/user/bio", {
            bio: this.state.draft,
        });
        this.setState({ isEditing: false });
        this.props.saveHandler(response.data.bio.bio);
    }

    render() {
        const { isEditing } = this.state;
        const { bio } = this.props;

        if (isEditing) {
            return (
                <div className="bioEditor">
                    <textarea
                        className="textarea"
                        name="draft"
                        onChange={(event) => this.handleChange(event)}
                    ></textarea>
                    <button
                        className="bioButtonOne"
                        onClick={() => this.saveBio()}
                    >
                        Save your bio
                    </button>
                    <button
                        className="closeBio"
                        onClick={() => this.setState({ isEditing: false })}
                    >
                        x
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    {bio && <p className="bioResult">{bio}</p>}
                    <button
                        className="bioButtonTwo"
                        onClick={() => this.setState({ isEditing: true })}
                    >
                        {bio ? "edit bio" : "add bio"}
                    </button>
                </div>
            );
        }
    }
}
