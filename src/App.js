import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const surveyMonkeyAccessToken = 'your_access_token_here'; // Replace with your access token
  const surveyId = 'your_survey_id_here'; // Replace with your survey ID

  // Fetch survey questions from SurveyMonkey API
  const fetchSurveyQuestions = async () => {
    try {
      const response = await fetch(
        `https://api.surveymonkey.com/v3/surveys/${surveyId}/questions`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${surveyMonkeyAccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch survey questions');
      }

      const data = await response.json();
      setQuestions(data.data); // Set the questions data into state
      setLoading(false); // Done loading
    } catch (error) {
      setError(error.message); // Set error message if failed
      setLoading(false); // Done loading
    }
  };

  useEffect(() => {
    fetchSurveyQuestions(); // Fetch questions when the component mounts
  }, []);

  return (
    <div className="App">
      <h1>Survey Questions</h1>

      {loading && <p>Loading questions...</p>} {/* Show loading state */}
      {error && <p>Error: {error}</p>} {/* Show error message if failed */}
      
      <div id="survey-questions">
        {questions.map((question) => (
          <div key={question.id} className="question">
            <h2>{question.headings[0].heading}</h2>
            {/* Check if the question has answer choices */}
            {question.answers && question.answers.choices && (
              <ul>
                {question.answers.choices.map((choice, index) => (
                  <li key={index}>{choice.text}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
