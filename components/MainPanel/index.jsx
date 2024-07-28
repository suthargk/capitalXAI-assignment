/* eslint-disable react/display-name */
import { Player } from "@remotion/player";
import Composition from "../Composition";
import { memo } from "react";
import { COMP_NAME } from "../../types/constants";

const MainPanel = memo(
  ({ playerRef, isPropertyPanelVisible, renderTimestamp }) => {
    return (
      <div
        className={`${
          isPropertyPanelVisible ? "w-3/4" : "w-full"
        }  h-screen flex items-center justify-center bg-zinc-900`}
      >
        <div className="rounded-md overflow-hidden w-full flex justify-center">
          <Player
            ref={playerRef}
            component={(props) => (
              <Composition
                {...props}
                id={COMP_NAME}
                renderTimestamp={renderTimestamp}
              />
            )}
            className="rounded-lg overflow-hidden"
            compositionWidth={800}
            compositionHeight={450}
            controls
            durationInFrames={30 * 60}
            fps={60}
          />
        </div>
      </div>
    );
  }
);

export default MainPanel;
