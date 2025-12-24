"use client";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "@/components/components/ui/kibo-ui/video-player/index";
const VideoPlayerComponent = ({ video }: { video: string | undefined }) => {
  // preventing hydration mismatch
  if (!window) return null;
  console.log(window);
  return (
    <VideoPlayer className="overflow-hidden rounded-lg border mb-4">
      <VideoPlayerContent
        crossOrigin=""
        muted
        preload="auto"
        slot="media"
        src={video}
      />
      <VideoPlayerControlBar>
        <VideoPlayerPlayButton />
        <VideoPlayerSeekBackwardButton />
        <VideoPlayerSeekForwardButton />
        <VideoPlayerTimeRange />
        <VideoPlayerTimeDisplay showDuration />
        <VideoPlayerMuteButton />
        <VideoPlayerVolumeRange />
      </VideoPlayerControlBar>
    </VideoPlayer>
  );
};
export default VideoPlayerComponent;
