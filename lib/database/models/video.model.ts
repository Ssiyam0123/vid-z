import { Schema, model, models } from "mongoose";

const VideoSchema = new Schema(
  {
    seriesId: { type: Schema.Types.ObjectId, ref: "Series", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "scripting", "audio_generating", "captioning", "image_generating", "rendering", "completed", "failed"],
      default: "draft",
    },
    generatedScript: {
      text: String,
      scenes: Array,
      createdAt: Date,
    },
    generatedAudio: {
      url: String,
      duration: Number,
      provider: String,
      createdAt: Date,
    },
    generatedCaptions: {
      url: String,
      segments: Array,
      createdAt: Date,
    },
    generatedImages: [
      {
        sceneNumber: Number,
        url: String,
        prompt: String,
        createdAt: Date,
      },
    ],
    generatedVideo: {
      url: String,
      duration: Number,
      resolution: String,
      createdAt: Date,
    },
    errorMessage: String,
  },
  { timestamps: true }
);

export default models?.Video || model("Video", VideoSchema);
