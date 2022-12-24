import { useState } from "react";
import AlarmClock from "./AlarmClock";
import AlarmClockRing from "./AlarmClockRing";
import AlarmClockSaved from "./AlarmClockSaved";

const AlarmClockCon = () => {
  const [showAlarm, setShowAlarm] = useState(false);
  const [showAlarmType, setShowAlarmType] = useState({ type: "", id: "" });
  let [fromLocalStorage, setFromLocalStorage] = useState(
    localStorage.getItem("savedAlarms")
      ? JSON.parse(localStorage.getItem("savedAlarms"))
      : []
  );
  let repeatDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let localStorageAlarms = fromLocalStorage.map((item) => (
    <AlarmClockSaved
      savedAlarms={item}
      key={item.id}
      alarm={{ setShowAlarmType, setShowAlarm }}
    />
  ));
  const handleSaveAlarm = () => {
    const saveAlarm = {
      id: localStorage.getItem("savedAlarms")
        ? JSON.parse(localStorage.getItem("savedAlarms")).length + 1
        : 1,
      time: "",
      timeOfDay: "",
      ringtone: "",
      days: [],
      label: "",
      active: true,
    };
    // Getting data from HTML Elements
    let selectedTime = document.querySelectorAll("p.text-2xl.time");
    let selectedDays = document.querySelectorAll("div.shadow-day");
    let selectedTimeOfDay = document.querySelector(".text-2xl.timeofday");
    let selectedRingtone = document
      .querySelector("#audioRingtone")
      .src.split("audio/")[1];
    let label = document.querySelector("#label");
    // Storing data in an Object so we can pass it down to a state
    saveAlarm.time = `${selectedTime[0].innerHTML}:${selectedTime[1].innerHTML}`;
    saveAlarm.timeOfDay = selectedTimeOfDay.innerHTML;
    saveAlarm.ringtone = selectedRingtone == undefined ? "" : selectedRingtone;
    saveAlarm.label = label.innerHTML;
    selectedDays.forEach((day) => {
      saveAlarm.days.push(day.innerHTML);
    });
    // Setting alarm as tomorrow if user doesn't select any day
    saveAlarm.days.length <= 0
      ? saveAlarm.days.push("Tomorrow")
      : saveAlarm.days;
    // Hide Alarm Clock when save is clicked
    setShowAlarm((prevState) => !prevState);
    // Storing Saved Alarm In Localstorage
    if (!localStorage.getItem("savedAlarms")) {
      localStorage.setItem("savedAlarms", JSON.stringify([saveAlarm]));
    } else {
      let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
      savedAlarms.push(saveAlarm);
      localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
    }
    setFromLocalStorage((prevState) => [...prevState, saveAlarm]);
  };

  const handleDeleteAllAlarms = () => {
    localStorage.removeItem("savedAlarms");
    setFromLocalStorage((prevState) => []);
  };

  return (
    <div className="container mx-auto  py-20">
      <div className="grid grid-cols-12">
        <AlarmClock
          handleSaveAlarm={handleSaveAlarm}
          handleDeleteAllAlarms={handleDeleteAllAlarms}
          showAlarm={{ showAlarm, setShowAlarm }}
          alarmType={{ setShowAlarmType, showAlarmType }}
        />
        <div className="col-span-2 overflow-y-auto h-[350px]" id="savedAlarms">
          {localStorageAlarms}
          <AlarmClockRing />
        </div>
      </div>
    </div>
  );
};
export default AlarmClockCon;
