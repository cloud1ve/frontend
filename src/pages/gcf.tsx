import { useState } from 'react';
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
} from '../utils/format';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <StatCard
              title="총 프로젝트"
              value={mockGcfStats.totalProjects}
              icon={Building2}
              colorClass="text-emerald-600"
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
              colorClass="text-violet-600"
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
                      setSearchQuery('');
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
                      onChange={(e) => setSelectedTheme(e.target.value)}
                      className="input py-2.5"
                    >
                      <option value="all">전체</option>
                      <option value="Adaptation">적응</option>
                      <option value="Mitigation">완화</option>
                      <option value="Cross-cutting">통합</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      프로젝트 규모
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="input py-2.5"
                    >
                      <option value="all">전체</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
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
                      <Card className="p-6 hover:shadow-xl hover:border-emerald-500 transition-all duration-300">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="primary" className="font-semibold">
                            GCF
                          </Badge>
                          <Badge variant="outline" className="font-medium">
                            {formatTheme(project.theme)}
                          </Badge>
                          <Badge variant="default">
                            {project.projectSize}
                          </Badge>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                          {project.name}
                        </h3>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-6">
                          <span className="font-mono font-medium">ID: {project.id}</span>
                          <span>• {project.countries.join(', ')}</span>
                          <span>• {formatDate(project.approvalDate)}</span>
                          <span>• Board: {project.boardMeeting}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">GCF 금융</p>
                            <p className="text-base font-bold text-gray-900">
                              {formatCurrency(project.totalGcfFunding)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">총 프로젝트 가치</p>
                            <p className="text-base font-bold text-gray-900">
                              {formatCurrency(project.totalProjectValue)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">공공 비율</p>
                            <p className="text-base font-bold text-emerald-600">
                              {Math.round(
                                (project.totalGcfFunding /
                                  project.totalProjectValue) *
                                  100
                              )}
                              %
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
