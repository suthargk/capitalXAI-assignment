import TextIcon from "../../../assets/icons/TextIcon";
import MinusIcon from "../../../assets/icons/MinusIcon";
import Animation from "../Animation";
import TimeField from "./TimeField";
import Text from "../Text";
import DurationIcon from "../../../assets/icons/DurationIcon";
import TimeIcon from "../../../assets/icons/TimeIcon";

const TimeStamp = ({
  setTimestampList,
  index,
  timestampItem,
  handleRemoveTimestamp,
}) => {
  const { textValue, startTimestamp, durationTimestamp, animation, font } =
    timestampItem;

  const handleTextValue = (event) => {
    handleChange({ fieldName: "timestampText", value: event.target.value });
  };

  const handleAnimation = (animation) => {
    handleChange({ fieldName: "animation", value: animation });
  };

  const handleStartTimestamp = (e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    handleChange({ fieldName: "startTimestamp", value: Number(value) });
  };

  const handleFont = (newFont) => {
    handleChange({ fieldName: "font", value: { ...font, ...newFont } });
  };

  const handleDurationTimestamp = (e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    handleChange({ fieldName: "durationTimestamp", value: Number(value) });
  };

  const handleChange = ({ fieldName, value }) => {
    setTimestampList((s) =>
      s.map((item) => {
        if (item.id === timestampItem.id) {
          return { ...item, [fieldName]: value };
        } else return item;
      })
    );
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center text-zinc-100">
        <h1 className="text-xs">Timestamp {index + 1}</h1>
        <button
          onClick={() => handleRemoveTimestamp(timestampItem.id)}
          className=" border border-zinc-700 p-0.5 bg-zinc-800 rounded hover:bg-zinc-700 duration-300"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
      </div>
      <label className="w-full text-zinc-100 relative">
        <TextIcon className="absolute top-1 left-1 w-5 h-5 -mr-6 z-10 border border-zinc-700 p-1 rounded" />
        <input
          value={textValue}
          onChange={handleTextValue}
          placeholder={`Timestamp Text ${index + 1}`}
          className="bg-zinc-800 placeholder:text-xs w-full border border-zinc-700 focus:outline-none text-sm py-1 text-zinc-200 px-2 pl-8"
          type="text"
          name={`timestamp_${index}`}
        />
      </label>

      <div className="flex justify-between items-center gap-3">
        <TimeField
          icon={
            <TimeIcon className="absolute top-1 left-1 w-5 h-5 text-zinc-100 p-1 border border-zinc-700 rounded" />
          }
          placeholder="Start timestamp"
          timestamp={startTimestamp}
          handleTimestamp={handleStartTimestamp}
        />
        <TimeField
          placeholder="Duration"
          icon={
            <DurationIcon className="absolute top-1 left-1 w-5 h-5 text-zinc-100 p-1 border border-zinc-700 rounded" />
          }
          timestamp={durationTimestamp}
          handleTimestamp={handleDurationTimestamp}
        />
      </div>

      <div className="flex gap-2">
        <Animation handleAnimation={handleAnimation} animation={animation} />
        <Text font={font} handleFont={handleFont} />
      </div>

      <div></div>
    </div>
  );
};

export default TimeStamp;
