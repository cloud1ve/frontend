import { useState, useEffect } from 'react';
import { projectsApi } from '../services/api';
import type { Project } from '../types/project';
import type { FiltersData } from '../types/api';

export interface ProjectFilterOptions {
  searchQuery?: string;
  selectedTheme?: string;
  selectedCountry?: string;
  selectedRegistry?: string;
  selectedModality?: string;
  selectedProjectSize?: string;
  selectedEssCategory?: string;
  startYear?: string;
  endYear?: string;
}

export interface UseProjectsOptions {
  /**
   * 프로젝트 필터링 함수
   * @param project - 필터링할 프로젝트
   * @param filters - 필터 옵션
   * @returns 필터를 통과하면 true
   */
  filterFn?: (project: Project, filters: ProjectFilterOptions) => boolean;
}

/**
 * 전체 프로젝트를 로드하고 필터링하는 커스텀 훅
 */
export function useProjects(options: UseProjectsOptions = {}) {
  const { filterFn } = options;
  
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<FiltersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 필터 옵션 로드
  useEffect(() => {
    async function loadFilters() {
      try {
        const response = await projectsApi.getFilters();
        setFilters(response.data);
      } catch (err) {
        console.error('Failed to load filters:', err);
      }
    }
    loadFilters();
  }, []);

  // 전체 프로젝트 로드 (필터링을 위해 전체 프로젝트 필요)
  useEffect(() => {
    async function loadAllProjects() {
      try {
        setLoading(true);
        setError(null);
        
        // 모든 페이지에서 프로젝트 가져오기
        const allProjectsData: Project[] = [];
        let page = 1;
        let hasMore = true;
        
        while (hasMore) {
          const response = await projectsApi.getProjects({ page, limit: 100 });
          allProjectsData.push(...response.data.items);
          
          if (page >= response.data.pagination.total_pages) {
            hasMore = false;
          } else {
            page++;
          }
        }
        
        setAllProjects(allProjectsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '프로젝트를 불러오는데 실패했습니다');
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadAllProjects();
  }, []);

  /**
   * 필터 옵션을 사용하여 프로젝트 필터링
   */
  function filterProjects(filterOptions: ProjectFilterOptions): Project[] {
    if (!filterFn) {
      return allProjects;
    }
    
    return allProjects.filter((project) => filterFn(project, filterOptions));
  }

  return {
    allProjects,
    filters,
    loading,
    error,
    filterProjects,
  };
}
