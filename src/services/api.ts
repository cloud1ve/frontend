import axios from 'axios';
import type {
  GetProjectsParams,
  GetProjectsResponse,
  GetProjectDetailResponse,
  GetFiltersResponse,
  GetStatisticsResponse,
  HealthResponse,
} from '../types/api';
import type { Project } from '../types/project';

// API 베이스 URL (환경변수로 관리)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (로딩 상태 등)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API 함수들

// 서버 헬스 체크
export const healthApi = {
  // 서버 상태 확인
  check: async (): Promise<HealthResponse> => {
    const { data } = await api.get<HealthResponse>('/health');
    return data;
  },
};

export const projectsApi = {
  // 프로젝트 목록 조회
  getProjects: async (params?: GetProjectsParams): Promise<GetProjectsResponse> => {
    const { data } = await api.get<GetProjectsResponse>('/api/projects', { params });
    return data;
  },

  // 프로젝트 상세 조회 (ref PK 사용)
  getProjectDetail: async (ref: string): Promise<GetProjectDetailResponse> => {
    const { data } = await api.get<GetProjectDetailResponse>(`/api/projects/${ref}`);
    return data;
  },

  // 필터 옵션 조회
  getFilters: async (): Promise<GetFiltersResponse> => {
    const { data } = await api.get<GetFiltersResponse>('/api/projects/filters');
    return data;
  },
};

// 통계 API
export const statisticsApi = {
  // 통계 데이터 조회 (프로젝트 목록에서 계산)
  getStatistics: async (): Promise<GetStatisticsResponse> => {
    // 첫 페이지에서 전체 개수 확인
    const firstPage = await projectsApi.getProjects({ page: 1, limit: 100 });
    const total = firstPage.data.pagination.total_items;
    const totalPages = firstPage.data.pagination.total_pages;
    
    // 모든 프로젝트 수집 (페이지네이션 사용)
    let allProjects = [...firstPage.data.items];
    
    // 나머지 페이지들 가져오기 (최대 10페이지까지만 - 성능 고려)
    const maxPages = Math.min(totalPages, 10);
    const pagePromises = [];
    for (let page = 2; page <= maxPages; page++) {
      pagePromises.push(projectsApi.getProjects({ page, limit: 100 }));
    }
    
    const remainingPages = await Promise.all(pagePromises);
    remainingPages.forEach((response) => {
      allProjects = [...allProjects, ...response.data.items];
    });

    // GCF 프로젝트 필터링
    // modality가 'PAP'이면 GCF 프로젝트
    const gcfProjects = allProjects.filter((p) => {
      if (p.source) {
        return p.source === 'GCF';
      }
      return p.modality === 'PAP';
    });

    // Carbon 프로젝트 필터링
    // modality가 'SAP'이면 탄소 상쇄 프로젝트
    const carbonProjects = allProjects.filter((p) => {
      if (p.source) {
        return p.source === 'CarbonPlan';
      }
      return p.modality === 'SAP';
    });

    // 통계 계산
    const totalFinancing = allProjects.reduce((sum, p) => sum + (p.total_gcf_funding || 0), 0);
    const totalCredits = allProjects.reduce((sum, p) => {
      const project = p as Project & { credit_quantity?: number | null };
      return sum + (project.credit_quantity || 0);
    }, 0);

    // 테마별 통계
    const themeMap = new Map<string, { count: number; value: number }>();
    allProjects.forEach((p) => {
      if (p.theme) {
        const existing = themeMap.get(p.theme) || { count: 0, value: 0 };
        themeMap.set(p.theme, {
          count: existing.count + 1,
          value: existing.value + (p.total_gcf_funding || 0),
        });
      }
    });
    const byTheme = Array.from(themeMap.entries()).map(([theme, data]) => ({
      theme,
      count: data.count,
      value: data.value,
    }));

    // 레지스트리별 통계
    const registryMap = new Map<string, { count: number; credits: number }>();
    allProjects.forEach((p) => {
      const project = p as Project & {
        carbon_registry?: string | null;
        credit_quantity?: number | null;
      };
      const registry = project.carbon_registry;
      if (registry) {
        const existing = registryMap.get(registry) || { count: 0, credits: 0 };
        registryMap.set(registry, {
          count: existing.count + 1,
          credits: existing.credits + (project.credit_quantity || 0),
        });
      }
    });
    const byRegistry = Array.from(registryMap.entries()).map(([registry, data]) => ({
      registry,
      count: data.count,
      credits: data.credits,
    }));

    // 국가별 통계
    const countryMap = new Map<string, { count: number; value: number }>();
    allProjects.forEach((p) => {
      if (p.countries) {
        const countries = p.countries.split(',').map(c => c.trim()).filter(Boolean);
        countries.forEach((country) => {
          const existing = countryMap.get(country) || { count: 0, value: 0 };
          countryMap.set(country, {
            count: existing.count + 1,
            value: existing.value + (p.total_gcf_funding || 0),
          });
        });
      }
    });
    const byCountry = Array.from(countryMap.entries()).map(([country, data]) => ({
      country,
      count: data.count,
      value: data.value,
    }));

    // 연도별 통계
    const yearMap = new Map<string, { count: number; value: number }>();
    allProjects.forEach((p) => {
      if (p.approval_date) {
        const year = new Date(p.approval_date).getFullYear().toString();
        const existing = yearMap.get(year) || { count: 0, value: 0 };
        yearMap.set(year, {
          count: existing.count + 1,
          value: existing.value + (p.total_gcf_funding || 0),
        });
      }
    });
    const byYear = Array.from(yearMap.entries())
      .map(([year, data]) => ({ year, ...data }))
      .sort((a, b) => a.year.localeCompare(b.year));

    return {
      total: {
        projects: total,
        gcfProjects: gcfProjects.length,
        carbonProjects: carbonProjects.length,
        totalCredits,
        totalFinancing,
      },
      byTheme,
      byRegistry,
      byCountry,
      byYear,
      timeline: [], // 타임라인 데이터는 복잡하므로 빈 배열로 처리
    };
  },
};

export default api;

