import { createContext, useContext, useEffect, useRef, useState } from "react";

const MusicContext = createContext(null);

const BGM_SRC = "/music/bgm-placeholder.mp3";

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const wasPlayingBeforeDuck = useRef(false);

  useEffect(() => {
    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setHasStarted(true);
      } catch {
        // Most browsers block audio with sound from autoplaying before
        // the visitor has interacted with the page at least once.
        // We wait for the very first click/tap/key anywhere on the
        // page and start the music right then.
        setIsPlaying(false);
      }
    };

    tryAutoplay();

    const startOnFirstInteraction = () => {
      if (!hasStarted) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          })
          .catch(() => {});
      }
      window.removeEventListener("click", startOnFirstInteraction);
      window.removeEventListener("keydown", startOnFirstInteraction);
      window.removeEventListener("touchstart", startOnFirstInteraction);
    };

    window.addEventListener("click", startOnFirstInteraction);
    window.addEventListener("keydown", startOnFirstInteraction);
    window.addEventListener("touchstart", startOnFirstInteraction);

    return () => {
      window.removeEventListener("click", startOnFirstInteraction);
      window.removeEventListener("keydown", startOnFirstInteraction);
      window.removeEventListener("touchstart", startOnFirstInteraction);
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      });
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }

  // Called right before a gallery video starts playing.
  function duckForVideo() {
    const audio = audioRef.current;
    if (!audio) return;
    wasPlayingBeforeDuck.current = isPlaying;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  }

  // Called when the gallery video ends or is closed.
  function resumeAfterVideo() {
    const audio = audioRef.current;
    if (!audio) return;
    if (wasPlayingBeforeDuck.current) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }

  return (
    <MusicContext.Provider
      value={{ isPlaying, isMuted, togglePlay, toggleMute, duckForVideo, resumeAfterVideo }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used inside a MusicProvider");
  }
  return ctx;
}
