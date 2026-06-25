import { useEffect, useState } from "react";
import Image from "next/image";
import { GALLERY } from "../data/classData";
import { useMusic } from "../contexts/MusicContext";
import styles from "./GalleryGrid.module.css";

export default function GalleryGrid() {
  const [openItem, setOpenItem] = useState(null);
  const { duckForVideo, resumeAfterVideo } = useMusic();

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpenItem(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function openLightbox(item) {
    if (item.type === "video") {
      duckForVideo();
    }
    setOpenItem(item);
  }

  function closeLightbox() {
    if (openItem?.type === "video") {
      resumeAfterVideo();
    }
    setOpenItem(null);
  }

  return (
    <>
      <div className="grid-gallery">
        {GALLERY.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`card reveal ${styles.tile}`}
            style={{ transitionDelay: `${i * 60}ms` }}
            onClick={() => openLightbox(item)}
          >
            {item.type === "image" ? (
              <div className={styles.imageWrap}>
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 960px) 45vw, 360px"
                  className={styles.image}
                />
              </div>
            ) : (
              <div className={styles.videoTile}>
                <span className={styles.playBtn} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26">
                    <path d="M8 5v14l12-7L8 5z" fill="currentColor" />
                  </svg>
                </span>
                <span className={styles.videoLabel}>Video</span>
              </div>
            )}
            <span className={styles.caption}>{item.caption}</span>
          </button>
        ))}
      </div>

      {openItem && (
        <div className={styles.overlay} role="dialog" aria-modal="true" onClick={closeLightbox}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.closeBtn} onClick={closeLightbox} aria-label="Isara">
              &times;
            </button>

            {openItem.type === "image" ? (
              <div className={styles.modalImageWrap}>
                <Image
                  src={openItem.src}
                  alt={openItem.caption}
                  fill
                  sizes="90vw"
                  className={styles.modalImage}
                />
              </div>
            ) : (
              <video
                className={styles.modalVideo}
                src={openItem.src}
                controls
                autoPlay
                onEnded={() => resumeAfterVideo()}
              />
            )}
            <p className={styles.modalCaption}>{openItem.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
