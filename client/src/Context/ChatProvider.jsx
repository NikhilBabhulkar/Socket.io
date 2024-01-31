import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();



const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const navigate = useNavigate(); // Access navigation function

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     // setUser(userInfo);
//     setUser(userInfo);

//     // if (!userInfo) navigate("/"); // Use navigate to redirect
    
//   }, [navigate, setUser])

// *************Test
useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));

    if (!storedUser) {
      // If no user is stored, use a default test user
      const testUser = {
        username: "TestUser",
        email: "test@example.com",
      };

      setUser(testUser);
      localStorage.setItem("userInfo", JSON.stringify(testUser));
    } else {
      setUser(storedUser);
    }
  }, [navigate, setUser]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;