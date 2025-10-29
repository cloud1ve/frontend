import type { Project, FilterState } from './project';

// API 요청 타입
export interface GetProjectsParams {
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

// 페이지네이션 정보
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 필터 옵션
export interface FilterOptions {
  themes: string[];
  registries: string[];
  countries: string[];
  projectSizes: string[];
}

// API 응답 타입
export interface GetProjectsResponse {
  data: Project[];
  pagination: PaginationInfo;
  filters: {
    appliedFilters: Partial<FilterState>;
    availableOptions: FilterOptions;
  };
}

export interface GetProjectDetailResponse {
  project: Project;
  relatedProjects?: Project[];
}

export interface GetStatisticsResponse {
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

export interface GetFiltersResponse {
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

// 에러 응답
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

