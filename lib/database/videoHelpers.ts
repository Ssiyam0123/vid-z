import { connectToDatabase } from "./mongoose";
import Video from "./models/video.model";

export async function getVideoById(videoId: string) {
  await connectToDatabase();
  return Video.findById(videoId);
}

export async function updateVideoStatus(videoId: string, status: string, errorMsg?: string) {
  await connectToDatabase();
  const updateData: any = { status };
  if (errorMsg) updateData.errorMessage = errorMsg;
  return Video.findByIdAndUpdate(videoId, updateData, { new: true });
}
