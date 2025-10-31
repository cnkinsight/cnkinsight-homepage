import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BackOnScroll({ threshold = 200 }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > threshold) {
        if (!mounted) setMounted(true);
        requestAnimationFrame(() => setVisible(true));
      } else {
        setVisible(false);
        const t = setTimeout(() => setMounted(false), 250);
        return () => clearTimeout(t);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, mounted]);

  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate("/"));
  if (!mounted) return null;

  return (
    <button
      onClick={goBack}
      aria-label="이전 페이지"
      className={`h-10 w-10 rounded-full shadow-sm transition-all duration-300 
                  flex items-center justify-center transform
                  ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
      style={{
        background:
          "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(45,45,45,0.65))",
        backdropFilter: "blur(3px)",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="arrowGradL" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0%" stopColor="#f5d37a" />
            <stop offset="100%" stopColor="#d08700" />
          </linearGradient>
        </defs>
        <polyline
          points="15 18 9 12 15 6"
          stroke="url(#arrowGradL)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

