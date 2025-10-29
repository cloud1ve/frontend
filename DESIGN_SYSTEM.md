# Climate Action Data Hub - Design System

## 🎨 디자인 철학

**"Data with Purpose, Design with Clarity"**

기후 데이터는 복잡하지만, 인터페이스는 단순해야 합니다. 세련되고 미니멀한 디자인으로 데이터의 본질에 집중하게 합니다.

### 핵심 원칙
1. **Clarity First** - 정보 전달이 최우선
2. **Purposeful Color** - 의미 있는 색상 사용
3. **Breathing Space** - 충분한 여백과 공간
4. **Data-Driven Beauty** - 데이터 자체가 아름다움
5. **Accessibility** - 모든 사용자를 위한 디자인

---

## 🎨 Color Palette

### Primary Colors (Brand)
```css
/* Forest Green - 신뢰감과 지속가능성 */
--primary-50: #f0fdf4;
--primary-100: #dcfce7;
--primary-200: #bbf7d0;
--primary-300: #86efac;
--primary-400: #4ade80;
--primary-500: #22c55e;  /* Main Brand Color */
--primary-600: #16a34a;
--primary-700: #15803d;
--primary-800: #166534;
--primary-900: #14532d;
--primary-950: #052e16;
```

### Accent Colors (Emphasis)
```css
/* Sky Blue - 기후, 맑음, 희망 */
--accent-50: #f0f9ff;
--accent-100: #e0f2fe;
--accent-200: #bae6fd;
--accent-300: #7dd3fc;
--accent-400: #38bdf8;
--accent-500: #0ea5e9;  /* Accent Color */
--accent-600: #0284c7;
--accent-700: #0369a1;
--accent-800: #075985;
--accent-900: #0c4a6e;
```

### Semantic Colors
```css
/* Success - 완료, 긍정적 */
--success-light: #d1fae5;
--success-main: #10b981;
--success-dark: #059669;

/* Warning - 주의, 중요 */
--warning-light: #fef3c7;
--warning-main: #f59e0b;
--warning-dark: #d97706;

/* Error - 오류, 위험 */
--error-light: #fee2e2;
--error-main: #ef4444;
--error-dark: #dc2626;

/* Info - 정보 */
--info-light: #dbeafe;
--info-main: #3b82f6;
--info-dark: #2563eb;
```

### Neutral Colors (UI Base)
```css
/* Gray Scale - 매우 중요! */
--gray-50: #fafafa;
--gray-100: #f4f4f5;
--gray-200: #e4e4e7;
--gray-300: #d4d4d8;
--gray-400: #a1a1aa;
--gray-500: #71717a;
--gray-600: #52525b;
--gray-700: #3f3f46;
--gray-800: #27272a;
--gray-900: #18181b;
--gray-950: #09090b;
```

### Background Colors
```css
--bg-primary: #ffffff;        /* 메인 배경 */
--bg-secondary: #fafafa;      /* 섹션 배경 */
--bg-tertiary: #f4f4f5;       /* 카드 배경 */
--bg-dark: #18181b;           /* 다크모드 배경 */
--bg-dark-secondary: #27272a; /* 다크모드 섹션 */
```

### Text Colors
```css
--text-primary: #18181b;      /* 주요 텍스트 */
--text-secondary: #52525b;    /* 보조 텍스트 */
--text-tertiary: #a1a1aa;     /* 힌트, 라벨 */
--text-inverse: #ffffff;      /* 다크 배경 위 텍스트 */
--text-muted: #71717a;        /* 비활성 텍스트 */
```

### Data Visualization Colors
```css
/* 차트에서 사용할 색상 팔레트 */
--viz-1: #22c55e;  /* GCF - Green */
--viz-2: #3b82f6;  /* CarbonPlan - Blue */
--viz-3: #f59e0b;  /* Mitigation - Amber */
--viz-4: #8b5cf6;  /* Adaptation - Purple */
--viz-5: #ec4899;  /* Cross-cutting - Pink */
--viz-6: #06b6d4;  /* Other - Cyan */
--viz-7: #f97316;  /* Orange */
--viz-8: #14b8a6;  /* Teal */
```

