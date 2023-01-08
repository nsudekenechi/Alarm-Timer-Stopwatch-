import { useEffect, useState } from "react";
import AlarmClockSetDay from "./AlarmClockSetDay";
import AlarmClockSetLabel from "./AlarmClockSetLabel";
import AlarmClockSetRingtone from "./AlarmClockSetRingtone";
import AlarmClockSetTime from "./AlarmClockSetTime";
import AlarmClockAnalog from "./AlarmClockAnalog";
const AlarmClock = ({
  handleSaveAlarm,
  handleDeleteAllAlarms,
  handleEditAlarm,
  handleDeleteAlarm,
  showAlarm,
  alarmType,
}) => {
  return (
    <div className="col-span-10">
      <AlarmClockAnalog
        setShowAlarm={showAlarm.setShowAlarm}
        handleDeleteAllAlarms={handleDeleteAllAlarms}
        alarmType={alarmType.setShowAlarmType}
      />
      <div
        className={`z-50 absolute w-[100%] h-[100%] top-0 left-0  ${
          showAlarm.showAlarm ? "" : "hidden"
        }`}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div
          className={`relative  w-[80%] h-[90%] bg-black overflow-hidden top-[5%] left-[10%] rounded-lg shadow-xl   text-white py-10 px-[5%] `}
        >
          <AlarmClockSetTime
            ShowAlarm={showAlarm}
            editTime={`${alarmType.showAlarmType.alarm.time}:${alarmType.showAlarmType.alarm.timeOfDay}`}
          />

          <AlarmClockSetDay
            ShowAlarm={showAlarm.showAlarm}
            editDay={alarmType.showAlarmType.alarm.days}
          />
          <AlarmClockSetRingtone
            ShowAlarm={showAlarm.showAlarm}
            editRingtone={alarmType.showAlarmType.alarm.ringtone}
          />
          <AlarmClockSetLabel
            ShowAlarm={showAlarm.showAlarm}
            editLabel={alarmType.showAlarmType.alarm.label}
          />
          <div className="w-[100%] py-10 flex justify-center gap-x-5">
            <button
              className="w-[40%] bg-blue-600  p-2  col-span-6 block rounded-md"
              onClick={
                alarmType.showAlarmType.type != "edit"
                  ? handleSaveAlarm
                  : () => handleEditAlarm(alarmType.showAlarmType.alarm.id)
              }
            >
              {alarmType.showAlarmType.type != "edit" ? "Save" : "Edit"}
            </button>
            {alarmType.showAlarmType.type == "edit" && (
              <button
                className="w-[40%] bg-red-600  p-2  col-span-6 block rounded-md"
                onClick={() =>
                  handleDeleteAlarm(alarmType.showAlarmType.alarm.id)
                }
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlarmClock;
