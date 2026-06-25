import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LikeButton from "./LikeButton";
import MusicToggle from "./MusicToggle";
import { SECTION_INFO } from "../data/classData";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/officers", label: "Officers" },
  { href: "/students", label: "Students" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.badge}>{SECTION_INFO.gradeLevel}H</span>
          <span className={styles.brandText}>
            <strong>{SECTION_INFO.strand}</strong>
            <small>{SECTION_INFO.sectionName} &middot; {SECTION_INFO.schoolYear}</small>
          </span>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${router.pathname === link.href ? styles.linkActive : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <MusicToggle />
          <LikeButton />
          <button
            type="button"
            className={styles.burger}
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
