import React, { useState } from 'react';

const EmotionAnalysisComponent = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          setJsonData(parsedData);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".json" />
      
      {jsonData && (
        <div>
          <h2>Resumen del Análisis Emocional</h2>
          <p>Tiempo de Video: {jsonData.data.dataAggregated[0].video_time} segundos</p>
          {/* Agregar más detalles según sea necesario */}
        </div>
      )}
    </div>
  );
};

export default EmotionAnalysisComponent;
