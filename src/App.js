import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [showMonkey, setShowMonkey] = useState(false);
  const [askedMonkey, setAskedMonkey] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyQuestions, setSurveyQuestions] = useState([]); // Store fetched questions
  const [isLoading, setIsLoading] = useState(true); 
  const [monkeyfeels, setMonkeyfeels] = useState(0); //this is for the #monkeyfeels

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
  const starToFeels = {
    1: -2, // 1 star maps to -2
    2: -1, // 2 stars map to -1
    3: 0,  // 3 stars map to 0
    4: 1,  // 4 stars map to 1
    5: 2,  // 5 stars map to 2
  };
  
  const handleSurveyResponse = (response) => {
    if (currentQuestion === 0) {
      // Assuming `response` is the star rating as a number (1-5)
      const feelsValue = starToFeels[parseInt(response)]; // Map star rating to `monkeyfeels` value
      setMonkeyfeels((prev) => prev + feelsValue); // Update the state
    }
     else if (currentQuestion === 1) {
      // How are you finding everything today
      if (response === 'Incredible') {
        setMonkeyfeels((prev) => prev + 2);
      } else if (response === 'Horrible') {
        setMonkeyfeels((prev) => prev - 2);
      } else {
        setMonkeyfeels((prev) => prev);
      }
    } else if (currentQuestion === 2) {
      // Is this what you are looking for
      if (response === 'Yes') {
        setMonkeyfeels((prev) => prev + 2);
      } else {
        setMonkeyfeels((prev) => prev - 2);
      }
    } else if (currentQuestion === 3) {
      // Do you like the price
      if (response === 'Too high') {
        setMonkeyfeels((prev) => prev - 2);
      } else if (response === 'Fair') {
        setMonkeyfeels((prev) => prev + 2);
      } else {
        setMonkeyfeels((prev) => prev - 2);
      }
    }

    // Move to the next question
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(null); // End survey
    }
  };

  const getMonkeyMood = () => {
    if (monkeyfeels < 0 && monkeyfeels >= -4) {
      return 'Sad';
    } else if (monkeyfeels < -4) {
      return 'Angry';
    } else if (monkeyfeels > 0 && monkeyfeels < 3) {
      return 'Confused';
    } else if (monkeyfeels === 0) {
      return 'Neutral';
    } else if (monkeyfeels >= 3) {
      return 'Happy';
    }
  };
  
  
  // Get the correct image source based on monkeyfeels
  const getMonkeyImage = () => {
    const mood = getMonkeyMood();
    if (mood === 'Sad') {
      return './sad.png'; // Path to sad image
    } else if (mood === 'Neutral') {
      return './normal.png'; // Path to neutral image
    } 
    else if(mood==='Angry'){
      return './anger.png';
    }else if(mood==='Confused'){
      return'./confuse.png';
    }else {
      return './happp.png'; // Path to happy image
    }
  };

  return (
    <div className="row">
      {/* Monkey Feels Score */}
      <div className="column monkey-feels-container">
        <p>Monkeyfeels: {monkeyfeels} - {getMonkeyMood()} </p>
      </div>

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
            src={getMonkeyImage()} // Dynamically change image based on mood
            alt="Monkey"
            className="monkey-image"
          />
        </div>
      )}

      {/* Survey and Monkey Feels */}
      {askedMonkey && (
        <div className="column text-container">
          <p>Survey</p>
          {isLoading ? (
            <p>Loading survey questions...</p>
          ) : currentQuestion !== null ? (
            <>
              <p>{surveyQuestions[currentQuestion]?.question}</p>
              {surveyQuestions[currentQuestion]?.options.map((option, index) => (
                <button key={index} onClick={() => handleSurveyResponse(option)}>
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
