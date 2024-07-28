import { useEffect, useMemo, useRef } from "react";
import PlayIcon from "../../assets/icons/PlayIcon";
import { Spinner } from "../Spinner";
import { useRendering } from "../../helpers/use-rendering";
import { COMP_NAME } from "../../types/constants";

import cx from "classnames"

const TopPanel = ({
  handleRender,
  renderTimestamp,
  fileName,
  handleChangeFileName,
}) => {
  const fileNameLength = fileName.length;
  const { renderMedia, state } = useRendering(COMP_NAME, {
    renderTimestamp,
  });

  const ref = useRef(null);
  const exportInProgress = state.status === "invoking" || state.status === "rendering"

  useEffect(() => {
    if (state.status === "done") {
      ref.current.click();
    }
  }, [state.status]);

  return (
    <div className="h-12 p-2 fixed w-full bg-zinc-900 border-b border-zinc-700 z-50">
      <label className="flex justify-between items-center h-full">
        <input
          style={{
            minWidth: "200px",
            maxWidth: "1000px",
            width: fileNameLength * 8 + "px",
          }}
          className={`p-1 ml-2 rounded-md bg-transparent text-white focus:outline-none `}
          type="text"
          name="file_name"
          value={fileName}
          onChange={handleChangeFileName}
        />

        <div className="flex gap-2 items-center">
          <button
            onClick={handleRender}
            className="flex items-center gap-1 py-[1px] px-2 bg-zinc-100 rounded"
          >
            <PlayIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm">Render</span>
          </button>

          <div>
            <button
              disabled={exportInProgress}
              onClick={renderMedia}
              className={cx({
                "w-max bg-indigo-600 text-white py-1 px-2 rounded-md flex items-center gap-1": true,
                "opacity-35": exportInProgress
              })}
            >
              {exportInProgress ? (
                <Spinner size={20} />
              ) : null}
              <span className="text-sm">
              {exportInProgress ? "Exporting video..." : "Export Video"}</span>
            </button>
            <a className="hidden" ref={ref} href={state.url} />
          </div>
        </div>
      </label>
    </div>
  );
};

export default TopPanel;
