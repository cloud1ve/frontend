import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Download, Eye, Filter } from 'lucide-react';
import { formatCurrency, formatCompactNumber, formatDate } from '../utils/format';
import type { Project } from '../types/project';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { projectsApi } from '../services/api';
import type { FiltersData } from '../types/api';
import { Loading } from '../components/common/loading';

export function ProjectsListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedProjectSize, setSelectedProjectSize] = useState<string>('all');
  const [selectedEssCategory, setSelectedEssCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // 데이터 상태
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<FiltersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const limit = 10;

  // 검색어 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // 검색어 변경 시 첫 페이지로 리셋
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  // 프로젝트 목록 로드
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        
        const params: {
          page: number;
          limit: number;
          search?: string;
        } = {
          page: currentPage,
          limit,
        };
        
        // 현재 API는 search 파라미터만 지원
        if (debouncedSearchQuery.trim()) params.search = debouncedSearchQuery.trim();
        
        // TODO: 백엔드에서 필터 파라미터 지원 시 활성화
        // if (selectedModality !== 'all') params.modality = selectedModality;
        // if (selectedTheme !== 'all') params.theme = selectedTheme;
        // if (selectedCountry !== 'all') params.countries = selectedCountry;
        // if (selectedProjectSize !== 'all') params.projectSize = selectedProjectSize;
        
        const response = await projectsApi.getProjects(params);
        
        // 클라이언트 측 필터링 적용
        let filteredItems = response.data.items;
        
        if (selectedModality !== 'all') {
          filteredItems = filteredItems.filter(p => p.modality === selectedModality);
        }
        if (selectedTheme !== 'all') {
          filteredItems = filteredItems.filter(p => p.theme === selectedTheme);
        }
        if (selectedCountry !== 'all') {
          filteredItems = filteredItems.filter(p => {
            const projectCountries = p.countries ? p.countries.split(',').map(c => c.trim()) : [];
            return projectCountries.includes(selectedCountry);
          });
        }
        if (selectedProjectSize !== 'all') {
          filteredItems = filteredItems.filter(p => p.project_size === selectedProjectSize);
        }
        if (selectedEssCategory !== 'all') {
          filteredItems = filteredItems.filter(p => {
            const projectEssCategory = (p as Project & { ess_category?: string | null }).ess_category;
            return projectEssCategory === selectedEssCategory;
          });
        }
        
        setProjects(filteredItems);
        setTotalPages(response.data.pagination.total_pages);
        setTotalProjects(response.data.pagination.total_items);
      } catch (err) {
        setError(err instanceof Error ? err.message : '프로젝트를 불러오는데 실패했습니다');
      } finally {
        setLoading(false);
      }
    }
    
    loadProjects();
  }, [currentPage, debouncedSearchQuery, selectedModality, selectedTheme, selectedCountry, selectedProjectSize, selectedEssCategory]); // 디바운싱된 검색어 사용

  function handleResetFilters() {
    setSelectedModality('all');
    setSelectedTheme('all');
    setSelectedCountry('all');
    setSelectedProjectSize('all');
    setSelectedEssCategory('all');
    setSearchQuery('');
    setCurrentPage(1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-sky-50 border-b border-gray-200/50">
        <div className="container-custom py-12 sm:py-16">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">
              <Filter className="w-3 h-3 mr-1" />
              전체 프로젝트
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 tracking-tight">프로젝트 탐색</h1>
            <p className="text-lg sm:text-xl text-gray-600">
              {formatCompactNumber(totalProjects)}개의 기후 프로젝트를 검색하고 분석하세요
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">필터</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-sm text-emerald-600 hover:text-emerald-700 h-auto p-0"
                >
                  초기화
                </Button>
              </div>

              {/* Note: 필터 기능은 현재 백엔드에서 지원하지 않음 */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>알림:</strong> 필터는 클라이언트 측에서 적용됩니다. 
                  검색과 함께 사용할 수 있습니다.
                </p>
              </div>

              {/* Modality Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  모달리티
                </label>
                <select
                  value={selectedModality}
                  onChange={(e) => {
                    setSelectedModality(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="input py-2.5"
                >
                  <option value="all">전체</option>
                  {filters?.modalities.map((modality) => (
                    <option key={modality} value={modality}>
                      {modality}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  테마
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => {
                    setSelectedTheme(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="input py-2.5"
                >
                  <option value="all">전체</option>
                  {filters?.themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme === 'Adaptation' ? '적응' : theme === 'Mitigation' ? '완화' : '통합'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  국가
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="input py-2.5"
                >
                  <option value="all">전체</option>
                  {filters?.countries.slice(0, 50).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  프로젝트 규모
                </label>
                <select
                  value={selectedProjectSize}
                  onChange={(e) => {
                    setSelectedProjectSize(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="input py-2.5"
                >
                  <option value="all">전체</option>
                  {filters?.project_sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* ESS Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  ESS 카테고리
                </label>
                <select
                  value={selectedEssCategory}
                  onChange={(e) => {
                    setSelectedEssCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="input py-2.5"
                >
                  <option value="all">전체</option>
                  {filters?.ess_categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Stats */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  {debouncedSearchQuery.trim() ? '필터링된 결과' : '전체 결과'}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCompactNumber(totalProjects)}
                </p>
                <p className="text-sm text-gray-600">
                  프로젝트
                  {debouncedSearchQuery.trim() && (
                    <span className="block mt-1 text-xs text-emerald-600 font-medium">
                      검색어: "{debouncedSearchQuery}"
                    </span>
                  )}
                </p>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Actions */}
            <Card className="p-5 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="프로젝트 이름, ID로 검색..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    className="pl-11"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  필터
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  내보내기
                </Button>
              </div>
            </Card>

            {/* Results */}
            {loading ? (
              <Card className="p-16">
                <Loading />
              </Card>
            ) : error ? (
              <Card className="p-16 text-center">
                <div className="max-w-sm mx-auto">
                  <p className="text-red-600 mb-2">에러 발생</p>
                  <p className="text-gray-500">{error}</p>
                </div>
              </Card>
            ) : projects.length === 0 ? (
              <Card className="p-16 text-center">
                <div className="max-w-sm mx-auto">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
                  <p className="text-gray-500">
                    다른 검색어나 필터를 시도해보세요
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Link
                    key={project.ref}
                    to={`/projects/${project.ref}`}
                    className="group block"
                  >
                    <Card className="p-6 hover:shadow-xl hover:border-emerald-500 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="primary" className="font-semibold">
                              {project.modality}
                            </Badge>
                            {project.theme && (
                              <Badge variant="outline" className="font-medium">
                                {project.theme}
                              </Badge>
                            )}
                            {project.project_size && (
                              <Badge variant="default">
                                {project.project_size}
                              </Badge>
                            )}
                            <Badge variant="secondary" className="font-medium">
                              {project.status}
                            </Badge>
                          </div>

                          {/* Project Info */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {project.project_name}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
                            <span className="font-mono font-medium">ID: {project.ref}</span>
                            <span>• {project.entity}</span>
                            {project.approval_date && (
                              <span>• {formatDate(new Date(project.approval_date))}</span>
                            )}
                          </div>

                          {/* Key Metrics */}
                          <div className="flex flex-wrap gap-6 mt-4">
                            {project.total_gcf_funding && project.total_gcf_funding > 0 && (
                              <div>
                                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">GCF 금융</p>
                                <p className="text-base font-bold text-gray-900">
                                  {formatCurrency(project.total_gcf_funding)}
                                </p>
                              </div>
                            )}
                            {project.countries && (
                              <div>
                                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">국가</p>
                                <p className="text-base font-bold text-gray-900">
                                  {project.countries}
                                </p>
                              </div>
                            )}
                            {project.bm && (
                              <div>
                                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Board Meeting</p>
                                <p className="text-base font-bold text-gray-900">
                                  {project.bm}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action */}
                        <div className="flex sm:flex-col items-center gap-2 sm:ml-4">
                          <div className="p-2 rounded-lg text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && projects.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                <p className="text-sm font-medium text-gray-600">
                  페이지 {currentPage} / {totalPages} (총 {formatCompactNumber(totalProjects)}개)
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    이전
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="min-w-[40px]"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    다음
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

