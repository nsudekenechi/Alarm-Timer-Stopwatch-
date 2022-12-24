import { useRef, useState } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
const StopWatch = ({ time, setTime, handleLap }) => {
  const [startButton, setStartButton] = useState(true);
  const [intervalID, setIntervalID] = useState(0);
  const [animate, setAnimate] = useState({
    rotateCircle: 0,
    textBounce: "",
  });
  const [textColor, setTextColor] = useState({
    milliSecond: "black",
    second: "black",
    minute: "black",
    hour: "black",
  });

  let milliSeconds = time.milliSeconds;
  let seconds = time.seconds;
  let minutes = time.minutes;
  let hours = time.hours;
  let textColors = {
    milliSeconds: textColor.milliSecond,
    seconds: textColor.second,
    minutes: textColor.minute,
    hours: textColor.hour,
  };
  const setWatch = () => {
    startButton ? startWatch() : pauseWatch();
    setStartButton((prevState) => !prevState);
  };
  const startWatch = () => {
    let interval = setInterval(() => {
      milliSeconds += 1;
      textColors.milliSeconds = "#88EAF4";
      // Changing milliseconds to 0 if its count reaches 99 and incrementing seconds by 1
      if (milliSeconds > 99) {
        milliSeconds = 0;
        seconds += 1;
        textColors.seconds = "#816CDF";
      } else if (seconds > 59) {
        seconds = 0;
        minutes += 1;
        textColors.minutes = "#FD90AC";
      } else if (minutes > 59) {
        minutes = 0;
        hours += 1;
        textColors.hours = "purple";
      }
      //   Saving Time in state
      setTime((time) => ({
        ...time,
        milliSeconds: milliSeconds,
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        color1: textColors.milliSeconds,
        color2: textColors.seconds,
        color3: textColors.minutes,
        color4: textColors.hours,
      }));
      //   Incrementing stop watch rotation
      setAnimate((animate) => ({
        ...animate,
        rotateCircle: animate.rotateCircle + 1,
        textBounce: "animate-bounce",
      }));
      //   Setting Text Color
      setTextColor((colors) => ({
        ...colors,
        milliSecond: textColors.milliSeconds,
        second: textColors.seconds,
        minute: textColors.minutes,
        hour: textColors.hours,
      }));
    }, 10);
    setIntervalID(interval);
  };

  const pauseWatch = () => {
    setTime((prevTime) => ({
      ...prevTime,
      lapsID: prevTime.lapsID + 1,
    }));

    handleLap((prevTime) => [...prevTime, time]);
    setAnimate((animate) => ({ ...animate, textBounce: "" }));
    clearInterval(intervalID);
  };

  //   Function that resets stopWatch
  const resetWatch = () => {
    setTime((prevTime) => ({
      ...prevTime,
      milliSeconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      lapsID: 1,
    }));
    clearInterval(intervalID);
    // Returning Circle Rotation Back to 0
    setAnimate({ rotateCircle: 0, textBounce: "" });
    // Returning text Color to black
    setTextColor({
      milliSecond: "black",
      second: "black",
      minute: "black",
      hour: "black",
    });
    setStartButton((prevState) => true);
    let timeTaken = 0.2;
    let laps = document.querySelectorAll(".laps");
    // Animating laps by adding animation ddelay before removing it, the last lap element starts first before other laps follows suit
    laps.forEach((lap, index, arr) => {
      lap.classList.replace("fadein", "fadeout");
      lap.style.animationDelay = `${
        index <= 0 ? (arr.length + 1) / 10 : arr.length / index / 10
      }s`;
      timeTaken += index <= 0 ? (arr.length + 1) / 10 : arr.length / index / 10;
    });
    setTimeout(() => {
      handleLap((laps) => []);
    }, timeTaken * 1000);
  };
  return (
    <div className="col-span-10">
      <div className="flex justify-center">
        <div className=" h-[300px] w-[300px]  rounded-full grid place-items-center shadow-2xl shadow-[#F6F8FE] bg-white relative ">
          <div
            className={` absolute h-[100%] w-[100%] rounded-full`}
            style={{ transform: `rotate(${animate.rotateCircle}deg)` }}
          >
            <div className="h-[12px] w-[12px] bg-[#FD90AC] rounded-full absolute bottom-[2%] left-[45%]"></div>
            <div className="h-[8px] w-[8px] bg-[#816CDF] rounded-full absolute top-[50%] left-[15%]"></div>
            <div className="h-[8px] w-[8px] bg-[#88EAF4] rounded-full absolute bottom-[50%] right-[15%]"></div>
          </div>

          <div className="grid place-items-center h-[80%] w-[80%] rounded-full  shadow-2xl">
            <h1 className={`text-3xl font-[Changa] ${animate.textBounce} `}>
              <span style={{ color: textColor.hour }}>
                {" "}
                {time.hours > 0
                  ? `${time.minutes}:`.length < 2
                    ? `0${time.minutes}:`
                    : time.minutes
                  : null}
              </span>
              <span style={{ color: textColor.minute }}>
                {`${time.minutes}`.length < 2
                  ? `0${time.minutes}`
                  : time.minutes}
                :
              </span>

              <span style={{ color: textColor.second }}>
                {`${time.seconds}`.length < 2
                  ? `0${time.seconds}`
                  : time.seconds}
                :
              </span>
              <span style={{ color: textColor.milliSecond }}>
                {`${time.milliSeconds}`.length < 2
                  ? `0${time.milliSeconds}`
                  : time.milliSeconds}
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="my-5 flex justify-center font-[Finlandica]">
        <button
          className="mr-5 flex items-center justify-between text-gray-50 uppercase bg-black  py-5 px-10 rounded-full "
          onClick={setWatch}
        >
          {startButton ? (
            <BsFillPlayFill className="mr-3" />
          ) : (
            <BsFillPauseFill className="mr-3" />
          )}{" "}
          {startButton ? "Start" : "Pause"}
        </button>

        <button
          className="flex items-center justify-between text-black uppercase bg-gray-200  py-5 px-10 rounded-full "
          onClick={resetWatch}
        >
          <GrPowerReset className="mr-3" /> Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
