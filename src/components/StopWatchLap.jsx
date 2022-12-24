import { MdOutlineDelete } from "react-icons/md";
const StopWatchLap = ({ time, handleLap, laps }) => {
  let lapsColor;
  const removeLap = (id) => {
    // Changing lap animate to fade out
    let newLaps = laps.filter((lap) => {
      if (lap.lapsID == id) lap.animate = "fadeout";
      return lap;
    });
    handleLap(newLaps);

    // Removing lap from laps
    setTimeout(() => {
      handleLap((prevLaps) => prevLaps.filter((lap) => lap.lapsID != id));
    }, 600);
  };
  if (time.color1 != "black" && time.color2 == "black") {
    lapsColor = time.color1;
  } else if (time.color2 != "black" && time.color3 == "black") {
    lapsColor = time.color2;
  } else if (time.color3 != "black" && time.color4 == "black") {
    lapsColor = time.color3;
  } else {
    lapsColor = time.color4;
  }
  return (
    <div
      className={`bg-white p-5 rounded-2xl shadow-md hover:shadow-lg duration-1000  h-[100px] mb-5 laps ${time.animate}`}
    >
      <div className="flex justify-end justify-self-end">
        <MdOutlineDelete
          className="text-gray-300 hover:text-white hover:bg-red-500 duration-700 rounded-full  "
          onClick={() => removeLap(time.lapsID)}
        />
      </div>
      <h1 className="font-bold uppercase" style={{ color: lapsColor }}>
        Lap {time.lapsID}
      </h1>
      <p>
        <span style={{ color: time.color4 }}>
          {time.hours > 0
            ? `${time.minutes}:`.length < 2
              ? `0${time.minutes}:`
              : time.minutes
            : null}
        </span>
        <span style={{ color: time.color3 }}>
          {`${time.minutes}`.length < 2 ? `0${time.minutes}` : time.minutes}:
        </span>
        <span style={{ color: time.color2 }}>
          {`${time.seconds}`.length < 2 ? `0${time.seconds}` : time.seconds}:
        </span>
        <span style={{ color: time.color1 }}>
          {`${time.milliSeconds}`.length < 2
            ? `0${time.milliSeconds}`
            : time.milliSeconds}
        </span>
      </p>
    </div>
  );
};
export default StopWatchLap;
