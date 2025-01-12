import { MotionValue, useMotionValue } from "framer-motion";
import { createContext, ReactNode } from "react";

export const roomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
}>(null!);

const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <roomContext.Provider value={{ x, y }}>{children}</roomContext.Provider>
  );
};

export default RoomContextProvider;
