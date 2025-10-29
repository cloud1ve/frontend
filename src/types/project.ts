// 원본 DB 레코드 타입
export interface ProjectRecord {
  source: 'GCF' | 'CarbonPlan';
  project_ref_id: string;
  project_name: string;
  developer_proponent: string | null;
  
  // Carbon 관련 (CarbonPlan 데이터)
  carbon_protocol: string | null;
  carbon_registry: string | null;
  credit_quantity: number | null;
  
  // 날짜 정보
  primary_date: string | null;
  date_type: 'Approval' | 'Listing' | null;
  
  // GCF 관련
  gcf_status: string | null;
  gcf_modality: string | null;
  gcf_countries: string | null;
  gcf_bm: string | null;
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

// GCF 프로젝트 정보
export interface GCFInfo {
  status: string;
  modality: string;
  countries: string[];
  boardMeeting: string;
  projectSize: 'Small' | 'Medium' | 'Large';
  essCategory: string;
  faFinancing: number;
  totalGcfFunding: number;
  totalProjectValue: number;
}

// Carbon 프로젝트 정보
export interface CarbonInfo {
  protocol: string[];
  registry: string;
  creditQuantity: number;
  firstTransactionDate: Date;
  lastTransactionDate: Date;
  vintageRange: string;
}

// 프론트엔드용 통합 프로젝트 모델
export interface Project {
  id: string;
  source: 'GCF' | 'CarbonPlan';
  name: string;
  developer: string | null;
  theme: 'Adaptation' | 'Mitigation' | 'Cross-cutting' | null;
  primaryDate: Date | null;
  dateType: 'Approval' | 'Listing' | null;
  gcf?: GCFInfo;
  carbon?: CarbonInfo;
}

// 필터 상태
export interface FilterState {
  source: ('GCF' | 'CarbonPlan')[];
  theme: ('Adaptation' | 'Mitigation' | 'Cross-cutting')[];
  registry: string[];
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
export interface Statistics {
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

