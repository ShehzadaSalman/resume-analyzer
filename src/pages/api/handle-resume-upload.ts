import pdf from "pdf-parse";
import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_APIKEY || "",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const file = req.body.file; // Assuming the PDF is sent as base64

    // Parse the PDF file
    const dataBuffer = Buffer.from(file, "base64");
    const pdfData = await pdf(dataBuffer);

    console.log("Pdf data: ", pdfData);

    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Please give me a summary of the following resume and return me null if the provided content is not a summary: ${pdfData.text}`,
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 500,
    });

    const summary = chatCompletion.choices[0].message.content;
    console.log("summary here: ", summary);

    res.status(200).json({ summary });
  } else {
    res.status(405).send("Method not allowed");
  }
}
