import { useState } from 'react';
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

// TODO: 실제 API 연동
const mockCarbonStats = {
  totalProjects: 487934,
  totalCredits: 1500000000,
  registries: 5,
  protocols: 45,
};

const mockCarbonProjects = [
  {
    id: 'VCS902',
    name: 'KARIBA REDD+ PROJECT',
    registry: 'verra',
    protocol: ['vm0009'],
    creditQuantity: 600000,
    listingDate: new Date('2013-12-23'),
    vintageRange: '2011-2019',
    firstTransaction: new Date('2013-12-23'),
    lastTransaction: new Date('2025-10-23'),
  },
  {
    id: 'GLD2940',
    name: 'Solar Power Plant Development',
    registry: 'gold-standard',
    protocol: ['gs001'],
    creditQuantity: 450000,
    listingDate: new Date('2015-05-10'),
    vintageRange: '2014-2018',
    firstTransaction: new Date('2015-05-10'),
    lastTransaction: new Date('2025-09-15'),
  },
  {
    id: 'VCS1234',
    name: 'Forest Conservation Initiative',
    registry: 'verra',
    protocol: ['vm0015'],
    creditQuantity: 1200000,
    listingDate: new Date('2018-08-22'),
    vintageRange: '2016-2020',
    firstTransaction: new Date('2018-08-22'),
    lastTransaction: new Date('2025-10-01'),
  },
];

const registries = [
  { id: 'verra', name: 'Verra (VCS)', count: 350000 },
  { id: 'gold-standard', name: 'Gold Standard', count: 80000 },
  { id: 'acr', name: 'American Carbon Registry', count: 30000 },
  { id: 'car', name: 'Climate Action Reserve', count: 20000 },
  { id: 'art', name: 'ART REDD+', count: 7934 },
];

export function CarbonOffsetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegistry, setSelectedRegistry] = useState<string>('all');

  const filteredProjects = mockCarbonProjects.filter((project) => {
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedRegistry !== 'all' && project.registry !== selectedRegistry) {
      return false;
    }
    return true;
  });

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <StatCard
              title="총 프로젝트"
              value={mockCarbonStats.totalProjects}
              icon={Database}
              colorClass="text-sky-600"
            />
            <StatCard
              title="총 발급 크레딧"
              value={mockCarbonStats.totalCredits}
              suffix="tCO2e"
              icon={TrendingUp}
              colorClass="text-emerald-600"
            />
            <StatCard
              title="레지스트리"
              value={mockCarbonStats.registries}
              icon={Activity}
              colorClass="text-violet-600"
            />
            <StatCard
              title="프로토콜"
              value={mockCarbonStats.protocols}
              icon={Leaf}
              colorClass="text-cyan-600"
            />
          </div>
        </div>
      </section>

      {/* Registries Overview */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            레지스트리별 분포
          </h2>
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
                      setSearchQuery('');
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
                      onChange={(e) => setSelectedRegistry(e.target.value)}
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

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                      필터링된 결과
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {filteredProjects.length}
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
                      <Card className="p-6 hover:shadow-xl hover:border-sky-500 transition-all duration-300">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className="font-semibold">
                            CarbonPlan
                          </Badge>
                          <Badge variant="outline" className="uppercase font-medium">
                            {project.registry}
                          </Badge>
                          {project.protocol.map((p) => (
                            <Badge
                              key={p}
                              variant="default"
                            >
                              {p}
                            </Badge>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                          {project.name}
                        </h3>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-6">
                          <span className="font-mono font-medium">ID: {project.id}</span>
                          <span>• Vintage: {project.vintageRange}</span>
                          <span>• {formatDate(project.listingDate)}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">발급 크레딧</p>
                            <p className="text-base font-bold text-gray-900">
                              {formatCompactNumber(project.creditQuantity)} tCO2e
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">첫 거래</p>
                            <p className="text-base font-bold text-gray-900">
                              {formatDate(project.firstTransaction)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">마지막 거래</p>
                            <p className="text-base font-bold text-sky-600">
                              {formatDate(project.lastTransaction)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
