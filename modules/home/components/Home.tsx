import { socket } from "@/common/lib/socket";
import { useSetRoomId } from "@/common/recoil/room";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import NotFoundModal from "../modals/NotFound";
import { useModal } from "@/common/recoil/modal";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const setAtomRoomId = useSetRoomId();
  const router = useRouter();

  const { openModal } = useModal();

  useEffect(() => {
    socket.on("created", (roomIdFromServer: string) => {
      setAtomRoomId(roomIdFromServer);
      router.push(roomIdFromServer);
    });

    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(roomIdFromServer);
      } else {
        openModal(<NotFoundModal id={roomId} />);
      }
    };

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  const handleCreateRoom = () => {
    socket.emit("create_room", username);
  };
  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("join_room", roomId, username);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-24 text-extra font-extrabold leading-tight">
        WiteBoard
      </h1>
      <div className="mt-10 flex flex-col gap-2">
        <label className="self-start font-bold leading-tight">
          Enter your name
        </label>
        <input
          className="rounded-xl border p-5 py-1"
          id="room-id"
          placeholder="Username.."
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <form
        className=" flex flex-col items-center gap-2"
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
      <div className="my-8 flex w-96 items-center gap-2">
        <div className="h-px w-full bg-zinc-100" />
        <h2 className="text-zinc-100">or</h2>
        <div className="h-px w-full bg-zinc-100" />
      </div>
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
