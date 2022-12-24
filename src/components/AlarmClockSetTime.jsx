import AlarmClockDisplayTime from "./AlarmClockDisplayTime";
import AlarmClockSetRingtone from "./AlarmClockSetRingtone";
import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";

export default function AlarmClockSetTime({ ShowAlarm }) {
  let date = new Date();
  // Hour and Minute
  let alarmHour = [];
  let alarmMinute = [];
  let [clockHand, setClockHand] = useState({
    minute: date.getMinutes(),
    hour: date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
    hourMove: 30,
    displayHours: [],
    displayMinutes: [],
  });
  let time = {
    hour: clockHand.hour,
    minute: clockHand.minute,
  };

  // AM and PM
  let bool = true;

  let [AM_PM_BOOL, set_AM_PM_Bool] = useState(true);
  let [AM_PM, setAM_PM] = useState({
    //Applying class bold on AM when hours is <= 12
    active:
      date.getHours() <= 11
        ? "text-2xl  font-bold  "
        : "text-md  font-bold text-gray-300 ",

    inactive:
      date.getHours() <= 11
        ? "text-md  font-bold text-gray-300"
        : "text-2xl  font-bold  ",
  });
  const changeAmToPM = () => {
    set_AM_PM_Bool((prevState) => !prevState);
    setAM_PM((prevState) => ({
      ...prevState,
      active: AM_PM_BOOL
        ? "text-2xl  font-bold alarm-active"
        : "text-md  font-bold text-gray-300 alarm-inactive",
      inactive: AM_PM_BOOL
        ? "text-md  font-bold text-gray-300 alarm-inactive"
        : "text-2xl  font-bold alarm-active ",
    }));
  };

  for (let i = 0; i < 60; i++) {
    if (i > 0 && i <= 12) {
      alarmHour.push(i);
    }
    alarmMinute.push(i);
  }
  const decrementMinute = () => {
    time.minute -= 1;
    time.minute = time.minute >= 0 ? time.minute : alarmMinute.length - 1;

    setClockHand((prevTime) => ({ ...prevTime, minute: time.minute }));
    displayMinutes(time.minute);
  };
  const incrementMinute = () => {
    time.minute += 1;
    time.minute = time.minute <= 59 ? time.minute : 0;

    setClockHand((prevTime) => ({ ...prevTime, minute: time.minute }));
    displayMinutes(time.minute);
  };
  const decrementHour = () => {
    time.hour -= 1;
    time.hour = time.hour > 0 ? time.hour : alarmHour.length;
    setClockHand((prevTime) => ({ ...prevTime, hour: time.hour }));
    displayHours(time.hour);
  };
  const incrementHour = () => {
    time.hour += 1;
    time.hour = time.hour <= 12 ? time.hour : 1;
    setClockHand((prevTime) => ({
      ...prevTime,
      hour: time.hour,
    }));

    displayHours(time.hour);
  };
  const displayHours = (time) => {
    let index = alarmHour.indexOf(time) - 2; //Subtracting 2 from original index so it gets 2 items before index
    let hours;
    // Checking if index does not return a negative number after dividing by 2

    if (index >= 0) {
      hours =
        time <= 10
          ? alarmHour.slice(index, index + 5)
          : alarmHour
              .slice(index, index + 5)
              .concat(alarmHour.slice(0, index - 7));
    } else {
      hours = alarmHour.slice(index).concat(alarmHour.slice(0, index - 7));
    }
    setClockHand((prevTime) => ({ ...prevTime, displayHours: hours }));
  };
  const displayMinutes = (time) => {
    let index = alarmMinute.indexOf(time) - 2;
    let minutes;
    if (index >= 0) {
      minutes =
        time <= 57
          ? alarmMinute.slice(index, index + 5)
          : alarmMinute
              .slice(index, index + 5)
              .concat(alarmMinute.slice(0, index - 55));
    } else {
      minutes = alarmMinute
        .slice(index)
        .concat(alarmMinute.slice(0, index - 55));
    }

    setClockHand((prevTime) => ({ ...prevTime, displayMinutes: minutes }));
  };

  const closeAlarmClock = () => {
    // Closing AlarmClock
    ShowAlarm.setShowAlarm((prevState) => !prevState);
    // Reseting Values
  };
  useEffect(() => {
    // Setting current hour and minute based on when user clicks button
    let date = new Date();
    let hours =
      date.getHours() > 12
        ? date.getHours() - 12
        : date.getHours() == 0
        ? 12
        : date.getHours();

    displayHours(hours);
    displayMinutes(date.getMinutes());
    setClockHand((prevState) => ({
      ...prevState,
      minute: date.getMinutes(),
      hour: hours,
    }));
  }, [ShowAlarm.showAlarm]);
  return (
    <>
      <GiCancel
        className=" absolute top-3 right-[5%] text-2xl cursor-pointer  text-gray-50 hover:text-white"
        onClick={closeAlarmClock}
      />
      <div id="setTime" className="flex justify-around text-center ">
        <AlarmClockDisplayTime
          clockHand={{
            displayTime: clockHand.displayHours,
            time: clockHand.hour,
            incrementTime: incrementHour,
            decrementTime: decrementHour,
            type: "hour",
          }}
        />
        <AlarmClockDisplayTime
          clockHand={{
            displayTime: clockHand.displayMinutes,
            time: clockHand.minute,
            incrementTime: incrementMinute,
            decrementTime: decrementMinute,
            type: "minute",
          }}
        />

        <div className="" onClick={changeAmToPM}>
          <div className="h-[100%] grid content-around">
            <p className={`${AM_PM.active} timeofday`}>AM</p>
            <p className={`${AM_PM.inactive} timeofday`}>PM</p>
          </div>
        </div>
      </div>
    </>
  );
}
