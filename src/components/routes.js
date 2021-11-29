import { useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {auth, messagesRef} from "../services/firebase";
import {signIn, signOut} from "../store/profile/actions";
import {onValue} from "firebase/database";
import {BrowserRouter, Link} from "react-router-dom";
import { Route, Routes } from "react-router";
import {PublicOutlet} from "./publicRoute";
import {Home} from "./home";
import {SignUp} from "./signUp";
import {PrivateRoute} from "./privateRoute";
import {ConnectedProfile} from "./profile";
import {ChatList} from "./chatList";
import {ConnectedChats} from "./chats";
import {Articles} from "./articles";

export const Router = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signIn());
      } else {
        dispatch(signOut());
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const newMsgs = {};

      snapshot.forEach((chatMsgsSnap) => {
        newMsgs[chatMsgsSnap.key] = Object.values(
          chatMsgsSnap.val().messageList || {}
        );
      });

      setMessages(newMsgs);
    });
  }, []);

  return (

        <BrowserRouter>
          <ul className="App-link">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chats">Chats</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<PublicOutlet />}>
              <Route path="/" element={<Home/>}/>
            </Route>
            <Route path="/signup" element={<PublicOutlet />}>
              <Route path="" element={<SignUp />} />
            </Route>
            <Route path="profile" element={<PrivateRoute><ConnectedProfile /></PrivateRoute>} />
            <Route path="chats">
              <Route index element={<PrivateRoute><ChatList /></PrivateRoute>} />
              <Route path=":chatId" element={<PrivateRoute>
                <ConnectedChats messages={messages}/>
              </PrivateRoute>} />
            </Route>
            <Route path="articles" element={<Articles />} />
            <Route path="*" element={<h3>404</h3>}/>
          </Routes>
        </BrowserRouter>
  );
};



