import { useState } from "react";
import { BiTimer } from "react-icons/bi";

export default function TimerSaved() {
  const [clickedState, setClickedState] = useState(false);
  const handleClicked = () => {
    setClickedState((prev) => !prev);
  };
  return (
    <div className="col-span-6   h-fit p-2">
      <div
        onClick={handleClicked}
        className={`rounded-full w-[100px] h-[100px] ${
          !clickedState ? "bg-gray-200" : "bg-blue-50 text-blue-500"
        } flex flex-col justify-center items-center p-5 cursor-pointer`}
      >
        <BiTimer className="text-3xl " />
        <h1 className="text-sm">Timer</h1>
        <p className="text-xs opacity-30">00:00:00</p>
      </div>
    </div>
  );
}
