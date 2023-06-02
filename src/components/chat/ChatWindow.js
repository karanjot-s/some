import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const ChatWindow = ({ selectedUser }) => {
  const [chat, setChat] = useState([
    { type: "user", message: "Hello this is message one." },
    {
      type: "other",
      message:
        "Hello this is another message sent by other user. And this is a bigger message.",
    },
    {
      type: "other",
      message:
        "Hello this is another message sent by other user. And this is a bigger message.",
    },
    { type: "user", message: "Hello this is message one." },
    {
      type: "other",
      message:
        "Hello this is another message sent by other user. And this is a bigger message.",
    },
    {
      type: "other",
      message:
        "Hello this is another message sent by other user. And this is a bigger message.",
    },
  ]);

  const [message, setMessage] = useState("");
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full bg-slate-900 py-2">
        <div className="flex justify-center items-center gap-4 w-fit mx-6 mt-2">
          <div className="w-12 relative aspect-square m-auto">
            <Image
              src={selectedUser.img}
              alt=""
              fill
              className="rounded-full object-cover"
            />
          </div>
          <p className="flex-1">{selectedUser.name}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col m-4 bg-slate-700 rounded-xl">
        <div className="flex-1 bg-slate-800 rounded-xl px-2 py-4 flex flex-col gap-3 overflow-scroll h-full">
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
            setChat((old) => [
              ...old,
              { message, type: "user" },
              { message: "This is reply of this.", type: "other" },
            ]);
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
