require('dotenv').config(); // Load environment variables from .env
const axios = require('axios'); // Import Axios

// Ensure your .env file contains something like: OPENAI_API_KEY=your_api_key_here

const apiKey = process.env.OPENAI_API_KEY; // Access the API key from the environment variables

const prompt = "Write an engaging landing page text based on the keyword: digital-marketing.";

const requestData = {
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 150,
    temperature: 0.7
};

axios.post('https://api.openai.com/v1/completions', requestData, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error.response ? error.response.data : error.message);
    });