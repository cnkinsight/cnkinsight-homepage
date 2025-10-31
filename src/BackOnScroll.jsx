// BackOnScroll.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function BackOnScroll({
  threshold = 200,
  target,               // optional: 스크롤 타겟 (기본 window)
  alwaysVisible = false // optional: 무조건 보이게
}) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // 스크롤 엘리먼트 정규화
  const scrollEl = useMemo(() => target ?? window, [target]);

  // 현재 스크롤 위치 읽기
  const getScrollTop = () => {
    if (scrollEl === window) return window.scrollY || document.documentElement.scrollTop || 0;
    return scrollEl?.scrollTop ?? 0;
  };

  useEffect(() => {
    // 초기 표시 상태 결정
    const update = () => {
      if (alwaysVisible) {
        setVisible(true);
        return;
      }
      if (threshold === 0) {
        setVisible(true); // 처음부터 보이게
        return;
      }
      setVisible(getScrollTop() > threshold);
    };

    // 스크롤 이벤트 리스너
    const onScroll = () => {
      requestAnimationFrame(update);
    };

    // 초기 1회 계산 + 리스너 등록
    update();
    scrollEl.addEventListener("scroll", onScroll, { passive: true });

    // 정리
    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
    };
  }, [threshold, scrollEl, alwaysVisible]);

  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate("/"));

  return (
    <button
      onClick={goBack}
      aria-label="이전 페이지"
      className={`h-10 w-10 rounded-full shadow-sm transition-all duration-300 
                  flex items-center justify-center transform
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      style={{
        background: "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(45,45,45,0.65))",
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
