import { BiCaretUp, BiCaretDown } from "react-icons/bi";

export default function Timer({ timer, timerType, handleTimer }) {
  return (
    <div className="flex gap-5 justify-center">
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-3">
          <div>
            {timer.map((time, index) => (
              <h1
                className={`text-6xl mb-5 ${
                  index == 1 ? "text-bold" : "opacity-20 text-gray"
                }`}
                key={time}
              >
                {time < 10 ? `0${time}` : time}
              </h1>
            ))}
          </div>
          <span className="text-2xl">{timerType}</span>
        </div>
        <div>
          <BiCaretUp
            className="text-2xl opacity-20  hover:opacity-100 cursor-pointer"
            onClick={() => handleTimer.decrementTimer(timerType)}
          />
          <BiCaretDown
            className="text-2xl opacity-20 hover:opacity-100 cursor-pointer"
            onClick={() => handleTimer.incrementTimer(timerType)}
          />
        </div>
      </div>
    </div>
  );
}
