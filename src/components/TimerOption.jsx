import { useRef } from "react";

export default function TimerOption({ option }) {
  const input = useRef(null);
  const selectSticker = (id) => {
    let name;
    option.sticker.setSticker((prev) => {
      let items = { ...prev };
      items.selectedSticker.filter((item) => {
        if (item.id == id) {
          item.selected = true;
          name = item.stickerName;
        } else {
          item.selected = false;
        }
        return true;
      });
      return items;
    });

    option.sticker.setSticker((prev) => ({ ...prev, stickerName: name }));
  };
  const setOption = () => {
    if (option.getOption != "Sticker") {
      option.setShowTimer((prev) => ({
        ...prev,
        name:
          input.current.value != ""
            ? input.current.value
            : option.sticker.stickers.stickerName,
      }));
    } else {
      option.setShowTimer((prev) => ({
        ...prev,
        sticker: option.sticker.stickers.stickerName,
      }));
    }
    option.setGetOption("");
  };
  const cancelOption = () => {
    if (option.getOption == "Sticker") {
      option.sticker.setSticker((prev) => {
        let items = { ...prev };
        items.selectedSticker.filter((item) => {
          if (item.stickerName == option.showTimerAdd.sticker) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          return true;
        });
        return items;
      });

      option.sticker.setSticker((prev) => ({
        ...prev,
        stickerName: option.showTimerAdd.sticker,
      }));
    } else {
      input.current.value = "";
      option.setShowTimer((prev) => ({
        ...prev,
        name:
          input.current.value != ""
            ? input.current.value
            : option.sticker.stickers.stickerName,
      }));
    }
    option.setGetOption("");
  };

  return (
    <div
      className={`${
        option.getOption == "" ? "hidden" : ""
      } fixed top-0 left-0 w-[100%] h-[100%] flex items-end justify-center z-50`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0,0,0,.3)" }}
      id="timerOption"
    >
      <div className="bg-white h-[35%] w-[50%] bottom-[5%] relative rounded-lg p-10">
        <p className="text-xl">
          {option.getOption != "Sticker"
            ? option.getOption
            : option.sticker.stickers.stickerName}
        </p>
        {option.getOption != "Sticker" && (
          <input
            type="text"
            className="border-b outline-none my-10 w-[100%] py-2"
            ref={input}
          />
        )}

        {option.getOption == "Sticker" && (
          <div className="grid grid-cols-12 gap-5 py-5">
            {option.sticker.stickers.stickerIcon.map((item, index) => (
              <div
                key={index}
                className={`${
                  option.sticker.stickers.selectedSticker[index].selected
                    ? "text-blue-500 outline outline-1 "
                    : ""
                } bg-white rounded-md  flex items-center justify-center shadow-md p-5 text-2xl col-span-2`}
                onClick={() => selectSticker(index)}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between">
          <button
            className="uppercase font-bold opacity-20"
            onClick={cancelOption}
          >
            Cancel
          </button>
          <button
            className="uppercase font-bold text-blue-500"
            onClick={setOption}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
