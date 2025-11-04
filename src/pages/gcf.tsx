import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe2,
  TrendingUp,
  Building2,
  Users,
  Search,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '../components/common/stat-card';
import {
  formatCurrency,
  formatDate,
  formatTheme,
  formatCompactNumber,
} from '../utils/format';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useProjects } from '../hooks/useProjects';
import { createProjectFilter, paginate } from '../utils/projectFilters';
import { Loading } from '../components/common/loading';

export function GCFPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedEssCategory, setSelectedEssCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  // 전체 프로젝트 로드
  const { allProjects, filters, loading, error } = useProjects();

  // 검색어 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // GCF 프로젝트만 필터링 (전체 프로젝트에서) - PAP만
  const gcfProjects = useMemo(() => {
    return allProjects.filter(p => p.modality === 'PAP');
  }, [allProjects]);

  // 통계 계산
  const stats = useMemo(() => {
    return {
      totalProjects: gcfProjects.length,
      totalFunding: gcfProjects.reduce((sum, p) => sum + (p.total_gcf_funding || 0), 0),
      countries: new Set(gcfProjects.map(p => p.countries).filter(Boolean)).size,
      beneficiaries: 0,
    };
  }, [gcfProjects]);

  // 필터링된 프로젝트 (전체 GCF 프로젝트에서 필터링)
  const filteredProjects = useMemo(() => {
    const filterFn = createProjectFilter({
      searchQuery: debouncedSearchQuery,
      selectedTheme,
      selectedProjectSize: selectedSize,
      selectedModality: 'all', // PAP로 이미 필터링되어 있으므로 all
      selectedCountry,
      selectedEssCategory,
    });
    return gcfProjects.filter(filterFn);
  }, [gcfProjects, debouncedSearchQuery, selectedTheme, selectedSize, selectedCountry, selectedEssCategory]);

  // 페이지네이션 계산
  const pagination = useMemo(() => {
    return paginate(filteredProjects, currentPage, limit);
  }, [filteredProjects, currentPage, limit]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container-custom relative z-10 py-16 sm:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Green Climate Fund</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Globe2 className="w-9 h-9" strokeWidth={2} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                GCF 프로젝트
              </h1>
            </div>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl leading-relaxed">
              세계 최대 규모의 기후 금융 메커니즘인 GCF의 프로젝트 포트폴리오를 탐색하세요
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Stats Section */}
      <section className="section -mt-16">
        <div className="container-custom">
          <div className="mb-12">
            <Badge variant="primary" className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              실시간 데이터
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">GCF Impact Snapshot</h2>
          </div>
          
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <StatCard
                title="총 프로젝트"
                value={stats.totalProjects}
                icon={Building2}
                colorClass="text-emerald-600"
              />
              <StatCard
                title="총 GCF 금융"
                value={stats.totalFunding}
                suffix="USD"
                icon={TrendingUp}
                colorClass="text-blue-600"
              />
              <StatCard
                title="참여 국가"
                value={stats.countries}
                icon={Globe2}
                colorClass="text-violet-600"
              />
              <StatCard
                title="전체 프로젝트"
                value={formatCompactNumber(allProjects.length)}
                icon={Users}
                colorClass="text-amber-600"
              />
            </div>
          )}
        </div>
      </section>

      {/* Filters and List */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">필터</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedTheme('all');
                      setSelectedSize('all');
                      setSelectedCountry('all');
                      setSelectedEssCategory('all');
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 h-auto p-0"
                  >
                    초기화
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      프로젝트 규모
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => {
                        setSelectedSize(e.target.value);
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

                  <div>
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

                  <div>
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

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                      필터링된 결과
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {loading ? '...' : pagination.totalItems}
                    </p>
                    <p className="text-sm text-gray-600">
                      프로젝트
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Project List */}
            <div className="lg:col-span-3">
              {/* Search */}
              <Card className="p-5 mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="프로젝트 이름, ID로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11"
                  />
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
              ) : pagination.totalItems === 0 ? (
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
                  {pagination.items.map((project) => (
                    <Link
                      key={project.ref}
                      to={`/projects/${project.ref}`}
                      className="group block"
                    >
                      <Card className="p-6 hover:shadow-xl hover:border-emerald-500 transition-all duration-300">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="primary" className="font-semibold">
                            GCF
                          </Badge>
                          {project.theme && (
                            <Badge variant="outline" className="font-medium">
                              {formatTheme(project.theme)}
                            </Badge>
                          )}
                          {project.project_size && (
                            <Badge variant="default">
                              {project.project_size}
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                          {project.project_name}
                        </h3>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-6">
                          <span className="font-mono font-medium">ID: {project.ref}</span>
                          {project.countries && <span>• {project.countries}</span>}
                          {project.approval_date && (
                            <span>• {formatDate(new Date(project.approval_date))}</span>
                          )}
                          {project.bm && <span>• Board: {project.bm}</span>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {project.total_gcf_funding && project.total_gcf_funding > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">GCF 금융</p>
                              <p className="text-base font-bold text-gray-900">
                                {formatCurrency(project.total_gcf_funding)}
                              </p>
                            </div>
                          )}
                          {project.total_project_value && project.total_project_value > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">총 프로젝트 가치</p>
                              <p className="text-base font-bold text-gray-900">
                                {formatCurrency(project.total_project_value)}
                              </p>
                            </div>
                          )}
                          {project.total_gcf_funding && project.total_project_value && 
                           project.total_gcf_funding > 0 && project.total_project_value > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">공공 비율</p>
                              <p className="text-base font-bold text-emerald-600">
                                {Math.round(
                                  (project.total_gcf_funding / project.total_project_value) * 100
                                )}
                                %
                              </p>
                            </div>
                          )}
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && pagination.totalItems > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                  <p className="text-sm font-medium text-gray-600">
                    페이지 {pagination.currentPage} / {pagination.totalPages} (총 {formatCompactNumber(pagination.totalItems)}개)
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      disabled={!pagination.hasPrev}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    >
                      이전
                    </Button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                        let pageNum: number;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = pagination.currentPage - 2 + i;
                        }
                        return (
                          <Button
                            key={pageNum}
                            variant={pagination.currentPage === pageNum ? "default" : "outline"}
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
                      disabled={!pagination.hasNext}
                      onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                    >
                      다음
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
