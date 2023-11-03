import React, { useState } from "react";
import "./componentCSS/ScreenRecordingComponent.css"

function ScreenRecordingComponent({ switchToAnalysis }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaChunks = [];
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaStream(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          mediaChunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const mediaBlob = new Blob(mediaChunks, { type: "video/webm" });
        mediaChunks.length = 0;

        // Convertir el fragmento de video a mp4 y guardar
        const videoUrl = URL.createObjectURL(mediaBlob);
        const a = document.createElement("a");
        a.href = videoUrl;
        a.download = "captura.mp4"; // Cambia el nombre del archivo si es necesario
        a.click();
        URL.revokeObjectURL(videoUrl);
      };

      recorder.start();
      setIsRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error al acceder a la pantalla o región:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaStream) {
      mediaRecorder.stop();
      mediaStream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="ScreenRecordingContainer">
      <h2>Interfaz de Grabación de Pantalla</h2>
      <video className="VideoPreview" id="preview" autoPlay></video>
      <div className="ButtonContainer">
        <button
          className="Button"
          id="startRecording"
          onClick={startRecording}
          disabled={isRecording}
        >
          Iniciar Grabación
        </button>
        <button
          className="Button"
          id="stopRecording"
          onClick={stopRecording}
          disabled={!isRecording}
        >
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
