import type { Project } from './project';

// API 공통 래퍼 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

// API 요청 타입
export interface GetProjectsParams {
  page?: number;
  limit?: number;
  modality?: string;
  countries?: string;
  theme?: string;
  projectSize?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// 페이지네이션 정보
export interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
  has_next: boolean;
  has_prev: boolean;
}

// 프로젝트 목록 데이터
export interface ProjectsData {
  items: Project[];
  pagination: PaginationInfo;
}

// 필터 옵션
export interface FiltersData {
  modalities: string[];
  countries: string[];
  themes: string[];
  project_sizes: string[];
  ess_categories: string[];
  statuses: string[];
}

// API 응답 타입
export interface GetProjectsResponse extends ApiResponse<ProjectsData> {}

export interface GetProjectDetailResponse extends ApiResponse<Project> {}

export interface GetFiltersResponse extends ApiResponse<FiltersData> {}

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

// 헬스 체크 응답
export interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
  uptime: number;
}

// 에러 응답
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

