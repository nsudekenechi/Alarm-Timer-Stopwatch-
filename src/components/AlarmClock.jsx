import { useState } from "react";
import AlarmClockSetDay from "./AlarmClockSetDay";
import AlarmClockSetLabel from "./AlarmClockSetLabel";
import AlarmClockSetRingtone from "./AlarmClockSetRingtone";
import AlarmClockSetTime from "./AlarmClockSetTime";
import AlarmClockAnalog from "./AlarmClockAnalog";
const AlarmClock = ({ handleSaveAlarm, showAlarm, handleDeleteAllAlarms }) => {
  return (
    <div className="col-span-10">
      <AlarmClockAnalog
        setShowAlarm={showAlarm.setShowAlarm}
        handleDeleteAllAlarms={handleDeleteAllAlarms}
      />
      <div
        className={`z-10 absolute w-[100%] h-[100%] top-0 left-0  ${
          showAlarm.showAlarm ? "" : "hidden"
        }`}
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div
          className={`relative  w-[80%] h-[90%] bg-black overflow-hidden top-[5%] left-[10%] rounded-lg shadow-xl   text-white py-10 px-[5%] `}
        >
          <AlarmClockSetTime ShowAlarm={showAlarm} />

          <AlarmClockSetDay ShowAlarm={showAlarm.showAlarm} />
          <AlarmClockSetRingtone ShowAlarm={showAlarm.showAlarm} />
          <AlarmClockSetLabel ShowAlarm={showAlarm.showAlarm} />
          <div className="w-[100%] py-10 flex justify-center gap-x-5">
            <button
              className="w-[40%] bg-blue-600  p-2  col-span-6 block rounded-md"
              onClick={handleSaveAlarm}
            >
              Save
            </button>
            {/* <button className="w-[40%] bg-red-600  p-2  col-span-6 block rounded-md">
              Delete
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlarmClock;
