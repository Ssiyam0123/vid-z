import { DeepgramClient } from "@deepgram/sdk";
import Video from "../database/models/video.model";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

async function uploadBufferToCloudinary(buffer: Buffer, resourceType: 'video'|'raw' = 'video'): Promise<string> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: resourceType }, (error, result) => {
            if (error) reject(error);
            else resolve(result!.secure_url);
        });
        stream.end(buffer);
    });
}

export async function generateAudio(videoId: string, script: { text: string }) {
  const video = await Video.findById(videoId).populate('seriesId');
  if (!video) throw new Error("Video not found");
  const series = video.seriesId;
  const provider = series.language === 'Hindi' ? 'phoneala' : 'deepgram';
  
  let audioUrl = "";
  
  if (provider === 'deepgram') {
    const deepgram = new DeepgramClient({ apiKey: process.env.DEEPGRAM_API_KEY! });
    const response = await deepgram.speak.request(
      { text: script.text },
      { model: 'aura-asteria-en' }
    );
    const stream = await response.getStream();
    if (!stream) throw new Error("Audio generation failed");
    
    const chunks = [];
    const reader = stream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const buffer = Buffer.concat(chunks);
    
    audioUrl = await uploadBufferToCloudinary(buffer, 'video');
  } else {
    // Phoneala Lab Mock for Hindi TTS (as per fallback instructions)
    console.log("Mocking Phoneala Lab TTS generation");
    audioUrl = "https://res.cloudinary.com/demo/video/upload/dog.mp3"; 
  }
  
  if (video) {
      video.generatedAudio = { url: audioUrl, duration: 15, provider, createdAt: new Date() };
      await video.save();
  }
  return { url: audioUrl, duration: 15 };
}
