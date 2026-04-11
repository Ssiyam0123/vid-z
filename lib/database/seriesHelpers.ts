import { connectToDatabase } from "./mongoose";
import Series from "./models/series.model";

export async function getSeriesById(seriesId: string) {
  await connectToDatabase();
  return Series.findById(seriesId);
}

export async function updateSeriesStatus(seriesId: string, status: string, additionalData?: any) {
  await connectToDatabase();
  const updatePayload = { status, ...additionalData };
  return Series.findByIdAndUpdate(seriesId, updatePayload, { new: true });
}

export async function saveScriptToDB(seriesId: string, scenes: any[]) {
  await connectToDatabase();
  const text = scenes.map(s => s.narration).join(' ');
  const payload = {
    generatedScript: { text, scenes, createdAt: new Date() },
    status: 'audio_generating'
  };
  return Series.findByIdAndUpdate(seriesId, payload, { new: true });
}

export async function saveAudioToDB(seriesId: string, url: string, provider: string, duration: number = 0) {
  await connectToDatabase();
  const payload = {
    generatedAudio: { url, duration, provider, createdAt: new Date() },
    status: 'captioning'
  };
  return Series.findByIdAndUpdate(seriesId, payload, { new: true });
}

export async function saveCaptionsToDB(seriesId: string, url: string, segments: any[]) {
  await connectToDatabase();
  const payload = {
    generatedCaptions: { url, segments, createdAt: new Date() },
    status: 'image_generating'
  };
  return Series.findByIdAndUpdate(seriesId, payload, { new: true });
}

export async function saveImagesToDB(seriesId: string, images: any[]) {
  await connectToDatabase();
  const payload = {
    generatedImages: images,
    status: 'rendering'
  };
  return Series.findByIdAndUpdate(seriesId, payload, { new: true });
}
