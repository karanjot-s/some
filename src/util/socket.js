import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const socket = io("http://localhost:8800", {
  autoConnect: false,
});
