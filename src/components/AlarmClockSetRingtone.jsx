import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
export default function AlarmClockSetRingtone(ShowAlarm) {
  const [showLabel, setShowLabel] = useState(false);
  const ringtones = [
    "Sunshine",
    "Beauty",
    "Morning Breeze",
    "Cupcake",
    "Marimba",
    "Mid Summer",
    "Pluto",
    "Dawn",
  ].sort();

  const [selectedRingtone, setSelectedRingtone] = useState("");
  const radioButtons = document.querySelectorAll("input[type='radio']");
  const [ringtone, setRingtone] = useState("");
  const audio = document.querySelector("audio");
  const stopAudio = () => {
    audio.load();
    audio.autoplay = false;
  };
  const handleSetRingtone = () => {
    const input = document.querySelector("input:checked");
    setSelectedRingtone(input != null ? input.value : "");
    setShowLabel((prevState) => !prevState);
    stopAudio();
  };
  const handleShowRingtone = () => {
    setShowLabel((prevState) => !prevState);
  };
  const handleCancelRingtone = () => {
    setShowLabel((prevState) => !prevState);
    stopAudio();
  };
  radioButtons.forEach((button, index) => {
    button.onclick = () => {
      if (button.checked) {
        setRingtone(index + 1);
        audio.load();
        audio.autoplay = true;
      }
    };
  });
  // Removing checkbox on radio
  useEffect(() => {
    radioButtons.forEach((button) => {
      button.checked = false;
    });
  }, [ShowAlarm]);
  return (
    <div className="flex justify-between my-10">
      <h1>Ringtone</h1>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleShowRingtone}
      >
        <h1 className="mr-3 text-gray-300 font-light" id="ringtone">
          {selectedRingtone}
        </h1>
        <IoIosArrowForward className="" />
      </div>

      <div
        className={`${
          showLabel ? "animateShow" : "animateHidden "
        } absolute top-0  h-[100%] w-[100%] flex flex-col py-10`}
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="flex justify-center w-[50%] my-5">
          <h1 className="text-gray-300">Alarm Sound</h1>
        </div>
        <div
          className="h-[300px]  overflow-y-auto w-[90%] "
          id="ringtoneScroll"
        >
          {ringtones.map((item) => (
            <div className="w-[100%]  flex justify-center" key={item}>
              <div className="flex justify-between  w-[50%] my-3">
                <h1 className="text-xl">{item}</h1>
                <input type="radio" className="" name="sound" value={item} />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-[25%] bottom-[10%] gap-5 w-[20%] grid grid-cols-12">
          <button
            className="bg-blue-600 hover p-2  col-span-6 block rounded-md"
            onClick={handleSetRingtone}
          >
            Ok
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 p-2  col-span-6 block rounded-md"
            onClick={handleCancelRingtone}
          >
            Cancel
          </button>
          <audio
            src={ringtone ? `./audio/${ringtone}.mp3` : ""}
            loop
            id="audioRingtone"
          ></audio>
        </div>
      </div>
    </div>
  );
}