---

## 📐 Typography

### Font Families
```css
/* Sans-serif - 기본 텍스트 */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Mono - 코드, 숫자 */
--font-mono: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 
             'Roboto Mono', Consolas, monospace;

/* Display - 헤드라인 (선택) */
--font-display: 'Inter', sans-serif;
```

### Font Sizes
```css
/* 모바일 우선, 반응형 고려 */
--text-xs: 0.75rem;      /* 12px - 캡션, 라벨 */
--text-sm: 0.875rem;     /* 14px - 보조 텍스트 */
--text-base: 1rem;       /* 16px - 기본 텍스트 */
--text-lg: 1.125rem;     /* 18px - 강조 텍스트 */
--text-xl: 1.25rem;      /* 20px - 서브 헤딩 */
--text-2xl: 1.5rem;      /* 24px - 헤딩 3 */
--text-3xl: 1.875rem;    /* 30px - 헤딩 2 */
--text-4xl: 2.25rem;     /* 36px - 헤딩 1 */
--text-5xl: 3rem;        /* 48px - 디스플레이 */
--text-6xl: 3.75rem;     /* 60px - 히어로 */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Letter Spacing
```css
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

---

## 📏 Spacing System

**8pt Grid System** - 모든 간격은 8의 배수

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Layout Spacing
```css
--container-padding: 1rem;          /* 모바일 */
--container-padding-md: 2rem;       /* 태블릿 */
--container-padding-lg: 4rem;       /* 데스크톱 */

--section-gap: 3rem;                /* 섹션 간 간격 */
--section-gap-lg: 6rem;

--card-padding: 1.5rem;             /* 카드 내부 여백 */
--card-gap: 1.5rem;                 /* 카드 간 간격 */
```

---

## 🎯 Border & Radius

### Border Width
```css
--border-0: 0;
--border-1: 1px;
--border-2: 2px;
--border-4: 4px;
```

### Border Radius
```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px - 작은 요소 */
--radius-md: 0.5rem;     /* 8px - 기본 */
--radius-lg: 0.75rem;    /* 12px - 카드 */
--radius-xl: 1rem;       /* 16px - 큰 카드 */
--radius-2xl: 1.5rem;    /* 24px - 섹션 */
--radius-full: 9999px;   /* 완전 원형 */
```

---

## 🌑 Shadows

```css
/* Elevation System */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Special */
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
--shadow-none: 0 0 #0000;
```

---

## ⚡ Animations & Transitions

### Duration
```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-medium: 300ms;
--duration-slow: 500ms;
```

### Easing
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Transitions
```css
--transition-all: all var(--duration-base) var(--ease-in-out);
--transition-colors: color var(--duration-base) var(--ease-in-out),
                     background-color var(--duration-base) var(--ease-in-out),
                     border-color var(--duration-base) var(--ease-in-out);
--transition-transform: transform var(--duration-base) var(--ease-in-out);
--transition-opacity: opacity var(--duration-base) var(--ease-in-out);
```

---

## 🧩 Component Specifications

### Buttons

#### Primary Button
```
배경: primary-500
텍스트: white
패딩: 12px 24px (py-3 px-6)
라운드: radius-md
폰트: font-medium, text-base
호버: primary-600, shadow-md, transform scale(1.02)
액티브: primary-700
비활성: gray-300, cursor-not-allowed
트랜지션: all 200ms
```

#### Secondary Button
```
배경: transparent
테두리: 2px solid gray-300
텍스트: gray-700
패딩: 12px 24px
라운드: radius-md
호버: bg-gray-50, border-gray-400
```

#### Ghost Button
```
배경: transparent
텍스트: gray-700
패딩: 12px 24px
호버: bg-gray-100
```

### Cards

