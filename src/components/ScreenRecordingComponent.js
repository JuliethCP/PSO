import React, { useState } from "react";


function ScreenRecordingComponent({ switchToAnalysis, startRecordingCallback, stopRecordingCallback }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaChunks = [];
  let mediaRecorder;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          mediaChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const mediaBlob = new Blob(mediaChunks, { type: "video/webm" });
        mediaChunks.length = 0;

        const videoUrl = URL.createObjectURL(mediaBlob);
        const a = document.createElement("a");
        a.href = videoUrl;
        a.download = "captura.mp4";
        a.click();
        URL.revokeObjectURL(videoUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);

      if (startRecordingCallback) {
        startRecordingCallback();
      }
    } catch (error) {
      console.error("Error al acceder a la pantalla o región:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);

      if (stopRecordingCallback) {
        stopRecordingCallback();
      }
    }
  };

  return (
    <div className="ScreenRecordingContainer">
      <h2>Interfaz de Grabación de Pantalla</h2>
      <div className="ButtonContainer">
        <button className="Button" onClick={startRecording} disabled={isRecording}>
          Iniciar Grabación
        </button>
        <button className="Button" onClick={stopRecording} disabled={!isRecording}>
          Detener Grabación
        </button>
        <button className="Button" onClick={switchToAnalysis}>
          Cambiar a Análisis
        </button>
      </div>
    </div>
  );
}

export default ScreenRecordingComponent;
