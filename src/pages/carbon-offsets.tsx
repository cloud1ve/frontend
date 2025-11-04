import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  TrendingUp,
  Database,
  Activity,
  Search,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '../components/common/stat-card';
import {
  formatCompactNumber,
  formatDate,
} from '../utils/format';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useProjects } from '../hooks/useProjects';
import { paginate } from '../utils/projectFilters';
import { Loading } from '../components/common/loading';

export function CarbonOffsetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedRegistry, setSelectedRegistry] = useState<string>('all');
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

  // CarbonPlan 프로젝트만 필터링 (SAP만)
  const carbonProjects = useMemo(() => {
    return allProjects.filter(p => p.modality === 'SAP');
  }, [allProjects]);

  // 통계 계산
  const stats = useMemo(() => {
    return {
      totalProjects: carbonProjects.length,
      totalCredits: carbonProjects.reduce((sum, p) => sum + ((p as any).credit_quantity || 0), 0),
      registries: new Set(carbonProjects.map(p => (p as any).carbon_registry).filter(Boolean)).size,
      protocols: new Set(carbonProjects.map(p => (p as any).carbon_protocol).filter(Boolean)).size,
    };
  }, [carbonProjects]);

  // 레지스트리별 통계
  const registries = useMemo(() => {
    return Array.from(
      new Set(carbonProjects.map(p => (p as any).carbon_registry).filter(Boolean))
    ).map(registry => ({
      id: registry as string,
      name: registry as string,
      count: carbonProjects.filter(p => (p as any).carbon_registry === registry).length,
    }));
  }, [carbonProjects]);

  // 필터링된 프로젝트 (전체 탄소 상쇄 프로젝트에서 필터링) - SAP만
  const filteredProjects = useMemo(() => {
    // 검색어만 필터링하고 나머지는 SAP 프로젝트는 모두 표시
    let filtered = carbonProjects;
    
    // 검색어 필터링
    if (debouncedSearchQuery) {
      filtered = filtered.filter(p => 
        p.project_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        p.ref.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }
    
    // 레지스트리 필터링 (carbon_registry가 있는 경우만)
    if (selectedRegistry !== 'all') {
      filtered = filtered.filter(p => {
        const registry = (p as any).carbon_registry;
        return registry === selectedRegistry;
      });
    }
    
    // 테마 필터링
    if (selectedTheme !== 'all') {
      filtered = filtered.filter(p => p.theme === selectedTheme);
    }
    
    // 프로젝트 규모 필터링
    if (selectedSize !== 'all') {
      filtered = filtered.filter(p => {
        const extendedProject = p as typeof p & { projectsize?: string | null };
        const projectSize = p.project_size || extendedProject.projectsize;
        return projectSize === selectedSize;
      });
    }

    // 국가 필터링
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(p => {
        const projectCountries = p.countries ? p.countries.split(',').map(c => c.trim()) : [];
        return projectCountries.includes(selectedCountry);
      });
    }

    // ESS 카테고리 필터링
    if (selectedEssCategory !== 'all') {
      filtered = filtered.filter(p => {
        const extendedProject = p as typeof p & { ess_category?: string | null; esscategory?: string | null };
        const essCategory = extendedProject.ess_category || extendedProject.esscategory;
        return essCategory === selectedEssCategory;
      });
    }
    
    console.log('filteredProjects:', filtered.length, filtered.slice(0, 5));
    return filtered;
  }, [carbonProjects, debouncedSearchQuery, selectedTheme, selectedSize, selectedCountry, selectedEssCategory, selectedRegistry]);

  // 페이지네이션 계산
  const pagination = useMemo(() => {
    return paginate(filteredProjects, currentPage, limit);
  }, [filteredProjects, currentPage, limit]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container-custom relative z-10 py-16 sm:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">CarbonPlan Data</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Leaf className="w-9 h-9" strokeWidth={2} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                탄소 상쇄 프로젝트
              </h1>
            </div>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mb-4 leading-relaxed">
              전 세계 탄소 레지스트리의 크레딧 발급 데이터를 통합 제공합니다
            </p>
            <p className="text-base text-white/70 max-w-2xl">
              Verra, Gold Standard, ACR, CAR, ART 등 주요 탄소 레지스트리의 프로젝트와 
              크레딧 트랜잭션 정보를 한곳에서 확인하세요.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Stats Section */}
      <section className="section -mt-16">
        <div className="container-custom">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              Carbon Credits Overview
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">실시간 탄소 크레딧 현황</h2>
          </div>
          
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <StatCard
                title="총 프로젝트"
                value={stats.totalProjects}
                icon={Database}
                colorClass="text-sky-600"
              />
              <StatCard
                title="총 발급 크레딧"
                value={stats.totalCredits}
                suffix="tCO2e"
                icon={TrendingUp}
                colorClass="text-emerald-600"
              />
              <StatCard
                title="레지스트리"
                value={stats.registries}
                icon={Activity}
                colorClass="text-violet-600"
              />
              <StatCard
                title="프로토콜"
                value={stats.protocols}
                icon={Leaf}
                colorClass="text-cyan-600"
              />
            </div>
          )}
        </div>
      </section>

      {/* Registries Overview */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            레지스트리별 분포
          </h2>
          {loading ? (
            <Loading />
          ) : registries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              {registries.map((registry) => (
                <Card
                  key={registry.id}
                  className="p-6 hover:shadow-xl hover:border-sky-500 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedRegistry(registry.id)}
                >
                  <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    {registry.name}
                  </h3>
                  <p className="text-3xl font-bold text-sky-600 mb-2">
                    {formatCompactNumber(registry.count)}
                  </p>
                  <p className="text-xs font-medium text-gray-500">프로젝트</p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">레지스트리 데이터가 없습니다</p>
            </Card>
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
                      setSelectedRegistry('all');
                      setSelectedTheme('all');
                      setSelectedSize('all');
                      setSelectedCountry('all');
                      setSelectedEssCategory('all');
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="text-sm text-sky-600 hover:text-sky-700 h-auto p-0"
                  >
                    초기화
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      레지스트리
                    </label>
                    <select
                      value={selectedRegistry}
                      onChange={(e) => {
                        setSelectedRegistry(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="input py-2.5"
                    >
                      <option value="all">전체</option>
                      {registries.map((registry) => (
                        <option key={registry.id} value={registry.id}>
                          {registry.name}
                        </option>
                      ))}
                    </select>
                  </div>

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
                  {pagination.items.map((project) => {
                    const carbonRegistry = (project as any).carbon_registry || '';
                    const carbonProtocol = (project as any).carbon_protocol || '';
                    const creditQuantity = (project as any).credit_quantity || 0;
                    const listingDate = project.approval_date || (project as any).primary_date;
                    const vintageRange = (project as any).cc_vintage_range || '';
                    const firstTransaction = (project as any).cc_first_transaction_date;
                    const lastTransaction = (project as any).cc_last_transaction_date;
                    
                    return (
                      <Link
                        key={project.ref}
                        to={`/projects/${project.ref}`}
                        className="group block"
                      >
                        <Card className="p-6 hover:shadow-xl hover:border-sky-500 transition-all duration-300">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="secondary" className="font-semibold">
                              CarbonPlan
                            </Badge>
                            {carbonRegistry && (
                              <Badge variant="outline" className="uppercase font-medium">
                                {carbonRegistry}
                              </Badge>
                            )}
                            {carbonProtocol && (
                              <Badge variant="default">
                                {carbonProtocol}
                              </Badge>
                            )}
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                            {project.project_name}
                          </h3>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-6">
                            <span className="font-mono font-medium">ID: {project.ref}</span>
                            {vintageRange && <span>• Vintage: {vintageRange}</span>}
                            {listingDate && (
                              <span>• {formatDate(new Date(listingDate))}</span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {creditQuantity > 0 && (
                              <div>
                                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">발급 크레딧</p>
                                <p className="text-base font-bold text-gray-900">
                                  {formatCompactNumber(creditQuantity)} tCO2e
                                </p>
                              </div>
                            )}
                            {firstTransaction && (
                              <div>
                                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">첫 거래</p>
                                <p className="text-base font-bold text-gray-900">
                                  {formatDate(new Date(firstTransaction))}
                                </p>
                              </div>
                            )}
                            {lastTransaction && (
                              <div>
                                <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">마지막 거래</p>
                                <p className="text-base font-bold text-sky-600">
                                  {formatDate(new Date(lastTransaction))}
                                </p>
                              </div>
                            )}
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
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
