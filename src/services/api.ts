import axios from 'axios';
import type {
  GetProjectsParams,
  GetProjectsResponse,
  GetProjectDetailResponse,
  GetStatisticsResponse,
  GetFiltersResponse,
} from '../types/api';

// API 베이스 URL (환경변수로 관리)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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
export const projectsApi = {
  // 프로젝트 목록 조회
  getProjects: async (params?: GetProjectsParams): Promise<GetProjectsResponse> => {
    const { data } = await api.get<GetProjectsResponse>('/projects', { params });
    return data;
  },

  // 프로젝트 상세 조회
  getProjectDetail: async (id: string): Promise<GetProjectDetailResponse> => {
    const { data } = await api.get<GetProjectDetailResponse>(`/projects/${id}`);
    return data;
  },

  // 통계 데이터 조회
  getStatistics: async (): Promise<GetStatisticsResponse> => {
    const { data} = await api.get<GetStatisticsResponse>('/statistics');
    return data;
  },

  // 필터 옵션 조회
  getFilters: async (): Promise<GetFiltersResponse> => {
    const { data } = await api.get<GetFiltersResponse>('/filters');
    return data;
  },
};

export default api;

