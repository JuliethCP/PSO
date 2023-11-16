import React, { useEffect, useRef, useState } from "react";
import { useExternalScript } from "./helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "./helpers/ai-sdk/loader";
import ScreenRecordingComponent from "./components/ScreenRecordingComponent";
import FaceTrackerComponent from "./components/FaceTrackerComponent";

function App() {
  const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
  const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
  const videoEl = useRef(undefined);
  const [isRecordingScreen, setIsRecordingScreen] = useState(false);
  const [isCameraAccessed, setIsCameraAccessed] = useState(false);

  const startCameraAccess = async () => {
    if (!isRecordingScreen) {
      videoEl.current = document.getElementById("videoEl");
      if (aiSdkState === "ready" && mphToolsState === "ready") {
        const { source, start } = await getAiSdkControls();
        await source.useCamera({
          toVideoElement: document.getElementById("videoEl"),
        });
        await start();
        setIsCameraAccessed(true);
      }
    }
  };

  const stopCameraAccess = () => {
    if (isCameraAccessed) {
      const tracks = videoEl.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoEl.current.srcObject = null;
      setIsCameraAccessed(false);
    }
  };

  const switchToRecordingOrAnalysis = () => {
    if (isRecordingScreen) {
      setIsRecordingScreen(false);
      startCameraAccess();
    } else {
      setIsRecordingScreen(true);
      stopCameraAccess();
    }
  };

  useEffect(() => {
    startCameraAccess();
  }, [aiSdkState, mphToolsState]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {isRecordingScreen ? (
            <ScreenRecordingComponent switchToAnalysis={switchToRecordingOrAnalysis} />
          ) : (
            <>
              <div style={{ width: "640px", height: "480px", position: "relative" }}>
                <video id="videoEl"></video>
                <FaceTrackerComponent videoEl={videoEl}></FaceTrackerComponent>
              </div>
              <button onClick={switchToRecordingOrAnalysis}>Cambiar a Grabación / Análisis</button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
