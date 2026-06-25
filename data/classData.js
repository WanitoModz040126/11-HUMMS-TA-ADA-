// ============================================================
// EDIT THIS FILE to put in your actual classmates' names.
// Everything shown on the website is read from here.
// ============================================================

export const SECTION_INFO = {
  gradeLevel: "11",
  strand: "HUMMS",
  sectionName: "TAÑADA",
  schoolYear: "2026-2027",
  motto: "Iisa ang puso, magkaiba ang kwento.",
};

export const ADVISER = {
  name: "Adviser Full Name",
  role: "Class Adviser",
  image: "/adviser/1.png",
};

// Exactly 9 class officers. Edit name + role, keep id 1-9 matching
// the picture file in public/officer/ (1.png ... 9.png).
export const OFFICERS = [
  { id: 1, name: "Officer 1 Full Name", role: "President" },
  { id: 2, name: "Officer 2 Full Name", role: "Vice President" },
  { id: 3, name: "Officer 3 Full Name", role: "Secretary" },
  { id: 4, name: "Officer 4 Full Name", role: "Treasurer" },
  { id: 5, name: "Officer 5 Full Name", role: "Auditor" },
  { id: 6, name: "Officer 6 Full Name", role: "P.I.O." },
  { id: 7, name: "Officer 7 Full Name", role: "Peace Officer" },
  { id: 8, name: "Officer 8 Full Name", role: "Muse" },
  { id: 9, name: "Officer 9 Full Name", role: "Escort" },
].map((o) => ({ ...o, image: `/officer/${o.id}.png` }));

// Exactly 23 students. Edit the names, keep id 1-23 matching the
// picture file in public/student/ (1.png ... 23.png).
export const STUDENTS = Array.from({ length: 23 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    name: `Student ${id} Full Name`,
    image: `/student/${id}.png`,
  };
});

// Gallery items. "type" is "image" or "video". File names match
// what is inside public/assets/. Add or remove entries freely —
// the page reads this list, it does not assume a fixed count.
export const GALLERY = [
  { id: 1, type: "image", src: "/assets/1.png", caption: "First Day of Classes" },
  { id: 2, type: "image", src: "/assets/2.png", caption: "Field Trip" },
  { id: 3, type: "video", src: "/assets/3.mp4", caption: "Foundation Day Highlights" },
  { id: 4, type: "image", src: "/assets/4.png", caption: "Buwan ng Wika" },
  { id: 5, type: "image", src: "/assets/5.png", caption: "Recognition Day" },
];
