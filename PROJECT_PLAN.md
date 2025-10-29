# 기후 행동 통합 데이터 플랫폼 (Climate Action Data Hub)

## 📋 프로젝트 개요

전 세계 기후 관련 프로젝트, 금융 데이터, 탄소 크레딧, 기후 펀드 등 분산된 기후 행동 데이터를 한 곳에서 통합하고 시각화하여, 투명하고 접근 가능한 기후 정보를 제공하는 종합 플랫폼

### 목적
- 다양한 기후 데이터 소스를 한 곳에서 통합 조회
- 탄소 상쇄 프로젝트, 기후 금융, 적응/완화 프로젝트 데이터 제공
- 투명하고 접근 가능한 기후 행동 정보로 의사결정 지원
- 기후 프로젝트의 임팩트와 성과 추적
- 국가별, 테마별, 파트너별 기후 행동 현황 파악

### 참고 서비스
- [CarbonPlan OffsetsDB](https://carbonplan.org/research/offsets-db) - 탄소 상쇄 프로젝트 데이터
- [Green Climate Fund](https://www.greenclimate.fund/) - 기후 금융 및 프로젝트 포트폴리오

---

## 🎯 핵심 기능

### 1. 다중 데이터 소스 통합
- **탄소 상쇄 프로젝트 (Carbon Offset Projects)**
  - ACR (American Carbon Registry)
  - ART (Architecture for REDD+ Transactions)
  - CAR (Climate Action Reserve)
  - Gold Standard
  - VCS (Verra Carbon Standard)
  - 크레딧 발급/폐기 데이터
  
- **기후 금융 프로젝트 (Climate Finance)**
  - Green Climate Fund (GCF)
  - Climate Investment Funds (CIF)
  - Global Environment Facility (GEF)
  - 프로젝트 금융 규모, 파트너, 수혜자 정보
  
- **국가별 기후 행동**
  - NDC (Nationally Determined Contributions)
  - 국가별 배출량 데이터
  - 기후 정책 및 목표
  
- **데이터 표준화**
  - 통일된 스키마로 변환
  - 중복 제거 및 매칭
  - 지속적 업데이트

### 2. 종합 검색 및 필터링
- **통합 검색**
  - 프로젝트 이름, ID, 설명 전체 검색
  - 국가, 지역, 도시 검색
  - 파트너/기관명 검색
  
- **다차원 필터링**
  - **데이터 소스별**: 탄소 레지스트리, 기후 펀드, 국가 데이터
  - **프로젝트 유형별**: 완화(Mitigation), 적응(Adaptation), 혼합
  - **테마별**: 산림, 재생에너지, 에너지 효율, 농업, 수자원, 생태계, 건축 등
  - **국가/지역별**: 대륙, 국가, 지역 단위
  - **금융 규모별**: 프로젝트 예산 범위
  - **수혜자 규모별**: 직간접 수혜자 수
  - **상태별**: 진행중, 완료, 계획중
  - **파트너별**: 개발은행, NGO, 정부, 민간기업

### 3. 임팩트 시각화 및 대시보드
- **글로벌 임팩트 스냅샷**
  - 총 프로젝트 수
  - 총 기후 금융 규모 (USD)
  - 참여 국가 수
  - 총 수혜자 수
  - 총 온실가스 감축량 (tCO2e)
  - 총 탄소 크레딧 발급/폐기량
  
- **인터랙티브 차트**
  - 시간별 프로젝트 승인/발급 추이
  - 테마별 금융 배분
  - 국가별 프로젝트 분포
  - 완화 vs 적응 비율
  - 공공 vs 민간 금융 비율
  
- **지도 시각화**
  - 프로젝트 위치 맵핑
  - 국가별 임팩트 히트맵
  - 클러스터링 뷰

### 4. 프로젝트 포트폴리오
- **프로젝트 카드 뷰**
  - 썸네일 이미지
  - 핵심 지표 (금융, 수혜자, 감축량)
  - 테마 및 위치 배지
  - 진행 상태
  
- **상세 페이지**
  - 프로젝트 개요 및 목표
  - 금융 정보 (총액, 출처, 파트너)
  - 임팩트 지표 (감축량, 수혜자, 고용 창출 등)
  - 타임라인 및 진행 상황
  - 위치 지도
  - 관련 문서 및 보고서
  - 임팩트 스토리 (사진, 비디오, 인터뷰)

### 5. 임팩트 스토리 (Stories)
- **사람 중심 스토리텔링**
  - 프로젝트 수혜자 인터뷰
  - Before & After 사진
  - 비디오 임베딩
  - 지역 사회 영향
  
- **스토리 카테고리**
  - 생계 개선
  - 기후 복원력
  - 지속가능한 농업
  - 재생에너지 접근성
  - 생태계 보호

### 6. 비교 및 분석 도구
- **프로젝트 비교**
  - 최대 5개 프로젝트 나란히 비교
  - 비용 효율성 분석
  - 임팩트 지표 비교
  
- **국가별 벤치마킹**
  - 국가별 기후 행동 순위
  - 테마별 투자 패턴
  - 목표 대비 진행률

### 7. 데이터 다운로드 및 API
- **데이터 내보내기**
  - CSV, JSON, Excel 형식
  - 필터링된 데이터셋
  - 커스텀 리포트 생성
  
- **오픈 API**
  - RESTful API 엔드포인트
  - GraphQL 지원
  - 개발자 문서
  - API 키 관리

---

## 🏗️ 기술 스택

### Frontend
- **Framework**: React 19+ with TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **차트**: Recharts / Chart.js / D3.js
- **테이블**: TanStack Table (React Table)
- **상태 관리**: Zustand / React Query
- **지도**: Leaflet / Mapbox

### Backend (예정)
- **Runtime**: Node.js
- **Framework**: Express / Fastify / Next.js API Routes
- **Database**: PostgreSQL / MongoDB
- **ORM**: Prisma / TypeORM
- **Caching**: Redis
- **Queue**: Bull (데이터 수집 작업)

### 데이터 수집
- **스크래핑**: Puppeteer / Cheerio
- **API 연동**: Axios / Fetch
- **스케줄링**: node-cron / Bull
- **데이터 처리**: Pandas (Python) / Node.js streams

---

## 📄 페이지 구조

```
/                           # 홈페이지 (글로벌 대시보드)
├── /projects               # 프로젝트 포트폴리오
│   ├── /projects/list      # 프로젝트 목록 (검색/필터링)
│   ├── /projects/:id       # 프로젝트 상세
│   └── /projects/compare   # 프로젝트 비교
├── /carbon-offsets         # 탄소 상쇄 프로젝트 (OffsetsDB 스타일)
│   ├── /carbon-offsets/list
│   └── /carbon-offsets/:id
├── /stories                # 임팩트 스토리
│   ├── /stories/list       # 스토리 목록
│   └── /stories/:id        # 스토리 상세
├── /countries              # 국가별 분석
│   └── /countries/:code    # 국가별 대시보드
├── /analytics              # 통계 및 분석
│   ├── /analytics/global   # 글로벌 트렌드
│   ├── /analytics/themes   # 테마별 분석
│   └── /analytics/finance  # 기후 금융 분석
├── /data                   # 데이터 센터
│   ├── /data/library       # 데이터 라이브러리
│   └── /data/download      # 데이터 다운로드
├── /about                  # 서비스 소개
├── /methodology            # 데이터 수집 방법론
└── /api-docs               # API 문서
```

### 1. 홈페이지 (`/`) - 글로벌 대시보드
- **Hero Section**
  - 서비스 타이틀 및 미션 스테이트먼트
  - 통합 검색바 (프로젝트, 국가, 테마 통합 검색)
  - CTA 버튼 (프로젝트 탐색, 데이터 다운로드)
  
- **임팩트 스냅샷 (Impact Snapshot)** - GCF 스타일
  - 애니메이션 카운터로 주요 지표 표시
  - 총 프로젝트 수
  - 총 기후 금융 (USD)
  - 참여 국가 수
  - 총 수혜자 수
  - 총 온실가스 감축량 (tCO2e)
  - 총 탄소 크레딧 발급/폐기
  
- **최근 승인 프로젝트 (Recently Approved)**
  - 카드 슬라이더 (최신 6-8개)
  - 썸네일, 제목, 위치, 테마, 금융 규모
  
- **하이라이트 섹션**
  - 주목할 만한 임팩트 스토리 (이미지 + 인용구)
  - 최근 뉴스 및 업데이트
  - 비디오 임베드
  
- **인터랙티브 지도**
  - 전 세계 프로젝트 분포
  - 클릭 가능한 마커
  - 국가별 색상 코딩 (프로젝트 수/금융 규모)
  
- **테마별 통계**
  - 도넛/파이 차트
  - 산림, 재생에너지, 농업 등

### 2. 프로젝트 포트폴리오 (`/projects`)
#### 2.1 프로젝트 목록 (`/projects/list`)
- **뷰 옵션**: 그리드 뷰 / 테이블 뷰 / 지도 뷰 전환
- **검색 및 필터 패널**
  - 전체 텍스트 검색
  - 데이터 소스 (Carbon Registry, Climate Fund, National Data)
  - 프로젝트 타입 (Mitigation, Adaptation, Cross-cutting)
  - 테마 (다중 선택)
  - 국가/지역
  - 금융 범위 슬라이더
  - 상태 (Active, Completed, Planned)
  - 파트너 타입
  
- **정렬 옵션**
  - 최신순, 금융 규모, 수혜자 수, 감축량
  
- **프로젝트 카드** (그리드 뷰)
  - 대표 이미지
  - 프로젝트 이름
  - 위치 및 테마 배지
  - 주요 지표 아이콘 (금융, 수혜자, 감축량)
  - 진행률 바
  
- **필터 결과 요약**
  - 선택된 필터 통계 (프로젝트 수, 총 금융, 총 감축량)

#### 2.2 프로젝트 상세 (`/projects/:id`)
- **헤더 섹션**
  - 히어로 이미지/비디오
  - 프로젝트 이름
  - 위치 (국가, 지역)
  - 데이터 소스 배지
  - 테마 및 타입 태그
  - 상태 인디케이터
  
- **핵심 지표 카드**
  - 총 프로젝트 가치 (USD)
  - GCF 금융 (해당 시)
  - 수혜자 수 (직접/간접)
  - 감축량 (tCO2e)
  - 크레딧 발급/폐기 (해당 시)
  
- **프로젝트 개요**
  - 설명 및 목표
  - 접근 방법
  - 혁신성
  
- **금융 정보**
  - 금융 구조 차트
  - 공공/민간 비율
  - 파트너 리스트 (로고)
  - 회계 연도별 배분
  
- **임팩트 및 성과**
  - 주요 성과 지표 (KPI)
  - 진행 타임라인
  - 마일스톤 달성 현황
  - Before & After 비교
  
- **위치 및 커뮤니티**
  - 인터랙티브 지도
  - 수혜 커뮤니티 정보
  - 지역 사회 참여
  
- **임팩트 스토리** (해당 시)
  - 수혜자 인터뷰 인용구
  - 사진 갤러리
  - 비디오
  
- **관련 문서**
  - 프로젝트 제안서
  - 진행 보고서
  - 평가 문서
  - 원본 소스 링크

#### 2.3 프로젝트 비교 (`/projects/compare`)
- 프로젝트 선택 (최대 5개)
- 나란히 비교 테이블
- 주요 지표 비교 차트
- 비용 효율성 분석

### 3. 탄소 상쇄 프로젝트 (`/carbon-offsets`)
- CarbonPlan OffsetsDB 스타일의 전문 뷰
- 레지스트리별 필터링 (ACR, ART, CAR, GLD, VCS)
- 크레딧 발급/폐기 트랜잭션 상세
- 프로토콜별 분류
- Compliance vs Voluntary 구분

### 4. 임팩트 스토리 (`/stories`)
#### 4.1 스토리 목록 (`/stories/list`)
- 매거진 스타일 레이아웃
- 대형 이미지 카드
- 카테고리 필터 (생계, 복원력, 농업, 에너지, 생태계)
- 국가/테마 필터

#### 4.2 스토리 상세 (`/stories/:id`)
- 풀 화면 히어로 이미지
- 스토리텔링 포맷
- 인용구 하이라이트
- 이미지 갤러리
- 비디오 임베드
- 관련 프로젝트 링크
- 소셜 미디어 공유

### 5. 국가별 분석 (`/countries/:code`)
- **국가 프로필**
  - 국가 개요 및 기후 취약성
  - NDC 목표 및 진행률
  - 배출량 데이터
  
- **프로젝트 포트폴리오**
  - 국가 내 전체 프로젝트 리스트
  - 테마별 분포
  - 금융 현황
  
- **임팩트 대시보드**
  - 총 투자액
  - 총 수혜자
  - 총 감축량
  - 시간별 추이

### 6. 통계 및 분석 (`/analytics`)
#### 6.1 글로벌 트렌드 (`/analytics/global`)
- 연도별 프로젝트 승인 추이
- 금융 배분 트렌드
- 완화 vs 적응 비율 변화
- 지역별 성장률

#### 6.2 테마별 분석 (`/analytics/themes`)
- 테마별 프로젝트 수 및 금융
- 테마별 평균 프로젝트 규모
- 테마별 비용 효율성
- 성공 사례 및 교훈

#### 6.3 기후 금융 분석 (`/analytics/finance`)
- 공공 vs 민간 금융 비율
- 주요 펀드 및 도너
- 금융 수단 (Grant, Loan, Equity)
- 공동 금융 패턴

### 7. 데이터 센터 (`/data`)
#### 7.1 데이터 라이브러리 (`/data/library`)
- 데이터셋 목록
- 메타데이터 (출처, 업데이트 주기, 커버리지)
- 미리보기 기능

#### 7.2 데이터 다운로드 (`/data/download`)
- 필터링 옵션
- 형식 선택 (CSV, JSON, Excel)
- API 엔드포인트 안내
- 라이선스 정보

### 8. 서비스 소개 (`/about`)
- 미션 및 비전
- 팀 소개
- 기술 스택
- 파트너십

### 9. 방법론 (`/methodology`)
- 데이터 수집 방법
- 표준화 프로세스
- 품질 관리
- 업데이트 주기
- 데이터 출처 상세

---

## 🎨 UI/UX 컨셉

### 디자인 원칙
- **Clean & Modern**: 심플하고 세련된 인터페이스
- **Data-Focused**: 데이터 가독성 우선
- **Responsive**: 모바일 퍼스트 접근
- **Accessible**: WCAG 2.1 준수

### 컬러 스킴
- **Primary**: Green (환경/지속가능성 연상)
- **Accent**: Blue (신뢰성)
- **Neutral**: Gray scale (데이터 강조)
- **Dark Mode**: 지원

### 주요 컴포넌트
- **Cards**: 통계 표시
- **Tables**: 프로젝트 목록
- **Charts**: 데이터 시각화
- **Filters**: 사이드바 또는 드롭다운
- **Search**: 자동완성 기능
- **Badges**: 레지스트리, 카테고리 표시
- **Tooltips**: 용어 설명

---

## 📊 데이터 모델 (실제 DB 기반)

### 데이터베이스 스키마 분석
현재 보유한 **db.csv** 파일은 GCF와 CarbonPlan 데이터를 통합한 약 **488,084개 레코드**를 포함합니다.

#### DB 컬럼 구조
```
- source: "GCF" | "CarbonPlan"
- project_ref_id: 프로젝트 고유 ID (예: "FP043", "VCS902", "GLD2940")
- project_name: 프로젝트 이름
- developer_proponent: 개발자/제안자
- carbon_protocol: 탄소 프로토콜 (CarbonPlan용, 예: ['vm0009'])
- carbon_registry: 레지스트리 (verra, gold-standard 등)
- credit_quantity: 크레딧 수량
- primary_date: 주요 날짜
- date_type: "Approval" | "Listing"
- gcf_status: GCF 상태
- gcf_modality: "PAP" 등
- gcf_countries: 국가명
- gcf_bm: 보드 미팅 (예: "B.16", "B.24")
- gcf_theme: "Adaptation" | "Mitigation" | "Cross-cutting"
- gcf_projectsize: "Small" | "Medium" | "Large"
- gcf_esscategory: ESS 카테고리 (예: "Category B")
- gcf_fafinancing: FA 금융 (숫자)
- gcf_totalgcffunding: 총 GCF 펀딩
- gcf_totalprojectvalue: 총 프로젝트 가치
- cc_first_transaction_date: 첫 거래 날짜
- cc_last_transaction_date: 마지막 거래 날짜
- cc_vintage_range: 빈티지 범위 (예: "2011-2019")
```

### TypeScript 타입 정의 (실제 DB 기반)

```typescript
// 원본 DB 레코드 타입
interface ProjectRecord {
  source: 'GCF' | 'CarbonPlan';
  project_ref_id: string;
  project_name: string;
  developer_proponent: string | null;
  
  // Carbon 관련 (CarbonPlan 데이터)
  carbon_protocol: string | null;        // JSON array string
  carbon_registry: string | null;        // verra, gold-standard, etc.
  credit_quantity: number | null;
  
  // 날짜 정보
  primary_date: string | null;
  date_type: 'Approval' | 'Listing' | null;
  
  // GCF 관련 (GCF 데이터)
  gcf_status: string | null;
  gcf_modality: string | null;
  gcf_countries: string | null;
  gcf_bm: string | null;                 // Board Meeting
  gcf_theme: 'Adaptation' | 'Mitigation' | 'Cross-cutting' | null;
  gcf_projectsize: 'Small' | 'Medium' | 'Large' | null;
  gcf_esscategory: string | null;
  gcf_fafinancing: number | null;
  gcf_totalgcffunding: number | null;
  gcf_totalprojectvalue: number | null;
  
  // Carbon Credit 트랜잭션
  cc_first_transaction_date: string | null;
  cc_last_transaction_date: string | null;
  cc_vintage_range: string | null;
}

// 프론트엔드용 통합 프로젝트 모델
interface Project {
  // 기본 정보
  id: string;                    // project_ref_id
  source: 'GCF' | 'CarbonPlan';
  name: string;                  // project_name
  developer: string | null;       // developer_proponent
  
  // 프로젝트 타입 및 테마
  theme: 'Adaptation' | 'Mitigation' | 'Cross-cutting' | null;
  
  // 날짜
  primaryDate: Date | null;
  dateType: 'Approval' | 'Listing' | null;
  
  // GCF 전용 필드
  gcf?: {
    status: string;
    modality: string;
    countries: string[];          // 파싱된 배열
    boardMeeting: string;
    projectSize: 'Small' | 'Medium' | 'Large';
    essCategory: string;
    faFinancing: number;
    totalGcfFunding: number;
    totalProjectValue: number;
  };
  
  // CarbonPlan 전용 필드
  carbon?: {
    protocol: string[];           // 파싱된 배열
    registry: string;
    creditQuantity: number;
    firstTransactionDate: Date;
    lastTransactionDate: Date;
    vintageRange: string;
  };
}

// 필터 상태
interface FilterState {
  source: ('GCF' | 'CarbonPlan')[];
  theme: ('Adaptation' | 'Mitigation' | 'Cross-cutting')[];
  registry: string[];              // verra, gold-standard 등
  countries: string[];
  projectSize: ('Small' | 'Medium' | 'Large')[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  creditRange: {
    min: number | null;
    max: number | null;
  };
  financeRange: {
    min: number | null;
    max: number | null;
  };
  searchQuery: string;
}

// 통계 데이터
interface Statistics {
  total: {
    projects: number;
    gcfProjects: number;
    carbonProjects: number;
    totalCredits: number;
    totalFinancing: number;
  };
  byTheme: Record<string, number>;
  byRegistry: Record<string, number>;
  byCountry: Record<string, number>;
  byYear: Record<string, number>;
}
```

---

## 🔌 API 인터페이스 설계

### 백엔드 API 엔드포인트 (예상)

```typescript
// GET /api/projects - 프로젝트 목록 조회
interface GetProjectsRequest {
  page?: number;
  limit?: number;
  source?: 'GCF' | 'CarbonPlan';
  theme?: string[];
  registry?: string[];
  countries?: string[];
  projectSize?: string[];
  search?: string;
  sortBy?: 'date' | 'credits' | 'finance' | 'name';
  sortOrder?: 'asc' | 'desc';
  minCredits?: number;
  maxCredits?: number;
  minFinance?: number;
  maxFinance?: number;
  startDate?: string;
  endDate?: string;
}

interface GetProjectsResponse {
  data: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    appliedFilters: FilterState;
    availableOptions: {
      themes: string[];
      registries: string[];
      countries: string[];
      projectSizes: string[];
    };
  };
}

// GET /api/projects/:id - 프로젝트 상세 조회
interface GetProjectDetailResponse {
  project: Project;
  relatedProjects?: Project[];  // 유사 프로젝트
}

// GET /api/statistics - 통계 데이터
interface GetStatisticsResponse {
  total: {
    projects: number;
    gcfProjects: number;
    carbonProjects: number;
    totalCredits: number;
    totalFinancing: number;
  };
  byTheme: { theme: string; count: number; value: number }[];
  byRegistry: { registry: string; count: number; credits: number }[];
  byCountry: { country: string; count: number; value: number }[];
  byYear: { year: string; count: number; value: number }[];
  timeline: {
    date: string;
    gcfProjects: number;
    carbonProjects: number;
    credits: number;
    financing: number;
  }[];
}

// GET /api/filters - 필터 옵션 조회
interface GetFiltersResponse {
  themes: string[];
  registries: string[];
  countries: string[];
  projectSizes: string[];
  developers: string[];
  dateRange: {
    min: string;
    max: string;
  };
  creditRange: {
    min: number;
    max: number;
  };
  financeRange: {
    min: number;
    max: number;
  };
}
```

---

## 🎨 프론트엔드 구현 계획

### 페이지 우선순위 (실제 데이터 기반)

#### Phase 1: 핵심 페이지 (2-3주)
1. **홈페이지 (`/`)**
   - 임팩트 스냅샷 카드 (총 프로젝트, GCF/CarbonPlan 분리, 총 크레딧, 총 금융)
   - 데이터 소스별 카드 (GCF vs CarbonPlan)
   - 최신 프로젝트 슬라이더
   - 간단한 검색바

2. **프로젝트 목록 (`/projects`)**
   - 테이블 뷰 (기본)
   - 필터 패널:
     * Source (GCF / CarbonPlan)
     * Theme (Adaptation / Mitigation / Cross-cutting)
     * Registry (verra, gold-standard 등)
     * Project Size (Small / Medium / Large)
     * 날짜 범위
     * 크레딧 범위
     * 금융 범위
   - 검색 (프로젝트 이름, ID)
   - 정렬 (날짜, 크레딧, 금융)
   - 페이지네이션

3. **프로젝트 상세 (`/projects/:id`)**
   - 기본 정보 (ID, 이름, 개발자, 소스)
   - GCF 프로젝트: 금융 정보, 국가, 프로젝트 크기, Board Meeting
   - CarbonPlan 프로젝트: 레지스트리, 프로토콜, 크레딧 수량, 트랜잭션 날짜
   - 빈티지 정보 (해당 시)

#### Phase 2: 데이터 시각화 (2주)
4. **통계 대시보드 (`/analytics`)**
   - 테마별 분포 (파이 차트)
   - 레지스트리별 통계 (바 차트)
   - 국가별 프로젝트 수 (맵 또는 바 차트)
   - 연도별 추이 (라인 차트)
   - GCF vs CarbonPlan 비교

5. **GCF 전용 페이지 (`/gcf`)**
   - GCF 프로젝트만 필터링
   - 금융 규모별 분류
   - 국가별 분석
   - Board Meeting별 통계

6. **탄소 레지스트리 페이지 (`/carbon-offsets`)**
   - CarbonPlan 데이터만 필터링
   - 레지스트리별 (Verra, Gold Standard)
   - 프로토콜별
   - 크레딧 트랜잭션 타임라인

#### Phase 3: 고급 기능 (1-2주)
7. **프로젝트 비교 (`/compare`)**
   - 최대 3-5개 프로젝트 선택
   - 나란히 비교
   - 주요 지표 하이라이트

8. **데이터 다운로드 (`/download`)**
   - 필터링된 데이터 CSV 다운로드
   - 전체 데이터셋 다운로드
   - 커스텀 리포트 생성

### UI 컴포넌트 계획

```
src/
├── components/
│   ├── ui/                    # Shadcn UI 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   ├── badge.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx         # 네비게이션
│   │   ├── footer.tsx
│   │   └── sidebar.tsx        # 필터 사이드바
│   ├── projects/
│   │   ├── project-card.tsx   # 프로젝트 카드
│   │   ├── project-table.tsx  # 프로젝트 테이블
│   │   ├── project-filters.tsx # 필터 패널
│   │   └── project-detail.tsx
│   ├── statistics/
│   │   ├── stat-card.tsx      # 통계 카드
│   │   ├── theme-chart.tsx    # 테마별 차트
│   │   ├── registry-chart.tsx
│   │   └── timeline-chart.tsx
│   └── common/
│       ├── search-bar.tsx
│       ├── pagination.tsx
│       └── loading.tsx
├── pages/
│   ├── home.tsx
│   ├── projects/
│   │   ├── list.tsx
│   │   └── [id].tsx
│   ├── analytics.tsx
│   ├── gcf.tsx
│   ├── carbon-offsets.tsx
│   ├── compare.tsx
│   └── download.tsx
├── hooks/
│   ├── use-projects.ts        # React Query hook
│   ├── use-statistics.ts
│   └── use-filters.ts
├── services/
│   └── api.ts                 # API 클라이언트
├── types/
│   ├── project.ts             # 타입 정의
│   └── api.ts
└── utils/
    ├── format.ts              # 포맷팅 함수
    └── parse.ts               # 파싱 함수
```

### 기술 스택 확정

**필수**
- React 19 + TypeScript
- Vite
- React Router
- TanStack Query (React Query) - 서버 상태 관리
- Zustand - 클라이언트 상태 관리 (필터)
- Shadcn UI + Tailwind CSS
- Recharts - 차트 라이브러리
- date-fns - 날짜 처리
- Axios - API 클라이언트

**선택적**
- TanStack Table - 고급 테이블 기능
- Leaflet - 지도 (국가별 시각화)
- React Hook Form - 폼 관리
- Zod - 스키마 검증

### 데이터 흐름

```
[서버 DB/CSV] 
    ↓
[백엔드 API] (Node.js/Express)
    ↓ (REST API)
[React Query] (캐싱, 상태 관리)
    ↓
[React Components]
    ↓
[사용자 UI]
```

---

## 🚀 구현 계획

### Phase 1: 기초 인프라 및 MVP (4-6주)
**목표**: 기본 프로젝트 구조와 핵심 페이지 구현

- [ ] **프로젝트 세팅**
  - Vite + React 19 + TypeScript 환경 구축
  - ESLint, Prettier 설정
  - Git 저장소 및 브랜치 전략
  
- [ ] **UI 기초**
  - Shadcn UI + Tailwind CSS 설치 및 설정
  - 디자인 시스템 정의 (색상, 타이포그래피, 간격)
  - 공통 컴포넌트 라이브러리 (Button, Card, Badge, Table 등)
  - 레이아웃 컴포넌트 (Header, Footer, Sidebar)
  - Dark mode 지원
  
- [ ] **핵심 페이지 (더미 데이터)**
  - 홈페이지 (대시보드) - 임팩트 스냅샷, 최근 프로젝트
  - 프로젝트 목록 페이지 - 그리드/테이블 뷰
  - 프로젝트 상세 페이지
  - 기본 검색 및 필터링
  
- [ ] **라우팅**
  - React Router 설정
  - 페이지 전환 및 애니메이션
  
- [ ] **반응형 디자인**
  - 모바일, 태블릿, 데스크톱 최적화

### Phase 2: 데이터 통합 - 탄소 상쇄 프로젝트 (4-5주)
**목표**: CarbonPlan OffsetsDB 스타일의 탄소 레지스트리 데이터 통합

- [ ] **백엔드 설계**
  - API 아키텍처 설계 (RESTful)
  - 데이터베이스 스키마 설계 (PostgreSQL)
  - ORM 설정 (Prisma)
  
- [ ] **데이터 수집 파이프라인 1단계**
  - VCS (Verra) 레지스트리 스크래핑/API 연동
  - Gold Standard 레지스트리 연동
  - 데이터 표준화 및 변환 로직
  - 크레딧 발급/폐기 트랜잭션 데이터
  
- [ ] **API 개발**
  - 프로젝트 목록 API (페이지네이션, 필터링)
  - 프로젝트 상세 API
  - 통계 API (집계 쿼리)
  
- [ ] **프론트엔드 연동**
  - API 클라이언트 설정 (Axios/Fetch)
  - React Query 상태 관리
  - 로딩 및 에러 상태 처리
  
- [ ] **탄소 상쇄 전용 페이지**
  - `/carbon-offsets` 페이지 구현
  - 레지스트리별 필터링
  - 크레딧 트랜잭션 뷰

### Phase 3: 기후 금융 데이터 통합 (4-5주)
**목표**: GCF 스타일의 기후 금융 프로젝트 데이터 추가

- [ ] **데이터 수집 파이프라인 2단계**
  - Green Climate Fund (GCF) 데이터 수집
  - Climate Investment Funds (CIF) 데이터 수집
  - Global Environment Facility (GEF) 데이터 수집
  - 금융 데이터 표준화
  
- [ ] **통합 프로젝트 모델**
  - 탄소 + 금융 프로젝트 통합 스키마
  - 데이터 매핑 및 중복 제거
  - 복합 필터링 로직
  
- [ ] **고급 필터링**
  - 다중 데이터 소스 필터
  - 금융 범위 슬라이더
  - 파트너 타입 필터
  - 프로젝트 타입 (Mitigation/Adaptation)
  
- [ ] **임팩트 스토리 기능**
  - Story 데이터 모델 구현
  - `/stories` 페이지 구현
  - 매거진 스타일 레이아웃
  - 이미지 갤러리 및 비디오 임베딩

### Phase 4: 시각화 및 분석 (3-4주)
**목표**: 데이터 시각화 및 분석 도구 구현

- [ ] **차트 라이브러리**
  - Recharts 설치 및 설정
  - 커스텀 차트 컴포넌트
  
- [ ] **대시보드 강화**
  - 애니메이션 카운터 (Impact Snapshot)
  - 도넛/파이 차트 (테마별 분포)
  - 라인 차트 (시간별 추이)
  - 바 차트 (국가별, 테마별 비교)
  
- [ ] **지도 시각화**
  - Leaflet 또는 Mapbox 연동
  - 프로젝트 마커 맵핑
  - 클러스터링
  - 히트맵 레이어
  - 국가별 색상 코딩
  
- [ ] **통계 페이지**
  - `/analytics/global` - 글로벌 트렌드
  - `/analytics/themes` - 테마별 분석
  - `/analytics/finance` - 기후 금융 분석
  - 인터랙티브 차트
  
- [ ] **국가별 분석**
  - `/countries/:code` 페이지
  - 국가 프로필
  - 국가별 프로젝트 포트폴리오
  - NDC 목표 vs 진행률

### Phase 5: 고급 기능 (3-4주)
**목표**: 프로젝트 비교, 데이터 다운로드, API 공개

- [ ] **프로젝트 비교**
  - `/projects/compare` 페이지
  - 최대 5개 프로젝트 선택
  - 나란히 비교 뷰
  - 지표 비교 차트
  
- [ ] **데이터 다운로드**
  - `/data/download` 페이지
  - 필터링된 데이터 내보내기
  - CSV, JSON, Excel 형식
  - 커스텀 리포트 생성
  
- [ ] **오픈 API**
  - API 문서 페이지
  - Swagger/OpenAPI 스펙
  - API 키 관리 시스템
  - Rate limiting
  - GraphQL 엔드포인트 (선택)
  
- [ ] **검색 고도화**
  - Elasticsearch 통합 (선택)
  - 전체 텍스트 검색 최적화
  - 자동완성 및 제안
  - 검색 하이라이팅

### Phase 6: 콘텐츠 및 UX 개선 (2-3주)
**목표**: 사용자 경험 최적화 및 콘텐츠 추가

- [ ] **콘텐츠 페이지**
  - `/about` - 서비스 소개
  - `/methodology` - 데이터 수집 방법론
  - FAQ 페이지
  
- [ ] **UX 개선**
  - 빈 상태 디자인
  - 에러 페이지 (404, 500)
  - 토스트 알림
  - 프로그레스 인디케이터
  - 스켈레톤 로딩
  
- [ ] **접근성**
  - ARIA 레이블
  - 키보드 네비게이션
  - 스크린 리더 최적화
  - 색상 대비 검사
  
- [ ] **국제화 (선택)**
  - i18n 설정
  - 다국어 지원 (한국어, 영어)

### Phase 7: 최적화 및 배포 (2-3주)
**목표**: 성능 최적화 및 프로덕션 배포

- [ ] **성능 최적화**
  - Code splitting
  - Lazy loading
  - 이미지 최적화 (WebP, lazy load)
  - 캐싱 전략
  - 번들 사이즈 최적화
  
- [ ] **SEO 최적화**
  - 메타 태그
  - Open Graph 태그
  - Sitemap 생성
  - robots.txt
  - 구조화된 데이터 (Schema.org)
  
- [ ] **테스트**
  - Unit 테스트 (Vitest)
  - Integration 테스트
  - E2E 테스트 (Playwright/Cypress)
  - 접근성 테스트
  
- [ ] **배포**
  - 프론트엔드: Vercel/Netlify
  - 백엔드: AWS/GCP/Render
  - 데이터베이스: PostgreSQL (managed)
  - CDN 설정
  - 도메인 연결
  
- [ ] **모니터링**
  - 에러 추적 (Sentry)
  - 분석 (Google Analytics/Plausible)
  - 성능 모니터링 (Lighthouse CI)
  - Uptime 모니터링

### 총 예상 기간: 22-30주 (약 5-7개월)

### 우선순위 조정 (빠른 출시를 위한 MVP)
만약 빠른 출시가 필요하다면:
1. Phase 1 (기초 인프라)
2. Phase 2 (탄소 상쇄 데이터만)
3. Phase 4 (기본 시각화만)
4. Phase 7 (배포)
→ **약 12-15주 (3-4개월)**

---

## 🔧 개발 고려사항

### 데이터 수집
- **Challenge**: 각 레지스트리의 데이터 형식이 다름
- **Solution**: 통일된 ETL 파이프라인 구축, 변환 로직 모듈화

### 성능
- **Challenge**: 대용량 데이터 테이블 렌더링
- **Solution**: 
  - 가상화 (TanStack Virtual)
  - 서버사이드 페이지네이션
  - 인덱싱 및 캐싱

### 데이터 신선도
- **Challenge**: 실시간 데이터 업데이트 불가능
- **Solution**:
  - 정기적인 배치 업데이트 (일/주 단위)
  - 최종 업데이트 시간 표시
  - 변경사항 알림 기능

### 확장성
- 새로운 레지스트리 추가를 위한 플러그인 아키텍처
- 데이터 소스별 어댑터 패턴

---

## 📈 성공 지표

- **트래픽**: 월 활성 사용자 수
- **사용성**: 평균 세션 시간, 검색/필터 사용률
- **데이터 품질**: 데이터 커버리지 (프로젝트 수/레지스트리)
- **성능**: 페이지 로드 시간 < 2초
- **참여도**: 다운로드 수, API 호출 수

---

## 🤝 기여 및 확장 가능성

### 오픈소스화
- GitHub 공개 저장소
- 커뮤니티 기여 가이드
- 데이터 품질 개선 크라우드소싱

### 추가 기능 아이디어
- AI 기반 프로젝트 추천
- 포트폴리오 관리 (기업용)
- 알림 및 모니터링 서비스
- 블록체인 연동 (NFT 형태의 크레딧)
- 모바일 앱

---

## 📚 참고 자료

### 데이터 소스
**탄소 상쇄 레지스트리**
- [CarbonPlan OffsetsDB](https://carbonplan.org/research/offsets-db) - 참고 UI/UX
- [Verra Registry](https://registry.verra.org/) - VCS 프로젝트
- [Gold Standard Registry](https://registry.goldstandard.org/)
- [American Carbon Registry](https://acr2.apx.com/)
- [Climate Action Reserve](https://thereserve.apx.com/)
- [ART REDD+](https://www.artredd.org/)

**기후 금융**
- [Green Climate Fund](https://www.greenclimate.fund/) - 참고 UI/UX
- [Climate Investment Funds](https://www.cif.org/)
- [Global Environment Facility](https://www.thegef.org/)

**국가별 데이터**
- [UNFCCC NDC Registry](https://unfccc.int/NDCREG) - 국가 기여 목표
- [Climate Watch](https://www.climatewatchdata.org/) - 국가별 배출량

### 기술 문서
- [React 19 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Leaflet](https://leafletjs.com/)
- [Prisma](https://www.prisma.io/)

### 디자인 영감
- [CarbonPlan](https://carbonplan.org/) - 데이터 시각화
- [Green Climate Fund](https://www.greenclimate.fund/) - 임팩트 스토리텔링
- [Climate Watch](https://www.climatewatchdata.org/) - 국가별 대시보드
- [Our World in Data](https://ourworldindata.org/) - 차트 디자인

---

## 📝 다음 단계

### 즉시 시작 가능한 작업
1. **디자인 시스템 정의** - 색상, 타이포그래피, 컴포넌트 스타일 가이드
2. **와이어프레임 작성** - Figma에서 주요 페이지 레이아웃
3. **더미 데이터 생성** - 프로토타입을 위한 샘플 프로젝트 데이터
4. **기술 스택 최종 결정** - 차트 라이브러리, 지도 라이브러리 선택
5. **데이터 소스 조사** - 각 레지스트리/펀드의 데이터 접근 방법 파악

### 질문/결정 사항
- [ ] 백엔드를 별도로 구축할 것인가, 아니면 Next.js API Routes를 사용할 것인가?
- [ ] 지도 라이브러리: Leaflet (무료) vs Mapbox (유료, 더 나은 UX)?
- [ ] 데이터 업데이트 주기: 일간? 주간?
- [ ] 초기 데이터 범위: 몇 개 레지스트리부터 시작?
- [ ] 타겟 사용자: 일반 대중? 연구자? 기업?

---

**문서 작성일**: 2025-10-28  
**버전**: 2.0 (통합 기후 데이터 플랫폼으로 확장)  
**작성자**: 클라우드 설계와 구현 프로젝트팀

---

## 🎉 요약

이 프로젝트는 **기후 행동 통합 데이터 플랫폼**으로, 다음을 목표로 합니다:

✅ **통합**: 탄소 상쇄, 기후 금융, 국가 데이터를 한 곳에서  
✅ **시각화**: 인터랙티브 차트, 지도, 대시보드  
✅ **스토리텔링**: 임팩트 스토리로 사람 중심 접근  
✅ **투명성**: 오픈 데이터, 오픈 API  
✅ **접근성**: 모든 사용자가 쉽게 이용 가능  

**핵심 차별화 요소**:
- 다양한 데이터 소스 통합 (탄소 레지스트리 + 기후 펀드)
- GCF 스타일의 임팩트 스토리텔링
- CarbonPlan 스타일의 정밀한 데이터 분석
- 사용자 친화적인 필터링 및 검색
- 아름다운 데이터 시각화

