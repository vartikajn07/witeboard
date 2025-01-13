import { CANVAS_SIZE } from "@/common/constants/canvasSize";
import { useViewportSize } from "@/common/hooks/useViewportSize";
import { useMotionValue, motion } from "framer-motion";
import { canvas } from "framer-motion/dist/client";
import { useEffect, useRef, useState } from "react";
import { useKeyPressEvent } from "react-use";
import { socket } from "@/common/lib/socket";
import MiniMap from "./Minimap";
import { useBoardPosition } from "../hooks/useBoardPosition";
import { useRoom } from "@/common/recoil/room";
import { drawAllMoves } from "../helpers/Canvas.helpers";
import { useDraw } from "../hooks/useDraw";
import { useSocketDraw } from "../hooks/useSocketDraw";

const Canvas = () => {
  const room = useRoom();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smallcanvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [dragging, setDragging] = useState(false);
  const [, setMovedMiniMap] = useState(false);

  const { width, height } = useViewportSize();

  useKeyPressEvent("Control", (e) => {
    if (e.ctrlKey && !dragging) {
      setDragging(true);
    }
  });

  // const x = useMotionValue(0);
  // const y = useMotionValue(0);

  const { x, y } = useBoardPosition();

  const copyCanvasToSmall = () => {
    if (canvasRef.current && smallcanvasRef.current) {
      const smallCtx = smallcanvasRef.current.getContext("2d");

      if (smallCtx) {
        smallCtx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
        smallCtx.drawImage(
          canvasRef.current,
          0,
          0,
          CANVAS_SIZE.width,
          CANVAS_SIZE.height
        );
      }
    }
  };

  const {
    handleDraw,
    handleEndDrawing,
    handleStartDrawing,
    drawing,
    handleUndo,
  } = useDraw(ctx, dragging);

  useSocketDraw(ctx, drawing);

  //setup
  useEffect(() => {
    const newCtx = canvasRef.current?.getContext("2d");
    if (newCtx) setCtx(newCtx);

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.ctrlKey && dragging) {
        setDragging(false);
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (ctx) socket.emit("joined_room");
  }, [ctx]);

  useEffect(() => {
    if (ctx) {
      drawAllMoves(ctx, room), copyCanvasToSmall();
    }
  }, [ctx, room]);

  return (
    <div className=" relative h-full w-full overflow-hidden">
      <button className="absolute top-0 " onClick={handleUndo}>
        Undo
      </button>
      <motion.canvas
        ref={canvasRef}
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        className={`bg-zinc-100 ${dragging && "cursor-move"}`}
        style={{ x, y }}
        drag={dragging}
        dragConstraints={{
          left: -(CANVAS_SIZE.width - width),
          right: 0,
          top: -(CANVAS_SIZE.height - height),
          bottom: 0,
        }}
        dragElastic={0}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onMouseDown={(e) => handleStartDrawing(e.clientX, e.clientY)}
        onMouseUp={handleEndDrawing}
        onMouseMove={(e) => {
          handleDraw(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          handleStartDrawing(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
          );
        }}
        onTouchEnd={handleEndDrawing}
        onTouchMove={(e) => {
          handleDraw(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }}
      />
      <MiniMap
        ref={smallcanvasRef}
        dragging={dragging}
        setMovedMiniMap={setMovedMiniMap}
      />
    </div>
  );
};

export default Canvas;
