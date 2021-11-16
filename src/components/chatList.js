import { ChatItem } from "./chatItem";
import { TextField } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";

export const ChatList = ({chatList, onAddChat, onDeleteChat}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddChat(value);
    setValue("");
  };
  return (
    <div className="App-list">
      <h3>List of chats</h3>
      <ul>
        {chatList.map((chat) => (
            <ChatItem chat={chat} onDeleteChat={onDeleteChat} />
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          variant="standard"
          value={value}
          onChange={handleChange} />
        <Button variant="outlined" type="submit">ADD NEW CHAT</Button>
      </form>

    </div>
  );
};
