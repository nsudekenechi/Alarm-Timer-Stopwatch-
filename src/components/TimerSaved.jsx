import { useState } from "react";
import { BiTimer, BiEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";

export default function TimerSaved({ timer }) {
  return (
    <div className="col-span-6   h-fit p-2">
      <div
        onClick={() => {
          timer.handleSetTimer(timer.id);
        }}
        className={`rounded-full w-[100px] h-[100px] ${
          !timer.clicked ? "bg-gray-200" : "bg-blue-50 text-blue-500"
        } flex flex-col justify-center items-center p-5 cursor-pointer relative text-3xl`}
      >
        {timer.sticker}
        <h1 className="text-sm">{timer.name}</h1>
        <p className="text-xs opacity-30">{`${
          timer.time.hours < 10 ? `0${timer.time.hours}` : timer.time.hours
        }:${
          timer.time.minutes < 10
            ? `0${timer.time.minutes}`
            : timer.time.minutes
        }:${
          timer.time.seconds < 10
            ? `0${timer.time.seconds}`
            : timer.time.seconds
        }`}</p>

        <div
          className={`absolute h-[100%] w-[100%] ${
            !timer.clicked ? "hidden" : "flex"
          } justify-center items-center  p-3 gap-2`}
        >
          <div
            className="rounded-full w-[40%] h-[40%] text-white flex justify-center items-center "
            style={{ background: "rgba(0,0,0,.3)" }}
            onClick={() => timer.handleSetEditTimer(timer.id)}
          >
            <BiEdit className="text-sm" />
          </div>
          <div
            className={`rounded-full w-[40%] h-[40%] text-white flex  justify-center items-center `}
            style={{ background: "rgba(0,0,0,.3)" }}
            onClick={() => timer.handleDeleteTimer(timer.id)}
          >
            <RiDeleteBinFill className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
