import { useEffect, useState } from "react";
import DownChevron from "../../../assets/icons/DownChevron";

const AnimationItem = ({ handleAnimation, animationItem }) => {
  return (
    <div
      onClick={() => handleAnimation(animationItem)}
      className="p-1 px-2 text-zinc-100 text-xs hover:bg-zinc-700 cursor-pointer"
    >
      {animationItem}
    </div>
  );
};

const Animation = ({ handleAnimation, animation }) => {
  const [animationList] = useState(["Fade In", "Slide In"]);
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
    <div className="w-1/2 relative cursor-pointer">
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDropdown(true);
        }}
        className="p-1 px-2 flex justify-between items-center text-zinc-100 text-xs border border-zinc-700"
      >
        <h2>{animation ? animation : "Animation"}</h2>
        <DownChevron className="w-4 h-4 text-zinc-500" />
      </div>
      {showDropdown && (
        <div className="absolute z-50 top-7 bg-zinc-800 border border-zinc-700 w-full left-0 shadow-2xl">
          {animationList.map((animationItem) => {
            return (
              <AnimationItem
                key={animationItem}
                animationItem={animationItem}
                handleAnimation={handleAnimation}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Animation;
