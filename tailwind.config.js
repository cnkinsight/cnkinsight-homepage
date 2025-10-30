// tailwind.config.js (ESM)
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  // ★ 추가: 다크모드 자동 반응을 막고 class 기반으로만 동작
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter', 'sans-serif', 'Noto Sans KR',
          'system-ui', '-apple-system', 'Segoe UI',
          'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'
        ],
      },
    },
  },
  plugins: [],
}
