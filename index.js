require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateText() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that writes engaging landing page content.",
        },
        {
          role: "user",
          content: "Write an engaging landing page text based on the keyword: digital-marketing.",
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error(error.message);
  }
}

generateText();
