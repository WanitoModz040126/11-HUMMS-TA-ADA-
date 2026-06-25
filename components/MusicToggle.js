import { useMusic } from "../contexts/MusicContext";
import styles from "./MusicToggle.module.css";

export default function MusicToggle() {
  const { isPlaying, togglePlay } = useMusic();

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={togglePlay}
      aria-label={isPlaying ? "I-pause ang background music" : "I-play ang background music"}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" width="18" height="18">
          <rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M7 4.5v15l13-7.5-13-7.5z" fill="currentColor" />
        </svg>
      )}
      <span className={styles.bars} aria-hidden="true">
        <span className={isPlaying ? styles.barAnim : ""} />
        <span className={isPlaying ? styles.barAnim : ""} />
        <span className={isPlaying ? styles.barAnim : ""} />
      </span>
    </button>
  );
}
