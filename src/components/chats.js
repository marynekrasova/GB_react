import React, {useCallback, useEffect, useState} from "react";
import { Form } from "./form";
import {MessageList} from "./messageList";
import "../App.css";
import {Authors} from "../utils/constants";
import List from '@mui/material/List';
import {ChatList} from "./chatList";
import {
  Navigate,
  useParams,
} from "react-router";


const initialMessages = {
  chat1: [
    {
      text: "text1",
      author: Authors.human,
    },
  ],
  chat2: [
    {
      text: "this is chat2",
      author: Authors.human,
    },
  ],
  chat3: [
    {
      text: "this is chat3",
      author: Authors.human,
    },
  ],
};

function Chats() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = useCallback((newMessage) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [chatId]: [...prevMessages[chatId], newMessage],
      }));
    },
    [chatId]
  );
  useEffect(()=>{
    if(messages[chatId]?.length && messages[chatId]?.[messages[chatId]?.length - 1].author!== Authors.bot){
      const timeout = setTimeout(()=>
        handleSendMessage({
          author: Authors.bot,
          text: "Hello. I am bot!",
          id: ` mess-${Date.now()}`
        }), 1000);
      return ()=> clearTimeout(timeout);
    }
  },[messages])


  if (!messages[chatId]) {
    return <Navigate replace to="/chats" />;
  }

  return (
    <div className="App" >
      <div className="App-form">
        <ChatList />
        <div className="App-field">
          <div className="Form-field">
            <MessageList messages={messages[chatId]}/>
          </div>
          <Form onSendMessage={handleSendMessage}/>
        </div>
      </div>
    </div>

  );
}

export default Chats;
