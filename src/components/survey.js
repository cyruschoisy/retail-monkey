import React, { useState, useEffect } from "react";
import { fetchSurveyDetails } from "./services/surveyservice";


const Survey = ({ accessToken, surveyId }) => {
  const [surveyDetails, setSurveyDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const getSurveyDetails = async () => {
      try {
        const details = await fetchSurveyDetails(accessToken, surveyId);
        setSurveyDetails(details);
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };
    getSurveyDetails();
  }, [accessToken, surveyId]);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <div>
      {surveyDetails ? (
        <div>
          <h2>{surveyDetails.title}</h2>
          {surveyDetails.pages.map((page) => (
            <div key={page.id}>
              {page.questions.map((question) => (
                <div key={question.id}>
                  <h3>{question.headings[0].heading}</h3>
                  {question.answers.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleOptionClick(choice.id)}
                      style={{
                        margin: "10px",
                        padding: "10px",
                        backgroundColor: selectedOption === choice.id ? "#007bff" : "#ccc",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading survey...</p>
      )}
    </div>
  );
};

export default Survey;
