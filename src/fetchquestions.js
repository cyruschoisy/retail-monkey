
   const access_token = '7FdwLAtKDIZ0i-94TbpI08mfXADueLaGAzCgTD2dI.lpUtxdFXZZEZ9DZ4Gn9cieR.8kbpEbDHGt4MCEaD6lQpzEIzfa8jL8OZp2Ir-oN645cHrAVuOE2BNt0aZto3wf'
   const survey_id = '416828154' // Replace with your survey ID

   // Function to fetch and display survey questions
   async function fetchSurveyQuestions() {
      try {
            const response = await fetch(`https://api.surveymonkey.com/v3/surveys/${survey_id}/details`, {
               method: 'GET',
               headers: {
                  'Authorization': `Bearer ${access_token}`,
               }
            });

            if (!response.ok) {
               throw new Error('Failed to fetch survey questions');
            }

            const data = await response.json();
            const pages = data.pages;

            // Loop through the pages and questions to print out question headings
            pages.forEach((page) => {
               page.questions.forEach((question) => {
                  const questionHeading = question.headings[0].heading;
                  console.log(questionHeading);  // Print out the question heading

                  // Optionally, you can also add code to display the question on the webpage
                  const questionDiv = document.createElement('div');
                  questionDiv.classList.add('question');
                  
                  const questionHeadingElement = document.createElement('h2');
                  questionHeadingElement.textContent = questionHeading;
                  questionDiv.appendChild(questionHeadingElement);

                  // If there are choices for the question, display them as well
                  if (question.answers && question.answers.choices) {
                        const choicesList = document.createElement('ul');
                        question.answers.choices.forEach(choice => {
                           const listItem = document.createElement('li');
                           listItem.textContent = choice.text;
                           choicesList.appendChild(listItem);
                        });
                        questionDiv.appendChild(choicesList);
                  }

                  // Append the question div to a container element (optional)
                  const questionsContainer = document.getElementById('root');
                  questionsContainer.appendChild(questionDiv);
               });
            });
      } catch (error) {
            console.error('Error fetching survey questions:', error);
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Failed to load questions.';
            document.body.appendChild(errorDiv);
      }
   }


   // Fetch the survey questions on page load
   fetchSurveyQuestions();