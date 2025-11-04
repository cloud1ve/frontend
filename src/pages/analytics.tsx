import { useEffect, useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  Globe2,
  Calendar,
  Award,
  Filter,
  X,
} from 'lucide-react';
import { StatCard } from '../components/common/stat-card';
import { formatCompactNumber, formatCurrency } from '../utils/format';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { projectsApi } from '../services/api';
import type { GetStatisticsResponse } from '../types/api';
import type { Project } from '../types/project';
import type { FiltersData } from '../types/api';
import { Loading } from '../components/common/loading';

export function AnalyticsPage() {
  const [statistics, setStatistics] = useState<GetStatisticsResponse | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<FiltersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // 필터 상태
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedRegistry, setSelectedRegistry] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [selectedProjectSize, setSelectedProjectSize] = useState<string>('all');
  const [selectedEssCategory, setSelectedEssCategory] = useState<string>('all');
  const [startYear, setStartYear] = useState<string>('');
  const [endYear, setEndYear] = useState<string>('');

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

  // 프로젝트 데이터 로드 (필터링을 위해 전체 프로젝트 필요)
  useEffect(() => {
    async function loadProjects() {
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
        
        // 초기 통계 계산
        const stats = calculateStatistics(allProjectsData);
        setStatistics(stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다');
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadProjects();
  }, []);

  // 통계 계산 함수
  function calculateStatistics(projects: Project[]): GetStatisticsResponse {
    // GCF 프로젝트 필터링
    const gcfProjects = projects.filter((p) => 
      p.modality && (p.total_gcf_funding !== null || p.bm !== null || p.theme !== null)
    );

    // Carbon 프로젝트 필터링
    const carbonProjects = projects.filter((p) => {
      const project = p as Project & {
        carbon_registry?: string | null;
        carbon_protocol?: string | null;
        credit_quantity?: number | null;
      };
      return project.carbon_registry !== null ||
        project.carbon_protocol !== null ||
        project.credit_quantity !== null;
    });

    // 통계 계산
    const totalFinancing = projects.reduce((sum, p) => sum + (p.total_gcf_funding || 0), 0);
    const totalCredits = projects.reduce((sum, p) => {
      const project = p as Project & { credit_quantity?: number | null };
      return sum + (project.credit_quantity || 0);
    }, 0);

    // 테마별 통계
    const themeMap = new Map<string, { count: number; value: number }>();
    projects.forEach((p) => {
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
    projects.forEach((p) => {
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
    projects.forEach((p) => {
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
    projects.forEach((p) => {
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
        projects: projects.length,
        gcfProjects: gcfProjects.length,
        carbonProjects: carbonProjects.length,
        totalCredits,
        totalFinancing,
      },
      byTheme,
      byRegistry,
      byCountry,
      byYear,
      timeline: [],
    };
  }

  // 필터링된 프로젝트 계산
  const filteredProjects = allProjects.filter((project) => {
    if (selectedTheme !== 'all' && project.theme !== selectedTheme) {
      return false;
    }
    if (selectedCountry !== 'all') {
      // 국가 필드가 쉼표로 구분된 문자열일 수 있으므로 포함 여부 확인
      const projectCountries = project.countries ? project.countries.split(',').map(c => c.trim()) : [];
      if (!projectCountries.includes(selectedCountry)) {
        return false;
      }
    }
    if (selectedRegistry !== 'all') {
      const projectData = project as Project & { carbon_registry?: string | null };
      const projectRegistry = projectData.carbon_registry;
      if (projectRegistry !== selectedRegistry) {
        return false;
      }
    }
    if (selectedModality !== 'all' && project.modality !== selectedModality) {
      return false;
    }
    if (selectedProjectSize !== 'all') {
      const projectData = project as Project & { 
        project_size?: string | null;
        projectsize?: string | null;
      };
      // API 응답은 소문자 projectsize를 사용하므로 우선순위 변경
      const projectSize = projectData.projectsize || projectData.project_size;
      // 값이 없거나 정확히 일치하지 않으면 필터링
      if (!projectSize || projectSize.trim() !== selectedProjectSize.trim()) {
        return false;
      }
    }
    if (selectedEssCategory !== 'all') {
      const projectData = project as Project & { 
        ess_category?: string | null;
        esscategory?: string | null;
      };
      // API 응답은 소문자 esscategory를 사용하므로 우선순위 변경
      const essCategory = projectData.esscategory || projectData.ess_category;
      // 값이 없거나 정확히 일치하지 않으면 필터링
      if (!essCategory || essCategory.trim() !== selectedEssCategory.trim()) {
        return false;
      }
    }
    if (startYear || endYear) {
      const projectData = project as Project & { 
        approval_date?: string | null;
        approvaldate?: string | null;
      };
      const approvalDate = projectData.approval_date || projectData.approvaldate;
      if (approvalDate) {
        const year = new Date(approvalDate).getFullYear().toString();
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
  });

  // 필터 적용 시 통계 재계산
  useEffect(() => {
    if (allProjects.length > 0) {
      const filteredStats = calculateStatistics(filteredProjects);
      setStatistics(filteredStats);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme, selectedCountry, selectedRegistry, selectedModality, selectedProjectSize, selectedEssCategory, startYear, endYear, allProjects.length]);

  function handleResetFilters() {
    setSelectedTheme('all');
    setSelectedCountry('all');
    setSelectedRegistry('all');
    setSelectedModality('all');
    setSelectedProjectSize('all');
    setSelectedEssCategory('all');
    setStartYear('');
    setEndYear('');
  }

  // 테마별 통계 계산 (백분율 포함)
  const byThemeWithPercentage = statistics?.byTheme.map((theme) => {
    const total = statistics.byTheme.reduce((sum, t) => sum + t.count, 0);
    const percentage = total > 0 ? (theme.count / total) * 100 : 0;
    return {
      ...theme,
      percentage: Math.round(percentage * 10) / 10,
      color: theme.theme === 'Mitigation' 
        ? 'from-amber-500 to-orange-600'
        : theme.theme === 'Adaptation'
        ? 'from-blue-500 to-sky-600'
        : 'from-violet-500 to-purple-600',
    };
  }) || [];

  // 국가별 상위 5개국
  const topCountries = statistics?.byCountry
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((country) => {
      const flags: Record<string, string> = {
        'India': '🇮🇳',
        'Brazil': '🇧🇷',
        'China': '🇨🇳',
        'Indonesia': '🇮🇩',
        'Kenya': '🇰🇪',
      };
      return {
        name: country.country,
        projects: country.count,
        financing: country.value,
        flag: flags[country.country] || '🌍',
      };
    }) || [];
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container-custom relative z-10 py-16 sm:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">Analytics & Insights</span>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <BarChart3 className="w-9 h-9" strokeWidth={2} />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  통계 및 분석
                </h1>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                필터
              </Button>
            </div>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl leading-relaxed">
              기후 프로젝트 데이터의 트렌드와 인사이트를 시각화하여 제공합니다
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Filters */}
      {showFilters && (
        <section className="section bg-white border-b border-gray-200">
          <div className="container-custom">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">필터</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-sm text-violet-600 hover:text-violet-700"
                  >
                    초기화
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    테마
                  </label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="input py-2.5 w-full"
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
                    모달리티
                  </label>
                  <select
                    value={selectedModality}
                    onChange={(e) => setSelectedModality(e.target.value)}
                    className="input py-2.5 w-full"
                  >
                    <option value="all">전체</option>
                    {filters?.modalities.map((modality) => (
                      <option key={modality} value={modality}>
                        {modality}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    프로젝트 규모
                  </label>
                  <select
                    value={selectedProjectSize}
                    onChange={(e) => setSelectedProjectSize(e.target.value)}
                    className="input py-2.5 w-full"
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
                    ESS 카테고리
                  </label>
                  <select
                    value={selectedEssCategory}
                    onChange={(e) => setSelectedEssCategory(e.target.value)}
                    className="input py-2.5 w-full"
                  >
                    <option value="all">전체</option>
                    {filters?.ess_categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
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
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="input py-2.5 w-full"
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
                    레지스트리
                  </label>
                  <select
                    value={selectedRegistry}
                    onChange={(e) => setSelectedRegistry(e.target.value)}
                    className="input py-2.5 w-full"
                  >
                    <option value="all">전체</option>
                    {statistics?.byRegistry.map((registry) => (
                      <option key={registry.registry} value={registry.registry}>
                        {registry.registry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    시작 연도
                  </label>
                  <input
                    type="number"
                    placeholder="시작 연도"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    className="input py-2.5 w-full"
                    min="2000"
                    max="2030"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    종료 연도
                  </label>
                  <input
                    type="number"
                    placeholder="종료 연도"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    className="input py-2.5 w-full"
                    min="2000"
                    max="2030"
                  />
                </div>
              </div>

              {filteredProjects.length !== allProjects.length && (
                <div className="mt-6 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                  <p className="text-sm text-violet-800">
                    <strong>필터 적용됨:</strong> {formatCompactNumber(filteredProjects.length)}개의 프로젝트가 표시됩니다
                    (전체 {formatCompactNumber(allProjects.length)}개 중)
                  </p>
                </div>
              )}
            </Card>
          </div>
        </section>
      )}

      {/* Overview Stats */}
      <section className="section -mt-16">
        <div className="container-custom">
          <div className="mb-12">
            <Badge variant="primary" className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              Overview
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">전체 개요</h2>
          </div>
          
          {loading ? (
            <Loading />
          ) : error ? (
            <Card className="p-16 text-center">
              <p className="text-red-600 mb-2">에러 발생</p>
              <p className="text-gray-500">{error}</p>
            </Card>
          ) : statistics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <StatCard
                title="총 프로젝트"
                value={statistics.total.projects}
                icon={Activity}
                colorClass="text-violet-600"
              />
              <StatCard
                title="총 기후 금융"
                value={statistics.total.totalFinancing}
                suffix="USD"
                icon={TrendingUp}
                colorClass="text-emerald-600"
              />
              <StatCard
                title="총 발급 크레딧"
                value={statistics.total.totalCredits}
                suffix="tCO2e"
                icon={Activity}
                colorClass="text-sky-600"
              />
              <StatCard
                title="참여 국가"
                value={statistics.byCountry.length}
                icon={Globe2}
                colorClass="text-amber-600"
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Theme Analysis */}
      <section className="section">
        <div className="container-custom">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                <PieChart className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">테마별 분포</h2>
            </div>
            <p className="text-lg text-gray-600">
              기후 프로젝트의 주요 테마별 분류 현황
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart Placeholder */}
            <Card className="p-8">
              <div className="aspect-square bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl flex items-center justify-center border border-violet-200/50">
                <div className="text-center">
                  <PieChart className="w-20 h-20 text-violet-400 mx-auto mb-6" strokeWidth={1.5} />
                  <p className="text-lg font-semibold text-gray-700 mb-2">차트가 곧 표시됩니다</p>
                  <Badge variant="outline" className="mt-2">
                    Recharts 통합 예정
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="space-y-4">
              {byThemeWithPercentage.length > 0 ? (
                byThemeWithPercentage.map((theme) => (
                  <Card key={theme.theme} className="p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${theme.color}`}></div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {theme.theme}
                        </h3>
                      </div>
                      <Badge variant="secondary" className="font-bold">
                        {theme.percentage}%
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div
                        className={`bg-gradient-to-r ${theme.color} h-3 rounded-full transition-all duration-500 shadow-sm`}
                        style={{ width: `${theme.percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-gray-900">
                        {formatCompactNumber(theme.count)}
                      </p>
                      <p className="text-sm font-medium text-gray-500">프로젝트</p>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">테마별 데이터가 없습니다</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Registry Analysis */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">레지스트리별 통계</h2>
            </div>
            <p className="text-lg text-gray-600">
              주요 탄소 레지스트리별 프로젝트 및 크레딧 현황
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statistics?.byRegistry && statistics.byRegistry.length > 0 ? (
              statistics.byRegistry.map((registry) => {
                const colors: Record<string, string> = {
                  'Verra': 'emerald',
                  'Gold Standard': 'amber',
                  'ACR': 'sky',
                  'CAR': 'violet',
                  'ART': 'pink',
                };
                const color = colors[registry.registry] || 'gray';
                
                return (
                  <Card key={registry.registry} className="p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center`}>
                        <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {registry.registry}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">프로젝트</p>
                        <p className={`text-3xl font-bold text-${color}-600`}>
                          {formatCompactNumber(registry.count)}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">총 크레딧</p>
                        <p className="text-xl font-bold text-gray-900">
                          {formatCompactNumber(registry.credits)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">tCO2e</p>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="p-8 text-center col-span-full">
                <p className="text-gray-500">레지스트리 데이터가 없습니다</p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Yearly Trends */}
      <section className="section">
        <div className="container-custom">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">연도별 추이</h2>
            </div>
            <p className="text-lg text-gray-600">
              최근 6년간 프로젝트 승인 및 금융 트렌드
            </p>
          </div>

          <Card className="p-8">
            <div className="h-96 bg-gradient-to-br from-emerald-50 via-green-50 to-sky-50 rounded-2xl flex items-center justify-center mb-8 border border-emerald-200/50">
              <div className="text-center">
                <TrendingUp className="w-20 h-20 text-emerald-400 mx-auto mb-6" strokeWidth={1.5} />
                <p className="text-lg font-semibold text-gray-700 mb-2">라인 차트가 곧 표시됩니다</p>
                <Badge variant="outline" className="mt-2">
                  Recharts 통합 예정
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statistics?.byYear && statistics.byYear.length > 0 ? (
                statistics.byYear.map((year, index) => (
                  <div 
                    key={year.year} 
                    className="text-center p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-300"
                  >
                    <Badge variant="outline" className="mb-3">
                      {year.year}
                    </Badge>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {formatCompactNumber(year.count)}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">프로젝트</p>
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm font-bold text-emerald-600">
                        {formatCurrency(year.value)}
                      </p>
                    </div>
                    
                    {/* Growth indicator */}
                    {index > 0 && (
                      <div className="mt-2">
                        <TrendingUp className="w-3 h-3 text-emerald-500 mx-auto" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">연도별 데이터가 없습니다</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Top Countries */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Globe2 className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">국가별 상위 5개국</h2>
            </div>
            <p className="text-lg text-gray-600">
              기후 프로젝트 및 금융 규모 기준 주요 국가
            </p>
          </div>

          <div className="space-y-4">
            {topCountries.length > 0 ? (
              topCountries.map((country, index) => (
                <Card key={country.name} className="p-6 hover:shadow-xl hover:border-amber-500 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                        {index === 0 && <Award className="w-7 h-7" strokeWidth={2.5} />}
                        {index !== 0 && (index + 1)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{country.flag}</span>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {country.name}
                        </h3>
                        {index === 0 && (
                          <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                            Top #1
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-xl bg-gray-50">
                          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">프로젝트</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCompactNumber(country.projects)}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50">
                          <p className="text-xs font-semibold text-amber-700 mb-2 uppercase tracking-wide">총 금융</p>
                          <p className="text-2xl font-bold text-amber-600">
                            {formatCurrency(country.financing)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">국가별 데이터가 없습니다</p>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
