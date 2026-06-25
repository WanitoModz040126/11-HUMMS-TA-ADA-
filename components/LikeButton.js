import { useEffect, useState } from "react";
import { getVisitorId, hasLikedBefore, markLiked } from "../lib/visitorId";
import styles from "./LikeButton.module.css";

export default function LikeButton() {
  const [total, setTotal] = useState(null);
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setLiked(hasLikedBefore());

    fetch("/api/like")
      .then((r) => r.json())
      .then((data) => setTotal(data.total ?? 0))
      .catch(() => setTotal(0));
  }, []);

  async function handleLike() {
    if (liked) return;

    const visitorId = getVisitorId();
    setLiked(true);
    markLiked();
    setPulse(true);
    setTimeout(() => setPulse(false), 500);

    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId }),
      });
      const data = await res.json();
      setTotal(data.total);
    } catch {
      // Network hiccup: keep the optimistic UI state, the count will
      // correct itself next time /api/like is fetched.
    }
  }

  return (
    <button
      type="button"
      className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
      onClick={handleLike}
      aria-pressed={liked}
      aria-label={liked ? "Naka-like na" : "I-like ang page na ito"}
      disabled={liked}
    >
      <svg
        className={`${styles.heart} ${pulse ? styles.heartPulse : ""}`}
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path
          d="M12 21s-7.45-4.6-10.1-9.06C.46 9.28 1.4 5.6 4.84 4.6 7.1 3.95 9.4 5 12 8c2.6-3 4.9-4.05 7.16-3.4 3.44 1 4.38 4.68 2.94 7.34C19.45 16.4 12 21 12 21z"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
      <span className={styles.count}>{total === null ? "…" : total}</span>
    </button>
  );
}
