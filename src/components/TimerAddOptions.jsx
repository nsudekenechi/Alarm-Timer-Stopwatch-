import { HiOutlineChevronRight } from "react-icons/hi";

export default function TimerAddOptions({ option, setGetOption }) {
  const enterOption = () => {
    setGetOption(option.name);
    if (option.name == "Sticker") {
      option.sticker.setSticker((prev) => ({
        ...prev,
        stickerName: option.showTimerAdd.sticker,
      }));
    }
  };
  return (
    <div
      onClick={enterOption}
      className=" p-3  w-[25%] relative bg-white  rounded-2xl shadow-sm hover:shadow-md duration-700   mb-5  grid grid-cols-12 items-center"
    >
      <div className="items-center col-span-6">
        <span className="text-md ">{option.name}</span>
        <p className="text-sm opacity-30">{option.value}</p>
      </div>

      <HiOutlineChevronRight className="text-3xl col-span-6  opacity-10 justify-self-end " />
    </div>
  );
}
