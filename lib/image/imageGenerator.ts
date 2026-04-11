import Replicate from 'replicate';
import Video from '../database/models/video.model';
import { v2 as cloudinary } from 'cloudinary';

export async function generateImages(videoId: string, scenes: Array<{ sceneNumber: number; visualPrompt: string }>) {
  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
  const images = [];

  for (const scene of scenes) {
    const output: any = await replicate.run(
      'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
      { input: { prompt: scene.visualPrompt } }
    );
    const imgUrl = Array.isArray(output) ? output[0] : output;
    
    const uploadResult = await cloudinary.uploader.upload(imgUrl);
    
    images.push({ sceneNumber: scene.sceneNumber, url: uploadResult.secure_url, prompt: scene.visualPrompt });
  }
  
  const video = await Video.findById(videoId);
  if (video) {
    video.generatedImages = images;
    await video.save();
  }

  return images;
}
