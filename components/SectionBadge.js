import { SECTION_INFO } from "../data/classData";
import styles from "./SectionBadge.module.css";

export default function SectionBadge({ size = "lg" }) {
  return (
    <div className={`${styles.wrap} ${size === "sm" ? styles.sm : ""}`}>
      <svg viewBox="0 0 220 260" className={styles.svg} aria-hidden="true">
        <path d="M70 150 L40 250 L95 225 L110 250 L125 225 L180 250 L150 150 Z" fill="var(--coral-500)" />
        <path d="M70 150 L40 250 L95 225 L110 250 Z" fill="var(--teal-500)" />
        <circle cx="110" cy="95" r="80" fill="var(--marigold-500)" stroke="var(--paper-50)" strokeWidth="6" />
        <circle cx="110" cy="95" r="62" fill="none" stroke="var(--plum-700)" strokeWidth="3" strokeDasharray="4 7" />
        <text x="110" y="82" textAnchor="middle" className={styles.line1}>
          {SECTION_INFO.gradeLevel}-{SECTION_INFO.strand}
        </text>
        <text x="110" y="112" textAnchor="middle" className={styles.line2}>
          {SECTION_INFO.sectionName}
        </text>
      </svg>
    </div>
  );
}
