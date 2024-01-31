import React, { useState } from "react";
import "./Chat.css";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "./ChatComponents/SideDrawer";
import MyChats from "./ChatComponents/MyChats";
import ChatBox from "./ChatComponents/ChatBox";
import { Box, Flex,  } from "@chakra-ui/react";

function Chat() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Flex
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
        flexDirection={{ base: "column", md: "row" }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}

        {user && (
          <ChatBox flex="1" fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>

    </div>
  );
}

export default Chat;
