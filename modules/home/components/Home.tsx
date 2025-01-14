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
    <div className="w-full h-full mx-0 my-0 overflow-hidden ">
    <div className="flex flex-col justify-between lg:h-screen lg:flex-row ">
      <div className="lg:w-[45%] w-full lg:mx-36 flex flex-col justify-center lg:gap-16 ">
        {/* <h1 className="text-5xl font-semibold flex flex-col leading-[3rem]">
        <span className="">
          A <span className="mark">new</span>
        </span>
        <span className="ml-14 ">way to</span>
        <span className="mt-2">collaborate</span>
      </h1> */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-semibold leading-[3.5rem]">
            A new way to <span className="text-[65px]">collaborate</span>
          </h1>
          <h1 className="text-2xl font-medium">
            <span className="text-[#4FCD73]">Design.</span>{" "}
            <span className="text-[#E953EC]">Thinking.</span>{" "}
            <span className="text-[#F4A444]">Ideation.</span>
          </h1>
        </div>
        <div className="flex flex-col gap-4 w-[27rem]">
          <h1 className="text-base font-medium ">
            Let's brainstorm for thoughts, Ideas, and Inspiration using an
            Idea Board. It's all in one place.👍
          </h1>
          <h1>
            And the best catch, it's FREE! No login required. Pretty cool,
            right?
          </h1>
        </div>
      </div>
      <div className="h-full flex flex-col items-center justify-center gap-2 bg-[#FEEBE4] w-[50%]">
        <div className="my-24 text-center mx-36">
          <div className="flex flex-col items-start ">
            <h1 className="mb-5 text-lg font-semibold">Your name</h1>
            <input
              className="rounded-lg border p-5 py-[6px] w-[20rem]"
              id="room-id"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <form
              className="flex flex-col items-center gap-5"
              onSubmit={handleJoinRoom}
            >
              <label htmlFor="room-id" className="font-semibold"></label>
              <input
                className="rounded-lg border p-5 py-[6px] w-[20rem]"
                id="room-id"
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <button
                className="rounded-lg mt-2 bg-black p-5 py-[6px] text-white w-[20rem]"
                type="submit"
              >
                Join
              </button>
            </form>
          </div>
          {/* <div className="flex items-center gap-2 my-2 bg-red-300 w-96 ">
            <div className="h-px w-[] bg-zinc-100" />
            <h2 className="text-zinc-100">or</h2>
            <div className="w-full h-px bg-zinc-100" />
          </div> */}
          <div className="flex flex-col items-center mt-16">
            <h5 className="mb-5 text-lg font-semibold ">Create new room</h5>
            <button
              className="rounded-lg bg-black p-5 py-[6px] text-white w-[20rem]"
              type="submit"
              onClick={handleCreateRoom}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;
