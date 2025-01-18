import axios from "axios";

const API_BASE_URL = "https://api.surveymonkey.com/v3";

export const fetchSurveyDetails = async (accessToken, surveyId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/surveys/${surveyId}/details`, {
      headers: {
        Authorization: `Bearer ${cOmUpOXfevWx560egh1njjXZ9DfW21pyZrWDMpb7mvCgL4.AQ71yQM85I4Sr7P-D.FdVeWiN8IPF6rdhjBMLcQhLWTx0YQwmg8Ac.NWmMbg72MuqzML5oifAVl0IVeUR}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching survey details:", error);
    throw error;
  }
};
