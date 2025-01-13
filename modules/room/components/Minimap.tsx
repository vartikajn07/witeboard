import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useViewportSize } from "@/common/hooks/useViewportSize";
import { MotionValue, useMotionValue, motion } from "framer-motion";
import { Dispatch, forwardRef, SetStateAction, useEffect, useRef } from "react";
import { useBoardPosition } from "../hooks/useBoardPosition";

const MiniMap = forwardRef<
  HTMLCanvasElement,
  {
    dragging: boolean;
    setMovedMiniMap: Dispatch<SetStateAction<boolean>>;
  }
>(({ dragging, setMovedMiniMap }, ref) => {
  const { x, y } = useBoardPosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useViewportSize();

  const miniX = useMotionValue(0);
  const miniY = useMotionValue(0);

  useEffect(() => {
    miniX.onChange((newX) => {
      if (!dragging) x.set(-newX * 7);
    });

    miniY.onChange((newY) => {
      if (!dragging) y.set(-newY * 7);
    });

    return () => {
      miniX.clearListeners();
      miniY.clearListeners();
    };
  }, [dragging, miniX, miniY, x, y]);

  return (
    <div
      className="absolute right-10 top-10 z-30 rounded-lg bg-zinc-200"
      ref={containerRef}
      style={{
        width: CANVAS_SIZE.width / 7,
        height: CANVAS_SIZE.height / 7,
      }}
    >
      <canvas
        ref={ref}
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        className="h-full w-full"
      />
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onDragStart={() => setMovedMiniMap((prev) => !prev)}
        onDragEnd={() => setMovedMiniMap((prev: boolean) => !prev)}
        className="absolute top-0 left-0 cursor-grab border-2 rounded-lg border-red-300"
        style={{ width: width / 7, height: height / 7, x: miniX, y: miniY }}
        animate={{ x: -x.get() / 7, y: -y.get() / 7 }}
        transition={{ duration: 0 }}
      ></motion.div>
    </div>
  );
});

MiniMap.displayName = "Minimap";

export default MiniMap;
