import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Hero from "../components/Hero";
import { SECTION_INFO, ADVISER, OFFICERS, STUDENTS } from "../data/classData";
import styles from "../styles/Home.module.css";

export default function Home() {
  const stats = [
    { label: "Class Officers", value: OFFICERS.length },
    { label: "Students", value: STUDENTS.length },
    { label: "Class Adviser", value: 1 },
  ];

  return (
    <>
      <Head>
        <title>
          {SECTION_INFO.gradeLevel} - {SECTION_INFO.strand} ({SECTION_INFO.sectionName}) | SY {SECTION_INFO.schoolYear}
        </title>
        <meta
          name="description"
          content={`Official class page of ${SECTION_INFO.gradeLevel}-${SECTION_INFO.strand} (${SECTION_INFO.sectionName}), school year ${SECTION_INFO.schoolYear}.`}
        />
      </Head>

      <Hero />

      <section className="section">
        <div className={`container ${styles.statRow}`}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`card reveal ${styles.statCard}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className={`card reveal ${styles.adviserCard}`}>
            <div className={styles.adviserPhoto}>
              <Image src={ADVISER.image} alt={ADVISER.name} fill sizes="220px" />
            </div>
            <div className={styles.adviserCopy}>
              <span className="eyebrow">Class Adviser</span>
              <h2 className={styles.adviserName}>{ADVISER.name}</h2>
              <p className={styles.adviserRole}>
                Patnubay ng {SECTION_INFO.gradeLevel}-{SECTION_INFO.strand} ({SECTION_INFO.sectionName}) sa buong
                taon ng pag-aaral, {SECTION_INFO.schoolYear}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Explore</span>
            <h2 className="section-title">Tara, tingnan natin sila</h2>
            <p className="section-sub">
              Mga mukha at sandali na naging bahagi ng aming paglalakbay bilang
              {" "}{SECTION_INFO.gradeLevel}-{SECTION_INFO.strand} ({SECTION_INFO.sectionName}).
            </p>
          </div>

          <div className={styles.exploreGrid}>
            <Link href="/officers" className={`card reveal ${styles.exploreCard}`}>
              <span className={styles.exploreEmoji}>🎗️</span>
              <h3>Mga Officer</h3>
              <p>Kilalanin ang siyam na namumuno sa aming klase.</p>
            </Link>
            <Link href="/students" className={`card reveal ${styles.exploreCard}`}>
              <span className={styles.exploreEmoji}>🎓</span>
              <h3>Mga Estudyante</h3>
              <p>Lahat ng dalawampu&apos;t tatlong batang HUMMS.</p>
            </Link>
            <Link href="/gallery" className={`card reveal ${styles.exploreCard}`}>
              <span className={styles.exploreEmoji}>📸</span>
              <h3>Gallery</h3>
              <p>Mga litrato at video ng aming mga gawain sa buong taon.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
