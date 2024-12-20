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
          content: "Du er en hjælpsom assistent, der skriver om hvad meta kan for b2c virksomheder.",
        },
        {
          role: "user",
          content: "Skriv et engagerende paragraf baseret på nøgleordet: ${keyword}.",
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
