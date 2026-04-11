import { Composition, getInputProps } from "remotion";
import { VideoComposition } from "./VideoComposition";

export const RemotionRoot = () => {
  const inputProps = getInputProps() || {};
  const durationInFrames = Math.max(Math.floor((inputProps.audioDuration || 10) * 30), 30);

  return (
    <>
      <Composition
        id="MainVideo"
        component={VideoComposition}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          script: null,
          audioUrl: null,
          images: [],
          audioDuration: 10
        }}
      />
    </>
  );
};
