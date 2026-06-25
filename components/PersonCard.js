import Image from "next/image";
import styles from "./PersonCard.module.css";

export default function PersonCard({ image, name, role, index, variant = "default", style }) {
  return (
    <article className={`card reveal ${styles.card} ${styles[variant] || ""}`} style={style}>
      <div className={styles.photoWrap}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 600px) 45vw, (max-width: 960px) 30vw, 220px"
          className={styles.photo}
        />
        {typeof index === "number" && <span className={styles.indexTag}>{index}</span>}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        {role && <p className={styles.role}>{role}</p>}
      </div>
    </article>
  );
}
