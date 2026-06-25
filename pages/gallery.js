import Head from "next/head";
import GalleryGrid from "../components/GalleryGrid";
import { SECTION_INFO } from "../data/classData";

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Gallery | {SECTION_INFO.gradeLevel}-{SECTION_INFO.strand} ({SECTION_INFO.sectionName})</title>
      </Head>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Mga Alaala</span>
            <h1 className="section-title">Gallery ng Klase</h1>
            <p className="section-sub">
              Mga litrato at video mula sa aming mga gawain bilang{" "}
              {SECTION_INFO.gradeLevel}-{SECTION_INFO.strand} ({SECTION_INFO.sectionName}) sa SY {SECTION_INFO.schoolYear}.
            </p>
          </div>

          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
