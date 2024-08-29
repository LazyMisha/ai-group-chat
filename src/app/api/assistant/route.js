import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req, res) {
    const body = await req.json();
    const { model, messages } = body;

    try {
      const completion = await openai.chat.completions.create({
          model,
          messages,
      });

      return Response.json({ data: completion.choices[0] });
    } catch (error) {
      return Response.json({ 
        message: messages, 
        error: error.message 
      });
    }
}