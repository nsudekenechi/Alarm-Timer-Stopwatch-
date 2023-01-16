import { useContext, useState } from "react";
import TimerAddOptions from "./TimerAddOptions";
import TimerOption from "./TimerOption";
import { BsArrowLeft } from "react-icons/bs";
export default function TimerAdd({
  showTimerAdd,
  setShowTimer,
  hideAdd,
  sticker,
  savedTimer,
}) {
  const [getOption, setGetOption] = useState("");

  return (
    <>
      <div
        className={`${
          !showTimerAdd.show ? "hidden" : "flex"
        }  justify-center gap-10`}
      >
        <TimerAddOptions
          option={{ name: "Timer name", value: showTimerAdd.name }}
          setGetOption={setGetOption}
        />
        <TimerAddOptions
          option={{
            name: "Sticker",
            value: showTimerAdd.sticker,
            sticker,
            showTimerAdd,
          }}
          setGetOption={setGetOption}
        />
        <TimerOption
          option={{
            getOption,
            setGetOption,
            setShowTimer,
            showTimerAdd,
            sticker,
          }}
        />
      </div>

      <div
        className={`${
          !showTimerAdd.show ? "hidden" : "flex"
        }  justify-center gap-60 my-10`}
      >
        <button
          className="uppercase font-bold opacity-20 text-3xl"
          onClick={hideAdd}
        >
          <BsArrowLeft />
        </button>
        <button
          className="uppercase font-bold text-blue-500"
          onClick={
            !showTimerAdd.isEdit
              ? savedTimer.handleSaveTimer
              : savedTimer.handleEditTimer
          }
        >
          {!showTimerAdd.isEdit ? "Save" : "Edit"}
        </button>
      </div>
    </>
  );
}
