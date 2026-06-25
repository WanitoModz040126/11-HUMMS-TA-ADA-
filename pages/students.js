import Head from "next/head";
import PersonCard from "../components/PersonCard";
import { STUDENTS, SECTION_INFO } from "../data/classData";

export default function StudentsPage() {
  return (
    <>
      <Head>
        <title>Mga Estudyante | {SECTION_INFO.gradeLevel}-{SECTION_INFO.strand} ({SECTION_INFO.sectionName})</title>
      </Head>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{STUDENTS.length} Mag-aaral</span>
            <h1 className="section-title">Mga Estudyante ng Klase</h1>
            <p className="section-sub">
              Ang bawat isa ay bahagi ng kwento ng{" "}
              {SECTION_INFO.gradeLevel}-{SECTION_INFO.strand} ({SECTION_INFO.sectionName}), SY {SECTION_INFO.schoolYear}.
            </p>
          </div>

          <div className="grid-students">
            {STUDENTS.map((student, i) => (
              <PersonCard
                key={student.id}
                image={student.image}
                name={student.name}
                index={student.id}
                style={{ transitionDelay: `${(i % 8) * 50}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
