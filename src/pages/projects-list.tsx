import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Download, Eye } from 'lucide-react';
import { formatCurrency, formatCompactNumber, formatDate, getSourceBadgeClass, getThemeBadgeClass, formatTheme } from '../utils/format';
import type { Project } from '../types/project';

// TODO: 실제 API 연동
const mockProjects: Project[] = [
  {
    id: 'FP043',
    source: 'GCF',
    name: 'The Saïss Water Conservation Project',
    developer: 'EBRD',
    theme: 'Adaptation',
    primaryDate: new Date('2020-03-15'),
    dateType: 'Approval',
    gcf: {
      status: 'Approved',
      modality: 'PAP',
      countries: ['Morocco'],
      boardMeeting: 'B.16',
      projectSize: 'Medium',
      essCategory: 'Category B',
      faFinancing: 36959537.57,
      totalGcfFunding: 36959537.57,
      totalProjectValue: 50000000,
    },
  },
  {
    id: 'VCS902',
    source: 'CarbonPlan',
    name: 'KARIBA REDD+ PROJECT',
    developer: 'Carbon Green Investments',
    theme: null,
    primaryDate: new Date('2013-12-23'),
    dateType: 'Listing',
    carbon: {
      protocol: ['vm0009'],
      registry: 'verra',
      creditQuantity: 600000,
      firstTransactionDate: new Date('2013-12-23'),
      lastTransactionDate: new Date('2025-10-23'),
      vintageRange: '2011-2019',
    },
  },
];

export function ProjectsListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = mockProjects.filter((project) => {
    // 검색 필터
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // 소스 필터
    if (selectedSource !== 'all' && project.source !== selectedSource) {
      return false;
    }
    
    // 테마 필터
    if (selectedTheme !== 'all' && project.theme !== selectedTheme) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <h1 className="heading-2 mb-2">프로젝트 탐색</h1>
          <p className="text-gray-600">
            {formatCompactNumber(488084)}개의 기후 프로젝트를 검색하고 분석하세요
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">필터</h2>
                <button
                  onClick={() => {
                    setSelectedSource('all');
                    setSelectedTheme('all');
                    setSearchQuery('');
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  초기화
                </button>
              </div>

              {/* Source Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  데이터 소스
                </label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="input py-2"
                >
                  <option value="all">전체</option>
                  <option value="GCF">GCF</option>
                  <option value="CarbonPlan">CarbonPlan</option>
                </select>
              </div>

              {/* Theme Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  테마
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="input py-2"
                >
                  <option value="all">전체</option>
                  <option value="Adaptation">적응</option>
                  <option value="Mitigation">완화</option>
                  <option value="Cross-cutting">통합</option>
                </select>
              </div>

              {/* Quick Stats */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  필터링된 결과
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCompactNumber(filteredProjects.length)}
                </p>
                <p className="text-xs text-gray-500">
                  프로젝트
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Actions */}
            <div className="card p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="프로젝트 이름, ID로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 py-2"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-secondary px-4 py-2 text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  필터
                </button>
                <button className="btn-ghost px-4 py-2 text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  내보내기
                </button>
              </div>
            </div>

            {/* Results */}
            {filteredProjects.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-gray-500">검색 결과가 없습니다</p>
                <p className="text-sm text-gray-400 mt-2">
                  다른 검색어나 필터를 시도해보세요
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="card card-hover p-6 block"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`badge ${getSourceBadgeClass(project.source)}`}>
                            {project.source}
                          </span>
                          {project.theme && (
                            <span className={`badge ${getThemeBadgeClass(project.theme)}`}>
                              {formatTheme(project.theme)}
                            </span>
                          )}
                          {project.gcf && (
                            <span className="badge bg-gray-100 text-gray-700">
                              {project.gcf.projectSize}
                            </span>
                          )}
                        </div>

                        {/* Project Info */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors truncate">
                          {project.name}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                          <span>ID: {project.id}</span>
                          {project.developer && (
                            <span>• {project.developer}</span>
                          )}
                          {project.primaryDate && (
                            <span>• {formatDate(project.primaryDate)}</span>
                          )}
                        </div>

                        {/* Key Metrics */}
                        <div className="flex flex-wrap gap-4 mt-4">
                          {project.gcf && (
                            <>
                              {project.gcf.totalGcfFunding > 0 && (
                                <div>
                                  <p className="text-xs text-gray-500">GCF 금융</p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {formatCurrency(project.gcf.totalGcfFunding)}
                                  </p>
                                </div>
                              )}
                              {project.gcf.countries.length > 0 && (
                                <div>
                                  <p className="text-xs text-gray-500">국가</p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {project.gcf.countries.join(', ')}
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                          {project.carbon && (
                            <>
                              <div>
                                <p className="text-xs text-gray-500">크레딧</p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {formatCompactNumber(project.carbon.creditQuantity)} tCO2e
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">레지스트리</p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {project.carbon.registry.toUpperCase()}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex sm:flex-col items-center gap-2 sm:ml-4">
                        <button className="btn-ghost p-2 text-primary-600">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProjects.length > 0 && (
              <div className="flex items-center justify-between mt-6 px-2">
                <p className="text-sm text-gray-600">
                  1-{filteredProjects.length} / {formatCompactNumber(488084)}개 표시
                </p>
                <div className="flex gap-2">
                  <button className="btn-secondary px-4 py-2 text-sm" disabled>
                    이전
                  </button>
                  <button className="btn-primary px-4 py-2 text-sm">
                    다음
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

