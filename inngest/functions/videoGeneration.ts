// inngest/functions/videoGeneration.ts
import { inngest } from "../client";
import { generateScript } from "@/lib/ai/scriptGenerator";
import { generateAudio } from "@/lib/tts/audioGenerator";
import { generateCaptions } from "@/lib/caption/captionGenerator";
import { generateImages } from "@/lib/image/imageGenerator";
import { composeVideo } from "@/lib/video/composer";
import { updateVideoStatus, getVideoById } from "@/lib/database/videoHelpers";

export const videoGeneration = inngest.createFunction(
  {
    id: 'video-generation',
    name: 'Generate Episodic Video',
    retries: 3,
    event: 'video/generate',
  },
  async ({ event, step }) => {
    const { videoId } = event.data;
    if (!videoId) return { aborted: true, reason: "Missing videoId" };

    const script = await step.run('generate-script', async () => {
      await updateVideoStatus(videoId, "scripting");
      return generateScript(videoId);
    });

    const audio = await step.run('generate-audio', async () => {
      await updateVideoStatus(videoId, "audio_generating");
      return generateAudio(videoId, script);
    });

    const captions = await step.run('generate-captions', async () => {
      await updateVideoStatus(videoId, "captioning");
      return generateCaptions(videoId, audio.url);
    });

    const images = await step.run('generate-images', async () => {
      await updateVideoStatus(videoId, "image_generating");
      return generateImages(videoId, script.scenes);
    });

    const videoUrl = await step.run('compose-video', async () => {
      await updateVideoStatus(videoId, "rendering");
      return composeVideo(videoId, script, audio, captions, images);
    });

    await step.run('finalize', async () => {
      const Video = (await import("@/lib/database/models/video.model")).default;
      await Video.findByIdAndUpdate(videoId, {
        "generatedVideo.url": videoUrl,
        "generatedVideo.duration": audio.duration,
        "generatedVideo.resolution": "1080x1920",
        "generatedVideo.createdAt": new Date(),
        status: "completed"
      });
    });

    return { videoId, videoUrl };
  }
);