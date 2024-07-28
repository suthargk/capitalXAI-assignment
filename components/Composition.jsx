import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import {
  AbsoluteFill,
  Composition as RemotionComposition,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import { COMP_NAME } from "../types/constants";

const Slide = ({ renderTimestamp }) => {
  const { font, timestampText, durationTimestamp } = renderTimestamp;
  const { italic, bold } = font;
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={durationTimestamp}>
        <h1
          style={{
            fontStyle: italic ? "italic" : "unset",
            fontWeight: bold ? 700 : "unset",
          }}
          className={`text-[50px] ${font.fontFamily}`}
        >
          {timestampText}
        </h1>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: durationTimestamp })}
      />
      <TransitionSeries.Sequence durationInFrames={durationTimestamp}>
        <h1
          style={{
            fontStyle: italic ? "italic" : "unset",
            fontWeight: bold ? 700 : "unset",
          }}
          className={`text-[50px] ${font.fontFamily}`}
        >
          {timestampText}
        </h1>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

const TextAnimate = ({ renderTimestamp }) => {
  const { font, timestampText } = renderTimestamp;
  const { italic, bold } = font;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  return (
    <h1
      style={{
        transform: `scale(${enter})`,
        fontStyle: italic ? "italic" : "unset",
        fontWeight: bold ? 700 : "unset",
      }}
      className={`text-[50px] ${font.fontFamily}`}
    >
      {timestampText}
    </h1>
  );
};

const Composition = ({ renderTimestamp }) => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={1800}>
        <Video
          src={staticFile("BigBuckBunny.mp4")}
          startFrom={0} // if video is 30fps, then it will start at 2s
          endAt={60 * 60} // if video is 30fps, then it will end at 4s
          disableRemotePlayback
          delayRenderTimeoutInMilliseconds={40000}
        />
      </Sequence>

      {renderTimestamp.map((renderTimestamp) => {
        return (
          <Sequence
            key={renderTimestamp.id}
            className="text-white flex justify-center items-center"
            from={Number(renderTimestamp.startTimestamp)}
            durationInFrames={Number(renderTimestamp.durationTimestamp)}
          >
            {renderTimestamp.animation === "Fade In" ? (
              <TextAnimate renderTimestamp={renderTimestamp} />
            ) : (
              <Slide renderTimestamp={renderTimestamp} />
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export default Composition;

export function MyComposition() {
  return (
    <RemotionComposition
      id={COMP_NAME}
      component={Composition}
      durationInFrames={30 * 60}
      fps={60}
      width={800}
      height={450}
      defaultProps={{
        renderTimestamp: [],
      }}
    />
  );
}