#### Default Card
```
배경: white
테두리: 1px solid gray-200
라운드: radius-lg
그림자: shadow-sm
패딩: 24px
호버: shadow-md, border-gray-300, transform translateY(-2px)
트랜지션: all 300ms
```

#### Stat Card
```
배경: gradient (primary-50 to white)
테두리: none
라운드: radius-xl
패딩: 32px
그림자: shadow-lg
아이콘 크기: 48px
숫자 폰트: text-4xl, font-bold, font-mono
라벨 폰트: text-sm, text-gray-600
```

### Tables

```
헤더 배경: gray-50
헤더 텍스트: gray-700, font-semibold, text-sm, uppercase
테두리: 1px solid gray-200
Row 패딩: 16px
Row 호버: bg-gray-50
Striped: even rows bg-gray-50/50
```

### Inputs & Forms

```
배경: white
테두리: 1px solid gray-300
라운드: radius-md
패딩: 12px 16px
폰트: text-base
플레이스홀더: text-gray-400
포커스: border-primary-500, ring-2 ring-primary-100
에러: border-error-main, ring-2 ring-error-light
```

### Badges

```
패딩: 4px 12px
라운드: radius-full
폰트: text-xs, font-medium
GCF: bg-primary-100, text-primary-700
CarbonPlan: bg-accent-100, text-accent-700
Mitigation: bg-warning-light, text-warning-dark
Adaptation: bg-info-light, text-info-dark
```

### Navigation

```
높이: 64px (모바일), 72px (데스크톱)
배경: white/95 backdrop-blur
테두리: 1px solid gray-200 (하단만)
그림자: shadow-sm
고정: sticky top-0, z-50
로고 크기: 32px
링크 패딩: 8px 16px
링크 호버: bg-gray-100, text-primary-600
액티브 링크: text-primary-600, border-bottom-2 border-primary-500
```

---

## 📱 Responsive Breakpoints

```css
--screen-sm: 640px;   /* 모바일 가로, 작은 태블릿 */
--screen-md: 768px;   /* 태블릿 */
--screen-lg: 1024px;  /* 작은 노트북 */
--screen-xl: 1280px;  /* 데스크톱 */
--screen-2xl: 1536px; /* 큰 화면 */
```

