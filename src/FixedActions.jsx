// src/FixedActions.jsx
export default function FixedActions({ children }) {
  return (
    <div
      className="fixed right-6 bottom-6 z-50 flex items-center gap-2"
      style={{ bottom: `calc(env(safe-area-inset-bottom) + 24px)` }}
    >
      {children}
    </div>
  );
}
