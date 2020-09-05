import React, { useState, useEffect } from "react";
import Chats from "./chats";
import "./style/sidebar.css";
import { Avatar, IconButton } from "@material-ui/core/";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import db from "../firebase";

import { useStateValue } from "../StateProvider";

function Sidebar() {
  const [Rooms, setRooms] = useState([]);
  let [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((docu) => ({
          id: docu.id,
          data: docu.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarHead">
        <Avatar src={user?.photoURL} />
        <div className="sidebarHead_right">
          <IconButton>
            <DonutLargeIcon className="sidebar_item" />
          </IconButton>
          <IconButton>
            <ChatIcon className="sidebar_item" />
          </IconButton>
          <IconButton>
            <MoreVertIcon className="sidebar_item" />
          </IconButton>
        </div>
      </div>
      <div className="sidebarSearch">
        <div className="sidebarSearch_container">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or Start new chat..." />
        </div>
      </div>
      <div className="sidebarChats">
        <Chats addChat={true} />
        {Rooms.map((room) => (
          <Chats key={room.id} roomid={room.id} data={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
