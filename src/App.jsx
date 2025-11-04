import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useNavigate, Navigate } from "react-router-dom";

import QA from "./QA";        // ✅ 경로 수정: ./components/QA 가 아니라 ./QA

// Brand color utility (로고와 동일 톤)
const GlobalStyle = () => (
  <style>{`
    .ck-brand{color:rgb(208,135,0)}
    /* 2줄까지만 보여주고 넘치면 … */
    .clamp-2{
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
  `}</style>
);

// ✅ 카톡(해시 라우터)에서도 쿼리스트링을 안정적으로 읽기 위한 유틸
function getQueryParam(name){
  // 1) 일반 쿼리
  const usp = new URLSearchParams(window.location.search);
  const v1 = usp.get(name);
  if (v1 !== null && v1 !== undefined) return v1;
  // 2) HashRouter( #/path?msg=... ) 형태 쿼리
  const hash = window.location.hash || '';
  const qIndex = hash.indexOf('?');
  if (qIndex !== -1){
    const qs = hash.slice(qIndex + 1);
    const v2 = new URLSearchParams(qs).get(name);
    if (v2 !== null && v2 !== undefined) return v2;
  }
  return null;
}

// ---- Shared: Header & Footer ----
function Header(){
  const nav = ({isActive})=>`px-2 py-1 ${isActive?'ck-brand font-semibold':'hover:text-yellow-500'}`;
  return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-6 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <NavLink to="/" className="flex items-center"><img src="/1-2.png" alt="C&KInsight Logo" className="h-12" /></NavLink>
      </div>
      <nav className="space-x-6 text-lg font-semibold">
        <NavLink to="/about" className={nav}>About</NavLink>
        <NavLink to="/services" className={nav}>Services</NavLink>
        <NavLink to="/cases" className={nav}>Case Studies</NavLink>
        <NavLink to="/insights" className={nav}>Insights</NavLink>
        <NavLink to="/contact" className={nav}>Contact</NavLink>
      </nav>
    </header>
  );
}

function Footer(){
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 text-center font-light">
      <p>© 2025 C&KInsight. All Rights Reserved.</p>
    </footer>
  );
}

// ---- Layouts ----
function PageLayout({breadcrumb, title, children}){
  return (
    <main className="py-16 px-6 max-w-5xl mx-auto">
      {breadcrumb && <nav className="text-sm mb-4">{breadcrumb}</nav>}
      <h2 className="text-3xl font-extrabold ck-brand mb-6 tracking-tight">{title}</h2>
      <div className="bg-white p-8 rounded-2xl shadow leading-relaxed">{children}</div>
    </main>
  );
}

