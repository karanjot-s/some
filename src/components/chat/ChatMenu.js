import React, { useEffect, useState } from "react";
import UserIcon from "../icons/User";
import Image from "next/image";
import SearchBar from "../utils/SearchBar";
import axios from "axios";
import SelectionBox from "../utils/SelectionBox";
import LoadingIcon from "../icons/Loading";

const types = {
  chats: 0,
  friends: 1,
};

const ChatMenu = ({ setCurrentChat }) => {
  const [chatList, setChatList] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [filteredChatList, setFilteredChatList] = useState();
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState(types.chats);

  useEffect(() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL;
    const token = window.localStorage.getItem("access_token");

    axios
      .get(server + `/user/chatlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setChatList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!chatList) return;
    if (type === types.chats) {
      setSelectedChat(chatList.chats);
    } else {
      setSelectedChat(chatList.friends);
    }
  }, [type, chatList]);

  useEffect(() => {
    if (!selectedChat) return;
    setFilteredChatList(
      selectedChat.filter((chat) => {
        return (
          (chat.name &&
            chat.name.toLowerCase().includes(searchText.toLowerCase())) ||
          (chat.username &&
            chat.username.toLowerCase().includes(searchText.toLowerCase()))
        );
      })
    );
  }, [selectedChat, searchText]);

  if (filteredChatList === undefined) {
    return (
      <div className="w-full flex items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <>
      <SearchBar
        placeholder="Search for friends"
        className="my-6 mx-6"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="flex justify-center items-center gap-4 px-6 mt-2 w-full">
        <SelectionBox
          item={type}
          allItems={[
            { text: "Chats", value: types.chats },
            { text: "Friends", value: types.friends },
          ]}
          changeItem={setType}
          className={"w-full !bg-transparent !py-2 !mt-0"}
        />
      </div>

      {type == types.chats && filteredChatList.length === 0 && (
        <>
          <div className="text-center mt-4">No chats found</div>
          <div className="text-center text-sm text-gray-400">
            Start a new chat by clicking on a friend
          </div>
        </>
      )}

      <div className="overflow-y-scroll" style={{ height: "80%" }}>
        {type == types.friends && filteredChatList.length === 0 && (
          <>
            <div className="text-center mt-4">No friends found</div>
          </>
        )}

        {filteredChatList.map((friend, i) => (
          <div
            key={i}
            className="flex justify-center items-center gap-4 px-6 mt-2 w-full cursor-pointer"
            onClick={() => {
              setCurrentChat(friend);
            }}
          >
            <div className="w-16 relative aspect-square m-auto mt-2">
              {friend.img ? (
                <Image
                  src={friend.img}
                  alt=""
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-16" />
              )}
            </div>
            <p className="flex-1">{friend.name}</p>
          </div>
        ))}

        {type == types.friends && (
          <div
            className={`text-center text-gray-400 text-sm ${
              filteredChatList.length != 0 && "mt-2"
            }`}
          >
            Friends are users you follow and who follow you back
          </div>
        )}
      </div>
    </>
  );
};

export default ChatMenu;
