import SearchBar from "@/components/utils/SearchBar";
import Image from "next/image";
import React from "react";
import Coming from "./coming";
import ChatWindow from "@/components/chat/ChatWindow";

const Chat = () => {
  const friends = [
    {
      img: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80&w=1920&q=75",
      name: "Karanjot Singh",
    },
  ];
  return (
    <div className="flex w-full">
      <div className="h-screen w-96">
        <SearchBar
          placeholder="Search for friends"
          className="my-6 mx-6"
          fullWidth
        />
        <div className="overflow-y-scroll" style={{ height: "88%" }}>
          {friends.map((friend, i) => (
            <div
              key={i}
              className="flex justify-center items-center gap-4 px-6 mt-2 w-full cursor-pointer"
            >
              <div className="w-16 relative aspect-square m-auto mt-2">
                <Image
                  src={friend.img}
                  alt=""
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <p className="flex-1">{friend.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <ChatWindow selectedUser={friends[0]} />
      </div>
    </div>
  );
};

export default Chat;