// ---- Home (overview + preview) ----
function Home(){
  const navigate = useNavigate();

  // 👇 여기! 이 줄들 추가
  const isMobileUA = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-center py-28 px-6">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6">From Concept to Clearance,<br />We Deliver Insight</h1>
        <p className="text-2xl font-semibold mb-8 max-w-2xl mx-auto leading-relaxed">
          C&KInsight는 의료기기 개발의 시작부터 허가까지, <br />Insight로 전략을 제시하는 파트너입니다.
        </p>
        <div className="space-x-4">
          <button onClick={()=>navigate('/contact')} className="px-8 py-4 bg-white ck-brand font-bold rounded-full shadow hover:bg-gray-100 transition">상담 신청하기</button>
          <button onClick={()=>navigate('/services')} className="px-8 py-4 border-2 border-white font-semibold rounded-full hover:bg-yellow-500 transition">서비스 보기</button>
        </div>
      </section>

      {/* About (preview) */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold ck-brand mb-4 tracking-tight">Beyond CRO, We Are Insight Partners</h2>
        <p className="leading-relaxed mb-6">우리는 단순히 임상시험을 운영하는 CRO가 아닙니다. R&D 가능성 검토부터 임상, 규제 허가까지 이어지는 복잡한 여정을 Insight로 설계합니다.</p>
        <NavLink to="/about" className="inline-block px-5 py-3 rounded-full bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600">About 자세히 보기</NavLink>
      </section>

      {/* Services preview */}
     <section className="bg-gray-100 py-16 px-6">
       <div className="max-w-6xl mx-auto">
       <h2 className="text-3xl font-extrabold text-center ck-brand mb-8 tracking-tight">Our Services</h2>
       <div className="grid md:grid-cols-2 gap-8">
      
      {/* Full-Scope CRO */}
      <NavLink to="/services/full-scope" className="group bg-white p-8 rounded-2xl shadow hover:shadow-lg transition block">
        <h3 className="text-2xl font-bold mb-2">Full-Scope CRO</h3>
        <ul className="list-disc ml-5 text-sm leading-relaxed space-y-1">
          <li>프로토콜 설계부터 모니터링, 데이터 관리(EDC/DM), 통계·CSR까지</li>
          <li>임상시험 전 과정 일괄 지원</li>
        </ul>
        <span className="mt-4 inline-block ck-brand font-semibold group-hover:underline">자세히 보기 →</span>
      </NavLink>
      
      {/* Partial CRO */}
      <NavLink to="/services/partial" className="group bg-white p-8 rounded-2xl shadow hover:shadow-lg transition block">
        <h3 className="text-2xl font-bold mb-2">Partial CRO</h3>
        <ul className="list-disc ml-5 text-sm leading-relaxed space-y-1">
          <li>내부 리소스·예산 상황에 맞춘 맞춤형 모듈형 서비스</li>
          <li>Protocol/SAP, 모니터링, 통계·CSR 등 필요 기능별 수행 지원</li>
        </ul>
        <span className="mt-4 inline-block ck-brand font-semibold group-hover:underline">자세히 보기 →</span>
      </NavLink>
      
      {/* Regulatory Consulting */}
      <NavLink to="/services/regulatory" className="group bg-white p-8 rounded-2xl shadow hover:shadow-lg transition block">
        <h3 className="text-2xl font-bold mb-2">Regulatory Consulting</h3>
        <ul className="list-disc ml-5 text-sm leading-relaxed space-y-1">
          <li>국내 허가(MFDS) 전략·심사 대응 중심</li>
          <li>FDA·CE 준비 기업에는 설계·문서화 가이드 제공</li>
        </ul>
        <span className="mt-4 inline-block ck-brand font-semibold group-hover:underline">자세히 보기 →</span>
      </NavLink>
      
      {/* Special Expertise */}
      <NavLink to="/services/expertise" className="group bg-white p-8 rounded-2xl shadow hover:shadow-lg transition block">
        <h3 className="text-2xl font-bold mb-2">Special Expertise</h3>
        <ul className="list-disc ml-5 text-sm leading-relaxed space-y-1">
          <li>DTx, AI-SaMD, IVD 등 최신 분야 특화 경험</li>
          <li>새로운 규제 환경에 맞춘 전략·임상 설계 지원</li>
        </ul>
        <span className="mt-4 inline-block ck-brand font-semibold group-hover:underline">자세히 보기 →</span>
      </NavLink>
          </div>
        </div>
      </section>

      {/* Case Studies preview */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center ck-brand mb-8 tracking-tight">Case Studies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* DTx */}
          <NavLink 
             to="/cases/dtx" 
             className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition block">
            <h3 className="text-xl font-bold mb-2 leading-snug">
              {isMobileUA ? "DTx" : "Digital Therapeutics (DTx)"}
            </h3>
            <p className="text-sm">국내 최초 디지털치료제 IND 승인 경험</p>
          </NavLink>

          {/* AI-SaMD */}
          <NavLink 
             to="/cases/ai-samd" 
             className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition block">
            <h3 className="text-xl font-bold mb-2 leading-snug">
              {isMobileUA ? "AI-SaMD" : "AI-SaMD / Diagnostic AI"}
            </h3>
            <p className="text-sm">다양한 적응증·평가변수 경험 보유</p>
          </NavLink>

          {/* IVD (Qualitative) */}
          <NavLink
             to="/cases/ivd-qual" 
             className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition block">
            <h3 className="text-xl font-bold mb-2 leading-snug">
              {isMobileUA ? "IVD(Qual)" : "IVD (Qualitative)"}
              </h3>
            <p className="text-sm">2016년부터 다양한 적응증 임상 경험</p>
          </NavLink>

          {/* IVD (Quantitative) */}
          <NavLink 
             to="/cases/ivd-quant" 
             className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition block">
            <h3 className="text-xl font-bold mb-2 leading-snug">
              {isMobileUA ? "IVD(Quant)" : "IVD (Quantitative)"}
              </h3>
            <p className="text-sm">정량 임상통계 방법론 정립·검증 경험</p>
          </NavLink>

          {/* Medical Supplies */}
          <NavLink 
             to="/cases/med-supplies" 
             className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition block">
            <h3 className="text-xl font-bold mb-2 leading-snug">
              {isMobileUA ? "Med Supplies": "Medical Supplies / Accessorie"}
            </h3>
            <p className="text-sm">혈압·생활용품 등 다양한 현장 경험</p>
          </NavLink>
        </div>
      </section>

      {/* Insights preview (텍스트만, 짧은 한 줄 설명) */}
      <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
      {/* ✅ Insights 전체로 이동할 수 있도록 타이틀에 NavLink 추가 */}
      <NavLink to="/insights" className="block text-center group">
      <h2 className="text-3xl font-extrabold ck-brand mb-2 tracking-tight group-hover:text-[#D08700] transition-colors">
      Insights
      </h2>
      <p className="text-gray-600 text-sm mb-8">
      규제·임상·통계에 대한 C&KInsight의 관점을 공유합니다. 클릭하면 전체 개요 페이지로 이동합니다.
      </p>
      </NavLink>


      <div className="grid md:grid-cols-4 gap-6">
      <NavLink
      to="/insights/samplesize"
      className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition block"
      >
      <h3 className="text-xl font-bold mb-2  min-h-[72px] leading-snug">
              {isMobileUA ? "Design" : "Sample Size Determination Journey"}
      </h3>
      <p className="text-sm text-gray-600">Clinical success → right ‘n’ by rigorous stats</p>
      </NavLink>


      <NavLink
      to="/insights/ai-samd"
      className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition block"
      >
      <h3 className="text-xl font-bold mb-2 min-h-[72px] leading-snug">
              {isMobileUA ? "AI-SaMD" : "AI-SaMD: From Purpose to Endpoints"}
      </h3>
      <p className="text-sm text-gray-600">Align endpoints with purpose; bridge to approval</p>
      </NavLink>


      <NavLink
      to="/insights/dtx"
      className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition block"
      >
      <h3 className="text-xl font-bold mb-2 min-h-[72px] leading-snug">
              {isMobileUA ? "Dtx" : "DTx in the Clinical Ecosystem"}
      </h3>
      <p className="text-sm text-gray-600">CBT, adherence, lifestyle—care beyond hospitals</p>
      </NavLink>


      {/* Biomarkers → IVD 로 경로 변경 */}
      <NavLink
      to="/insights/ivd"
      className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition block"
      >
      <h3 className="text-xl font-bold mb-2 min-h-[72px] leading-snug">
              {isMobileUA ? "IVD" : "Biomarkers & Longitudinal Evidence"}
      </h3>
      <p className="text-sm text-gray-600">Track over time to confirm clinical value</p>
      </NavLink>
      </div>
      </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-4 ck-brand tracking-tight">Start with Insight</h2>
        <p className="mb-6">귀사의 의료기기 임상 및 허가 전략, 지금 바로 상담해보세요.</p>
        <button onClick={()=>navigate('/contact')} className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-full shadow hover:bg-yellow-600 transition">상담 신청하기</button>
      </section>
    </main>
  );
}

// ---- About ----
function LegendItem({ title, children }) {
  return (
    <li className="flex items-start gap-3">
      {/* 원형 배지 안의 체크 */}
      <span className="mt-1 inline-flex w-6 h-6 items-center justify-center rounded-full bg-yellow-500 text-white shadow ring-1 ring-yellow-600/20 flex-none">
        <svg
          viewBox="0 0 24 24" width="14" height="14"
          fill="none" stroke="currentColor" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M20 6 9 17 4 12" />
        </svg>
      </span>

      {/* 텍스트 */}
      <span className="leading-relaxed">
        <span className="font-semibold text-yellow-700">{title}</span>{' '}
        {children}
      </span>
    </li>
  );
}

function AboutPage(){
  return (
    <PageLayout title="About C&KInsight" breadcrumb={<NavLink to="/" className="hover:underline">Home</NavLink>}>
      <div className="space-y-10">
        {/* 회사 소개 */}
        <section>
          <h3 className="text-xl font-bold mb-3">우리는 무엇을 다르게 하나요?</h3>
           <p className="leading-relaxed mb-4">
             C&KInsight는 단순 실행을 넘어, <strong className="ck-brand">고객과 함께 Insight를 설계하는 파트너</strong>입니다.
           </p>

           <p className="leading-relaxed mb-4">
             연구 아이디어 단계에서 <strong>임상 설계 · 운영 · 분석</strong>, <br />
             그리고 <strong>국내 허가 대응</strong>까지 전 과정을 전략적으로 연결합니다.
           </p>   

           <p className="leading-relaxed">
            <strong>20년 이상의 통계 경험</strong>과 <strong>규제 기반 전문성</strong>을 가진 동일한 팀이 <br />
            초기 가설부터 허가 심사 대응까지 <strong>일관되게 리드</strong>합니다.
           </p>
        </section>

        {/* 수치/신뢰 지표 */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 rounded-xl border"><div className="text-3xl font-extrabold ck-brand">10+년</div><div className="text-sm mt-1">의료기기 임상/허가 컨설팅</div></div>
          <div className="p-6 bg-gray-50 rounded-xl border"><div className="text-3xl font-extrabold ck-brand">100+건</div><div className="text-sm mt-1">프로토콜/CSR/제출 패키지</div></div>
          <div className="p-6 bg-gray-50 rounded-xl border"><div className="text-3xl font-extrabold ck-brand">DTx · AI‑SaMD · IVD</div><div className="text-sm mt-1">최신 분야 특화 역량</div></div>
        </section>

        {/* 비전 벤다이어그램 (SVG) */}
        <section>
          <h3 className="text-xl font-bold mb-9">비전: Insight로 전주기를 설계합니다</h3>
          <div className="flex flex-col md:flex-row items-center gap-5">
            {/* Venn Diagram */}
            <div className="relative w-[420px] h-[220px]">
              <svg viewBox="0 -0 320 220" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopOpacity="0.12" stopColor="rgb(208,135,0)"/>
                    <stop offset="100%" stopOpacity="0.12" stopColor="#000"/>
                  </linearGradient>
                </defs>
                {/* Circles */}
                <circle cx="120" cy="110" r="80" fill="url(#g1)"  strokeOpacity="0.5" />
                <circle cx="200" cy="110" r="80" fill="url(#g1)"  strokeOpacity="0.5" />
                <circle cx="160" cy="70" r="80" fill="url(#g1)"  strokeOpacity="0.5" />
                {/* Labels */}
                <text x="40" y="165" fontSize="14"fontWeight="530">R&D 가능성 검토</text>
                <text x="205" y="165" fontSize="14"fontWeight="530">임상 운영·분석</text>
                <text x="135" y="15" fontSize="14"fontWeight="530">규제 허가</text>
                {/* Center */}
                <g>
                  <circle cx="160" cy="100" r="30" fill="rgb(57,57,55)"  />
                  <text x="151" y="97" textAnchor="middle" fontSize="13" fontWeight="700" fill="rgb(243,211,32)">C</text>
                  <text x="160" y="97" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">&</text>
                  <text x="169" y="97" textAnchor="middle" fontSize="13" fontWeight="700" fill="rgb(243,211,32)">K</text>
                  <text x="160" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">Insight</text>
                </g>
              </svg>
            </div>

            {/* Legend */}
            <ul className="space-y-5">
              <LegendItem title="R&D 가능성 검토:">
                <span className="inline-block whitespace-nowrap">
                적응증 정의, 임상적 타당성, 예비 통계 검토를 통해
                <span className="font-semibold "> 개발 방향의 근거</span>를 마련합니다.
                </span>
              </LegendItem>

              <LegendItem title="임상 운영·분석:">
                <span className="inline-block whitespace-nowrap">
                Protocol/SAP, 모니터링, EDC/DM 등 <span className="font-semibold">실행 가능한 설계와 분석 지원</span>을 제공합니다.
                </span>
              </LegendItem>

              <LegendItem title="규제 허가:">
                <span className="inline-block whitespace-nowrap">
                <span className="font-semibold">국내 허가(MFDS)</span>를 중심으로 지원하며,
                FDA·CE 인증을 준비하는 업체에는</span> <br/><span className="font-semibold">연구 설계 및 문서화 가이드</span>를 제공합니다.
              </LegendItem>
            </ul>

          </div>
        </section>

        {/* 왜 C&KInsight인가 */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border text-left">
            <h4 className="font-semibold mb-2">One‑Team Execution</h4>
            <p className="text-[13.5px] md:text-sm leading-6 tracking-tight">
              초기 가설부터 허가 심사까지 동일한 코어 팀이 리드하여 의사결정의 일관성을 유지합니다.</p>
          </div>
          <div className="p-6 rounded-xl border text-left">
            <h4 className="font-semibold mb-2">Flexible Engagement</h4>
            <p className="text-[13.5px] md:text-sm leading-6 tracking-tight">
              Full-Scope 또는 Partial 모듈(Protocol/SAP, 모니터링, 통계·CSR 등)로
              상황에 맞춰 계약 가능합니다.
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

// ---- Services Overview ----
function ServicesPage(){
  return (
    <PageLayout title="Our Services" breadcrumb={<NavLink to="/" className="hover:underline">Home</NavLink>}>
      <p className="mb-8">필요한 범위만 선택하는 <strong>Partial</strong>부터, 전 과정을 맡기는 <strong>Full-Scope</strong>까지
        C&KInsight는 임상·허가 전주기를 Insight로 설계합니다.<br/> 아래 항목에서 세부 내용을 확인하세요.</p>

      {/* 카드 목록 */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Full-Scope CRO */}
        <NavLink to="/services/full-scope" className="group block bg-gray-50 hover:bg-white p-6 rounded-2xl border shadow-sm hover:shadow transition">
          <h3 className="text-2xl font-bold mb-2">Full-Scope CRO</h3>
          <p className="text-sm mb-3 tracking-tighter text-left">
            프로토콜 → 모니터링 → 데이터 관리(EDC/DM) → 통계·CSR까지
            임상시험 전 과정을 일관성 있게 수행합니다.
          </p>

          <span className="ck-brand font-semibold group-hover:underline">자세히 보기 →</span>
        </NavLink>
        
        {/* Partial CRO */}
        <NavLink to="/services/partial" className="group block bg-gray-50 hover:bg-white p-6 rounded-2xl border shadow-sm hover:shadow transition">
          <h3 className="text-2xl font-bold mb-2">Partial CRO (Flexible)</h3>
          <p className="text-sm mb-3 tracking-tighter text-left">
            필요한 구간만 선택: Protocol/SAP, 모니터링, 통계·CSR,
            출판용 임상시험 등 모듈형 지원
          </p>
          <span className="ck-brand font-semibold group-hover:underline">자세히 보기 →</span>
        </NavLink>
        
        {/* Regulatory Consulting */}
        <NavLink to="/services/regulatory" className="group block bg-gray-50 hover:bg-white p-6 rounded-2xl border shadow-sm hover:shadow transition">
          <h3 className="text-2xl font-bold mb-2">Regulatory Consulting</h3>
          <p className="text-sm mb-3 tracking-tighter text-left">
            국내 허가(MFDS) 전략·심사 대응 중심, 
            FDA·CE 인증 준비 기업에는 설계·문서화 가이드 제공
          </p>
          <span className="ck-brand font-semibold group-hover:underline">자세히 보기 →</span>
        </NavLink>
        
        {/* Special Expertise */}
        <NavLink to="/services/expertise" className="group block bg-gray-50 hover:bg-white p-6 rounded-2xl border shadow-sm hover:shadow transition">
          <h3 className="text-2xl font-bold mb-2">Special Expertise</h3>
          <p className="text-sm mb-3 tracking-tighter text-left">
            DTx, AI-SaMD, IVD 등 최신 의료기기 분야 경험 
            새로운 개발 전략과 임상 설계 지원
          </p>
          <span className="ck-brand font-semibold group-hover:underline">자세히 보기 →</span>
        </NavLink>
      </div>

      {/* Full vs Partial 비교표 */}
      <div className="overflow-x-auto mb-10">
        <h3 className="text-xl font-bold mb-3">어떤 방식이 맞을까요? (비교표)</h3>
        <table className="min-w-full bg-white rounded-xl overflow-hidden border">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-4">항목</th>
              <th className="p-4">Full‑Scope</th>
              <th className="p-4">Partial</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="p-4">책임 범위</td>
              <td className="p-4">계획·운영·통계·CSR·허가까지 전 주기</td>
              <td className="p-4">선택 모듈만 수행(예: SAP/통계, 모니터링 등)</td>
            </tr>
            <tr>
              <td className="p-4">일정/예산 유연성</td>
              <td className="p-4">고정된 일정/범위로 리스크 최소화</td>
              <td className="p-4">내부 리소스와 상황에 맞춰 증감 가능</td>
            </tr>
            <tr>
              <td className="p-4">적합한 상황</td>
              <td className="p-4">임상 경험이 적거나 속도를 최우선으로 할 때</td>
              <td className="p-4">일부 기능은 인하우스로 처리 가능한 경우</td>
            </tr>
            
          </tbody>
        </table>
      </div>

      {/* 프로세스 타임라인 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-3">표준 수행 프로세스 (예)</h3>
        <ol className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {['Kick‑off','Protocol/SAP','CM/Monitoring','EDC/DM','Stats & CSR','Submission'].map((s,i)=> (
            <li key={s} className="bg-white rounded-xl border p-4 text-center shadow-sm">
              <div className="text-3xl font-extrabold ck-brand">{i+1}</div>
              <div className="mt-1 text-sm break-words">{s}</div>
            </li>
          ))}
        </ol>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-xl font-bold mb-3">자주 받는 질문(FAQ)</h3>
        <div className="grid md:grid-cols-2 gap-4 tracking-tight">
          <QA q="Partial로 시작했다가 Full‑Scope로 전환할 수 있나요?" 
               a="네, 가능합니다.<br/>
                  진행 중인 Partial 범위를 검토한 뒤, 일정과 인력 구성을
                  Full-Scope 체계로 확장하여 관리합니다.
                  이미 수행된 단계의 결과물은 동일한 품질 기준에 따라 통합 관리되며, 
                  이후 과정은 하나의 프로젝트로 일관되게 운영됩니다."/>
          <QA q="EDC/DM만 별도로 맡길 수 있나요?" 
              a="네, 가능합니다.<br/>
                 EDC 구축 및 데이터 관리는 단독 과업으로도 수행할 수 있습니다.
                 CRScube 등 검증된 임상 데이터관리(EDC/DM) 시스템을 활용하여
                 데이터 구조 설계, 질 관리(QC), Lock까지 전 과정을 지원합니다.
                 타 기관 또는 자체 수행 중인 임상시험이라도, 기존 프로토콜과 연동 
                 가능한 형태로 맞춤 구축이 가능합니다."/>
          <QA q="AI-SaMD의 임상 설계는 기능별로 어떻게 달라지나요?" 
              a="AI-SaMD는 예측·진단·치료보조 등 기능 틀은 유사하지만,
               실제 설계는 적응증의 특성에 따라 달라집니다.
               예를 들어 폐렴 진단 AI는 기존 판독 대비 민감도·특이도 및 AUC 입증이 핵심이며, 
                이를 위해 데이터셋 다양성, Gold standard 정의, 독립 검증 코호트 확보가 필수입니다."/>
          <QA q="IMFDS의 임상적 성능시험과 EU IVDR의 Clinical Performance Evaluation은 무엇이 다른가요?" 
              a="EU IVDR에서는 문헌, 임상 경험, 임상적 성능시험 데이터를
                 모두 통합하여 Clinical Evidence로 정의하고,
                 이를 Clinical Performance Evaluation(CPE) 안에서 종합적으로
                 검토합니다. 반면 MFDS는 임상적 성능시험에 대해 별도의 사전 승인 절차는 없으나, 
                 IRB 승인 하에 수행된 계획서와 결과보고서를
                 허가 심사 시 함께 검토합니다.
                 따라서 국내 허가에서는 문헌·임상경험만으로는 충분하지 않으며,
                 실제 환자 기반의 임상적 성능시험 자료 제출이 핵심입니다."/>
          <QA q="홈페이지를 통해 상담 요청한 이후 절차를 어떻게 진행되나요?" 
              a="홈페이지를 통해 상담 요청이 접수되면,
                 먼저 제출하신 내용을 검토한 뒤 담당 컨설턴트가 이메일로 세부 사항을 확인드립니다.
                 필요 시 추가 자료나 질의를 주고받은 후, 미팅 일정(온라인 또는 대면)을 조율하여 구체적인 논의로 이어집니다.
                 이후 협의된 범위를 기반으로 프로젝트 제안서와 견적서를 단계별로 안내해드립니다."/>  
          <QA q="정부과제와 연계 가능한가요?" 
              a="네, 가능합니다.<br/>
                 TIPS, 범부처 과제, 보건의료 R&D 등 정부과제 기반 연구와 연계해 수행할 수 있습니다.
                 연구비 구조와 과제 일정에 맞춰 단계별 견적, 산출근거, 
                 과업 분리 계약을 지원하며, 필요 시 예산서, 과제 산출물 등 
                 과제 제출 서류 형태로 맞추어 제공해드립니다."/>
          <QA q="Insight라는 개념은 무엇을 의미하나요?"
              a="C&KInsight가 말하는 Insight는 단순한 실행이 아니라, 
                 제품 특성과 목표에 맞는 임상·허가 전략을 정확히 짚어내는 관점을 의미합니다.  
                 무엇을, 왜, 어떤 방식으로 진행해야 가장 효율적인지를 함께 고민하며, 임상 설계부터 데이터 관리, 허가 대응까지 
                 현실적인 방향을 제시하는 경험과 판단력이 우리의 Insight입니다."/>
                                
        </div>
      </div>
    </PageLayout>
  );
}

// ---- Service Detail Pages ----
function ServiceLayout({title, children}){
  return (
    <PageLayout breadcrumb={<NavLink to="/services" className="hover:underline">Services</NavLink>} title={title}>
      {children}
    </PageLayout>
  );
}
function FullScopePage(){
  return (
    <ServiceLayout title="Full‑Scope CRO">
      <p className="mb-6">
        <span className="font-semibold text-yellow-600">
        프로토콜 설계부터 모니터링, 데이터 관리(EDC/DM), 통계 분석, CSR 작성</span>까지 임상시험 전 과정을 일관성 있게 수행합니다. <br /> 
        <span className="font-semibold text-yellow-600">
        국내 허가(MFDS)</span>를 중심으로 지원하며, FDA·CE 인증을 준비하는 업체에는{" "} 
        <span className="font-semibold text-yellow-600 tracking-tight">
        글로벌 규제 요구를 반영한 연구 설계 및 문서화 가이드</span>도 제공합니다.</p>
      <ul className="list-disc ml-6 space-y-1 mb-6">
        <li>임상 전략 수립 / Protocol · SAP 설계</li>
        <li>사이트 셋업 · 모니터링 · 품질관리</li>
        <li>EDC 구축 · 데이터 무결성 · 데이터 관리(EDC/DM)</li>
        <li>통계 분석 · CSR 작성 · eCTD 제출 패키지</li>
      </ul>
      <div className="flex gap-3">
        <NavLink to="/cases" className="px-5 py-3 border rounded-full font-semibold hover:bg-gray-50">관련 사례 보기</NavLink>
        <NavLink to="/contact" className="px-5 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600">상담 신청하기</NavLink>
      </div>
    </ServiceLayout>
  );
}
function PartialPage(){
  return (
    <ServiceLayout title="Partial CRO (Flexible)">
      <p className="mb-6">
        <span className="font-semibold text-yellow-600">내부 리소스와 예산에 맞춰 필요한 구간만 선택적으로 지원</span>합니다. <br />
        R&D 타당성 검토, Protocol/SAP 설계, 모니터링, 
        <span className="font-semibold"> 통계·CSR, 허가 후 논문 출판용 임상시험</span>까지 
        단계별 맞춤 지원이 가능합니다. <br />
        <span className="font-semibold text-yellow-600">국내 허가</span>를 중심으로 진행하며, 
        해외 인증을 준비하는 업체에는 <span className="font-semibold">국제 규제 기준을 고려한 임상 설계·계획서 가이드</span>를 제공합니다.</p>
      <ul className="list-disc ml-6 space-y-1 mb-6">
        <li>Protocol/SAP 단독 수행</li>
        <li>임상시험 관리 + 모니터링</li>
        <li>통계 분석 + CSR 패키지</li>
        <li> R&D 타당성 검토 및 연구개발 지원</li>
        <li>허가 후 논문 출판용 임상시험</li>
      </ul>
      <div className="flex gap-3">
        <NavLink to="/cases" className="px-5 py-3 border rounded-full font-semibold hover:bg-gray-50">관련 사례 보기</NavLink>
        <NavLink to="/contact" className="px-5 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600">상담 신청하기</NavLink>
      </div>
    </ServiceLayout>
  );
}
function RegulatoryPage(){
  return (
    <ServiceLayout title="Regulatory Consulting">
      <ul className="list-disc ml-6 space-y-1 mb-6">
        <li> <strong>국내 허가(MFDS):</strong> 임상·허가 전략 수립, 심사 질의(RFI) 대응 문서화 지원</li>
        <li><strong>FDA/CE 인증 준비:</strong> 510(k), De Novo, PMA, IVDR 경로 검토 및 
          요구사항 매핑(직접 대행 아님, <em>설계·문서화 가이드 제공</em>)</li>
        <li><strong>연구 설계·문서화:</strong> 임상시험계획서(Protocol), 내부 성능평가(정성/정량) 설계 가이드</li>
        <li>Pre-Sub/사전상담 준비: 브리핑북 작성, 예상 Q&A, 데이터 갭 분석</li>
      </ul>
      <p className="text-sm mb-4">* 해외 직접 제출은 수행하지 않습니다. 고객 주도 제출 시 설계·문서화 가이드와 전략 컨설팅을 제공합니다.</p>
      <div className="flex gap-3">
        <NavLink to="/cases" className="px-5 py-3 border rounded-full font-semibold hover:bg-gray-50">관련 사례 보기</NavLink>
        <NavLink to="/contact" className="px-5 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600">상담 신청하기</NavLink>
      </div>
    </ServiceLayout>
  );
}
function ExpertisePage(){
  return (
    <ServiceLayout title="Special Expertise">
      <ul className="list-disc ml-6 space-y-1 mb-6">
        <li>Digital Therapeutics (DTx): 다양한 치료 영역 전반의 임상 설계 경험과 새로운 적응증에서의 규제 선례 개척</li>
        <li>AI-SaMD: 실제 임상환경 기반 성능 검증 및 맞춤형 연구 설계 경험</li>
        <li>IVD (including POCT): 정성·정량 체외진단기기의 성능시험 설계 및 통계 검증 적용 경험</li>
        <li>Clinical Trial Design: SW-CRT, MMRM/ANCOVA 등 복잡한 연구 설계 경험</li>
      </ul>
      <div className="flex gap-3">
        <NavLink to="/cases" className="px-5 py-3 border rounded-full font-semibold hover:bg-gray-50">관련 사례 보기</NavLink>
        <NavLink to="/contact" className="px-5 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600">상담 신청하기</NavLink>
      </div>
    </ServiceLayout>
  );
}

// ---- Cases Overview ----
function CasesPage(){
  const isMobileUA = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  return (
    <PageLayout title="Case Studies" breadcrumb={<NavLink to="/" className="hover:underline">Home</NavLink>}>
      <p className="mb-8">실제 수행한 프로젝트 사례를 통해 C&KInsight의 실행력을 확인하세요. 카드를 눌러 상세로 이동합니다.</p>
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
      {/* DTx */}
      <NavLink to="/cases/dtx" 
        className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow transition flex flex-col h-full">
        <div className="flex-grow">
           <h3 className="text-xl font-bold mb-2 min-h-[56px]">
             {isMobileUA ? "DTx" : "Digital Therapeutics (DTx)"}</h3>
          <p className="text-sm mb-4">
            {isMobileUA
             ? "항암·천식·비염 등 MFDS 승인"
             : <>항암, 천식, 알레르기 비염 등<br/> | MFDS 임상 승인</>}
          </p>
        </div>
        <span className="ck-brand font-semibold group-hover:underline mt-auto">사례 보기 →</span>
      </NavLink>

      {/* AI-SaMD */}
      <NavLink to="/cases/ai-samd" 
        className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow transition flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-2 min-h-[56px]">
            {isMobileUA ? "AI-SaMD" : "AI-SaMD / Diagnostic AI"}
          </h3>
          <p className="text-sm mb-4">
            {isMobileUA
              ? "호흡기·희귀·갑상선암 등 MFDS·FDA 승인"
              : <>호흡기, 희귀, 갑상선암 등<br />| MFDS 허가, FDA 승인</>}
          </p>
        </div>
        <span className="ck-brand font-semibold group-hover:underline mt-auto">사례 보기 →</span>
      </NavLink>

      {/* IVD (Qualitative) */}
      <NavLink to="/cases/ivd-qual" 
        className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow transition flex flex-col h-full">
        <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2 min-h-[56px]">
                {isMobileUA ? "IVD(Qual)" : "IVD (Qualitative)"}
              </h3>
              <p className="text-sm mb-4">
                {isMobileUA
                  ? "STD·RV·Sepsis 등 MFDS 허가"
                  : <>STD, RV, Sepsis 등<br />| MFDS 허가</>}
              </p>
        </div>
        <span className="ck-brand font-semibold group-hover:underline mt-auto">사례 보기 →</span>
      </NavLink>

      {/* IVD (Quantitative) */}
      <NavLink to="/cases/ivd-quant" 
        className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow transition flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-2 min-h-[56px]">
            {isMobileUA ? "IVD(Quant)" : "IVD (Quantitative)"}
          </h3>
          <p className="text-sm mb-4">
            {isMobileUA
              ? "CMV·CK-MB·NT-proBNP 등 MFDS 허가"
              : <>CMV, CK-MB, NT-proBNP 등<br />| MFDS 허가</>}
          </p>
        </div>
        <span className="ck-brand font-semibold group-hover:underline mt-auto">사례 보기 →</span>
      </NavLink>

      {/* Medical Supplies */}
      <NavLink to="/cases/med-supplies" 
        className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow transition flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-2 min-h-[56px]">
            {isMobileUA ? "Med Supplies" : "Medical Supplies / Accessories"}
          </h3>
          <p className="text-sm mb-4">
            {isMobileUA
              ? "혈압 관리 등 MFDS 승인"
              : <>혈압 관리 등<br />| MFDS 임상 승인</>}
          </p>
        </div>
        <span className="ck-brand font-semibold group-hover:underline mt-auto">사례 보기 →</span>
      </NavLink>
    </div>


    </PageLayout>
  );
}

// ---- Insights Overview ----
function InsightsPage() {
  const isMobileUA = /Android|iPhone|iPad|iPod/i.test(
  typeof navigator !== "undefined" ? navigator.userAgent : ""
  );
  // 재사용 카드
  const InsightCard = ({ to, title, desc }) => (
    <NavLink
      to={to}
      className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition block h-full"
    >
      <div className="h-full flex flex-col">
        {/* ✅ 제목 높이 고정 */}
        <h3 className="text-lg font-bold mb-2 leading-snug min-h-[72px]">
          {title}
        </h3>
        <p className="text-sm text-gray-600 clamp-2 flex-1">{desc}</p>
        <div className="mt-4 flex justify-end">
          <span className="ck-brand text-sm font-semibold group-hover:underline">
            내용보기 →
          </span>
        </div>
      </div>
    </NavLink>
  );

  return (
    <PageLayout
      title="Insights"
      breadcrumb={<NavLink to="/" className="hover:underline">Home</NavLink>}
    >
      {/* ---- Hero ---- */}
      <section className="mb-8">
        <div className="rounded-2xl border border-gray-200 bg-white/90 shadow-sm p-6 md:p-8">
          {/* 1) 상단 카테고리 + 제목(별도 행) */}
          <p className="text-sm font-semibold text-[#D08700]">
            C&KInsight · Philosophy
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight whitespace-normal md:whitespace-nowrap">
            From <span className="text-[#D08700]">Disconnection</span> to{" "}
            <span className="text-[#D08700]">Direction</span>
          </h2>

          {/* 2) (왼쪽) 문단+불릿  ↔  (오른쪽) 인포그래픽 */}
          <div className="mt-6 flex flex-col md:flex-row items-start gap-6 md:gap-10">
            {/* 왼쪽: 문단 + 불릿 묶음 */}
            <div className="md:flex-1 min-w-0">   {/* ← 좌측 영역은 남는 폭 다 쓰고, 넘침 방지 */}
              <p className="text-[16px] text-left leading-relaxed text-gray-700 mb-7">
                복잡한 규제·임상·통계 과정에서 단계가 분절되면 <br/>결과는 목적에서 멀어집니다.<br/>
                <span className="inline-block text-left">
                  {/* ← nowrap 제거로 과도한 가로폭 방지 */}
                  C&KInsight는 전체를 조망하는 <strong>Insight</strong>로 각 단계를 정렬하고,
                </span>
                <br/>
                <span className="inline-block text-left ">
                  <strong>목적 정합적 결과</strong>로 연결합니다.
                </span>
              </p>

              <ul className="space-y-1.5 text-[15px] text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-[#D08700]" />
                  Endpoint–Design–Power–Validation의 정렬
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-[#D08700]" />
                  심사자가 의도를 즉시 파악할 수 있는 설계/문서화
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-[#D08700]" />
                  Purpose-Aligned Outcome 달성
                </li>
              </ul>
            </div>

            {/* 오른쪽: 인포그래픽 */}
            <figure className="md:shrink-0 md:basis-[380px] rounded-xl bg-[#FFFBF5] overflow-hidden">
              {/* ↑ md에서 고정폭(basis) + shrink-0 로 줄바꿈/밀림 방지.
                  폭 더 줄이고 싶으면 360~400px 사이로 조정 */}
              <img
                src="/insights-hero-v3.png"
                alt="Insight Guides the Way: Unclear→Aligned (Insight→Design→Power→Outcome)"
                className="block w-full h-auto object-contain object-top select-none"
                loading="lazy"
              />
            </figure>
          </div>

        </div>
      </section>

      {/* ---- 카드 그리드 ---- */}
      <p className="mb-4 text-gray-700">
        규제·임상·통계에 대한 C&KInsight의 관점을 카드로 정리했습니다. 아래 카드를 눌러 확인하세요.
      </p>

      <div className="grid md:grid-cols-4 gap-6 items-stretch">
        {/* 1. Sample Size */}
        <InsightCard
          to="/insights/samplesize"
          title={
            isMobileUA
              ? "Design"
              : "Sample Size Determination Journey"
          }
          desc="Clinical success criteria, statistical rigor, and representative populations converge to define the right ‘n’ for your study."
        />

        {/* 2. AI-SaMD */}
        <InsightCard
          to="/insights/ai-samd"
          title={
            isMobileUA
              ? "AI-SaMD"
              : "AI-SaMD: From Purpose to Endpoints"
          }
          desc="AI-based devices require endpoints aligned with clinical purpose, bridging algorithm performance with regulatory approval."
        />

        {/* 3. DTx */}
        <InsightCard
          to="/insights/dtx"
          title={
            isMobileUA
              ? "DTx"
              : "DTx in the Clinical Ecosystem"
          }
          desc="Digital therapeutics extend care beyond hospitals, enabling CBT training, adherence monitoring, and lifestyle modification."
        />

        {/* 4. IVD / Biomarkers */}
        <InsightCard
          to="/insights/ivd"
          title={
            isMobileUA
              ? "IVD"
              : "IVD: Biomarkers & Longitudinal Evidence"
          }
          desc="Novel biomarkers demand longitudinal validation—tracking changes over time to confirm predictive and clinical value."
        />
      </div>
    </PageLayout>
  );
}

// ---- Case Details ----
function CaseDTx(){
  return (
    <PageLayout
      breadcrumb={<NavLink to="/cases" className="hover:underline">Case Studies</NavLink>}
      title="Digital Therapeutics (DTx) 사례"
    >

      <p className="mb-6 text-left tracking-tight">
        다양한 적응증 <strong> 맞춤 설계</strong> 및 MFDS 승인 경험 보유 
      </p>

      {/* Cancer Supportive Care */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">DTx · Cancer Supportive Care (Anticancer DTx)</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical study:</strong> Confirmatory clinical trials</li>
          <li><strong>Indication:</strong> Chemotherapy-related symptom & QoL management in cancer patients</li>
          <li><strong>Design:</strong> Prospective, randomized parallel design with standard-of-care control</li>
          <li><strong>Endpoints:</strong> QoL (EORTC QLQ-C30), adherence rate, symptom-specific PROs</li>
          <li><strong>Scope:</strong> Protocol & CRF design, site initiation & monitoring, statistical analysis, reporting</li>
          <li><strong>Outcome:</strong> MFDS clinical approval, IRB approval</li>
        </ul>
      </div>

      {/* TMD Management */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">DTx · Temporomandibular Disorder (TMD) Management</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical study:</strong> Confirmatory clinical trial</li>
          <li><strong>Indication:</strong> TMD patients managed for pain and function improvement</li>
          <li><strong>Design:</strong> Prospective, randomized, double-blind, sham-controlled, superiority trial</li>
          <li><strong>Endpoints:</strong> VAS, jaw function score</li>
          <li><strong>Scope:</strong> Protocol & CRF design, site initiation & monitoring, statistical analysis, reporting</li>
          <li><strong>Outcome:</strong> MFDS clinical approval, IRB approval, MFDS regulatory approval</li>
        </ul>
      </div>

      {/* Allergic Rhinitis */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">DTx · Allergic Rhinitis Management</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical study:</strong> Exploratory clinical trial</li>
          <li><strong>Indication:</strong> Perennial allergic rhinitis patients managed through self-monitoring</li>
          <li><strong>Design:</strong> Prospective, randomized, parallel-group study with standard-of-care control</li>
          <li><strong>Endpoints:</strong> TNSS, RQLQ, VAS, medication score, adherence rate</li>
          <li><strong>Scope:</strong> Protocol & CRF development</li>
          <li><strong>Outcome:</strong> IRB approval</li>
        </ul>
      </div>

      {/* Asthma */}
      <div>
        <h3 className="font-bold text-lg mb-2">DTx · Asthma Management</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical study:</strong> Confirmatory clinical trial</li>
          <li><strong>Indication:</strong> Asthma patients managed through inhaled medication adherence & symptom tracking</li>
          <li><strong>Design:</strong> Prospective, randomized, parallel-group study with standard-of-care control</li>
          <li><strong>Endpoints:</strong> ACT, medication adherence, QoL (AQLQ)</li>
          <li><strong>Scope:</strong> Protocol & CRF development</li>
          <li><strong>Outcome:</strong> MFDS clinical approval, IRB approval</li>
        </ul>
      </div>
    </PageLayout>
  );
}

function CaseAISaMD(){
  return (
    <PageLayout 
      breadcrumb={<NavLink to="/cases" className="hover:underline">Case Studies</NavLink>} 
      title="AI-SaMD 임상·허가 전주기 경험"
    >
      <p className="mb-6 text-left tracking-tight">MFDS 임상 승인·허가를 중심으로, FDA 승인을 포함한 폭넓은 경험.</p>

      {/* Obstructive Sleep Apnea */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">AI-SaMD · Obstructive Sleep Apnea</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical study:</strong> Post-market, prospective clinical study</li>
          <li><strong>Indication:</strong> Patients evaluated for obstructive sleep apnea risk classification</li>
          <li><strong>Design:</strong> Randomized, prospective study verifying diagnostic performance and system interoperability</li>
          <li><strong>Endpoints:</strong> Classification accuracy, sensitivity/specificity</li>
          <li><strong>Scope:</strong> Study protocol & CRF development</li>
          <li><strong>Outcome:</strong> IRB approval</li>
        </ul>
      </div>

      {/* IHCA Prediction */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">AI-SaMD · In-Hospital Cardiac Arrest Prediction</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical study:</strong> Post-market, clinical trial</li>
          <li><strong>Indication:</strong> Hospitalized patients in general wards evaluated for early detection and prevention of in-hospital cardiac arrest and mortality</li>
          <li><strong>Design:</strong> Prospective, randomized, controlled study</li>
          <li><strong>Endpoints:</strong> IHCA incidence, in-hospital mortality, time-to-intervention</li>
          <li><strong>Scope:</strong> Protocol development, sample size calculation, SAP review</li>
          <li><strong>Outcome:</strong> IRB approval</li>
        </ul>
      </div>

      {/* Lung Cancer Screening */}
      <div>
        <h3 className="font-bold text-lg mb-2">AI-IVD · Lung Cancer Screening Performance Evaluation</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective and prospective, confirmatory performance study</li>
          <li><strong>Indication:</strong> Non-invasive detection and classification of lung cancer with serum molecular data + AI</li>
          <li><strong>Design:</strong> Single-blind, exploratory study</li>
          <li><strong>Endpoints:</strong> Diagnostic accuracy (AUC, sensitivity, specificity), PPV, NPV, consistency</li>
          <li><strong>Scope:</strong> Protocol & CRF development, statistical analysis, reporting review, feasibility review</li>
          <li><strong>Outcome:</strong> IRB approval</li>
        </ul>
      </div>
    </PageLayout>
  );
}

function CaseIVDQual(){
  return (
    <PageLayout
      breadcrumb={<NavLink to="/cases" className="hover:underline">Case Studies</NavLink>}
      title="IVD (Qualitative) MFDS 허가 사례"
    >
      <p className="mb-6 text-left tracking-tight">
        다양한 정성적 IVD 진단 키트의 임상시험을 설계·수행하여 MFDS 허가 및 IRB 승인을 지원한 경험.
      </p>

      {/* STI Multiplex Detection */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">IVD (Qualitative) · Sexually Transmitted Infection (STI) Multiplex Detection</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective, confirmatory clinical performance study</li>
          <li><strong>Indication:</strong> Qualitative detection of 12 STI pathogens from vaginal swab and urine specimens</li>
          <li><strong>Design:</strong> Single-blind, randomized, retrospective study</li>
          <li><strong>Endpoints:</strong> PPA, NPA, OPA</li>
          <li><strong>Scope:</strong> Protocol/CRF, statistical analysis, clinical reporting</li>
          <li><strong>Outcome:</strong> IRB approval, MFDS submission</li>
        </ul>
      </div>

      {/* MTB/NTM Detection */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">IVD (Qualitative) · Mycobacterium Tuberculosis / NTM Detection</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective, confirmatory study</li>
          <li><strong>Indication:</strong> Detection of MTB and NTM</li>
          <li><strong>Design:</strong> Single-blind, randomized, retrospective</li>
          <li><strong>Endpoints:</strong> Sensitivity, specificity, PPA, NPA, OPA</li>
          <li><strong>Scope:</strong> Protocol/CRF, SAP review, report review</li>
          <li><strong>Outcome:</strong> IRB approval, MFDS regulatory approval</li>
        </ul>
      </div>

      {/* Respiratory Virus */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">IVD (Qualitative) · Respiratory Virus Multiplex Detection</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective, confirmatory study</li>
          <li><strong>Indication:</strong> Detection of SARS-CoV-2, RSV, Influenza A/B</li>
          <li><strong>Design:</strong> Single-blind, randomized, retrospective</li>
          <li><strong>Endpoints:</strong> Sensitivity/specificity, PPA, NPA, OPA</li>
          <li><strong>Scope:</strong> Protocol/CRF, analysis, reporting</li>
          <li><strong>Outcome:</strong> IRB approval</li>
        </ul>
      </div>

      {/* Sepsis */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">IVD (Qualitative) · Sepsis Diagnostic</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective, confirmatory study</li>
          <li><strong>Indication:</strong> Serum biomarkers for sepsis diagnosis</li>
          <li><strong>Design:</strong> Single-blind, retrospective, comparative</li>
          <li><strong>Endpoints:</strong> Sensitivity, specificity, diagnostic agreement</li>
          <li><strong>Scope:</strong> Protocol/CRF, sample size calculation, SAP review</li>
          <li><strong>Outcome:</strong> IRB approval, MFDS submission</li>
        </ul>
      </div>

      {/* Pancreatic Cancer */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">IVD (Qualitative) · Pancreatic Cancer Early Detection</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Prospective cohort study</li>
          <li><strong>Indication:</strong> Novel serum biomarkers for early pancreatic cancer detection</li>
          <li><strong>Design:</strong> Prospective, cohort study</li>
          <li><strong>Endpoints:</strong> AUC, sensitivity, specificity, PPV, NPV</li>
          <li><strong>Scope:</strong> Protocol review, feasibility review</li>
          <li><strong>Outcome:</strong> IRB approval</li>
        </ul>
      </div>

      {/* Blood Amyloid */}
      <div>
        <h3 className="font-bold text-lg mb-2">IVD (Qualitative) · Blood Amyloid Comparative Evaluation</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective clinical performance study</li>
          <li><strong>Indication:</strong> Comparative analysis of blood-based biomarkers in cognitive impairment</li>
          <li><strong>Design:</strong> Single-blind, retrospective</li>
          <li><strong>Endpoints:</strong> Correlation coefficient, diagnostic accuracy (AUC, sensitivity, specificity), cut-off estimation</li>
          <li><strong>Scope:</strong> Protocol review</li>
          <li><strong>Outcome:</strong> IRB approval</li>
        </ul>
      </div>

    </PageLayout>
  );
}

function CaseIVDQuan(){
  return (
    <PageLayout
      breadcrumb={<NavLink to="/cases" className="hover:underline">Case Studies</NavLink>}
      title="IVD (Quantitative) MFDS 허가 및 통계 방법론 적용"
    >
      <p className="mb-6 text-left tracking-tight">
        CMV, CK-MB, NT-proBNP 등 정량 IVD 키트 임상시험을 수행하며 MFDS 허가를 지원.<br/>
        <strong> 정량 통계분석 방법론 가이드 제안·검수 경험</strong>을 기반으로 Passing-Bablok 회귀, Bland–Altman 분석, 상관계수 등 통계분석을 적용한 경험.
      </p>

      {/* CMV */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">IVD (Quantitative) · Cytomegalovirus (CMV)</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective exploratory & confirmatory study</li>
          <li><strong>Indication:</strong> Quantitative detection of CMV</li>
          <li><strong>Design:</strong> Single-blind, randomized, retrospective</li>
          <li><strong>Endpoints:</strong> Correlation (r), LoD, specificity, quantitative agreement</li>
          <li><strong>Scope:</strong> Protocol/CRF, statistical analysis, reporting</li>
          <li><strong>Outcome:</strong> IRB approval</li>
        </ul>
      </div>

      {/* Semen Analysis */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">IVD (Quantitative) · Semen Analysis</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Prospective clinical performance study</li>
          <li><strong>Indication:</strong> Quantitative measurement of sperm concentration & motility</li>
          <li><strong>Design:</strong> Randomized, single-blind, paired comparative</li>
          <li><strong>Endpoints:</strong> Agreement rate, correlation (r), Bland–Altman bias</li>
          <li><strong>Scope:</strong> Protocol/CRF development</li>
          <li><strong>Outcome:</strong> FDA submission</li>
        </ul>
      </div>

      {/* CK-MB */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">IVD (Quantitative) · CK-MB</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective confirmatory study</li>
          <li><strong>Indication:</strong> Quantitative measurement of CK-MB</li>
          <li><strong>Design:</strong> Single-blind, randomized</li>
          <li><strong>Endpoints:</strong> Correlation (r), Passing–Bablok slope/intercept, Bland–Altman bias</li>
          <li><strong>Scope:</strong> Protocol/CRF, sample size calc, SAP review</li>
          <li><strong>Outcome:</strong> IRB approval</li>
        </ul>
      </div>

      {/* NT-proBNP */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">IVD (Quantitative) · NT-proBNP</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective confirmatory study</li>
          <li><strong>Indication:</strong> Quantitative measurement of NT-proBNP</li>
          <li><strong>Design:</strong> Single-blind, randomized, retrospective</li>
          <li><strong>Endpoints:</strong> Sensitivity, specificity, correlation (r), Bland–Altman bias</li>
          <li><strong>Scope:</strong> Protocol/CRF, sample size calc, SAP review</li>
          <li><strong>Outcome:</strong> IRB approval & MFDS submission</li>
        </ul>
      </div>

      {/* Myoglobin */}
      <div>
        <h3 className="font-bold text-lg mb-2">IVD (Quantitative) · Myoglobin</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical performance:</strong> Retrospective confirmatory study</li>
          <li><strong>Indication:</strong> Serum myoglobin for cardiac biomarker evaluation</li>
          <li><strong>Design:</strong> Single-blind, randomized, retrospective</li>
          <li><strong>Endpoints:</strong> Correlation (r), Passing–Bablok regression, Bland–Altman bias</li>
          <li><strong>Scope:</strong> Protocol, SAP review, report prep</li>
          <li><strong>Outcome:</strong> IRB approval & MFDS submission</li>
        </ul>
      </div>
    </PageLayout>
  );
}

function CaseMedSupplies(){
  return (
    <PageLayout
      breadcrumb={<NavLink to="/cases" className="hover:underline">Case Studies</NavLink>}
      title="Other Medical Devices MFDS 임상 승인 경험"
    >
      <p className="mb-6 text-left tracking-tight">
        혈압 관리 기기와 조직 고정 시스템 등 다양한 Medical Devices의 임상시험을 수행하며 
        <strong> MFDS 임상 승인 및 규제 제출</strong>을 지원한 경험.
      </p>

      {/* Hypertension Management (TENS) */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-2">Medical Device · Hypertension Management (TENS)</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical study:</strong> Exploratory clinical trial</li>
          <li><strong>Indication:</strong> Hypertensive patients for blood pressure reduction</li>
          <li><strong>Design:</strong> Prospective, randomized, double-blind, sham-controlled, parallel-group</li>
          <li><strong>Endpoints:</strong> Change in systolic/diastolic BP, heart rate variability (HRV)</li>
          <li><strong>Scope:</strong> Study protocol & CRF development</li>
          <li><strong>Outcome:</strong> MFDS clinical approval, IRB approval</li>
        </ul>
      </div>

      {/* Facial Tissue Fixation System */}
      <div>
        <h3 className="font-bold text-lg mb-2">Medical Device · Facial Tissue Fixation System</h3>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li><strong>Clinical study:</strong> Prospective, confirmatory clinical trial</li>
          <li><strong>Indication:</strong> Patients undergoing forehead lift surgery</li>
          <li><strong>Design:</strong> Evaluator-blinded, prospective</li>
          <li><strong>Endpoints:</strong> Eyebrow height change, Brow Ptosis Grade Scale (BPGS), cosmetic outcome</li>
          <li><strong>Scope:</strong> Protocol and CRF development</li>
          <li><strong>Outcome:</strong> MFDS regulatory submission</li>
        </ul>
      </div>
    </PageLayout>
  );
}

// ---- Insight Details ----
// SampleSize ----
function InsightSampleSize() {
  return (
    <PageLayout
      breadcrumb={<NavLink to="/insights" className="hover:underline">Insights</NavLink>}
      title="Sample Size Determination Journey"
    >
      {/* 설명 */}
      <p className="mb-6 italic text-gray-700 text-center tracking-tighter">
        "Clinical success criteria, statistical rigor, and representative populations converge
        to define the right ‘n’ for your study."
      </p>

      {/* 이미지 (크기 제한 + 중앙 정렬) */}
      <div className="flex justify-center">
        <img
          src="/samplesize.png"
          alt="Sample Size Determination Journey"
          className="max-w-xs w-full rounded-lg shadow"
        />
      </div>
    </PageLayout>
  );
}

// AI-SaMD ----
function InsightAI(){
  return (
    <PageLayout
      breadcrumb={<NavLink to="/insights" className="hover:underline">Insights</NavLink>}
      title="AI-SaMD: From Purpose to Endpoints"
    >
      <p className="mb-6 italic text-gray-700 text-center tracking-tighter">
        "AI-based devices require endpoints aligned with clinical purpose, bridging algorithm performance with regulatory approval."
      </p>


      <div className="flex justify-center">
        <img
          src="/AI-SaMD.png"                // public 폴더에 둔 파일명 그대로
          alt="AI-SaMD bridging: clinical purpose, algorithm performance, clinical endpoints, regulatory approval"
          className="w-full max-w-sm md:max-w-sm lg:max-w-md rounded-lg shadow"
          loading="lazy"
        />
      </div>
    </PageLayout>
  );
}

// DTx ----
function InsightDTx(){
  return (
    <PageLayout
      breadcrumb={<NavLink to="/insights" className="hover:underline">Insights</NavLink>}
      title="DTx in the Clinical Ecosystem"
    >
      <p className="mb-6 italic text-gray-700 text-center tracking-tighter">
        “Digital therapeutics extend care beyond hospitals, enabling CBT training, adherence monitoring, and lifestyle modification.”
      </p>

      <div className="flex justify-center">
        <img
          src="/DTx in the Clinical Ecosystem.png"                // public 폴더에 둔 파일명 그대로
          alt="DTx in the Clinical Ecosystem"
          className="w-full max-w-sm md:max-w-sm lg:max-w-md rounded-lg shadow"
          loading="lazy"
         
        />
      </div>
    </PageLayout>
  );
}
// IVD ----
function InsightIVD(){
  return (
    <PageLayout
      breadcrumb={<NavLink to="/insights" className="hover:underline">Insights</NavLink>}
      title="DTx in the Clinical Ecosystem"
    >
      <p className="mb-6 italic text-gray-700 text-center tracking-tighter">
        “Novel biomarkers demand longitudinal validation—tracking changes over time to confirm predictive and clinical value.”
      </p>

      <div className="flex justify-center">
        <img
          src="/Biomarkers.png"                // public 폴더에 둔 파일명 그대로
          alt="IVD: Biomarkers & Longitudinal Evidence"
          className="max-w-sm w-full rounded-lg shadow"
          loading="lazy"
         
        />
      </div>
    </PageLayout>
  );
}

// ---- Contact ----
function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // ✅ 카톡→외부브라우저 경유 시 줄바꿈/공백 보존용: URL에서 msg를 안전하게 복원
  const prefillMessage = useMemo(() => {
    let raw = getQueryParam('msg') || '';
    if (!raw) return '';

    // 카톡 경유 시 간혹 '+'가 공백으로 처리되므로 먼저 %20으로 치환
    if (raw.includes('+')) raw = raw.replace(/\+/g, '%20');

    // 1차 디코드
    try { raw = decodeURIComponent(raw); } catch {}
    // 이중 인코딩 보호용 2차 시도
    try { raw = decodeURIComponent(raw); } catch {}

    // CRLF → LF 통일
    raw = raw.replace(/\r\n/g, '\n');
    return raw;
  }, []);

  // Formspree에서 발급받은 엔드포인트로 교체되어 있어야 합니다.
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mblpdgqe';

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const resp = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (resp.ok) {
        setStatus('success');
        form.reset();
      } else {
        const data = await resp.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(data?.errors?.[0]?.message || '제출 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  }

  return (
    <PageLayout
      title="Contact"
      breadcrumb={<NavLink to="/" className="hover:underline">Home</NavLink>}
    >
      <p className="mb-6">
        제출 시 입력 내용이 <strong>ad_support@cnkinsight.com</strong> 으로 전달됩니다.
      </p>

      <form className="grid gap-4" onSubmit={onSubmit}>
        {/* 스팸 방지 honeypot */}
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* 메타(제목/출처/리다이렉트) */}
        <input type="hidden" name="_subject" value="[C&KInsight] 전략 미팅 요청" />
        <input type="hidden" name="source" value="ckinsight.co web form" />
        {/* 전송 후 특정 페이지로 보내고 싶으면 아래 주석 해제하고 경로 지정
        <input type="hidden" name="_next" value="https://ckinsight.co/thanks" />
        */}

        {/* 발신자 정보 */}
        <input name="name" type="text" placeholder="이름*" className="p-3 rounded-lg border" required />
        <input name="email" type="email" placeholder="이메일*" className="p-3 rounded-lg border" required />
        <input name="company" type="text" placeholder="회사명" className="p-3 rounded-lg border" />
        <input name="phone" type="tel" placeholder="연락처" className="p-3 rounded-lg border" />

        {/* 메시지 (카톡 줄바꿈 복원값을 미리 채움) */}
        <textarea
          name="message"
          placeholder="문의 내용*"
          defaultValue={prefillMessage}
          className="p-3 rounded-lg border h-32 whitespace-pre-line"
          required
        />

        {/* 읽기전용 미리보기(선택): 카톡 줄바꿈이 제대로 반영됐는지 확인용 */}
        {prefillMessage && (
          <div className="p-3 bg-gray-50 border rounded-lg text-sm whitespace-pre-line">
            {prefillMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-full shadow hover:bg-yellow-600 transition disabled:opacity-60"
        >
          {status === 'loading' ? '전송 중…' : '상담 신청하기'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 font-semibold">제출되었습니다! 담당자가 곧 연락드리겠습니다.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 font-semibold">{errorMsg}</p>
        )}
      </form>

      {/* 대안: 직접 메일 보내기 링크 */}
      <div className="mt-6 text-sm">
        <span className="text-gray-500">폼 전송이 어려우면 </span>
        <a
          href="mailto:ad_support@cnkinsight.com?subject=%5BC%26KInsight%5D%20%EC%A0%84%EB%9E%B5%20%EB%AF%B8%ED%8C%85%20%EC%9A%94%EC%B2%AD"
          className="underline"
        >
          ad_support@cnkinsight.com
        </a>
        <span className="text-gray-500"> 로 직접 메일을 보내주세요.</span>
      </div>
    </PageLayout>
  );
}

// ---- Router App ----
import ScrollToTop from "./ScrollToTop";
import FixedActions from "./FixedActions";
import BackOnScroll from "./BackOnScroll";
import BackToTop from "./BackToTop";

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'C&KFont, sans-serif', color: 'rgb(58,57,54)' }}>
      <Router>
        <GlobalStyle/>
        <Header/>
        <ScrollToTop />   {/* ← 여기 추가 */}
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/services" element={<ServicesPage/>} />
          <Route path="/services/full-scope" element={<FullScopePage/>} />
          <Route path="/services/partial" element={<PartialPage/>} />
          <Route path="/services/regulatory" element={<RegulatoryPage/>} />
          <Route path="/services/expertise" element={<ExpertisePage/>} />

          <Route path="/cases" element={<CasesPage/>} />
          <Route path="/cases/dtx" element={<CaseDTx/>} />
          <Route path="/cases/ai-samd" element={<CaseAISaMD/>} />
          <Route path="/cases/ivd-qual" element={<CaseIVDQual/>} />
          <Route path="/cases/ivd-quant" element={<CaseIVDQuan/>} />
          <Route path="/cases/med-supplies" element={<CaseMedSupplies/>} />

          <Route path="/insights" element={<InsightsPage/>} />
          <Route path="/insights/samplesize" element={<InsightSampleSize/>} />
          <Route path="/insights/ai-samd" element={<InsightAI/>} />
          <Route path="/insights/dtx" element={<InsightDTx/>} />
          <Route path="/insights/ivd" element={<InsightIVD/>} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
        <Footer/>        
        {/* 우하단 액션들 한 줄로 정렬 & 간격 제어 */}
        <FixedActions>
          <BackOnScroll threshold={0}/>  {/* ← */}
          <BackToTop threshold={40}/>     {/* ↑ */}
        </FixedActions>
      </Router>
    </div>
  );
}
