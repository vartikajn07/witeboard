import { useRoom } from "@/common/recoil/room";

import RoomContextProvider from "../context/Room.context";
import Canvas from "./board/Canvas";
import MousePosition from "./board/MousePosition";
import MouseRenderer from "./board/MouseRenderer";

import ToolBar from "./toolbar/ToolBar";
import NameInput from "./NameInput";
import UserList from "./UsersList";

const Room = () => {
  const room = useRoom();
  if (!room.id) return <NameInput />;

  return (
    <>
      <RoomContextProvider>
        <div className="relative h-full w-full overflow-hidden">
          <UserList />
          <ToolBar />
          <Canvas />
          <MousePosition />
          <MouseRenderer />
        </div>
      </RoomContextProvider>
    </>
  );
};

export default Room;
