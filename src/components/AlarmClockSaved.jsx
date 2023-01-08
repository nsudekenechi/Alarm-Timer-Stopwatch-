import { useState } from "react";
import { VscCompassActive } from "react-icons/vsc";

export default function AlarmClockSaved({ alarm, savedAlarms }) {
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

  const showAlarm = () => {
    let editAlarm;
    // Showing alarm
    alarm.setShowAlarm((prev) => !prev);
    // Defining if user wants to edit alarm

    // Getting Item to be editted
    JSON.parse(localStorage.getItem("savedAlarms")).forEach((item) => {
      if (item.id == savedAlarms.id) {
        // setItemToEdit(item);
        editAlarm = item;
      }
    });
    alarm.setShowAlarmType((prev) => ({
      ...prev,
      type: "edit",
      alarm: editAlarm,
    }));
  };

  return (
    <>
      <div
        className={`relative bg-white m-0 p-0  rounded-2xl shadow-md hover:shadow-lg duration-700 cursor-pointer  h-[120px] mb-5 laps ${
          alarmState ? "" : "opacity-70"
        }`}
      >
        <div
          className=" flex justify-end justify-self-end m-0 p-4 right-0 absolute z-10 "
          onClick={disableAlarm}
        >
          <VscCompassActive
            className={` ${
              alarmState ? "text-blue-500" : "text-gray-300"
            } hover:text-gray-300  duration-700 rounded-full  ${
              alarmState ? "" : "text-gray-300"
            }`}
          />
        </div>
        <div className=" p-5 relative h-[100%]" onClick={showAlarm}>
          <div className="flex font-bold uppercase my-3">
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
      </div>
    </>
  );
}
