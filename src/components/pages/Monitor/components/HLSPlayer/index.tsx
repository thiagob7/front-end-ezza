import Hls from "hls.js";
import { useRef, useEffect } from "react";

export function HLSPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      playsInline
      className="w-full rounded"
    />
  );
}
