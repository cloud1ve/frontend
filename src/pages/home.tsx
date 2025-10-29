import { Link } from 'react-router-dom';
import {
  Database,
  TrendingUp,
  Globe2,
  Leaf,
  ArrowRight,
  Search,
} from 'lucide-react';
import { StatCard } from '../components/common/stat-card';

export function HomePage() {
  // TODO: 실제 API에서 데이터 가져오기
  const stats = {
    totalProjects: 488084,
    gcfProjects: 150,
    carbonProjects: 487934,
    totalCredits: 1500000000,
    totalFinancing: 25000000000,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom relative z-10 py-20 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6 animate-fade-in">
              Climate Action Data Hub
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 animate-slide-up">
              전 세계 기후 프로젝트 데이터를 한눈에
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
              GCF와 CarbonPlan의 데이터를 통합하여 투명하고 접근 가능한 
              기후 행동 정보를 제공합니다
            </p>

            {/* 검색바 */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="프로젝트 이름, ID로 검색..."
                  className="w-full h-14 pl-12 pr-4 rounded-xl text-gray-900 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                />
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/projects"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  전체 프로젝트 보기
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/download"
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-md font-medium transition-all backdrop-blur-sm"
                >
                  데이터 다운로드
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Impact Snapshot</h2>
            <p className="text-lg text-gray-600">
              현재까지 수집된 기후 행동 데이터 현황
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="총 프로젝트"
              value={stats.totalProjects}
              icon={Database}
              colorClass="text-primary-500"
            />
            <StatCard
              title="GCF 프로젝트"
              value={stats.gcfProjects}
              icon={Globe2}
              colorClass="text-primary-600"
            />
            <StatCard
              title="탄소 상쇄 프로젝트"
              value={stats.carbonProjects}
              icon={Leaf}
              colorClass="text-accent-500"
            />
            <StatCard
              title="총 발급 크레딧"
              value={stats.totalCredits}
              icon={TrendingUp}
              suffix="tCO2e"
              colorClass="text-green-500"
            />
            <StatCard
              title="총 기후 금융"
              value={stats.totalFinancing}
              icon={TrendingUp}
              suffix="USD"
              colorClass="text-blue-500"
            />
            <div className="stat-card bg-gradient-to-br from-amber-50 to-white">
              <div className="text-center py-4">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  데이터 소스
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="badge badge-gcf text-base px-4 py-2">
                    GCF
                  </div>
                  <div className="badge badge-carbon text-base px-4 py-2">
                    CarbonPlan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">데이터 탐색</h2>
            <p className="text-lg text-gray-600">
              다양한 방식으로 기후 프로젝트 데이터를 탐색하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/projects"
              className="card card-hover p-8 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">전체 프로젝트</h3>
              <p className="text-gray-600">
                GCF와 CarbonPlan의 모든 프로젝트를 검색하고 필터링하세요
              </p>
            </Link>

            <Link
              to="/gcf"
              className="card card-hover p-8 group"
            >
              <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">GCF 프로젝트</h3>
              <p className="text-gray-600">
                Green Climate Fund의 기후 금융 프로젝트를 탐색하세요
              </p>
            </Link>

            <Link
              to="/carbon-offsets"
              className="card card-hover p-8 group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">탄소 상쇄</h3>
              <p className="text-gray-600">
                Verra, Gold Standard 등의 탄소 크레딧 프로젝트를 확인하세요
              </p>
            </Link>

            <Link
              to="/analytics"
              className="card card-hover p-8 group"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">통계 및 분석</h3>
              <p className="text-gray-600">
                테마별, 국가별, 연도별 통계와 트렌드를 분석하세요
              </p>
            </Link>

            <Link
              to="/compare"
              className="card card-hover p-8 group"
            >
              <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">프로젝트 비교</h3>
              <p className="text-gray-600">
                여러 프로젝트를 나란히 비교하고 분석하세요
              </p>
            </Link>

            <Link
              to="/download"
              className="card card-hover p-8 group bg-gradient-to-br from-primary-50 to-white"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">데이터 다운로드</h3>
              <p className="text-gray-600">
                필터링된 데이터를 CSV, JSON 형식으로 다운로드하세요
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">
              기후 행동 데이터로 변화를 만들어보세요
            </h2>
            <p className="text-xl mb-8 text-white/90">
              오픈 데이터와 투명한 정보로 더 나은 의사결정을 지원합니다
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/projects"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all"
              >
                지금 시작하기
              </Link>
              <Link
                to="/about"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all"
              >
                더 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

