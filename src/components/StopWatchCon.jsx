import { useState } from "react";

import StopWatch from "./StopWatch";
import StopWatchLap from "./StopWatchLap";
const StopWatchCon = () => {
  const [time, setTime] = useState({
    milliSeconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    lapsID: 1,
    animate: "fadein",
    color1: "",
    color2: "",
    color3: "",
  });

  const [laps, setLaps] = useState([]);

  return (
    <div className="container mx-auto  py-20">
      <div className="grid grid-cols-12">
        <StopWatch time={time} setTime={setTime} handleLap={setLaps} />
        <div className="col-span-2  font-[Finlandica]  overflow-auto h-[60vh]">
          {laps.map((lap, index) => (
            <StopWatchLap
              key={index}
              time={lap}
              handleLap={setLaps}
              laps={laps}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StopWatchCon;
