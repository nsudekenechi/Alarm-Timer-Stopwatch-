import { useEffect, useState } from "react";

export default function AlarmClockDay({ item, ShowAlarm }) {
  const [selectedDay, setSelectedDay] = useState(false);
  const selectDay = () => {
    setSelectedDay((prevState) => !prevState);
  };
  useEffect(() => {
    setSelectedDay(false);
  }, [ShowAlarm]);
  return (
    <div
      key={item}
      className={`flex justify-center items-center border  border-blue-700 h-[50px] w-[50px] rounded-full  text-xs cursor-pointer  ${
        selectedDay ? "bg-blue-700 text-black shadow-day" : ""
      }`}
      onClick={() => selectDay(item)}
    >
      {item}
    </div>
  );
}
