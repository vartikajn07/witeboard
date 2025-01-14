//mouse coordinates on cursor
import { useRef } from "react";

import { motion } from "framer-motion";
import { useInterval, useMouse } from "react-use";

import { socket } from "@/common/lib/socket";

import { useBoardPosition } from "../../hooks/useBoardPosition";
import { getPos } from "@/common/lib/getPos";

const MousePosition = () => {
  const { x, y } = useBoardPosition();

  const prevPosition = useRef({ x: 0, y: 0 });

  const ref = useRef<HTMLDivElement>(null);

  const { docX, docY } = useMouse(ref as React.RefObject<Element>);

  useInterval(() => {
    if (prevPosition.current.x !== docX || prevPosition.current.y !== docY) {
      socket.emit("mouse_move", getPos(docX, x), getPos(docY, y));
      prevPosition.current = { x: docX, y: docY };
    }
  }, 150);

  return (
    // @ts-expect-error: Type mismatch in motion.div
    <motion.div
      ref={ref}
      className="pointer-events-none absolute top-0 left-0 z-50  text-black"
      animate={{ x: docX + 15, y: docY + 15 }}
      transition={{ duration: 0.05, ease: "linear" }}
    >
      {getPos(docX, x).toFixed(0)} | {getPos(docY, y).toFixed(0)}
    </motion.div>
  );
};

export default MousePosition;
