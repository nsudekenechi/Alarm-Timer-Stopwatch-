import { useEffect, useState } from "react";
import TimerSet from "./TimerSet";
import { BiTimer } from "react-icons/bi";
import { GiNightSleep, GiWhirlpoolShuriken } from "react-icons/gi";
import { CgGym, CgWorkAlt, CgTimer } from "react-icons/cg";
export default function TimerCon() {
  const [timer, setTimer] = useState({
    hours: [],
    minutes: [],
    seconds: [],
  });
  let collectedTime = {
    hours: [],
    minutes: [],
    seconds: [],
  };
  let [index, setIndex] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  let extraIndex = {
    hours: index.hours,
    minutes: index.minutes,
    seconds: index.seconds,
  };
  let [showTimer, setShowTimer] = useState({
    clock: false,
    button: false,
  });
  let [timerValues, setTimerValues] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    rotateClock: 0,
    wasPaused: false,
    timerInterval: "",
    timeInSeconds: 0,
  });
  let [endTimer, setEndTimer] = useState(false);
  const [showAddTimer, setshowAddTimer] = useState({
    isEdit: false,
    timerID: "",
    show: false,
    name: "Timer",
    sticker: "Timer",
  });
  let [savedTimers, setSavedTimers] = useState(
    localStorage.getItem("savedTimers")
      ? JSON.parse(localStorage.getItem("savedTimers"))
      : []
  );
  // Sticker for Add Timer
  let items = [],
    stickerNames = ["Timer", "Sleep", "Gym", "Work", "Mindfulness", "Meeting"];
  // Setting every sticker to false since they are not clicked, also setting Sticker's Name
  stickerNames.forEach((icon, index) => {
    items.push({
      selected: index == 0 ? true : false,
      id: index,
      stickerName: stickerNames[index],
    });
  });
  const [stickers, setSticker] = useState({
    stickerIcon: [
      <BiTimer />,
      <GiNightSleep />,
      <CgGym />,
      <CgWorkAlt />,
      <CgTimer />,
      <GiWhirlpoolShuriken />,
    ],
    selectedSticker: items,
    stickerName: "Timer",
    stickerNames: ["Timer", "Sleep", "Gym", "Work", "Mindfulness", "Meeting"],
  });
  // Pushing time hours = 0 to 23,minutes = 0 to 59,seconds = 0 to 59
  for (let i = 0; i < 60; i++) {
    if (i < 24) {
      collectedTime.hours.push(i);
    }
    collectedTime.minutes.push(i);
    collectedTime.seconds.push(i);
  }
  // Timer Handlers
  const decrementTimer = (timerType) => {
    let timer;

    if (timerType == "h") {
      timer = setDecrementingTimer(extraIndex.hours, collectedTime.hours);
      extraIndex.hours = timer.index;
    } else if (timerType == "m") {
      timer = setDecrementingTimer(extraIndex.minutes, collectedTime.minutes);
      extraIndex.minutes = timer.index;
    } else {
      timer = setDecrementingTimer(extraIndex.seconds, collectedTime.seconds);
      extraIndex.seconds = timer.index;
    }

    setIndex((prev) => ({
      ...prev,
      hours: extraIndex.hours,
      minutes: extraIndex.minutes,
      seconds: extraIndex.seconds,
    }));

    displayTime(timer.start, timer.end, timer.arr, timerType);
  };

  const incrementTimer = (timerType) => {
    let timer;

    if (timerType == "h") {
      timer = setIncrementingTimer(extraIndex.hours, collectedTime.hours);
      extraIndex.hours = timer.index;
    } else if (timerType == "m") {
      timer = setIncrementingTimer(extraIndex.minutes, collectedTime.minutes);
      extraIndex.minutes = timer.index;
    } else {
      timer = setIncrementingTimer(extraIndex.seconds, collectedTime.seconds);
      extraIndex.seconds = timer.index;
    }
    setIndex((prev) => ({
      ...prev,
      hours: extraIndex.hours,
      minutes: extraIndex.minutes,
      seconds: extraIndex.seconds,
    }));

    displayTime(timer.start, timer.end, timer.arr, timerType);
  };

  const displayTime = (start, end, arr, timerType) => {
    let time;
    if (start == 0) {
      //When opened for the first we want it to display like this=> [23,00,01] and when user clicks increment button
      time = arr.slice(arr.length - 1).concat(start, end);
    } else if (start > 0) {
      //[22,23,00]
      time =
        start == arr.length - 1
          ? (time = arr.slice(start - 1, end + 1).concat(arr.slice(0, 1)))
          : arr.slice(start - 1, end + 1);
    } else {
      // Timer starts from the end i.e [23,22,21] and when user clicks decrement
      if (start == -1) {
        time = [...arr]
          .sort((a, b) => b - a)
          .slice(0, 2)
          .sort()
          .concat(arr.slice(0, 1));
      } else {
        time =
          Math.abs(start) <= 2
            ? [...arr]
                .sort((a, b) => b - a)
                .slice(Math.abs(start) - 2, Math.abs(start) + 1)
                .sort()
            : arr.slice(start - 1, start + 2); //At  some point start returns negative, abs is to remove negative
      }
    }
    if (timerType == "h") {
      setTimer((prev) => ({ ...prev, hours: time }));
    } else if (timerType == "m") {
      setTimer((prev) => ({ ...prev, minutes: time }));
    } else {
      setTimer((prev) => ({ ...prev, seconds: time }));
    }
  };

  const setIncrementingTimer = (arr1, arr2) => {
    let index, arr;
    arr1 += 1;
    index = arr1 >= arr2.length ? (arr1 = 0) : arr1;
    arr = arr2;

    return {
      start: index,
      end: index + 1,
      index,
      arr,
    };
  };

  const setDecrementingTimer = (arr1, arr2) => {
    let index, arr;
    arr1 -= 1;
    index = Math.abs(arr1) >= arr2.length ? (arr1 = 0) : arr1;
    arr = arr2;

    return {
      start: index,
      end: index + 1,
      index,
      arr,
    };
  };

  const startTimer = () => {
    // Initializing Timer Values
    // Here array[1] means select the middle number eg: [5,6,7] here 6 is the middle number and 6 has index
    let stopTimer =
      timerValues.seconds + timerValues.minutes * 60 + timerValues.hours * 3600;
    // Coverting time to seconds so we stop timer when converted time is 0

    if (timerValues.timeInSeconds >= 5) {
      let checkSeconds = timerValues.seconds;
      let checkMinutes = timerValues.minutes;
      let checkHours = timerValues.hours;

      let timetoDecrease = 59;

      let id = setInterval(() => {
        checkSeconds =
          stopTimer > 0 ? (checkSeconds > 0 ? checkSeconds - 1 : 59) : 0;

        if (checkMinutes > 0) {
          timetoDecrease = checkMinutes < 2 || checkHours < 1 ? 59 : 0;

          checkMinutes =
            checkSeconds == timetoDecrease ? checkMinutes - 1 : checkMinutes; // reducing one from check minutes when seconds = 59
        } else {
          if (checkSeconds == 59 && checkMinutes == 0 && timer.hours[1] > 0) {
            checkMinutes = 59;
          }
        }
        // Reducing Hours by 1 anytime minute Hits 59
        if (checkHours > 0 && checkMinutes == 59) {
          checkHours = checkHours - 1;
        }

        setTimerValues((prev) => ({
          ...prev,
          rotateClock: stopTimer >= 0 ? prev.rotateClock - 1 : prev.rotateClock,
          seconds: checkSeconds,
          minutes: checkMinutes,
          hours: checkHours,
        }));

        stopTimer -= 1;
        // Stopping Timer when time is reached
        if (stopTimer <= 0) ring(id);
      }, 1000);

      setShowTimer((prev) => ({
        ...prev,
        clock: true,
        button: true,
      }));

      setTimerValues((prev) => ({
        ...prev,
        timerInterval: id,
        wasPaused: false,
      }));
    }

    // setshowAddTimer((prev) => ({ ...prev, show: !prev.show }));
  };

  const pauseTimer = () => {
    setTimerValues((prev) => ({ ...prev, wasPaused: true }));
    setShowTimer((prev) => ({ ...prev, button: false }));
    clearInterval(timerValues.timerInterval);
  };

  const resetTimer = () => {
    setTimer((prev) => ({
      ...prev,
      hours: prev.hours,
      minutes: prev.minutes,
      seconds: prev.seconds,
    }));
  };

  const stopTimer = () => {
    let audio = document.querySelector("audio");
    audio.load();
    setEndTimer((prev) => !prev);
  };

  const ring = (id) => {
    let audio = document.querySelector("audio");
    audio.play();
    setShowTimer((prev) => ({ ...prev, button: "stop" }));

    clearInterval(id);
  };

  const showAdd = () => {
    setshowAddTimer((prev) => ({
      ...prev,
      show: !prev.show,
      isEdit: false,
      timerID: "",
    }));
    // Reseting Timer so everything starts from 0
    setEndTimer((prev) => !prev);
  };

  const hideAdd = () => {
    setshowAddTimer((prev) => ({ ...prev, show: !prev.show }));
  };

  // Saving Timer
  const handleSaveTimer = () => {
    // Making Sure timer is greater than 5 seconds
    if (timerValues.timeInSeconds >= 5) {
      let savedTimer = {
        id: Math.floor(Math.random() * 1000),
        timerName: showAddTimer.name,

        stickerName: stickers.stickerName,
        timer: {
          hours: timerValues.hours,
          minutes: timerValues.minutes,
          seconds: timerValues.seconds,
        },
        clicked: false,
      };

      setshowAddTimer((prev) => ({ ...prev, show: false }));
      setSavedTimers((prev) => [...prev, savedTimer]);
      setEndTimer((prev) => !prev);

      // Storing in local storage when local storage is empty
      if (!localStorage.getItem("savedTimers")) {
        localStorage.setItem("savedTimers", JSON.stringify([savedTimer]));
      } else {
        let savedTimers = JSON.parse(localStorage.getItem("savedTimers"));
        localStorage.setItem(
          "savedTimers",
          JSON.stringify([...savedTimers, savedTimer])
        );
      }
    }
  };

  // Setting timer to the time of saved timer that was clicked
  const handleSetTimer = (id) => {
    setSavedTimers((prev) => {
      let savedTimers = [...prev];
      savedTimers.filter((item) => {
        if (item.id == id) {
          item.clicked = true;
          // Displaying timer based on value of saved timer that was clicked
          displayTime(
            item.timer.hours,
            item.timer.hours + 1,
            collectedTime.hours,
            "h"
          );
          displayTime(
            item.timer.minutes,
            item.timer.minutes + 1,
            collectedTime.minutes,
            "m"
          );
          displayTime(
            item.timer.seconds,
            item.timer.seconds + 1,
            collectedTime.seconds,
            "s"
          );
          // Setting Index Of Clicked Timer
          setIndex((prev) => ({
            ...prev,
            hours: item.timer.hours,
            minutes: item.timer.minutes,
            seconds: item.timer.seconds,
          }));
        } else {
          item.clicked = false;
        }
        return true;
      });
      return savedTimers;
    });
  };

  // Deleting Saved Timer
  const handleDeleteTimer = (id) => {
    let timers = [...savedTimers].filter((item) => item.id != id);
    setSavedTimers(timers);
    localStorage.setItem("savedTimers", JSON.stringify(timers));
    // Reseting Timer so everything starts from 0
    setEndTimer((prev) => !prev);
  };

  // Setting Timer when already saved timer is clicked
  const handleSetEditTimer = (id) => {
    // Displaying Add Timers
    setshowAddTimer((prev) => ({
      ...prev,
      show: !prev.show,
      isEdit: true,
      timerID: id,
    }));
    // Getting Timer to be editted
    setSavedTimers((prev) => {
      let savedTimers = [...prev];
      savedTimers.filter((item) => {
        if (item.id == id) {
          setshowAddTimer((prev) => ({
            ...prev,
            name: item.timerName,
            sticker: item.stickerName,
          }));
        }
        return true;
      });
      return savedTimers;
    });
  };

  //Editting Saved Timer
  const handleEditTimer = () => {
    let timers = [...savedTimers].filter((item) => {
      if (item.id == showAddTimer.timerID) {
        item.timerName = showAddTimer.name;

        item.stickerName = stickers.stickerName;
        item.timer = {
          hours: timerValues.hours,
          minutes: timerValues.minutes,
          seconds: timerValues.seconds,
        };
      }
      item.clicked = false;
      return true;
    });
    setSavedTimers(timers);
    localStorage.setItem("savedTimers", JSON.stringify(timers));
    setshowAddTimer((prev) => ({ ...prev, show: false }));
    setEndTimer((prev) => !prev);
  };
  useEffect(() => {
    // Initializing Variables
    displayTime(0, 1, collectedTime.hours, "h");
    displayTime(0, 1, collectedTime.minutes, "m");
    displayTime(0, 1, collectedTime.seconds, "s");
    setTimerValues((prev) => ({
      ...prev,
      hours: 0,
      minutes: 0,
      seconds: 0,
      rotateClock: 0,
      wasPaused: false,
      timerInterval: "",
    }));
    setShowTimer((prev) => ({ ...prev, button: false, clock: false }));

    setIndex((prev) => ({ ...prev, hours: 0, minutes: 0, seconds: 0 }));
  }, [endTimer]);

  useEffect(() => {
    setTimerValues((prev) => ({
      ...prev,
      hours: timer.hours[1],
      minutes: timer.minutes[1],
      seconds: timer.seconds[1],
      rotateClock: timer.seconds[1],
      timeInSeconds:
        timer.seconds[1] + timer.minutes[1] * 60 + timer.hours[1] * 3600,
    }));
  }, [timer]);

  return (
    <div className="container mx-auto  pt-10 relative">
      <div className="grid grid-cols-12">
        <TimerSet
          timer={{
            timer,
            decrementTimer,
            incrementTimer,
            startTimer,
            pauseTimer,
            resetTimer,
            stopTimer,
            setshowAddTimer,
            showAdd,
            hideAdd,
            showAddTimer,
            showTimer,
            timerValues,
          }}
          sticker={{
            stickers,
            setSticker,
          }}
          savedTimer={{
            savedTimers,
            handleSaveTimer,
            handleSetTimer,
            handleDeleteTimer,
            handleSetEditTimer,
            handleEditTimer,
          }}
        />

        <audio src="./audio/3.mp3" loop />
      </div>
    </div>
  );
}
