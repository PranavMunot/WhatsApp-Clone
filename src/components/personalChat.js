import React, { useState, useEffect } from "react";
import "./style/personalChat.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function PersonalChat(props) {
  let [Innertext, setInnertext] = useState("");
  let [Message, setMessages] = useState([]);
  const { roomid } = useParams();
  const [Roomname, setRoomname] = useState("");
  let [{ user }, dispatch] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomid).collection("messages").add({
      msg: Innertext,
      sender: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInnertext("");
  };

  useEffect(() => {
    if (roomid) {
      db.collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => {
          setRoomname(snapshot.data().name);
        });
      db.collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomid]);

  return !props.msg ? (
    <div className="chatSection">
      {/* Name */}
      <div className="chatHeader">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomid}.svg`} />
        <div className="headerinfo">
          <h2>{Roomname}</h2>
          <p>{`last seen ${new Date(
            Message[Message.length - 1]?.timestamp?.toDate()
          ).toUTCString()}`}</p>
        </div>
        <div className="headericon">
          <IconButton>
            <SearchOutlinedIcon className="sidebar_item" />
          </IconButton>
          <IconButton>
            <AttachFile className="sidebar_item" />
          </IconButton>
          <IconButton>
            <MoreVertIcon className="sidebar_item" />
          </IconButton>
        </div>
      </div>
      {/* Chat Section */}
      <div className="chatBody">
        {Message.map((msg) => (
          <div
            className={msg.sender === user.displayName ? "sendmsg" : "rcvdmsg"}
          >
            <p className="senderinfo">{msg.sender}</p>
            <span className="chat_msg">{msg.msg}</span>
            <span className="timestamp">
              {new Date(msg.timestamp?.toDate()).toUTCString()}
            </span>
          </div>
        ))}
      </div>
      {/* text Bar */}
      <div className="chatFooter">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            value={Innertext}
            onChange={(e) => setInnertext(e.target.value)}
            placeholder="Type a Message"
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  ) : (
    <div className="chatSection">
      <div className="bigtext">
        <h1>Click on any room to start Chating...</h1>
      </div>
    </div>
  );
}

export default PersonalChat;
