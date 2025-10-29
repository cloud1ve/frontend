import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  Globe2,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';
import { StatCard } from '../components/common/stat-card';
import { formatCompactNumber, formatCurrency } from '../utils/format';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// TODO: 실제 차트 라이브러리 통합 (Recharts)
const mockAnalyticsData = {
  overview: {
    totalProjects: 488084,
    totalFinancing: 25000000000,
    totalCredits: 1500000000,
    countries: 152,
  },
  byTheme: [
    { name: 'Mitigation', count: 350000, percentage: 71.7, color: 'from-amber-500 to-orange-600' },
    { name: 'Adaptation', count: 100000, percentage: 20.5, color: 'from-blue-500 to-sky-600' },
    { name: 'Cross-cutting', count: 38084, percentage: 7.8, color: 'from-violet-500 to-purple-600' },
  ],
  byRegistry: [
    { name: 'Verra', count: 350000, credits: 800000000, color: 'emerald' },
    { name: 'Gold Standard', count: 80000, credits: 400000000, color: 'amber' },
    { name: 'ACR', count: 30000, credits: 200000000, color: 'sky' },
    { name: 'CAR', count: 20000, credits: 80000000, color: 'violet' },
    { name: 'ART', count: 7934, credits: 20000000, color: 'pink' },
  ],
  byYear: [
    { year: '2018', projects: 45000, financing: 3000000000 },
    { year: '2019', projects: 58000, financing: 4500000000 },
    { year: '2020', projects: 72000, financing: 5200000000 },
    { year: '2021', projects: 95000, financing: 6800000000 },
    { year: '2022', projects: 108000, financing: 8500000000 },
    { year: '2023', projects: 110084, financing: 9500000000 },
  ],
  topCountries: [
    { name: 'India', projects: 45000, financing: 4500000000, flag: '🇮🇳' },
    { name: 'Brazil', projects: 38000, financing: 3800000000, flag: '🇧🇷' },
    { name: 'China', projects: 35000, financing: 5200000000, flag: '🇨🇳' },
    { name: 'Indonesia', projects: 28000, financing: 2100000000, flag: '🇮🇩' },
    { name: 'Kenya', projects: 18000, financing: 1800000000, flag: '🇰🇪' },
  ],
};

export function AnalyticsPage() {
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
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <BarChart3 className="w-9 h-9" strokeWidth={2} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                통계 및 분석
              </h1>
            </div>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl leading-relaxed">
              기후 프로젝트 데이터의 트렌드와 인사이트를 시각화하여 제공합니다
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <StatCard
              title="총 프로젝트"
              value={mockAnalyticsData.overview.totalProjects}
              icon={Activity}
              colorClass="text-violet-600"
            />
            <StatCard
              title="총 기후 금융"
              value={mockAnalyticsData.overview.totalFinancing}
              suffix="USD"
              icon={TrendingUp}
              colorClass="text-emerald-600"
            />
            <StatCard
              title="총 발급 크레딧"
              value={mockAnalyticsData.overview.totalCredits}
              suffix="tCO2e"
              icon={Activity}
              colorClass="text-sky-600"
            />
            <StatCard
              title="참여 국가"
              value={mockAnalyticsData.overview.countries}
              icon={Globe2}
              colorClass="text-amber-600"
            />
          </div>
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
              {mockAnalyticsData.byTheme.map((theme) => (
                <Card key={theme.name} className="p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${theme.color}`}></div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {theme.name}
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
              ))}
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
            {mockAnalyticsData.byRegistry.map((registry) => (
              <Card key={registry.name} className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-${registry.color}-100 flex items-center justify-center`}>
                    <div className={`w-3 h-3 rounded-full bg-${registry.color}-500`}></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {registry.name}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">프로젝트</p>
                    <p className={`text-3xl font-bold text-${registry.color}-600`}>
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
            ))}
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
              {mockAnalyticsData.byYear.map((year, index) => (
                <div 
                  key={year.year} 
                  className="text-center p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-300"
                >
                  <Badge variant="outline" className="mb-3">
                    {year.year}
                  </Badge>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {formatCompactNumber(year.projects)}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">프로젝트</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm font-bold text-emerald-600">
                      {formatCurrency(year.financing)}
                    </p>
                  </div>
                  
                  {/* Growth indicator */}
                  {index > 0 && (
                    <div className="mt-2">
                      <TrendingUp className="w-3 h-3 text-emerald-500 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
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
            {mockAnalyticsData.topCountries.map((country, index) => (
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
