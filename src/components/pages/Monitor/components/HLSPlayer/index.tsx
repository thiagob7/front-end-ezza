import Hls from "hls.js";
import { useEffect, useRef } from "react";

export function HLSPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;

    // cabeçalhos para não cachear
    const xhrSetup = (xhr: XMLHttpRequest) => {
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.setRequestHeader('Pragma', 'no-cache');
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        startPosition: -1,
        lowLatencyMode: true,
        liveSyncDurationCount: 2,
        maxBufferLength: 5,
        liveBackBufferLength: 0,
        xhrSetup,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      // força ficar sempre no live edge
      hls.on(Hls.Events.MANIFEST_PARSED, () => hls!.startLoad(-1));
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari/iOS: burlar cache pela query
      video.src = `${src}?_=${Date.now()}`;
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
