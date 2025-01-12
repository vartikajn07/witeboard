import { socket } from "@/common/lib/socket";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const Home = () => {
  const [roomId, setRoomId] = useState("");

  const router = useRouter();

  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      router.push(roomIdFromServer);
    });

    socket.on("joined", (roomIdFromServer, failed) => {
      if (!failed) router.push(roomIdFromServer);
      else console.log("failed");
    });

    return () => {
      socket.off("created");
      socket.off("joined");
    };
  }, [router]);

  const handleCreateRoom = () => {
    socket.emit("create_room");
  };
  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("join_room", roomId);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-24 text-extra font-extrabold leading-tight">
        WiteBoard
      </h1>
      <form
        className="mt-8 flex flex-col items-center gap-2"
        onSubmit={handleJoinRoom}
      >
        <label
          htmlFor="room-id"
          className="self-start font-bold leading-tight"
        ></label>
        <input
          className="rounded-xl border p-5 py-1"
          id="room-id"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          className="rounded-xl bg-black p-5 py-1 text-white"
          type="submit"
        >
          Join
        </button>
      </form>
      <div className="mt-10 flex flex-col items-center gap-2">
        <h5 className="self-start font-bold leading-tight">Create new room</h5>
        <button
          className="rounded-xl bg-black p-5 py-1 text-white"
          type="submit"
          onClick={handleCreateRoom}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Home;
