import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { io } from "socket.io-client";
import { useLogin } from "@/util/LoginContext";
import { socket } from "@/util/socket";
import axios from "axios";
import UserIcon from "../icons/User";
import BackArrowIcon from "../icons/BackArrow";

const ChatWindow = ({ selectedUser, setNullChat }) => {
  const [chat, setChat] = useState([]);
  const messagesRef = useRef();
  const [message, setMessage] = useState("");
  // const socket = useRef();
  const [socketConnected, setSocketConnected] = useState(false);
  const { user } = useLogin();

  console.log(selectedUser);

  useEffect(() => {
    if (!selectedUser) return;

    const server = process.env.NEXT_PUBLIC_SERVER_URL;
    const token = window.localStorage.getItem("access_token");

    axios
      .get(server + `/user/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          to: selectedUser.id,
          from: user._id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setChat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedUser, user._id]);

  const scrollToBottom = () => {
    const lastChildElement = messagesRef.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    // if (!socketConnected) {
    //   socket.current = io.connect("https://localhost:8800");
    //   socket.current.emit("login", user._id);
    //   setSocketConnected(true);
    //   console.log("Socket Connected");

    //   socket.current.on("message sent", (data) => {
    //     setChat((old) => [...old, { message: data.message, type: "user" }]);
    //   });

    //   socket.current.on("message received", (data) => {
    //     setChat((old) => [...old, { message: data.message, type: "other" }]);
    //   });
    // }
    function onConnect() {
      setSocketConnected(true);
      socket.emit("login", user._id);
    }

    function onDisconnect() {
      setSocketConnected(false);
    }

    function onMessageSent(data) {
      setChat((old) => [...old, { message: data.message, type: "user" }]);
      console.log("sent");
    }

    function onMessageReceived(data) {
      setChat((old) => [...old, { message: data.message, type: "other" }]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message sent", onMessageSent);
    socket.on("message received", onMessageReceived);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message sent", onMessageSent);
      socket.off("message received", onMessageReceived);
    };
  }, [user]);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    socket.emit(
      "send message",
      { to: selectedUser.id, message: message },
      (response) => {
        if (response.status === "ok")
          setChat((old) => [
            ...old,
            { message: response.message, type: "user" },
          ]);
        console.log("sent");
      }
    );
  };

  if (!selectedUser) {
    return (
      <div className="w-full h-full flex justify-center items-center border-l-2 border-gray-800 text-gray-400">
        Select a user to start chat
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col md:border-l-2 border-gray-800">
      <div className="w-full bg-slate-900 py-2">
        <div className="flex justify-center items-center gap-4 w-fit mx-6 mt-2">
          <div className="md:hidden cursor-pointer" onClick={setNullChat}>
            <BackArrowIcon className="w-6 h-full" />
          </div>
          <div className="w-12 relative aspect-square m-auto">
            {selectedUser.img ? (
              <Image
                src={selectedUser.img}
                alt=""
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <UserIcon className="w-12 h-12" />
            )}
          </div>
          <p className="flex-1">{selectedUser.name}</p>
        </div>
      </div>
      <div className="flex flex-col m-4 bg-slate-700 rounded-xl">
        <div
          className="bg-slate-800 rounded-xl px-2 py-4 flex flex-col gap-3 overflow-scroll h-[70vh] md:h-[80vh]"
          ref={messagesRef}
        >
          {!chat.length && (
            <div className="w-full text-center">No messages yet</div>
          )}
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`w-fit max-w-sm px-4 py-2 ${
                msg.type === "user"
                  ? "bg-purple-800 rounded-l-xl rounded-r-md rounded-br-sm self-end"
                  : "bg-zinc-700 rounded-r-xl rounded-l-md rounded-bl-sm"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <form
          className="w-full flex px-4 py-3 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!message) return;
            // setChat((old) => [
            //   ...old,
            //   { message, type: "user" },
            //   { message: "This is reply of this.", type: "other" },
            // ]);
            handleSendMessage();
            setMessage("");
          }}
        >
          <input
            className="flex-1 bg-transparent outline-none"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">
            <Icon icon="iconamoon:send-bold" width="30" opacity=".5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
