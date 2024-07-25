import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    const completion = await openai.chat.completions.create({
        messages: [
            {
              "role": "system",
              "content": "You are a helpful assistant in a chat between two users and yourself. Address each user by their username to avoid confusion."
            },
            {
              "role": "user",
              "name": "Roman",
              "content": "Hi ChatGPT, can you explain the theory of relativity?"
            },
            {
              "role": "user",
              "name": "Mykhailo",
              "content": "I've always been curious about that too!"
            },
          ],
        model: "gpt-3.5-turbo",
    });

    return Response.json({ message: completion.choices[0]})
}