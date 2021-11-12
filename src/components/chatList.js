import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";

const chatList = [
  {
    name: "chat1",
    id: "chat1",
  },
  {
    name: "chat2",
    id: "chat2",
  },
  {
    name: "chat3",
    id: "chat3",
  },
];

export const ChatList = () => {

  const deleteChat = (id) => {
    chatList.forEach(element => {
      if (element.id === id){
        const index = chatList.findIndex(n => n.id === id);
        if (index !== -1) {
          chatList.splice(index, 1);
        }

        console.log(chatList);
      }
    });
  }

  const addChat = (e) => {
    console.log(e.target);
  }

  return (
    <div className="App-list">
      <h3>List of chats</h3>
      <ul>
        {chatList.map((chat) => (
          <div className="ChatList-item">
            <li key={chat.id}>
              <NavLink
                style={({ isActive }) => ({ color: isActive ? "darkcyan" : "white" })}
                to={`/chats/${chat.id}`}>
                {chat.name}
              </NavLink>
            </li>
            <Button variant="outlined" onClick={deleteChat.bind(null, chat.id)}>
              X
            </Button>
          </div>
        ))}
      </ul>

      <TextField
        id="standard-basic"
        variant="standard"
        // value={value}
        // onChange={handleChange}
        // inputRef={inputRef}
      />
      <Button variant="outlined" onClick={addChat} >
        ADD NEW CHAT
      </Button>

    </div>
  );
};
