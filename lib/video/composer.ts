import { updateSeriesStatus } from '../database/seriesHelpers';
import { bundle } from '@remotion/bundler';
import { selectComposition, renderMedia } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

export async function composeVideo(videoId: string, script: any, audio: any, captions: any, images: any[]) {
  console.log("Starting Remotion Bundle & Render process");

  const inputProps = {
    script,
    audioUrl: audio.url,
    images,
    audioDuration: audio.duration
  };

  console.log("Bundling Remotion Entrypoint...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(process.cwd(), "remotion/index.ts"),
    webpackOverride: (config) => config,
  });

  console.log("Selecting Composition parameters...");
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "MainVideo",
    inputProps
  });

  const outputLocation = path.resolve(process.cwd(), `tmp-${videoId}.mp4`);

  console.log("Executing Render Media...");
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
    onProgress: ({ progress }) => {
      console.log(`Rendering progress: ${Math.round(progress * 100)}%`);
    }
  });

  console.log("Video rendered locally, pushing to Cloudinary...");

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const uploadResult = await cloudinary.uploader.upload(outputLocation, {
    resource_type: "video",
    folder: "vid-z/videos"
  });

  console.log("Upload Success! Artifact cleanup...");
  fs.unlinkSync(outputLocation);

  return uploadResult.secure_url;
}
