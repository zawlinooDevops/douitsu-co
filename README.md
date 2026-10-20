# DOUITSU 合同会社 — Modernized Website

> **出入国在留管理庁 登録支援機関 (登録番号: 25登－012206)**  
> Official Registered Support Organization for Specified Skilled Workers (特定技能 1号) in Japan.

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro%205-FF5D01?style=flat&logo=astro&logoColor=white)](https://astro.build/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Interactive with Alpine.js](https://img.shields.io/badge/Interactive%20with-Alpine.js-8BC0D0?style=flat&logo=alpinedotjs&logoColor=white)](https://alpinejs.dev/)
[![No External CDN](https://img.shields.io/badge/Zero%20CDN-100%25%20Local-10B981?style=flat)](#zero-cdn--privacy-first)

---

## 🌟 Overview (概要)

DOUITSU合同会社 (DOUITSU LLC) は、特定技能外国人が日本で安定的かつ円滑に就労・生活できるよう全力でサポートする登録支援機関です。  
본 프로젝트는 **Astro SSG (Static Site Generator)**, **Tailwind CSS**, 및 **Alpine.js**를 기반으로 기존 웹사이트를 현대화(Modernize)하여 재구축한 고성능 정적 웹사이트입니다.

### ✨ Key Features (主な特徴)

1. **Smart & Warm Corporate Design**:
   - DOUITSU의 헥사곤 로고 색상(Navy, Slate Blue, Accent Blue)을 기반으로 한 신뢰감 있는 B2B 기업 디자인
   - 일본 전통 벚꽃(Sakura) 핑크 악센트와 글래스모피즘(Glassmorphism) 카드 UI 적용
2. **🌐 Bilingual Toggle (Japanese / Myanmar)**:
   - Alpine.js를 통한 무중단 원클릭 언어 전환 (일본어 원문 ⇄ 미얀마어 번역)
   - `localStorage`를 통한 사용자 언어 선택 상태 유지
3. **📋 10 Statutory Support Duties (10大支援業務)**:
   - 법정 의무 지원 10개 항목(사전 안내, 출입국 환송, 주거 및 계약, 생활 오리엔테이션, 공적 절차 동행 등)의 체계적 카드 뷰
   - 실제 지원 활동 현장 사진 배너 수록
4. **📄 Downloadable Kaigo Textbooks (介護テキスト ダウンロード)**:
   - 개호(Kaigo) 특정기능 평가시험 공식 학습 교재 PDF 다운로드 지원 (일본어판 38.8MB, 미얀마어판 14.1MB)
5. **🖼️ Interactive Recruitment Flyers Gallery (求人票ギャラリー)**:
   - 외식업, 식품제조업, 야마구치현 등 최신 특정기능 구인 포스터 7종 수록
   - Alpine.js 모달/라이트박스를 통한 고해상도 확대 및 다운로드 기능
6. **🔒 Zero CDN & Privacy-First**:
   - 외부 CDN(스크립트, 스타일, 폰트) 호출 0개
   - Google Fonts(`Plus Jakarta Sans`, `Noto Sans Myanmar`, `Noto Sans JP`) 로컬 셀프 호스팅 (`public/fonts/`)
7. **🚀 SEO & Social Share Ready**:
   - OpenGraph, Twitter Cards, Canonical URL, Standard Favicon, Apple Touch Icons (180x180)
   - Schema.org `LocalBusiness` JSON-LD 구조화 데이터 적용

---

## 🛠️ Tech Stack (技術スタック)

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation / SSG)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Interactivity**: [Alpine.js 3](https://alpinejs.dev/)
- **Fonts**: Self-hosted Google Fonts (`Plus Jakarta Sans`, `Noto Sans Myanmar`, `Noto Sans JP`)
- **Package Manager**: npm

---

## 🚀 Getting Started (ローカル開発環境)

### 1. Installation
```bash
git clone git@github.com:zawlinooDevops/douitsu-co.git
cd douitsu-co
npm install
```

### 2. Development Server
```bash
npm run dev
```
브라우저에서 `http://localhost:4321` 접속.

### 3. Production Build
```bash
npm run build
```
빌드된 정적 결과물은 `dist/` 폴더에 생성됩니다.

### 4. Preview Build
```bash
npm run preview
```

---

## 📁 Project Structure (ディレクトリ構成)

```text
douitsu-co/
├── astro.config.mjs               # Astro 설정
├── tailwind.config.mjs            # Tailwind DOUITSU 테마 설정
├── package.json                   # 의존성 패키지
├── dist/                          # 배포 준비 완료된 정적 사이트 (SSG)
├── public/                        # 정적 에셋 (이미지, 폰트, PDF)
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── files/                     # 개호 교재 PDF 파일 (2종)
│   ├── fonts/                     # 로컬 호스팅 TTF 폰트 (8종)
│   └── images/                    # 랜딩, 아이콘, 구인 포스터 이미지
├── src/
│   ├── components/                # 섹션별 모듈화 컴포넌트
│   │   ├── Navbar.astro           # 헤더 및 언어 전환기
│   │   ├── Hero.astro             # #section_1 (등록지원기관이란)
│   │   ├── About.astro            # #section_2 (10대 지원업무)
│   │   ├── Featured.astro         # #section_featured (기업정보 및 교재)
│   │   ├── Services.astro         # #section_3 (특정기능 서비스 특징)
│   │   ├── Jobs.astro             # #section_jobs (구인표 갤러리)
│   │   ├── Contact.astro          # #section_4 (문의하기 및 폼)
│   │   └── Footer.astro           # #section_footer (푸터)
│   ├── data/
│   │   └── content.ts             # 일본어 / 미얀마어 다국어 콘텐츠 데이터
│   ├── layouts/
│   │   └── Layout.astro           # SEO 메타태그, Schema.org, 전역 모달
│   └── styles/
│       ├── fonts.css              # 로컬 폰트 @font-face
│       └── global.css             # Tailwind 및 커스텀 유틸리티
└── raw-data/                      # 원본 웹사이트 스크래핑 아카이브 데이터
```

---

## 🏢 Company Information (会社概要)

- **会社名**: DOUITSU合同会社 (DOUITSU LLC)
- **登録番号**: 出入国在留管理庁 登録支援機関 25登－012206
- **所在地**: 〒204-0021 東京都清瀬市元町1-11-21 フローレス元町205号
- **TEL**: 042-497-1537 / 080-2213-8194
- **送り出し機関 (ミャンマー)**: FOR UNITY/SMZ CO.,LTD

---

## 📄 License
Copyright © 2025 DOUITSU合同会社. All rights reserved.
