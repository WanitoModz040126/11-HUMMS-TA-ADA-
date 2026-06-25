const STORAGE_KEY = "humms_visitor_id";

export function getVisitorId() {
  if (typeof window === "undefined") return null;

  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `v_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

export function hasLikedBefore() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("humms_has_liked") === "1";
}

export function markLiked() {
  if (typeof window === "undefined") return;
  localStorage.setItem("humms_has_liked", "1");
}
