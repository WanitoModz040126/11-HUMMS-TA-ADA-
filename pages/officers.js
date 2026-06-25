import Head from "next/head";
import PersonCard from "../components/PersonCard";
import { OFFICERS, SECTION_INFO } from "../data/classData";

export default function OfficersPage() {
  return (
    <>
      <Head>
        <title>Mga Officer | {SECTION_INFO.gradeLevel}-{SECTION_INFO.strand} ({SECTION_INFO.sectionName})</title>
      </Head>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Lider ng Klase</span>
            <h1 className="section-title">Mga Class Officer</h1>
            <p className="section-sub">
              Siyam na mag-aaral na namumuno at nagsisilbi para sa{" "}
              {SECTION_INFO.gradeLevel}-{SECTION_INFO.strand} ({SECTION_INFO.sectionName}), SY {SECTION_INFO.schoolYear}.
            </p>
          </div>

          <div className="grid-officers">
            {OFFICERS.map((officer, i) => (
              <PersonCard
                key={officer.id}
                image={officer.image}
                name={officer.name}
                role={officer.role}
                style={{ transitionDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
