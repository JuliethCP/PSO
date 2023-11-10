import React, { useEffect, useRef } from "react";
import { Source } from "./Source";
import "./componentCSS/faceTrackerComponent.css";

function FaceTrackerComponent({ videoEl, onFaceDetection }) {
  const timeout = useRef(undefined);
  const faceTracker = useRef(undefined);
  const sdk_w = useRef(undefined);
  const sdk_h = useRef(undefined);

  useEffect(() => {
    faceTracker.current = document.querySelector("#faceTracker");
    if (videoEl && faceTracker.current) {
      bindEvent();
    }

    function bindEvent() {
      window.addEventListener("CY_FACE_DETECTOR_RESULT", handleFaceEvents);
      window.addEventListener("CY_CAMERA_RESULT", setSdkDimensions);
    }

    function handleFaceEvents(evt) {
      if (evt.detail && evt.detail.rects && evt.detail.rects.length > 0) {
        // Resto de tu lógica para mostrar el recuadro amarillo

        // Envía una señal de detección de rostro al componente padre
        onFaceDetection(true);
      } else {
        // Si no se detecta un rostro, envía una señal al componente padre
        onFaceDetection(false);
      }
    }

    function setSdkDimensions(evt) {
      sdk_w.current = evt.detail.width;
      sdk_h.current = evt.detail.height;
    }

    function resetTimeout() {
      let to = timeout.current;
      clearTimeout(to);
      to = setTimeout(() => {
        setAllToZero();
      }, 3000);

      timeout.current = to;
    }

    function setAllToZero() {
      faceTracker.current.style.display = "none";
    }
  }, [videoEl]);

  return (
    <div id="faceTrackerContainer">
      <div id="faceTracker"></div>
    </div>
  );
}

export default FaceTrackerComponent;
