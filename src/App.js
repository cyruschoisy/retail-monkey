import React from "react";
import SurveyWithImages from "/api/SurveyWithImages";

const App = () => {
  const accessToken = "cOmUpOXfevWx560egh1njjXZ9DfW21pyZrWDMpb7mvCgL4.AQ71yQM85I4Sr7P-D.FdVeWiN8IPF6rdhjBMLcQhLWTx0YQwmg8Ac.NWmMbg72MuqzML5oifAVl0IVeUR"; // Replace with your SurveyMonkey API key
  const surveyId = "0"; // Replace with your survey ID

  return (
    <div>
      <h1>Dynamic Survey with Images</h1>
      <SurveyWithImages accessToken={accessToken} surveyId={surveyId} />
    </div>
  );
};

export default App;
