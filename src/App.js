import React, { useEffect, useRef, useState } from "react";
import { useExternalScript } from "./helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "./helpers/ai-sdk/loader";

import './App.css';

import GenderComponent from "./components/GenderComponent";
import AgeComponent from "./components/AgeComponent";
import DominantEmotionComponent from "./components/DominantEmotionComponent";
import FeatureComponent from "./components/FeatureComponent";
import EngagementComponent from "./components/EngagementComponent";
import FaceTrackerComponent from "./components/FaceTrackerComponent";
import MoodComponent from "./components/MoodComponent";
import EmotionBarsComponent from "./components/EmotionBarsComponent";
import ScreenRecordingComponent from "./components/ScreenRecordingComponent";

function App() {
  const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
  const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
  const videoEl = useRef(undefined);
  const [isRecordingScreen, setIsRecordingScreen] = useState(false);
  const [isCameraAccessed, setIsCameraAccessed] = useState(false);

  const switchToRecordingOrAnalysis = () => {
    if (isRecordingScreen) {
      setIsRecordingScreen(false);
      startCameraAccess();
    } else {
      setIsRecordingScreen(true);
      stopCameraAccess();
    }
  };

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
      // Detener el acceso a la cámara
      const tracks = videoEl.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoEl.current.srcObject = null;
      setIsCameraAccessed(false);
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
              <GenderComponent></GenderComponent>
              <hr className="solid" style={{ width: "100%" }}></hr>
              <DominantEmotionComponent></DominantEmotionComponent>
              <hr className="solid" style={{ width: "100%" }}></hr>
              <AgeComponent></AgeComponent>
              <hr className="solid" style={{ width: "100%" }}></hr>
              <FeatureComponent></FeatureComponent>
              <hr className="solid" style={{ width: "100%" }}></hr>
              <EngagementComponent></EngagementComponent>
              <hr className="solid" style={{ width: "100%" }}></hr>
              <MoodComponent></MoodComponent>
              <hr className="solid" style={{ width: "100%" }}></hr>
              <EmotionBarsComponent></EmotionBarsComponent>
              <hr className="solid" style={{ width: "100%" }}></hr>
              <button
                onClick={switchToRecordingOrAnalysis}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  margin: "5px",
                }}
              >
                Cambiar a Grabación / Análisis
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
