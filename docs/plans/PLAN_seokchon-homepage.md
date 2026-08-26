# Implementation Plan: 석촌 GEO+AEO 최적화 홈페이지

**Status**: 🔄 In Progress
**Started**: 2026-08-26
**Last Updated**: 2026-08-26

---

**⚠️ CRITICAL INSTRUCTIONS**: 각 Phase 완료 후:
1. ✅ 완료된 작업 체크박스 표시
2. 🧪 Quality Gate 검증 명령 실행
3. ⚠️ 모든 Quality Gate 항목 통과 확인
4. 📅 "Last Updated" 갱신
5. ➡️ 통과 후에만 다음 Phase로 진행

⛔ **Quality Gate를 건너뛰거나 실패 상태로 다음 Phase 진행 금지**

---

## 📋 Overview

### 프로젝트 설명
경기 광주시 남한산성면의 20년 전통 백숙·삼계탕 전문 한정식집 "석촌"의 홈페이지. 목적은 일반 홍보 사이트가 아니라, ChatGPT/Gemini 등 생성형 AI가 "남한산성 백숙 맛집" 관련 질문에 답할 때 석촌을 인용하도록 만드는 **GEO(생성형 엔진 최적화)/AEO(답변 엔진 최적화)** 사이트.

### 테스트 전략에 대한 참고
이 프로젝트는 로그인/결제/DB가 없는 **정적 콘텐츠 사이트**이므로, 표준 TDD(단위/통합/E2E 테스트)의 비즈니스 로직 커버리지 목표가 그대로 적용되지 않는다. 대신 각 Phase의 Quality Gate는 다음으로 대체한다:
- **빌드/타입체크/린트 통과** (코드 정확성)
- **콘텐츠 정확성 검증** (브리핑 원본 사실과 대조 — 숫자·날짜·고유명사 오탈자 없음)
- **JSON-LD 스키마 유효성 검증** (구조화 데이터가 올바른 JSON이고 스키마 필수 필드를 포함하는지)
- **반응형/다크모드 수동 확인** (Browser 도구로 375px/768px/1440px, 라이트/다크 스크린샷)

### Success Criteria
- [ ] 5개 페이지(홈/메뉴/FAQ/오시는길/방송·인증) 모두 정상 렌더링
- [ ] 전 페이지에 JSON-LD (Restaurant/LocalBusiness, FAQPage) 유효하게 주입됨
- [ ] FAQ 10개 질문 전부 플레이스홀더 없이 GEO/SEO 최적화된 완성 답변 보유
- [ ] 모바일(375px) 포함 전 뷰포트 반응형 + 라이트/다크 모드 정상 동작
- [ ] `npm run build` 에러 없이 통과
- [ ] Vercel 배포 URL 정상 접속

---

## 🏗️ Architecture Decisions

| Decision | Rationale | Trade-offs |
|----------|-----------|------------|
| Next.js 15 App Router + TypeScript + Tailwind | 정적 콘텐츠 + 메타데이터/JSON-LD 관리에 최적, Vercel 배포 궁합 | SPA 대비 설정 약간 더 필요 |
| Supabase/DB 미사용 | 로그인·결제·예약폼 없음 — 콘텐츠는 전부 코드 내 정적 데이터 | 향후 리뷰 코너 등 동적 기능 필요 시 별도 도입 필요 |
| 온라인 예약 폼 대신 `tel:` CTA | 사용자 결정사항 — 전화 예약으로 대체 | 예약 데이터 수집/통계 불가 |
| 이미지 플레이스홀더 컴포넌트 | 실제 사진 미보유, 추후 동일 슬롯에 교체 예정 | 초기 배포는 시각적으로 비어 보일 수 있음 |
| 전통/럭셔리 디자인 톤, 라이트+다크 지원 | 20년 전통 한정식집 정체성에 부합 | 다크모드 컬러 토큰 추가 관리 필요 |

---

## 📦 Dependencies

### Required Before Starting
- [x] 승인된 플랜 (`geo-aeo-purring-hippo.md`) 및 콘텐츠 사실 확정
- [x] 디자인 톤 확정 (전통/럭셔리, 라이트+다크)
- [ ] Node.js / npm 사용 가능 환경 확인

### External Dependencies
- next (15.x), react, react-dom
- tailwindcss (4.x)
- (폰트) next/font 로 세리프 한글 폰트 로드 — 예: Noto Serif KR

---

## 🚀 Implementation Phases

### Phase 1: 프로젝트 스캐폴딩 + 디자인 시스템
**Goal**: Next.js 프로젝트 생성, 전통/럭셔리 톤의 컬러 토큰·타이포·다크모드 스위치, 공통 레이아웃(Header/Nav/Footer/전화 예약 CTA)이 빈 페이지에서 정상 렌더링

