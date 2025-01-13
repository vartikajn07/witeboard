import { io, Socket } from "socket.io-client";
import ClientToServerEvents from "../types/global";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
