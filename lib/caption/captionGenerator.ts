import { DeepgramClient } from "@deepgram/sdk";
import Video from "../database/models/video.model";
import { v2 as cloudinary } from 'cloudinary';

function convertToSRT(segments: any[]) {
    return segments.map((seg, i) => {
        const formatTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(11, 12).replace('.', ',');
        return `${i + 1}\n${formatTime(seg.start)} --> ${formatTime(seg.end)}\n${seg.text}\n`;
    }).join('\n');
}

export async function generateCaptions(videoId: string, audioUrl: string) {
  const deepgram = new DeepgramClient({ apiKey: process.env.DEEPGRAM_API_KEY! });
  const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
    { url: audioUrl },
    { punctuate: true, utterances: true }
  );
  
  if (error || !result) throw new Error("Failed to generate captions");

  const segments = result.results.utterances?.map((u: any) => ({
    start: u.start,
    end: u.end,
    text: u.transcript,
  })) || [];
  
  const srt = convertToSRT(segments);
  
  const base64Str = Buffer.from(srt).toString('base64');
  const uploadResult = await cloudinary.uploader.upload(`data:text/plain;base64,${base64Str}`, { resource_type: 'raw', format: 'srt' });
  const captionUrl = uploadResult.secure_url;
  
  const video = await Video.findById(videoId);
  if (video) {
        video.generatedCaptions = { url: captionUrl, segments, createdAt: new Date() };
        await video.save();
  }
  return { url: captionUrl, segments };
}