#### Tasks
- [x] **1.1** `npx create-next-app@latest .` (TypeScript, Tailwind, App Router, no src dir) — 디렉터리명에 한글이 포함되어 npm naming 제약에 걸림 → 임시 폴더(seokchon-tmp)에 스캐폴딩 후 루트로 이동, package.json name을 `seokchon`으로 수정
- [x] **1.2** globals.css에 전통/럭셔리 컬러 토큰(카멀 accent, 라이트/다크 팔레트) 정의, `word-break: keep-all` 전역 적용, Tailwind v4 `@custom-variant dark`로 class 기반 다크모드 지원
- [x] **1.3** 세리프 한글 폰트(Noto Serif KR, 제목용) + Noto Sans KR(본문용) next/font 적용
- [x] **1.4** 공통 레이아웃: `components/Header.tsx`(네비 5개 링크), `components/Footer.tsx`(NAP 반복 노출), `components/PhoneCTA.tsx`(`tel:031-749-9338`)
- [x] **1.5** 다크모드 토글 컴포넌트 (`next-themes` 설치, `ThemeProvider`/`ThemeToggle` 구현)
- [x] **1.6** `components/ImagePlaceholder.tsx` (alt 텍스트 필수 props, caption 옵션, 실제 이미지 교체 대비 구조)
- [x] **1.7** `lib/schema.tsx`: JSON-LD 빌더 함수 (Restaurant, LocalBusiness, FAQPage) + `JsonLd` 렌더 컴포넌트
- [x] **1.8** `lib/content.ts`: 상호명/주소/전화/영업시간/메뉴 6종/신뢰신호/FAQ 10문항 전체 데이터 정의 (다른 페이지에서 재사용)

#### Quality Gate ✋
- [x] `npm run build` 에러 없이 통과
- [x] `npm run lint` 통과 (ThemeToggle의 hydration-mount 패턴에 대한 eslint 경고는 널리 알려진 안전한 패턴이라 주석으로 명시적 disable)
- [x] 로컬 dev 서버에서 빈 레이아웃 렌더링 확인 (Browser 도구로 페이지 텍스트/콘솔 에러 없음 확인)
- [x] .gitignore에 `.env*`, `node_modules`, `.next` 포함 확인

---

### Phase 2: 홈페이지(`/`) + Restaurant/LocalBusiness JSON-LD
**Goal**: 20년 전통·방송 2회·안심식당 인증·대표 메뉴 요약이 담긴 홈페이지, Restaurant/LocalBusiness 스키마 주입

#### Tasks
- [x] **2.1** Hero 섹션: 상호명, 핵심 한 문장(20년 전통 명시), 전화 CTA
- [x] **2.2** 신뢰 신호 요약 섹션: 안심식당 인증 / KBS 방송 2회 / 리뷰 740개 / 20년 전통을 각각 구체적 문장으로 서술
- [x] **2.3** 대표 메뉴 요약 섹션 (6종, `/menu`로 링크)
- [x] **2.4** NAP 정보 블록 (주소/전화/영업시간/주차)
- [x] **2.5** `lib/content.ts` 데이터 기반으로 Restaurant/LocalBusiness JSON-LD 완성 후 `<script type="application/ld+json">` 주입 — 초기 구현에서 `aggregateRating`에 근거 없는 평점(4.5)을 임의로 넣었던 것을 발견해 제거함(브리핑에 실제 별점 데이터 없음, 오히려 "별점 미노출" 이슈가 명시되어 있어 허위 구조화 데이터가 될 뻔함)

#### Quality Gate ✋
- [x] `npm run build` 통과
- [x] 홈페이지 텍스트가 브리핑 원본 사실과 숫자·날짜 단위까지 일치 (Browser 도구로 get_page_text 대조)
- [x] 브라우저에서 JSON-LD `<script>` 파싱 성공 (Restaurant, LocalBusiness 둘 다 JSON.parse 에러 없음, 필수 필드 확인)
- [x] 모바일 375px에서 헤드라인 줄바꿈 확인 — 가로 스크롤 없음, word-break: keep-all 적용 확인

---

### Phase 3: 메뉴소개(`/menu`) + 오시는길(`/location`)
**Goal**: 6개 메뉴 각각의 텍스트 기반 상세 설명 + 주소·주차·전화 안내 페이지

#### Tasks
- [x] **3.1** `/menu`: 한방백숙, 누룽지백숙, 전복누룽지백숙, 능이버섯백숙, 오리주물럭, 닭볶음탕 — 각 메뉴별 소제목+설명 문단 (직접 개발 메뉴 2종은 배지로 명시)
- [x] **3.2** `/location`: 주소, 주차 안내(20대, 로타리→북문 방향), 전화번호, 영업 종료시각(21:00), 수용 인원(최대 200명/단체 가능), 화장실 구분/무선결제 텍스트로 명시
- [x] **3.3** 지도: 실제 임베드 대신 ImagePlaceholder("지도 이미지 준비중") + 주소 텍스트 병기

