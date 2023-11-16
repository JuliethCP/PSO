/*
import React, { useEffect, useRef } from "react";
import { getAiSdkControls } from "../helpers/ai-sdk";

const FaceTrackerComponent = (props) => {
  const faceTracker = useRef(undefined);

  useEffect(() => {
    faceTracker.current = document.querySelector("#faceTracker");

    async function initializeFaceDetection() {
      // Obtener los controles del SDK
      const { getModule, source, CY } = await getAiSdkControls();

      // Obtener el módulo de detección de rostros
      const faceDetector = getModule(CY.modules().FACE_DETECTOR.name);

      // Iniciar la detección de rostros en el video element proporcionado
      await source.useVideoElement(props.videoEl);

      // Suscribirse al evento de resultados de la detección de rostros
      source.getCurrentSource().onFaceDetected((result) => {
        handleFaceDetectionResult(result);
      });

      // Iniciar la detección de rostros
      faceDetector.start();
    }

    initializeFaceDetection();

    
  }, [props.videoEl]);

  const handleFaceDetectionResult = (result) => {
    if (result && result.faces && result.faces.length > 0) {
      // Aquí puedes procesar la información de los rostros detectados
      const firstFace = result.faces[0];
      const { x, y, width, height } = firstFace;

      // Actualizar la posición y dimensiones del cuadro de seguimiento
      faceTracker.current.style.display = "block";
      faceTracker.current.style.width = `${width}px`;
      faceTracker.current.style.height = `${height}px`;
      faceTracker.current.style.top = `${y}px`;
      faceTracker.current.style.left = `${x}px`;
    } else {
      // Ocultar el cuadro de seguimiento si no se detecta ningún rostro
      faceTracker.current.style.display = "none";
    }
  };

  return (
    <>
      <div id="faceTrackerContainer">
        <div id="faceTracker"></div>
      </div>
    </>
  );
};

export default FaceTrackerComponent;
*/