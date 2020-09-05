import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core/";
import "./style/chats.css";
import db from "../firebase";
import { Link } from "react-router-dom";

function Chats(props) {
  let [Messages, setMessages] = useState("");

  let createChat = () => {
    let newRoom = prompt("Enter Chat rooom Name");
    if (newRoom) {
      db.collection("rooms").add({
        name: newRoom,
      });
      alert(`${newRoom} Created`);
    } else {
      alert(`Room Not Created`);
    }
  };

  useEffect(() => {
    if (props.roomid) {
      db.collection("rooms")
        .doc(props.roomid)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((items) => items.data()));
        });
    }
  }, [props.roomid]);

  return !props.addChat ? (
    <Link to={`/room/${props.roomid}`}>
      <div className="singlechat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${props.roomid}.svg`}
        />
        <div className="chatinfo">
          <h2>{props.data}</h2>
          <p>{Messages[0]?.msg}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="singlechat" onClick={createChat}>
      <h1>Add New Chat</h1>
    </div>
  );
}

export default Chats;