#### Quality Gate ✋
- [x] `npm run build` / `npm run lint` 통과
- [x] 메뉴 6개 전부 텍스트 설명 존재, 용봉탕 미포함 확인 (Browser get_page_text로 확인)
- [x] 오시는길 페이지 정보(주소/전화/주차/영업시간/수용인원)가 브리핑 원본과 정확히 일치 (Browser get_page_text로 확인)

---

### Phase 4: FAQ(`/faq`) — GEO/AEO 핵심 페이지
**Goal**: 10개 타겟 질문 전부 플레이스홀더 없이 GEO/SEO 최적화된 완성 답변, FAQPage JSON-LD 주입

#### Tasks
- [x] **4.1** 10개 질문을 `lib/content.ts`의 `faqs` 배열로 정의 (question/answer)
- [x] **4.2** 질문 1(한방백숙)은 브리핑 예시 답변 그대로 사용
- [x] **4.3** 나머지 9개 질문에 대해 "질문(소제목)+명확한 답(첫 문단)" 구조로 완성 답변 작성 — 애매한 형용사 금지, 구체적 사실·숫자 사용, 신뢰신호 교차 언급, "원조/터줏대감" 질문은 사실 기반 표현으로만 답변
- [x] **4.4** FAQ 페이지 UI: 각 질문을 `<h2>`, 답변을 별도 문단으로 렌더링. `<details open>`로 구현해 접더라도 DOM에 텍스트가 항상 존재하도록 처리
- [x] **4.5** `lib/schema.tsx`의 FAQPage 빌더로 10개 Q&A를 JSON-LD로 매핑, 페이지에 주입

#### Quality Gate ✋
- [x] `npm run build` / `npm run lint` 통과
- [x] 10개 질문 전부 답변 텍스트 존재 (Browser get_page_text로 확인, 플레이스홀더 없음)
- [x] 각 답변 첫 문장만 발췌해도 질문에 대한 완결된 답이 되는지 수동 검토 완료
- [x] FAQPage JSON-LD의 `mainEntity` 배열 길이 10 확인, `@type: FAQPage/Question/Answer` 필드 존재 확인 (javascript_tool로 검증)

---

### Phase 5: 방송·인증이력(`/media`) + SEO 메타데이터 통합
**Goal**: KBS 방송 2회 상세 + 안심식당 인증 설명 페이지, 전 페이지 공통 메타데이터/OG/sitemap/robots 정리

#### Tasks
- [x] **5.1** `/media`: KBS 2TV 생생정보 96회(2016.05.24, 토종닭전복백숙 소개) 상세 문단 + 이미지 플레이스홀더
- [x] **5.2** `/media`: KBS 생생정보&세상의아침(2008.07.07) 상세 문단 + 이미지 플레이스홀더
- [x] **5.3** `/media`: 농림축산식품부 안심식당 공식 인증 설명 문단
- [x] **5.4** `app/layout.tsx` 공통 `metadata` (title/description 한국어, OpenGraph, Twitter summary 카드 — 실제 OG 이미지 파일은 없어 이미지 없이 텍스트만 구성, `metadataBase` 지정)
- [x] **5.5** 각 페이지별 개별 `metadata` (title/description 페이지 맞춤 — menu/faq/location/media 전부 고유)
- [x] **5.6** `app/sitemap.ts`, `app/robots.ts` (Next.js 파일 컨벤션)

#### Quality Gate ✋
- [x] `npm run build` / `npm run lint` 통과 (sitemap.xml, robots.txt 라우트 정상 생성 확인)
- [x] 방송 날짜(2016.05.24, 2008.07.07)와 프로그램명이 브리핑 원본과 정확히 일치 (Browser get_page_text로 확인)
- [x] 5개 페이지 전부 고유한 title/description 보유 (중복 없음)
- [x] `/sitemap.xml` 로컬에서 5개 URL 정상 응답 확인

---

### Phase 6: 반응형·다크모드 최종 검증 + Vercel 배포
**Goal**: 전 페이지 모바일/태블릿/데스크톱 + 라이트/다크 모드 확인 후 Vercel에 배포된 상태

