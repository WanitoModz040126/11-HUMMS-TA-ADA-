import { useEffect, useState } from "react";
import Link from "next/link";
import { SECTION_INFO, GALLERY } from "../data/classData";
import SectionBadge from "./SectionBadge";
import styles from "./Hero.module.css";

const SLIDE_MS = 4500;

export default function Hero() {
  const slides = GALLERY.filter((item) => item.type === "image").map((item) => item.src);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className={styles.hero}>
      <div className={styles.slideStage} aria-hidden="true">
        {slides.map((src, index) => (
          <div
            key={src}
            className={styles.slide}
            style={{
              backgroundImage: `url(${src})`,
              transform: `translateX(${(index - active) * 100}%)`,
            }}
          />
        ))}
        <div className={styles.scrim} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>School Year {SECTION_INFO.schoolYear}</span>
          <h1 className={styles.title}>
            {SECTION_INFO.gradeLevel} &ndash; {SECTION_INFO.strand}
            <span className={styles.section}>({SECTION_INFO.sectionName})</span>
          </h1>
          <p className={styles.motto}>&ldquo;{SECTION_INFO.motto}&rdquo;</p>
          <div className={styles.ctaRow}>
            <Link href="/gallery" className="btn btn--primary">
              Tingnan ang Gallery
            </Link>
            <Link href="/officers" className="btn btn--ghost">
              Mga Officer
            </Link>
          </div>
        </div>

        <div className={styles.badgeSlot}>
          <SectionBadge />
        </div>
      </div>

      {slides.length > 1 && (
        <div className={styles.dots}>
          {slides.map((src, index) => (
            <button
              key={src}
              type="button"
              className={`${styles.dot} ${index === active ? styles.dotActive : ""}`}
              aria-label={`Pumunta sa larawan ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
