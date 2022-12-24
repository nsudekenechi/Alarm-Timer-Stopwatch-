import { useEffect, useRef, useState } from "react";
import { BiAlarmOff, BiAlarmSnooze, BiAlarm } from "react-icons/bi";
export default function AlarmClockRing() {
  let repeatDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let today = repeatDays[new Date().getDay()];
  let getTodayAlarm = [];
  let [audio, setAudio] = useState({
    src: "",
  });

  let [UpdateTime, setUpdateTime] = useState(false);
  let [showAlarm, setShowAlarm] = useState(false);
  let id = setInterval(() => {
    if (localStorage.getItem("savedAlarms")) {
      readyAlarm();
    }
  }, 100);

  const readyAlarm = () => {
    // Getting Items that are supposed to ring today
    JSON.parse(localStorage.getItem("savedAlarms")).map((item) => {
      item.days.forEach((item2) => {
        if (item2 == today) {
          getTodayAlarm.push(item);
        }
      });
    });

    // Checking if alarm time is == current time
    checkAlarmTime();
  };

  const checkAlarmTime = () => {
    let date = new Date();
    let hour =
      date.getHours() > 12
        ? date.getHours() - 12
        : date.getHours() == 0
        ? 12
        : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let AMPM = date.getHours() > 12 ? "PM" : "AM";
    let time = `${hour}:${minutes}${AMPM}`;

    getTodayAlarm.forEach((day) => {
      let alarmTime = `${day.time}${day.timeOfDay}`;

      if (alarmTime == time && day.active) {
        ringAlarm(day.ringtone);
      }
    });
  };

  const ringAlarm = (ringtone) => {
    setShowAlarm(true);
    setAudio((prevState) => ({
      ...prevState,
      src: ringtone == "" ? "1.mp3" : ringtone,
    }));
  };

  const dismissAlarm = () => {
    clearInterval(id);
    // Hiding alarm banner
    setShowAlarm(false);
    setAudio((prevState) => ({
      ...prevState,
      src: "",
    }));
  };

  return (
    <>
      <div
        className={`fixed w-[100%] h-[100%] grid top-0 left-0 bg-black place-items-center ${
          showAlarm ? "" : "hidden"
        }`}
      >
        <div className=" h-[150px] object-cover">
          <img
            src="./images/alarm.png"
            alt=""
            className="w-[100%] h-[100%] alarmRotate"
          />
        </div>
        <div className="grid gap-5 w-[40%]">
          <button className="bg-blue-500 text-white p-5 rounded-md flex justify-center items-center">
            <BiAlarmSnooze className="mr-3" />
            Snooze
          </button>
          <button
            className="bg-red-600 text-white p-5 rounded-md flex justify-center items-center"
            onClick={dismissAlarm}
          >
            <BiAlarmOff className="mr-3" />
            Dismiss
          </button>
        </div>
        <audio
          src={`./audio/${audio.src}`}
          loop={showAlarm}
          autoPlay={showAlarm}
        />
      </div>
    </>
  );
}
