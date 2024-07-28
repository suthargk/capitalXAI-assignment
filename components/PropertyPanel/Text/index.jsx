import { useEffect, useState } from "react";
import BoldIcon from "../../../assets/icons/BoldIcon";
import ItalicIcon from "../../../assets/icons/ItalicIcon";
import Font from "./Font";

const Text = ({ font, handleFont }) => {
  const [fonts] = useState([
    { fontFamily: "Sans", italic: false, bold: false },
    { fontFamily: "Mono", italic: false, bold: false },
    { fontFamily: "Serif", italic: false, bold: false },
  ]);

  const [isBold, setIsBold] = useState(font.bold);
  const [isItalic, setIsItalic] = useState(font.italic);

  useEffect(() => {
    handleFont({ ...font, bold: isBold, italic: isItalic });
  }, [isBold, isItalic]);

  return (
    <div className="flex gap-2 w-1/2">
      <Font fonts={fonts} font={font} handleFont={handleFont} />
      <button
        onClick={() => setIsBold(!isBold)}
        className={`${
          isBold ? "bg-zinc-700" : ""
        } text-zinc-100 p-1 border border-zinc-700`}
      >
        <BoldIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setIsItalic(!isItalic)}
        className={`${
          isItalic ? "bg-zinc-700" : ""
        } text-zinc-100 p-1 border border-zinc-700`}
      >
        <ItalicIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Text;