#### Tasks
- [x] **6.1** Browser 도구로 5개 페이지 × 375px/1440px 뷰포트에서 가로 스크롤(overflow) 없음 확인 (스크린샷 렌더링은 이 환경에서 미지원 — JS 기반 overflow 체크로 대체)
- [x] **6.2** 다크모드 토글 후 배경/전경/강조색이 올바르게 전환되는지 확인 (라이트: bg #faf6f0/fg #2b2018, 다크: bg #1b1510/fg #f2e9dc — 둘 다 고대비)
- [x] **6.3** 전 페이지 `tel:031-749-9338` CTA href 확인 (Header, Footer, 각 페이지 CTA)
- [x] **6.4** `git init` + 초기 커밋 (민감정보 없음 확인 후 커밋)
- [x] **6.5** Vercel 배포 — MCP 직접 배포(production/preview)는 403/404로 계속 실패(MCP 연동 토큰 자체의 권한·일관성 문제로 판단). GitHub CLI 설치 후 사용자 인증(`gh auth login`, 계정 jinrhkwkd)으로 전환, 기존 `jinrhkwkd/seokchon` 저장소(보일러플레이트만 있던 과거 시도, 사용자 확인 후 강제 푸시로 교체) → Vercel CLI 설치 후 사용자 인증(`vercel login`, 계정 wlsalscks117-5240)으로 재시도 → CLI로는 팀 스코프(`coinbit100s-projects`)와 기존 `seokchon` 프로젝트가 정상 조회됨(MCP 토큰과 달리 정상) → `vercel link`로 연결 → GitHub 저장소는 이미 연동되어 있었고, 앞서 수행한 `git push --force`가 프로덕션 자동 배포를 트리거해 배포 완료
- [x] **6.6** 배포 URL(`https://seokchon.vercel.app`)에서 5개 페이지 타이틀/본문 확인, FAQPage JSON-LD(10개 항목) 파싱 확인, sitemap.xml 5개 URL 확인 — 전부 정상

#### Quality Gate ✋
- [x] 375px/1440px 뷰포트 모두 가로 스크롤 없음
- [x] 라이트/다크 모드 둘 다 고대비 확보
- [x] GitHub 저장소에 최종 코드 반영 완료 (커밋 120d53f, main 브랜치, https://github.com/jinrhkwkd/seokchon)
- [x] 배포 URL 정상 응답 확인 — https://seokchon.vercel.app 5개 페이지 전부 정상, JSON-LD 정상

---

## ⚠️ Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| 콘텐츠 사실 오기재 (날짜/숫자 오탈자) | Medium | High (AI가 잘못된 사실을 인용하게 됨) | 각 Phase Quality Gate에서 브리핑 원본과 수동 대조 |
| 이미지 부재로 시각적으로 부실해 보임 | High | Medium | 텍스트 콘텐츠 자체의 완결성에 집중, 플레이스홀더 슬롯을 명확히 구조화해 추후 교체 용이하게 |
| JSON-LD 스키마 형식 오류 | Low | Medium | Phase 2/4에서 JSON.parse 및 필수 필드 수동 검증 |
| Vercel 계정/로그인 미보유로 배포 지연 | Medium | Low | Phase 6에서 사용자에게 사전 안내, 배포는 최종 단계라 다른 작업에 영향 없음 |

---

## 🔄 Rollback Strategy

- **Phase 1 실패 시**: 스캐폴딩 디렉터리 삭제 후 재시도 (git 커밋 전이므로 안전)
- **Phase 2~5 실패 시**: 해당 페이지 파일만 되돌리고 `lib/content.ts` 데이터는 유지 (다른 페이지가 의존)
- **Phase 6 실패 시**: `vercel --prod` 실행 전 문제이므로 배포 영향 없음. 로컬 문제만 수정 후 재검증

---

## 📊 Progress Tracking

### Completion Status
- **Phase 1**: ⏳ 0%
- **Phase 2**: ⏳ 0%
- **Phase 3**: ⏳ 0%
- **Phase 4**: ⏳ 0%
- **Phase 5**: ⏳ 0%
- **Phase 6**: ⏳ 0%

**Overall Progress**: 0% complete

---

## 📝 Notes & Learnings

### Implementation Notes
(진행하며 기록)

---

## 📚 References
- 원본 브리핑: 사용자 제공 "석촌 GEO+AEO 최적화 홈페이지 제작 브리핑"
- 승인된 최초 플랜: `C:\Users\Windows11 Pro\.claude\plans\geo-aeo-purring-hippo.md`

---

**Plan Status**: ✅ Complete
**Next Action**: 사용자가 실제 사진(매장/메뉴/KBS 캡처) 전달 시 ImagePlaceholder 자리에 교체
**Blocked By**: None

## 배포 정보
- **배포 URL**: https://seokchon.vercel.app
- **GitHub**: https://github.com/jinrhkwkd/seokchon (main 브랜치, GitHub 연동으로 push 시 자동 배포)
- **Vercel 프로젝트**: coinbit100s-projects/seokchon
- 참고: MCP 연동 중 실수로 생성된 `seokchon-homepage`라는 미사용 Vercel 프로젝트가 팀에 남아있음 — 필요시 정리 대상
