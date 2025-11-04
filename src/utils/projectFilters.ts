import type { Project } from '../types/project';
import type { ProjectFilterOptions } from '../hooks/useProjects';

/**
 * 공통 프로젝트 필터링 함수
 */
export function createProjectFilter(filterOptions: ProjectFilterOptions) {
  return (project: Project): boolean => {
    const {
      searchQuery,
      selectedTheme,
      selectedCountry,
      selectedRegistry,
      selectedModality,
      selectedProjectSize,
      selectedEssCategory,
      startYear,
      endYear,
    } = filterOptions;

    // 검색어 필터링
    if (searchQuery && !project.project_name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 테마 필터링
    if (selectedTheme !== 'all' && project.theme !== selectedTheme) {
      return false;
    }

    // 국가 필터링
    if (selectedCountry !== 'all') {
      const projectCountries = project.countries ? project.countries.split(',').map(c => c.trim()) : [];
      if (!projectCountries.includes(selectedCountry)) {
        return false;
      }
    }

    // 레지스트리 필터링
    if (selectedRegistry !== 'all') {
      const projectRegistry = (project as Project & { carbon_registry?: string | null }).carbon_registry;
      if (projectRegistry !== selectedRegistry) {
        return false;
      }
    }

    // 모달리티 필터링
    if (selectedModality !== 'all' && project.modality !== selectedModality) {
      return false;
    }

    // 프로젝트 규모 필터링
    if (selectedProjectSize && selectedProjectSize !== 'all') {
      // project_size 또는 projectsize 필드 확인 (백엔드에서 둘 다 올 수 있음)
      const projectSize = project.project_size || (project as Project & { projectsize?: string | null }).projectsize;
      if (!projectSize || projectSize !== selectedProjectSize) {
        return false;
      }
    }

    // ESS 카테고리 필터링
    if (selectedEssCategory && selectedEssCategory !== 'all') {
      // ess_category 또는 esscategory 필드 확인 (백엔드에서 둘 다 올 수 있음)
      const projectEssCategory = (project as Project & { ess_category?: string | null }).ess_category ||
                                  (project as Project & { esscategory?: string | null }).esscategory;
      if (!projectEssCategory || projectEssCategory !== selectedEssCategory) {
        return false;
      }
    }

    // 연도 필터링
    if (startYear || endYear) {
      if (project.approval_date) {
        const year = new Date(project.approval_date).getFullYear().toString();
        if (startYear && year < startYear) {
          return false;
        }
        if (endYear && year > endYear) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  };
}

/**
 * GCF 프로젝트 필터링 함수 (PAP만)
 */
export function isGCFProject(project: Project): boolean {
  return project.modality === 'PAP';
}

/**
 * 탄소 상쇄 프로젝트 필터링 함수 (SAP만)
 */
export function isCarbonProject(project: Project): boolean {
  return project.modality === 'SAP';
}

/**
 * 페이지네이션 계산 유틸리티
 */
export function paginate<T>(items: T[], page: number, limit: number) {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    totalItems,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

