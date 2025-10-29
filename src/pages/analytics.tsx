import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  Globe2,
  Calendar,
} from 'lucide-react';
import { StatCard } from '../components/common/stat-card';
import { formatCompactNumber, formatCurrency } from '../utils/format';

// TODO: 실제 차트 라이브러리 통합 (Recharts)
const mockAnalyticsData = {
  overview: {
    totalProjects: 488084,
    totalFinancing: 25000000000,
    totalCredits: 1500000000,
    countries: 152,
  },
  byTheme: [
    { name: 'Mitigation', count: 350000, percentage: 71.7 },
    { name: 'Adaptation', count: 100000, percentage: 20.5 },
    { name: 'Cross-cutting', count: 38084, percentage: 7.8 },
  ],
  byRegistry: [
    { name: 'Verra', count: 350000, credits: 800000000 },
    { name: 'Gold Standard', count: 80000, credits: 400000000 },
    { name: 'ACR', count: 30000, credits: 200000000 },
    { name: 'CAR', count: 20000, credits: 80000000 },
    { name: 'Others', count: 7934, credits: 20000000 },
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
    { name: 'India', projects: 45000, financing: 4500000000 },
    { name: 'Brazil', projects: 38000, financing: 3800000000 },
    { name: 'China', projects: 35000, financing: 5200000000 },
    { name: 'Indonesia', projects: 28000, financing: 2100000000 },
    { name: 'Kenya', projects: 18000, financing: 1800000000 },
  ],
};

export function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container-custom py-16">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-12 h-12" />
            <h1 className="heading-2">통계 및 분석</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            기후 프로젝트 데이터의 트렌드와 인사이트를 시각화하여 제공합니다
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <section className="section bg-white border-b border-gray-200">
        <div className="container-custom">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            전체 개요
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="총 프로젝트"
              value={mockAnalyticsData.overview.totalProjects}
              icon={Activity}
              colorClass="text-purple-600"
            />
            <StatCard
              title="총 기후 금융"
              value={mockAnalyticsData.overview.totalFinancing}
              suffix="USD"
              icon={TrendingUp}
              colorClass="text-green-600"
            />
            <StatCard
              title="총 발급 크레딧"
              value={mockAnalyticsData.overview.totalCredits}
              suffix="tCO2e"
              icon={Activity}
              colorClass="text-blue-600"
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
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              테마별 분포
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Placeholder */}
            <div className="card p-8">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-500">차트가 곧 표시됩니다</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Recharts 통합 예정
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              {mockAnalyticsData.byTheme.map((theme) => (
                <div key={theme.name} className="card p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {theme.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-600">
                      {theme.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${theme.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCompactNumber(theme.count)}
                  </p>
                  <p className="text-sm text-gray-500">프로젝트</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registry Analysis */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              레지스트리별 통계
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAnalyticsData.byRegistry.map((registry) => (
              <div key={registry.name} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {registry.name}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">프로젝트</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCompactNumber(registry.count)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">총 크레딧</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCompactNumber(registry.credits)} tCO2e
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yearly Trends */}
      <section className="section">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              연도별 추이
            </h2>
          </div>

          <div className="card p-8">
            <div className="h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-gray-500">라인 차트가 곧 표시됩니다</p>
                <p className="text-sm text-gray-400 mt-2">
                  Recharts 통합 예정
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {mockAnalyticsData.byYear.map((year) => (
                <div key={year.year} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {year.year}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCompactNumber(year.projects)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">프로젝트</p>
                  <p className="text-sm font-semibold text-green-600 mt-2">
                    {formatCurrency(year.financing)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Countries */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-6">
            <Globe2 className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              국가별 상위 5개국
            </h2>
          </div>

          <div className="space-y-4">
            {mockAnalyticsData.topCountries.map((country, index) => (
              <div key={country.name} className="card p-6">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {country.name}
                    </h3>
                    <div className="flex flex-wrap gap-6">
                      <div>
                        <p className="text-sm text-gray-600">프로젝트</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCompactNumber(country.projects)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">총 금융</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(country.financing)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

