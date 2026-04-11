import { connectToDatabase } from "@/lib/database/mongoose";
import Series from "@/lib/database/models/series.model";
import { GoogleGenerativeAI } from "@google/generative-ai";

import Video from "@/lib/database/models/video.model";

export async function generateScript(videoId: string) {
  // Ensure database connection
  await connectToDatabase();

  const video = await Video.findById(videoId).populate('seriesId');
  if (!video) throw new Error(`Video not found: ${videoId}`);
  const series = video.seriesId;

  // Use Gemini to generate script
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
    Write a short video script for a "${series.niche}" series.
    Language: ${series.language}.
    Voice style: ${series.voiceId}.
    The script should have 3-5 scenes for Episodic Video Name: ${video.title || 'Untitled'}. For each scene provide:
    - Narration text
    - A visual prompt for image generation (detailed)
    Output as a valid JSON array. Do not use markdown wrappers.
  `;

  const result = await model.generateContent(prompt);
  const scenes = JSON.parse(result.response.text());

  // Save script to video document
  video.generatedScript = {
    text: scenes.map((s: any) => s.narration).join(" "),
    scenes,
    createdAt: new Date(),
  };
  await video.save();

  return video.generatedScript;
}