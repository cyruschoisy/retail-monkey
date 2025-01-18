import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [showMonkey, setShowMonkey] = useState(false);
  const [askedMonkey, setAskedMonkey] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyQuestions, setSurveyQuestions] = useState([]); // Store fetched questions
  const [isLoading, setIsLoading] = useState(true); 

  const access_token = '7FdwLAtKDIZ0i-94TbpI08mfXADueLaGAzCgTD2dI.lpUtxdFXZZEZ9DZ4Gn9cieR.8kbpEbDHGt4MCEaD6lQpzEIzfa8jL8OZp2Ir-oN645cHrAVuOE2BNt0aZto3wf';
  const survey_id = '416828154'; // survey ID

  // Fetch survey questions from API
  useEffect(() => {
    async function fetchSurveyQuestions() {
      try {
        const response = await fetch(`https://api.surveymonkey.com/v3/surveys/${survey_id}/details`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch survey questions');
        }

        const data = await response.json();
        const questions = data.pages.flatMap((page) =>
          page.questions.map((q) => ({
            question: q.headings[0].heading,
            options: q.answers?.choices?.map((choice) => choice.text) || [],
          }))
        );
        setSurveyQuestions(questions); // Update state with questions
      } catch (error) {
        console.error('Error fetching survey questions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSurveyQuestions();
  }, []);

  const handleMonkeyResponse = (response) => {
    setAskedMonkey(true);
    setShowMonkey(response);
  };

  const handleSurveyResponse = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(null); // End survey
    }
  };

  return (
    <div className="row">
      {/* Monkey Question Container */}
      {!askedMonkey && (
        <div className="column question-container">
          <p>Would you like your shopping experience to be accompanied by a friendly feedback monkey?</p>
          <button onClick={() => handleMonkeyResponse(true)}>Yes</button>
          <button onClick={() => handleMonkeyResponse(false)}>No</button>
        </div>
      )}

      {/* Monkey Container */}
      {showMonkey && (
        <div className="column monkey-container">
          <img
            src="./monkey.jpg" // Replace with actual monkey image URL
            alt="Monkey"
            className="monkey-image"
          />
        </div>
      )}

      {/* Text Container */}
      {askedMonkey && (
        <div className="column text-container">
          <p>Survey</p>
          {isLoading ? (
            <p>Loading survey questions...</p>
          ) : currentQuestion !== null ? (
            <>
              <p>{surveyQuestions[currentQuestion]?.question}</p>
              {surveyQuestions[currentQuestion]?.options.map((option, index) => (
                <button key={index} onClick={handleSurveyResponse}>
                  {option}
                </button>
              ))}
            </>
          ) : (
            <p>Thank you for completing the survey!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
