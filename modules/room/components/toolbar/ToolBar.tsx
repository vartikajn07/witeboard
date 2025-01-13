import { useSetOptions } from "@/common/recoil/options";
import ColorPicker from "./ColorPicker";
import LineWidthPicker from "./LineWidthPicker";
import { BsFillChatFill, BsFillImageFill, BsThreeDots } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import Eraser from "./Eraser";

export const ToolBar = () => {
  const setOptions = useSetOptions();

  return (
    <div
      className="absolute left-10 top-[50%] z-50 flex flex-col gap-5 bg-black text-white"
      style={{
        transform: "translateY(-50%)",
      }}
    >
      <ColorPicker />
      <LineWidthPicker />
      <Eraser />
      <button className="text-xl">
        <BsFillChatFill />
      </button>
      <button className="text-xl">
        <BsFillImageFill />
      </button>
      <button className="text-xl">
        <BsThreeDots />
      </button>
      <button className="text-xl">
        <HiOutlineDownload />
      </button>
    </div>
  );
};
