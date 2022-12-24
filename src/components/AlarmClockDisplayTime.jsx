import { useRef } from "react";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";

export default function AlarmClockDisplayTime({ clockHand }) {
  return (
    <div className="flex items-center">
      <div className="grid gap-5 px-10">
        {clockHand.displayTime.map((item) => {
          return (
            <p
              key={item}
              className={
                item == clockHand.time
                  ? "text-2xl  font-bold time"
                  : "text-gray-300 text-md time"
              }
            >
              {clockHand.type == "hour" || `${item}`.length > 1
                ? item
                : `0${item}`}
            </p>
          );
        })}
      </div>

      <div className="ml-10">
        <BiCaretUp className="text-3xl" onClick={clockHand.decrementTime} />
        <BiCaretDown className="text-3xl" onClick={clockHand.incrementTime} />
      </div>
    </div>
  );
}
