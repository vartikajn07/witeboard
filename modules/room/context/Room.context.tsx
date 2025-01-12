import { socket } from "@/common/lib/socket";
import usersAtom, { useUserIds } from "@/common/recoil/users";
import { usersIds } from "@/common/recoil/users/users.atom";
import { MotionValue, useMotionValue } from "framer-motion";
import { createContext, ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const roomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
}>(null!);

const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const setUsers = useSetRecoilState(usersAtom);
  const userIds = useUserIds();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    socket.on("new_user", (newUser) => {
      setUsers((prevUsers) => ({ ...prevUsers, [newUser]: [] }));
    });
    socket.on("user_disconnected", (userId) => {
      setUsers((prevUsers) => {
        const newUsers = { ...prevUsers };
        delete newUsers[userId];
        return newUsers;
      });
    });
    return () => {
      socket.off("new_user");
      socket.off("user_disconnected");
    };
  }, [setUsers, usersIds]);

  return (
    <roomContext.Provider value={{ x, y }}>{children}</roomContext.Provider>
  );
};

export default RoomContextProvider;