### Container Max Width
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1400px;
```

---

## 🎭 Dark Mode

```css
/* Dark Mode Colors */
[data-theme="dark"] {
  --bg-primary: #09090b;
  --bg-secondary: #18181b;
  --bg-tertiary: #27272a;
  
  --text-primary: #fafafa;
  --text-secondary: #d4d4d8;
  --text-tertiary: #71717a;
  
  --border-color: #3f3f46;
  
  /* 카드 배경 */
  --card-bg: #18181b;
  --card-border: #3f3f46;
  --card-hover-bg: #27272a;
}
```

---

## 🎨 Design Patterns

### Hero Section
```
높이: 60vh (최소 500px)
배경: gradient(primary-500 to accent-500) 또는 이미지
오버레이: rgba(0,0,0,0.4)
텍스트: 중앙 정렬, white
헤드라인: text-5xl, font-bold
서브헤드라인: text-xl, text-gray-200
CTA 버튼: 큰 사이즈 (py-4 px-8)
```

### Dashboard Grid
```
그리드: 12 컬럼
갭: 24px
Stat Cards: 3컬럼 (모바일 1컬럼)
차트: 6-8컬럼
테이블: 12컬럼 (전체 너비)
```

### Data Tables
```
최소 높이: 400px
최대 높이: 800px (스크롤)
Row 높이: 56px
헤더 고정: sticky
Zebra 스트라이프: 사용
호버 효과: 미묘하게
```

### Filter Panel
```
너비: 280px (데스크톱 사이드바)
배경: bg-secondary
패딩: 24px
필터 그룹 간격: 24px
라벨: text-sm, font-medium, text-gray-700
```

---

## ♿ Accessibility

### Focus States
```css
--focus-ring: 0 0 0 3px rgba(34, 197, 94, 0.2);
--focus-outline: 2px solid var(--primary-500);
```

### Contrast Ratios
- 일반 텍스트: 최소 4.5:1
- 큰 텍스트 (18pt+): 최소 3:1
- UI 컴포넌트: 최소 3:1

### Interactive Elements
- 최소 타겟 크기: 44x44px (모바일)
- 키보드 네비게이션 지원
- Screen reader 텍스트 제공
- ARIA 레이블 사용

---

## 🎯 UI 톤 & 보이스

### 텍스트 스타일
- **헤드라인**: 명확하고 직접적
- **바디 텍스트**: 간결하고 정보적
- **CTA**: 액션 지향적
- **에러 메시지**: 도움이 되고 친절하게
- **빈 상태**: 격려하고 가이드 제공

### 마이크로카피 예시
```
✅ "데이터 로딩 중..." → "프로젝트 정보를 가져오는 중입니다..."
✅ "에러 발생" → "일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
✅ "Submit" → "검색하기"
✅ "No data" → "아직 데이터가 없습니다. 필터를 조정해보세요."
```

---

## 📊 Data Visualization 가이드

### 차트 스타일
```
배경: transparent
그리드: stroke-gray-200, stroke-width-1, opacity-50
축: stroke-gray-400
레이블: text-sm, text-gray-600
툴팁: bg-white, shadow-lg, radius-lg, padding-12px
```

### 색상 사용 원칙
1. 의미 있는 색상 구분 (GCF=Green, CarbonPlan=Blue)
2. 충분한 대비
3. 색맹 고려 (패턴 또는 라벨 추가)
4. 최대 6-8개 색상 사용

---

## 🚀 Animation 가이드라인

### 사용 목적
1. **Feedback**: 사용자 액션에 대한 응답
2. **Attention**: 중요한 정보 강조
3. **Flow**: 페이지 전환의 자연스러움
4. **Delight**: 미묘한 즐거움

### 금지 사항
- 과도한 애니메이션
- 긴 애니메이션 (500ms 이상)
- 불필요한 움직임
- prefers-reduced-motion 무시

---

## 📦 Component Library 우선순위

### Phase 1 - 필수
- [ ] Button (primary, secondary, ghost)
- [ ] Card (default, stat, project)
- [ ] Table (basic, sortable, filterable)
- [ ] Input (text, number, date)
- [ ] Select (single, multi)
- [ ] Badge
- [ ] Loading (spinner, skeleton)

### Phase 2 - 중요
- [ ] Navigation
- [ ] Sidebar
- [ ] Modal
- [ ] Dropdown
- [ ] Tooltip
- [ ] Pagination
- [ ] Checkbox
- [ ] Radio

### Phase 3 - 추가
- [ ] Tabs
- [ ] Accordion
- [ ] Slider (range)
- [ ] DatePicker
- [ ] Chart components
- [ ] Toast notifications
- [ ] Avatar
- [ ] Progress

---

## 🎨 실제 적용 예시

### 홈페이지 Hero
```
배경: gradient(#22c55e, #0ea5e9) 45도
높이: 70vh
중앙 정렬
헤드라인: "Climate Action Data Hub"
  - 폰트: text-6xl, font-bold, text-white
서브: "전 세계 기후 프로젝트 데이터를 한눈에"
  - 폰트: text-xl, text-white/90
검색바: 큰 크기, white, shadow-xl
  - 너비: 최대 600px
  - 높이: 56px
  - 라운드: radius-xl
```

### Stat Cards
```
레이아웃: Grid 3컬럼 (모바일 1컬럼)
배경: white
그림자: shadow-lg
라운드: radius-xl
패딩: 32px
아이콘: 48px, primary-500
숫자: text-5xl, font-bold, font-mono, text-gray-900
라벨: text-sm, text-gray-600
애니메이션: countup on scroll
```

---

**Design System Version**: 1.0  
**Last Updated**: 2025-10-28  
**Status**: Ready for Development 🚀

