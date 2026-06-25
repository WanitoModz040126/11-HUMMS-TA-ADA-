import { SECTION_INFO, ADVISER } from "../data/classData";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.title}>
            {SECTION_INFO.gradeLevel} - {SECTION_INFO.strand} ({SECTION_INFO.sectionName})
          </p>
          <p className={styles.motto}>&ldquo;{SECTION_INFO.motto}&rdquo;</p>
        </div>
        <div className={styles.meta}>
          <span>School Year {SECTION_INFO.schoolYear}</span>
          <span>Class Adviser: {ADVISER.name}</span>
        </div>
      </div>
    </footer>
  );
}
