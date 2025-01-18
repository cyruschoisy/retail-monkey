import React, { useState } from "react";
import Survey from "/survey";

const SurveyWithImages = ({ accessToken, surveyId }) => {
  const [imageMap, setImageMap] = useState({
    option1: "assets/monkeylook/anger.png", 
    option2: "assets/monkeylook/confuse.png", 
    option3: "assets/monkeylook/happy.png", 
    option4: "assets/monkeylook/normal.png", 
    option5: "assets/monkeylook/sad.png", 
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleOptionSelect = (optionId) => {
    // Map the selected option to an image
    setSelectedImage(imageMap[`option${optionId}`]);
  };

  return (
    <div>
      <Survey
        accessToken={accessToken}
        surveyId={surveyId}
        onOptionSelect={handleOptionSelect}
      />
      <div style={{ marginTop: "20px" }}>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected Option"
            style={{ width: "300px", height: "200px" }}
          />
        ) : (
          <p>Select an option to see an image</p>
        )}
      </div>
    </div>
  );
};

export default SurveyWithImages;
