import { AbsoluteFill, Audio, Img, Sequence, useVideoConfig } from 'remotion';

export const VideoComposition = ({ script, audioUrl, images }: any) => {
  const { durationInFrames } = useVideoConfig();
  
  const framesPerScene = Math.floor(durationInFrames / (images?.length || 1));

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {images?.map((img: any, idx: number) => {
        const startFrame = idx * framesPerScene;
        return (
          <Sequence key={idx} from={startFrame} durationInFrames={framesPerScene}>
            <AbsoluteFill>
              <Img src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </AbsoluteFill>
          </Sequence>
        );
      })}
      
      {audioUrl && <Audio src={audioUrl} />}
    </AbsoluteFill>
  );
};
