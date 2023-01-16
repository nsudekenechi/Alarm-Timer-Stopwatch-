import Timer from "./Timer";
import { IoMdAdd, IoMdPlay, IoMdRepeat, IoMdPause } from "react-icons/io";
import { BiStop } from "react-icons/bi";
import TimerAdd from "./TimerAdd";
import TimerSaved from "./TimerSaved";
export default function TimerSet({ timer, sticker, savedTimer }) {
  return (
    <>
      <div className=" col-span-10">
        <div
          className={`${
            timer.showTimer.clock ? "hidden" : ""
          } flex items-center justify-center gap-10 py-10`}
        >
          <Timer
            timer={timer.timer.hours}
            timerType={"h"}
            handleTimer={timer}
          />
          <Timer
            timer={timer.timer.minutes}
            timerType={"m"}
            handleTimer={timer}
          />
          <Timer
            timer={timer.timer.seconds}
            timerType={"s"}
            handleTimer={timer}
          />
        </div>

        <div className={`${timer.showTimer.clock ? "" : "hidden"} `}>
          <div className="flex justify-center">
            <div className=" h-[300px] w-[300px]  rounded-full grid place-items-center shadow-md  bg-white relative ">
              <div className="grid place-items-center h-[80%] w-[80%] rounded-full  shadow-2xl relative">
                <img src="./images/clock.png" alt="" />
                <img
                  src="./images/clockhand2.png"
                  className="absolute rounded-full h-[100%]"
                  style={{
                    rotate: `${timer.timerValues.rotateClock * 6}deg`,
                    transition: "linear 1s",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5 gap-2">
            <h1 className={`text-4xl  `}>
              {timer.timerValues.hours < 10
                ? `0${timer.timerValues.hours}`
                : timer.timerValues.hours}
            </h1>
            <h1 className={`text-4xl  `}>
              {`: ${
                timer.timerValues.minutes < 10
                  ? `0${timer.timerValues.minutes}`
                  : timer.timerValues.minutes
              } :`}
            </h1>
            <h1 className={`text-4xl  `}>
              {timer.timerValues.seconds < 10
                ? `0${timer.timerValues.seconds}`
                : timer.timerValues.seconds}
            </h1>
          </div>
        </div>

        <div
          className={`${
            !timer.showAddTimer.show ? "" : "hidden"
          } flex justify-center gap-10 items-center mt-10 `}
        >
          <div
            className={`h-[70px] w-[70px] bg-gray-300 rounded-full  flex justify-center items-center cursor-pointer ${
              !timer.showTimer.clock ? "" : "hidden"
            } `}
            onClick={timer.showAdd}
          >
            <IoMdAdd className="text-2xl" />
          </div>

          <div
            className="h-[50px] w-[50px] bg-blue-500 rounded-full  shadow-md shadow-blue-600 flex justify-center items-center cursor-pointer text-white"
            onClick={() =>
              !timer.showTimer.button
                ? timer.startTimer()
                : timer.showTimer.button != "stop"
                ? timer.pauseTimer()
                : timer.stopTimer()
            }
          >
            {!timer.showTimer.button ? (
              <IoMdPlay className="text-md" />
            ) : timer.showTimer.button != "stop" ? (
              <IoMdPause className="text-md" />
            ) : (
              <BiStop className="text-3xl" />
            )}
          </div>
          <IoMdRepeat
            className={`text-3xl cursor-pointer ${
              timer.showTimer.clock
                ? !timer.timerValues.wasPaused
                  ? "opacity-10"
                  : "text-blue-500"
                : ""
            }`}
            onClick={timer.timerValues.wasPaused ? timer.resetTimer : null}
            style={{ transition: `${timer.timerValues.wasPaused ? "1s" : ""}` }}
          />
        </div>
        <TimerAdd
          showTimerAdd={timer.showAddTimer}
          setShowTimer={timer.setshowAddTimer}
          hideAdd={timer.hideAdd}
          sticker={sticker}
          savedTimer={savedTimer}
        />
      </div>

      <div
        className={`col-span-2 grid grid-cols-12 h-fit gap-y-10 ${
          !timer.showAddTimer.show ? "" : "hidden"
        }  ${!timer.showTimer.clock ? "" : "hidden"} `}
      >
        {savedTimer.savedTimers.map((item) => (
          <TimerSaved
            key={item.id}
            timer={{
              id: item.id,
              name: item.timerName,
              sticker:
                sticker.stickers.stickerIcon[
                  sticker.stickers.stickerNames.indexOf(item.stickerName)
                ],
              time: item.timer,
              handleSetTimer: savedTimer.handleSetTimer,
              handleDeleteTimer: savedTimer.handleDeleteTimer,
              handleSetEditTimer: savedTimer.handleSetEditTimer,
              clicked: item.clicked,
            }}
          />
        ))}
      </div>
    </>
  );
}
