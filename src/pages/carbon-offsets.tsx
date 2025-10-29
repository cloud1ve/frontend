import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  TrendingUp,
  Database,
  Activity,
  Search,
} from 'lucide-react';
import { StatCard } from '../components/common/stat-card';
import {
  formatCompactNumber,
  formatDate,
} from '../utils/format';

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container-custom py-16">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-12 h-12" />
            <h1 className="heading-2">탄소 상쇄 프로젝트</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            전 세계 탄소 레지스트리의 크레딧 발급 데이터를 통합 제공합니다
          </p>
          <p className="text-sm text-white/70 max-w-2xl">
            Verra, Gold Standard, ACR, CAR, ART 등 주요 탄소 레지스트리의 프로젝트와 
            크레딧 트랜잭션 정보를 한곳에서 확인하세요.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="section bg-white border-b border-gray-200">
        <div className="container-custom">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Carbon Credits Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="총 프로젝트"
              value={mockCarbonStats.totalProjects}
              icon={Database}
              colorClass="text-blue-600"
            />
            <StatCard
              title="총 발급 크레딧"
              value={mockCarbonStats.totalCredits}
              suffix="tCO2e"
              icon={TrendingUp}
              colorClass="text-green-600"
            />
            <StatCard
              title="레지스트리"
              value={mockCarbonStats.registries}
              icon={Activity}
              colorClass="text-purple-600"
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
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            레지스트리별 분포
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {registries.map((registry) => (
              <div
                key={registry.id}
                className="card p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedRegistry(registry.id)}
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  {registry.name}
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCompactNumber(registry.count)}
                </p>
                <p className="text-xs text-gray-500 mt-1">프로젝트</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and List */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">필터</h2>
                  <button
                    onClick={() => {
                      setSelectedRegistry('all');
                      setSearchQuery('');
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    초기화
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      레지스트리
                    </label>
                    <select
                      value={selectedRegistry}
                      onChange={(e) => setSelectedRegistry(e.target.value)}
                      className="input py-2"
                    >
                      <option value="all">전체</option>
                      {registries.map((registry) => (
                        <option key={registry.id} value={registry.id}>
                          {registry.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">
                      필터링된 결과
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredProjects.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project List */}
            <div className="lg:col-span-3">
              {/* Search */}
              <div className="card p-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="프로젝트 이름, ID로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 py-2"
                  />
                </div>
              </div>

              {/* Results */}
              {filteredProjects.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-gray-500">검색 결과가 없습니다</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.id}`}
                      className="card card-hover p-6 block"
                    >
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="badge badge-carbon">
                          CarbonPlan
                        </span>
                        <span className="badge bg-blue-100 text-blue-700 uppercase">
                          {project.registry}
                        </span>
                        {project.protocol.map((p) => (
                          <span
                            key={p}
                            className="badge bg-gray-100 text-gray-700"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {project.name}
                      </h3>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
                        <span>ID: {project.id}</span>
                        <span>• Vintage: {project.vintageRange}</span>
                        <span>• {formatDate(project.listingDate)}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">발급 크레딧</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCompactNumber(project.creditQuantity)} tCO2e
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">첫 거래</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatDate(project.firstTransaction)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">마지막 거래</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatDate(project.lastTransaction)}
                          </p>
                        </div>
                      </div>
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

