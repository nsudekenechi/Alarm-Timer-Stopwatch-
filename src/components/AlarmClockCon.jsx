import { useState } from "react";
import AlarmClock from "./AlarmClock";
import AlarmClockRing from "./AlarmClockRing";
import AlarmClockSaved from "./AlarmClockSaved";

const AlarmClockCon = () => {
  const [showAlarm, setShowAlarm] = useState(false);
  const [showAlarmType, setShowAlarmType] = useState({ type: "", alarm: "" });
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
      id: Math.floor(Math.random() * 10000),
      time: "",
      timeOfDay: "",
      ringtone: "",
      days: [],
      extraDay: "",
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
    if (saveAlarm.days.length <= 0) {
      let day = new Date();
      let currentTime = parseInt(
        `${day.getHours()}${
          day.getMinutes() < 10 ? "0" + day.getMinutes() : day.getMinutes()
        }`
      );
      let alarmTime = parseInt(
        `${
          parseInt(selectedTime[0].innerHTML) < 12 &&
          saveAlarm.timeOfDay == "PM"
            ? parseInt(selectedTime[0].innerHTML) + 12
            : parseInt(selectedTime[0].innerHTML)
        }${selectedTime[1].innerHTML}`
      );
      // If the alarmTime  <= currentTime, we want the alarm to ring tomorrow else we want it to ring today
      if (alarmTime <= currentTime) {
        day = day.getDay() + 1;
        saveAlarm.days.push("Tomorrow");
        saveAlarm.extraDay = repeatDays[day >= repeatDays.length ? 0 : day];
      } else {
        saveAlarm.days.push("Today");
        saveAlarm.extraDay = repeatDays[day.getDay()];
      }
    }
    // Storing Saved Alarm In Localstorage
    if (!localStorage.getItem("savedAlarms")) {
      localStorage.setItem("savedAlarms", JSON.stringify([saveAlarm]));
    } else {
      let savedAlarms = JSON.parse(localStorage.getItem("savedAlarms"));
      savedAlarms.push(saveAlarm);
      localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
    }
    setFromLocalStorage((prevState) => [...prevState, saveAlarm]);

    // Hide Alarm Clock when save is clicked
    setShowAlarm((prevState) => !prevState);
  };

  const handleEditAlarm = (id) => {
    let savedAlarms;
    let selectedTime = document.querySelectorAll("p.text-2xl.time");
    let selectedDays = [...document.querySelectorAll("div.shadow-day")];
    let selectedTimeOfDay = document.querySelector(".text-2xl.timeofday");
    let selectedRingtone = document
      .querySelector("#audioRingtone")
      .src.split("audio/")[1];
    let label = document.querySelector("#label");
    savedAlarms = JSON.parse(localStorage.getItem("savedAlarms")).filter(
      (alarm) => {
        if (alarm.id == id) {
          alarm.time = `${selectedTime[0].innerHTML}:${selectedTime[1].innerHTML}`;
          alarm.timeOfDay = selectedTimeOfDay.innerHTML;
          alarm.ringtone =
            selectedRingtone == undefined ? "" : selectedRingtone;
          alarm.label = label.innerHTML;
          alarm.days = [];
          selectedDays.forEach((day) => {
            alarm.days.push(day.innerHTML);
          });
        }
        return alarm;
      }
    );

    localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
    setFromLocalStorage(savedAlarms);
    // Hide Alarm Clock when save is clicked
    setShowAlarm((prevState) => !prevState);
  };
  const handleDeleteAlarm = (id) => {
    let savedAlarms;
    savedAlarms = JSON.parse(localStorage.getItem("savedAlarms")).filter(
      (item) => item.id != id
    );
    localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));
    setFromLocalStorage(savedAlarms);
    // Hide Alarm Clock when delete is clicked
    setShowAlarm((prevState) => !prevState);
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
          handleEditAlarm={handleEditAlarm}
          handleDeleteAlarm={handleDeleteAlarm}
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
