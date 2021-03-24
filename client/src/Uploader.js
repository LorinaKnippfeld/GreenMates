// component setup

import React from "react";
import axios from "./myAxios.js";

// Events on file field & upload

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    // handler for file upload

    handleFileChange(event) {
        this.setState({
            file: event.target.files[0],
        });
    }

    // file upload

    uploadPicture() {
        (async () => {
            const formData = new FormData();
            formData.append("file", this.state.file);
            console.log("appending file");

            const response = await axios.post("/api/user/profilepic", formData);
            if (response.data.success) {
                this.props.userHandler(response.data.image);
            }
        })();
    }

    render() {
        return (
            <div id="uploader">
                <div
                    id="closeuploader"
                    onClick={() => this.props.closeHandler()}
                >
                    X
                </div>
                <p className="uploaderText">Upload profile picture</p>
                <input
                    type="file"
                    onChange={(event) => this.handleFileChange(event)}
                />
                <br></br>
                <button
                    className="uploaderButton"
                    onClick={() => {
                        this.uploadPicture();
                        this.props.closeHandler();
                    }}
                >
                    Upload
                </button>
            </div>
        );
    }
}
