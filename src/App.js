import React, { useEffect, useRef, useState } from "react";
import { useExternalScript } from "./helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "./helpers/ai-sdk/loader";

import ScreenCaptureComponent from "./components/ScreenCaptureComponent"; // Asegúrate de importar el componente

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
  // Cargar scripts externos y obtener su estado
  const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
  const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
  
  // Crear referencias a elementos del DOM
  const videoEl = useRef(undefined);
  
  // Estado para el modo de grabación de pantalla y acceso a la cámara
  const [isRecordingScreen, setIsRecordingScreen] = useState(false);
  const [isCameraAccessed, setIsCameraAccessed] = useState(false);

  // Función para cambiar entre grabación y análisis
  const switchToRecordingOrAnalysis = () => {
    if (isRecordingScreen) {
      setIsRecordingScreen(false);
      startCameraAccess(); // Iniciar acceso a la cámara
    } else {
      setIsRecordingScreen(true);
      stopCameraAccess(); // Detener acceso a la cámara
    }
  };

  // Función para iniciar el acceso a la cámara
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

  // Función para detener el acceso a la cámara
  const stopCameraAccess = () => {
    if (isCameraAccessed) {
      // Detener el acceso a la cámara
      const tracks = videoEl.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoEl.current.srcObject = null;
      setIsCameraAccessed(false);
    }
  };

  // Efecto para iniciar el acceso a la cámara y cargar scripts externos
  useEffect(() => {
    startCameraAccess();
  }, [aiSdkState, mphToolsState]);

  // Renderizar la interfaz de la aplicación
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {isRecordingScreen ? (
            // Componente de grabación de pantalla
            <ScreenRecordingComponent switchToAnalysis={switchToRecordingOrAnalysis} />
          ) : (
            <>
              <div style={{ width: "640px", height: "480px", position: "relative" }}>
                {/* Elemento de video principal */}
                <video id="videoEl"></video>
                <FaceTrackerComponent videoEl={videoEl}></FaceTrackerComponent>
              </div>
              {/* Otros componentes de la aplicación */}
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
          <div className="App">
      <header className="App-header">
        <h1>Grabación de Pantalla en Tiempo Real</h1>
        <ScreenCaptureComponent />
      </header>
    </div>
        </div>
      </header>
    </div>
  );

 
}

export default App;



