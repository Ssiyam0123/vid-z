import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { videoGeneration } from "@/inngest/functions/videoGeneration";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [videoGeneration],
});
