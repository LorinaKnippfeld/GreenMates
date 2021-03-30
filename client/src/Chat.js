import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { socket } from "./start.js";
import { Link } from "react-router-dom";

export default function Chat() {
    const dispatch = useDispatch();
    const chatRef = useRef();
    const [draft, setDraft] = useState("");
    const messages = useSelector((state) => state.messages);

    useEffect(() => {
        if (messages && messages.length > 0) {
            chatRef.current.scrollTop = 100 * messages.length;
        }
    }, [messages]);

    const handleButtonOnClick = () => {
        socket.emit("newMessage", draft);
        setDraft("");
    };

    return (
        <div className="chatComponent">
            <div className="logo"></div>
            <div className="chat">
                <h2>
                    Use this field right here to talk to other planthaholics
                </h2>
                <h1>Chat</h1>
                <div className="messageBox" ref={chatRef}>
                    {messages &&
                        messages.map((message) => (
                            <Message {...message} key={message.message_id} />
                        ))}
                </div>
                <div>
                    <input
                        onChange={(e) => setDraft(e.target.value)}
                        value={draft}
                    />
                    <button
                        id="chatButton"
                        onClick={(e) => handleButtonOnClick()}
                    >
                        Send
                    </button>
                </div>
                <Link className="linkHomeSearch" to="/">
                    Back
                </Link>
            </div>
        </div>
    );
}

function Message(props) {
    return (
        <div className="chatWrapper">
            <div className="Message">
                <img className="chatPic" src={props.profile_pic_url} />
                <span className="chatPerson">
                    {props.firstname} {props.lastname}
                </span>
                <strong className="chatMessage">{props.message_text}</strong>
            </div>
        </div>
    );
}
