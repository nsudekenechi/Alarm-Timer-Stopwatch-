import { useState } from "react";
export default function ({
  setShowAlarm,
  setShowAlarmType,
  handleDeleteAllAlarms,
  alarmType,
}) {
  let [date, setDate] = useState(new Date());
  let [clockHand, setClockHand] = useState({
    minute: date.getMinutes(),
    hour: date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
    hourMove: 30,
    displayHours: [],
    displayMinutes: [],
  });
  const updateTime = () => {
    let date = new Date();
    setClockHand((prevState) => ({
      ...prevState,
      minute: date.getMinutes(),
      hour: date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
    }));
    requestAnimationFrame(updateTime);
  };
  requestAnimationFrame(updateTime);
  const showAlarmClock = () => {
    setShowAlarm((prevState) => !prevState);
    // Specifying that user wants to add
    alarmType((prev) => ({ ...prev, alarm: "", type: "Add" }));
  };

  return (
    <>
      <div className="flex justify-center">
        <div className=" h-[300px] w-[300px]  rounded-full grid place-items-center shadow-md  bg-white relative ">
          <div className="grid place-items-center h-[80%] w-[80%] rounded-full  shadow-2xl relative">
            <img src="./images/clock.png" alt="" />
            <img
              src="./images/clockhand2.png"
              style={{
                rotate: `${clockHand.hour * clockHand.hourMove}deg`,
                height: "80%",
              }}
              className="absolute rounded-full"
            />
            <img
              src="./images/clockhand2.png"
              className="absolute rounded-full"
              style={{ rotate: `${clockHand.minute * 6}deg` }}
            />
          </div>
        </div>
      </div>
      <div className="mt-10   flex justify-center font-[Finlandica]">
        <button
          className="mr-5 flex items-center justify-between text-gray-50 uppercase bg-black  py-3 px-10 rounded-full "
          onClick={showAlarmClock}
        >
          Add
        </button>

        <button
          className="flex items-center justify-between text-black uppercase bg-gray-200  py-3 px-10 rounded-full "
          onClick={handleDeleteAllAlarms}
        >
          Delete All
        </button>
      </div>
    </>
  );
}
