import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteChat } from "../store/chats/actions";

export const ChatItem = ({ chat }) => {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteChat(chat.id));
  };

  return (
        <div className="ChatList-item">
          <li key={chat.id}>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "darkcyan" : "white" })}
              to={`/chats/${chat.id}`}>
              {chat.name}
            </NavLink>
          </li>
          <Button variant="outlined" onClick={handleDeleteClick}>
            X
          </Button>
        </div>
  );
};
