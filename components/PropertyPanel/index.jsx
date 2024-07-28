import TimeStamp from "./TimeStamp";
import PlusIcon from "../../assets/icons/PlusIcon";
import Text2Icon from "../../assets/icons/Text2Icon";
import CloseIcon from "../../assets/icons/CloseIcon";
import DownChevron from "../../assets/icons/DownChevron";

const PropertyPanel = ({
  timestampList,
  setTimestampList,
  handleAddTimestamp,
  setIsPropertyPanelVisible,
  isPropertyPanelVisible,
}) => {
  const handleRemoveTimestamp = (id) => {
    setTimestampList((prev) => {
      return prev.filter((timestampItem) => timestampItem.id !== id);
    });
  };

  return (
    <div
      className={`w-full ${
        isPropertyPanelVisible ? "h-full top-0 right-0" : "h-10 left-0 bottom-0"
      } mt-12 pb-0 lg:pb-24 lg:w-1/4 min-w-[400px] fixed  bg-zinc-900 border-l border-zinc-700`}
    >
      <div
        onClick={() => setIsPropertyPanelVisible(!isPropertyPanelVisible)}
        className={`flex lg:hidden text-white items-center ${
          isPropertyPanelVisible ? "justify-end" : "justify-center"
        } p-1 w-full`}
      >
        {isPropertyPanelVisible ? (
          <CloseIcon className="w-6 h-6" />
        ) : (
          <div className="text-center flex items-center gap-2 p-2 px-4 border border-zinc-700 shadow-2xl rounded">
            <DownChevron className="w-5 h-5 rotate-180" />
            <span>Property Panel</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-2 text-zinc-100  border-b border-zinc-700">
        <div className="text-sm flex gap-2 items-center">
          <Text2Icon className="w-6 h-6" />
          <h2>Timestamp</h2>
        </div>
        <button
          onClick={handleAddTimestamp}
          className="border border-zinc-700 p-0.5 bg-zinc-800 rounded hover:bg-zinc-700 duration-300"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      {timestampList.length ? (
        <div className="p-2 flex flex-col gap-4 h-full overflow-y-auto overflow-x-hidden">
          {timestampList.map((timestampItem, index) => {
            return (
              <TimeStamp
                key={timestampItem.id}
                index={index}
                timestampItem={timestampItem}
                handleRemoveTimestamp={handleRemoveTimestamp}
                setTimestampList={setTimestampList}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <h1 className="flex gap-2 text-zinc-500">
            Click on{" "}
            <button onClick={handleAddTimestamp}>
              <PlusIcon className="border border-zinc-700 p-0.5 bg-zinc-800 rounded hover:bg-zinc-700 duration-300" />
            </button>{" "}
            to add timestamp
          </h1>
        </div>
      )}
    </div>
  );
};

export default PropertyPanel;
