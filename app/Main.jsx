import { useEffect, useRef, useState } from "react";
import MainPanel from "../components/MainPanel";
import PropertyPanel from "../components/PropertyPanel";
import TopPanel from "../components/TopPanel";

function Main() {
  const [fileName, setFileName] = useState("My Video");
  const [isPropertyPanelVisible, setIsPropertyPanelVisible] = useState(false);
  const [timestampList, setTimestampList] = useState([]);
  const [renderTimestamp, setRenderTimestamp] = useState([]);

  const playerRef = useRef(null);

  const handleAddTimestamp = () => {
    setTimestampList([
      ...timestampList,
      {
        id: new Date().getTime(),
        startTimestamp: "",
        durationTimestamp: "",
        animation: "Fade In",
        timestamp: "",
        font: {
          italic: false,
          bold: false,
          fontFamily: "Serif",
        },
      },
    ]);
  };

  const handleChangeFileName = (e) => {
    setFileName(e.target.value);
  };

  const handleRender = () => {
    const filteredRenderTimestamp = timestampList.filter(
      (item) =>
        item.timestampText && item.startTimestamp && item.durationTimestamp
    );

    setRenderTimestamp(filteredRenderTimestamp);

    playerRef.current.play()
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    if (window.innerWidth >= 1023) setIsPropertyPanelVisible(true);

    window.addEventListener("resize", () => {
      const width = window.innerWidth;

      if (width >= 1023) {
        setIsPropertyPanelVisible(true);
      }
    });

    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <div className="">
      <TopPanel
        handleRender={handleRender}
        renderTimestamp={renderTimestamp}
        fileName={fileName}
        handleChangeFileName={handleChangeFileName}
      />
      <MainPanel
        isPropertyPanelVisible={isPropertyPanelVisible}
        renderTimestamp={renderTimestamp}
        playerRef={playerRef}
      />

      <PropertyPanel
        setIsPropertyPanelVisible={setIsPropertyPanelVisible}
        handleAddTimestamp={handleAddTimestamp}
        timestampList={timestampList}
        setTimestampList={setTimestampList}
        isPropertyPanelVisible={isPropertyPanelVisible}
      />
    </div>
  );
}

export default Main;
