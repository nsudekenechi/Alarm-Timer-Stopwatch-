import { useState } from "react";
import { VscCompassActive } from "react-icons/vsc";

export default function AlarmClockSaved({ savedAlarms, alarm }) {
  let [alarmState, setAlarmState] = useState(savedAlarms.active);
  const disableAlarm = () => {
    let newAlarms = [];
    // Looping through localstorage to change activeof alarm to false
    JSON.parse(localStorage.getItem("savedAlarms")).map((item) => {
      if (item.id == savedAlarms.id) {
        item.active = !item.active;
      }
      newAlarms.push(item);
    });
    localStorage.setItem("savedAlarms", JSON.stringify(newAlarms));
    setAlarmState((prevState) => !prevState);
  };

  return (
    <>
      <div
        className={`bg-white p-5 rounded-2xl shadow-md hover:shadow-lg duration-700 cursor-pointer  h-[120px] mb-5 laps ${
          alarmState ? "" : "opacity-70"
        }`}
      >
        <div className="flex justify-end justify-self-end m-0 p-0 ">
          <VscCompassActive
            className={` ${
              alarmState ? "text-blue-500" : "text-gray-300"
            } hover:text-gray-300  duration-700 rounded-full  ${
              alarmState ? "" : "text-gray-300"
            }`}
            onClick={disableAlarm}
          />
        </div>
        <div className="font-bold uppercase flex">
          <h1 className={` text-3xl ${alarmState ? "" : "text-gray-300"}`}>
            {savedAlarms.time}
          </h1>
          <span
            className={`ml-1  ${
              alarmState ? "text-blue-500" : "text-gray-300"
            }`}
          >
            {savedAlarms.timeOfDay}
          </span>
        </div>
        <p className={`text-sm mt-1 ${alarmState ? "" : "text-gray-300"}`}>
          {savedAlarms.days.join(",")}
        </p>
      </div>
    </>
  );
}
