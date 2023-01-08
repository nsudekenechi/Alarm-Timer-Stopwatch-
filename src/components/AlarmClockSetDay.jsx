import AlarmClockDay from "./AlarmClockDay";

export default function AlarmClockSetDay({ ShowAlarm, editDay }) {
  let repeatDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div id="setDay" className="mt-5">
      <p>Repeat</p>
      <div className="flex justify-between mt-5">
        {repeatDays.map((item) => (
          <AlarmClockDay
            item={item}
            key={item}
            ShowAlarm={ShowAlarm}
            editDay={editDay != undefined && editDay.includes(item)}
          />
        ))}
      </div>
    </div>
  );
}
