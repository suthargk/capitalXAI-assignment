import { useEffect, useState } from "react";
import DownChevron from "../../../assets/icons/DownChevron";

const FontItem = ({ handleFont, fontFamily }) => {
  return (
    <div
      onClick={() => handleFont({ fontFamily })}
      className="p-1 px-2 text-zinc-100 text-xs hover:bg-zinc-700 cursor-pointer"
    >
      {fontFamily}
    </div>
  );
};

const Font = ({ font, fonts, handleFont }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    
    window.addEventListener("click", () => setShowDropdown(false));

    return () =>
      window.removeEventListener("click", () => {
        setShowDropdown(false);
      });
  }, []);

  return (
    <div className="w-1/2 relative cursor-pointer min-w-20">
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDropdown(true);
        }}
        className="p-1 px-2 flex justify-between items-center text-zinc-100 text-xs border border-zinc-700"
      >
        <h2>{font.fontFamily ? font.fontFamily : "select font"}</h2>
        <DownChevron className="w-4 h-4 text-zinc-500" />
      </div>
      {showDropdown && (
        <div className="absolute z-50 top-7 bg-zinc-800 border border-zinc-700 w-full left-0 shadow-2xl">
          {fonts.map((fontItem) => {
            return (
              <FontItem
                key={fontItem.fontFamily}
                fontFamily={fontItem.fontFamily}
                handleFont={handleFont}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Font;
