// src/BackToTop.jsx
// BackToTop.jsx
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 40); // ← 40px만 내려가도 표시
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return show ? (
    <button
      onClick={toTop}
      aria-label="맨 위로"
      className="fixed bottom-6 right-6 h-11 w-11 rounded-full
                 bg-[rgb(57,57,55)] text-white shadow-lg
                 hover:bg-yellow-500 transition
                 flex items-center justify-center"
    >
      ↑
    </button>
  ) : null;
}

