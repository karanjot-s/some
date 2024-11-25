import SearchBar from "@/components/utils/SearchBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import axios from "axios";
import { useLogin } from "@/util/LoginContext";
import UserIcon from "./icons/User";
import ChatMenu from "./chat/ChatMenu";

const ChatMain = () => {
  const [currentChat, setCurrentChat] = useState();

  return (
    <div className="flex w-full">
      <div
        className={`h-screen w-full md:w-96 ${
          currentChat && "hidden md:block"
        }`}
      >
        <ChatMenu setCurrentChat={setCurrentChat} />
      </div>
      <div className={`flex-1 ${!currentChat && "hidden md:block"}`}>
        <ChatWindow
          selectedUser={currentChat}
          setNullChat={() => setCurrentChat()}
        />
      </div>
    </div>
  );
};

export default ChatMain;
