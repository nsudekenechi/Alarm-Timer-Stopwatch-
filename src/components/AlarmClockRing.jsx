import { useEffect, useRef, useState } from "react";
import { BiAlarmOff, BiAlarmSnooze, BiAlarm } from "react-icons/bi";
export default function AlarmClockRing() {
  let repeatDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let today = repeatDays[new Date().getDay()];
  let [time, setTime] = useState(new Date());
  let getTodayAlarm = [];
  let [audio, setAudio] = useState({
    src: "",
  });
  let [showAlarm, setShowAlarm] = useState(false);
  let [alarms, setAlarms] = useState([]);
  let notification;

  useEffect(() => {
    let id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("savedAlarms")) {
      readyAlarm();
    }
  }, [time]);

  const readyAlarm = () => {
    // Getting Items that are supposed to ring today
    JSON.parse(localStorage.getItem("savedAlarms")).map((item) => {
      if (item.extraDay == "") {
        item.days.forEach((item2) => {
          if (item2 == today) {
            getTodayAlarm.push(item);
          }
        });
      } else {
        if (item.extraDay == today) {
          getTodayAlarm.push(item);
        }
      }
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
    let AMPM = date.getHours() >= 12 ? "PM" : "AM";
    let currentTime = `${hour}:${minutes}${AMPM}`;

    getTodayAlarm.forEach((day, index) => {
      setAlarms((prev) => {
        let uniqueItem = [];
        // Making sure items do not duplicate
        return [...prev, { id: day.id, ringing: false }].filter((item) => {
          if (!uniqueItem.includes(item.id)) {
            uniqueItem.push(item.id);
            return true;
          }
        });
      });
      let alarmTime = `${day.time}${day.timeOfDay}`;

      if (alarmTime == currentTime && day.active) {
        alarms.forEach((alarm) => {
          if (alarm.id == day.id && alarm.ringing == false) {
            // Returning ringing to true so that we dont have to replay alarm when dismiss button is clicked
            ringAlarm(day);
            setAlarms((prev) => {
              return [...prev].filter((item) => {
                if (item.id == alarm.id) {
                  item.ringing = true;
                }
                return item;
              });
            });
          }
        });
      }
    });
  };

  const ringAlarm = (day) => {
    setShowAlarm(true);
    setAudio((prevState) => ({
      ...prevState,
      src: day.ringtone == "" ? "1.mp3" : day.ringtone,
    }));

    // Displaying Notification for Alarm
    Notification.requestPermission((perm) => {
      if (perm == "granted") {
        new Notification("yooo", {
          body: "Noooo",
        });
      }
    });

    // Stopping Alarm after 30sec
    setTimeout(() => {
      dismissAlarm();
    }, 30000);
  };

  const dismissAlarm = () => {
    // Hiding alarm banner
    setShowAlarm(false);
    setAudio((prevState) => ({
      ...prevState,
      src: "",
    }));
    // notification.close();
  };

  return (
    <>
      <div
        className={`z-50 fixed w-[100%] h-[100%] grid top-0 left-0 bg-black place-items-center ${
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
