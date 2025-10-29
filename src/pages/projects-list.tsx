import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Download, Eye, Filter } from 'lucide-react';
import { formatCurrency, formatCompactNumber, formatDate, formatTheme } from '../utils/format';
import type { Project } from '../types/project';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

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
              {formatCompactNumber(488084)}개의 기후 프로젝트를 검색하고 분석하세요
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
                  onClick={() => {
                    setSelectedSource('all');
                    setSelectedTheme('all');
                    setSearchQuery('');
                  }}
                  className="text-sm text-emerald-600 hover:text-emerald-700 h-auto p-0"
                >
                  초기화
                </Button>
              </div>

              {/* Source Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  데이터 소스
                </label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="input py-2.5"
                >
                  <option value="all">전체</option>
                  <option value="GCF">GCF</option>
                  <option value="CarbonPlan">CarbonPlan</option>
                </select>
              </div>

              {/* Theme Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  테마
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="input py-2.5"
                >
                  <option value="all">전체</option>
                  <option value="Adaptation">적응</option>
                  <option value="Mitigation">완화</option>
                  <option value="Cross-cutting">통합</option>
                </select>
              </div>

              {/* Quick Stats */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  필터링된 결과
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCompactNumber(filteredProjects.length)}
                </p>
                <p className="text-sm text-gray-600">
                  프로젝트
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
                    onChange={(e) => setSearchQuery(e.target.value)}
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
            {filteredProjects.length === 0 ? (
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
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="group block"
                  >
                    <Card className="p-6 hover:shadow-xl hover:border-emerald-500 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge 
                              variant={project.source === 'GCF' ? 'primary' : 'secondary'}
                              className="font-semibold"
                            >
                              {project.source}
                            </Badge>
                            {project.theme && (
                              <Badge variant="outline" className="font-medium">
                                {formatTheme(project.theme)}
                              </Badge>
                            )}
                            {project.gcf && (
                              <Badge variant="default">
                                {project.gcf.projectSize}
                              </Badge>
                            )}
                          </div>

                          {/* Project Info */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {project.name}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
                            <span className="font-mono font-medium">ID: {project.id}</span>
                            {project.developer && (
                              <span>• {project.developer}</span>
                            )}
                            {project.primaryDate && (
                              <span>• {formatDate(project.primaryDate)}</span>
                            )}
                          </div>

                          {/* Key Metrics */}
                          <div className="flex flex-wrap gap-6 mt-4">
                            {project.gcf && (
                              <>
                                {project.gcf.totalGcfFunding > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">GCF 금융</p>
                                    <p className="text-base font-bold text-gray-900">
                                      {formatCurrency(project.gcf.totalGcfFunding)}
                                    </p>
                                  </div>
                                )}
                                {project.gcf.countries.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">국가</p>
                                    <p className="text-base font-bold text-gray-900">
                                      {project.gcf.countries.join(', ')}
                                    </p>
                                  </div>
                                )}
                              </>
                            )}
                            {project.carbon && (
                              <>
                                <div>
                                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">크레딧</p>
                                  <p className="text-base font-bold text-gray-900">
                                    {formatCompactNumber(project.carbon.creditQuantity)} tCO2e
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">레지스트리</p>
                                  <p className="text-base font-bold text-gray-900">
                                    {project.carbon.registry.toUpperCase()}
                                  </p>
                                </div>
                              </>
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
            {filteredProjects.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                <p className="text-sm font-medium text-gray-600">
                  1-{filteredProjects.length} / {formatCompactNumber(488084)}개 표시
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" disabled>
                    이전
                  </Button>
                  <Button>
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

