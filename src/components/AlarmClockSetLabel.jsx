import { useEffect, useRef } from "react";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function AlarmClockSetLabel(ShowAlarm) {
  const [showLabel, setShowLabel] = useState(false);
  const [Label, setLabel] = useState("");
  const input = useRef();
  const handleShowLabel = () => {
    setShowLabel((prev) => !prev);
  };
  const handleSetLabel = () => {
    setLabel(input.current.value);
    handleShowLabel();
  };
  const handleCancelLabel = () => {
    input.current.value = Label;
    handleShowLabel();
  };
  useEffect(() => {
    setLabel("");
  }, [ShowAlarm]);
  return (
    <div className="flex justify-between ">
      <h1>Label</h1>
      <div className="flex items-center justify-between cursor-pointer">
        <h1 className="mr-3 text-gray-300 font-light" id="label">
          {Label}
        </h1>
        <IoIosArrowForward className="" onClick={handleShowLabel} />
      </div>

      <div
        className={`${
          showLabel ? "animateShow " : "animateHidden "
        } absolute top-0  h-[100%] w-[100%] flex flex-col justify-center items-center`}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div className="w-[100%] flex justify-center">
          <input
            type="text"
            className="w-[50%] bg-transparent border-b-2 border-blue-500 outline-none p-2 caret-blue-500 text-capitalize"
            placeholder="Enter Label"
            ref={input}
          />
        </div>

        <div className="absolute right-[25%] bottom-[10%] gap-5 w-[20%] grid grid-cols-12">
          <button
            className="bg-blue-600 hover p-2  col-span-6 block rounded-md"
            onClick={handleSetLabel}
          >
            Ok
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 p-2  col-span-6 block rounded-md"
            onClick={() => handleCancelLabel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
