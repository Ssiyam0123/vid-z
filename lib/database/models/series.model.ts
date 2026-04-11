import { Schema, model, models } from "mongoose";

const SeriesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    niche: String,
    customNiche: String,
    language: String,
    voiceId: String,
    backgroundMusic: String,
    videoStyle: String,
    captionStyle: String,
    seriesTitle: String,
    seriesDescription: String,
  },
  { timestamps: true }
);

export default models?.Series || model("Series", SeriesSchema);