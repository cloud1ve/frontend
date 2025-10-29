import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe2,
  TrendingUp,
  Building2,
  Users,
  Search,
} from 'lucide-react';
import { StatCard } from '../components/common/stat-card';
import {
  formatCurrency,
  formatDate,
  getThemeBadgeClass,
  formatTheme,
} from '../utils/format';

// TODO: 실제 API 연동
const mockGcfStats = {
  totalProjects: 150,
  totalFunding: 25000000000,
  countries: 89,
  beneficiaries: 500000000,
};

const mockGcfProjects = [
  {
    id: 'FP043',
    name: 'The Saïss Water Conservation Project',
    countries: ['Morocco'],
    theme: 'Adaptation' as const,
    projectSize: 'Medium' as const,
    totalGcfFunding: 36959537.57,
    totalProjectValue: 50000000,
    approvalDate: new Date('2020-03-15'),
    boardMeeting: 'B.16',
  },
  {
    id: 'FP089',
    name: 'Climate Resilient Water Management in Rural Areas',
    countries: ['India'],
    theme: 'Adaptation' as const,
    projectSize: 'Large' as const,
    totalGcfFunding: 45000000,
    totalProjectValue: 120000000,
    approvalDate: new Date('2021-06-20'),
    boardMeeting: 'B.24',
  },
  {
    id: 'FP125',
    name: 'Renewable Energy Development Program',
    countries: ['Bangladesh', 'Nepal'],
    theme: 'Mitigation' as const,
    projectSize: 'Large' as const,
    totalGcfFunding: 98000000,
    totalProjectValue: 250000000,
    approvalDate: new Date('2022-11-10'),
    boardMeeting: 'B.32',
  },
];

export function GCFPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');

  const filteredProjects = mockGcfProjects.filter((project) => {
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedTheme !== 'all' && project.theme !== selectedTheme) {
      return false;
    }
    if (selectedSize !== 'all' && project.projectSize !== selectedSize) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container-custom py-16">
          <div className="flex items-center gap-3 mb-4">
            <Globe2 className="w-12 h-12" />
            <h1 className="heading-2">Green Climate Fund</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            세계 최대 규모의 기후 금융 메커니즘인 GCF의 프로젝트 포트폴리오를 탐색하세요
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="section bg-white border-b border-gray-200">
        <div className="container-custom">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            GCF Impact Snapshot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="총 프로젝트"
              value={mockGcfStats.totalProjects}
              icon={Building2}
              colorClass="text-green-600"
            />
            <StatCard
              title="총 GCF 금융"
              value={mockGcfStats.totalFunding}
              suffix="USD"
              icon={TrendingUp}
              colorClass="text-blue-600"
            />
            <StatCard
              title="참여 국가"
              value={mockGcfStats.countries}
              icon={Globe2}
              colorClass="text-purple-600"
            />
            <StatCard
              title="총 수혜자"
              value={mockGcfStats.beneficiaries}
              icon={Users}
              colorClass="text-amber-600"
            />
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
                      setSelectedTheme('all');
                      setSelectedSize('all');
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      프로젝트 규모
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="input py-2"
                    >
                      <option value="all">전체</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
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
                        <span className="badge badge-gcf">GCF</span>
                        <span
                          className={`badge ${getThemeBadgeClass(project.theme)}`}
                        >
                          {formatTheme(project.theme)}
                        </span>
                        <span className="badge bg-gray-100 text-gray-700">
                          {project.projectSize}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {project.name}
                      </h3>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
                        <span>ID: {project.id}</span>
                        <span>• {project.countries.join(', ')}</span>
                        <span>• {formatDate(project.approvalDate)}</span>
                        <span>• {project.boardMeeting}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">GCF 금융</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(project.totalGcfFunding)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">총 프로젝트 가치</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(project.totalProjectValue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">공공 비율</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {Math.round(
                              (project.totalGcfFunding /
                                project.totalProjectValue) *
                                100
                            )}
                            %
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

