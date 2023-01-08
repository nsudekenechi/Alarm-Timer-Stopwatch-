import { useEffect, useState } from "react";

export default function AlarmClockDay({ item, ShowAlarm, editDay }) {
  const [selectedDay, setSelectedDay] = useState(false);
  const selectDay = () => {
    setSelectedDay((prevState) => !prevState);
  };
  useEffect(() => {
    setSelectedDay(editDay);
  }, [ShowAlarm]);
  return (
    <div
      className={`flex justify-center items-center border  border-blue-700 h-[50px] w-[50px] rounded-full  text-xs cursor-pointer  ${
        selectedDay ? "bg-blue-700 text-black shadow-day" : ""
      }`}
      onClick={() => selectDay()}
    >
      {item}
    </div>
  );
}
