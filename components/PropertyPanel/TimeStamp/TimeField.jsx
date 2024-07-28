const TimeField = ({ placeholder, handleTimestamp, timestamp, icon }) => {
  return (
    <label className="w-1/2 relative">
      <input
        onChange={handleTimestamp}
        value={timestamp}
        type="text"
        placeholder={placeholder}
        className="w-full placeholder:text-xs bg-zinc-800 px-2 pl-8 focus:outline-none text-zinc-100 text-sm p-1"
      />
      {icon}
    </label>
  );
};

export default TimeField;
