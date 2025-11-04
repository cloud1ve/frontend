import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  TrendingUp,
  Globe2,
  Leaf,
  ArrowRight,
  Search,
  BarChart3,
  Download,
  FileText,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '../components/common/stat-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { statisticsApi } from '../services/api';
import { Loading } from '../components/common/loading';

export function HomePage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    gcfProjects: 0,
    carbonProjects: 0,
    totalCredits: 0,
    totalFinancing: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatistics() {
      try {
        setLoading(true);
        setError(null);
        const response = await statisticsApi.getStatistics();
        setStats({
          totalProjects: response.total.projects,
          gcfProjects: response.total.gcfProjects,
          carbonProjects: response.total.carbonProjects,
          totalCredits: response.total.totalCredits,
          totalFinancing: response.total.totalFinancing,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '통계를 불러오는데 실패했습니다');
        console.error('Failed to load statistics:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadStatistics();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-white relative overflow-hidden min-h-[600px] flex items-center">
        <div className="container-custom relative z-10 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                {loading ? '데이터 로딩 중...' : `전 세계 ${stats.totalProjects.toLocaleString('ko-KR')}개 기후 프로젝트 데이터`}
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in tracking-tight">
              Climate Action
              <br />
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Data Hub
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 mb-4 animate-slide-up font-medium">
              전 세계 기후 프로젝트 데이터를 한눈에
            </p>
            <p className="text-base sm:text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              GCF와 CarbonPlan의 데이터를 통합하여 투명하고 접근 가능한 
              기후 행동 정보를 제공합니다
            </p>

            {/* 검색바 */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Input
                  type="text"
                  placeholder="프로젝트 이름, ID, 국가로 검색..."
                  className="h-14 pl-14 pr-4 text-base shadow-2xl border-0 focus:ring-4 focus:ring-white/20"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                to="/projects"
                className="btn-primary inline-flex items-center gap-2 shadow-xl hover:shadow-2xl"
              >
                전체 프로젝트 탐색
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/analytics"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all backdrop-blur-md border border-white/20 inline-flex items-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                통계 분석
              </Link>
            </div>

            {/* Quick Stats */}
            {!loading && !error && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slide-up">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">GCF</p>
                  <p className="text-2xl font-bold">{stats.gcfProjects.toLocaleString('ko-KR')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">탄소상쇄</p>
                  <p className="text-2xl font-bold">{stats.carbonProjects.toLocaleString('ko-KR')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">크레딧</p>
                  <p className="text-2xl font-bold">{(stats.totalCredits / 1_000_000).toFixed(1)}M</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">금융</p>
                  <p className="text-2xl font-bold">${(stats.totalFinancing / 1_000_000_000).toFixed(1)}B</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gradient-to-b from-white via-gray-50 to-white -mt-16">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="primary" className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              실시간 데이터 현황
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Impact Snapshot</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              현재까지 수집된 기후 행동 데이터 현황
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {loading ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="stat-card animate-pulse">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded w-32 mb-2"></div>
                      </div>
                      <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                    </div>
                  </Card>
                ))}
              </>
            ) : error ? (
              <div className="col-span-full">
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-red-900 mb-2">통계 데이터를 불러올 수 없습니다</h3>
                    <p className="text-red-700 mb-4">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      다시 시도
                    </button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <StatCard
                  title="총 프로젝트"
                  value={stats.totalProjects}
                  icon={Database}
                  colorClass="text-primary-600"
                />
                <StatCard
                  title="GCF 프로젝트"
                  value={stats.gcfProjects}
                  icon={Globe2}
                  colorClass="text-emerald-600"
                />
                <StatCard
                  title="탄소 상쇄 프로젝트"
                  value={stats.carbonProjects}
                  icon={Leaf}
                  colorClass="text-sky-600"
                />
                <StatCard
                  title="총 발급 크레딧"
                  value={stats.totalCredits}
                  icon={TrendingUp}
                  suffix="tCO₂e"
                  colorClass="text-green-600"
                />
                <StatCard
                  title="총 기후 금융"
                  value={stats.totalFinancing}
                  icon={TrendingUp}
                  suffix="USD"
                  colorClass="text-blue-600"
                />
                <Card className="bg-gradient-to-br from-emerald-50 via-sky-50 to-white border-emerald-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-8 pb-6">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                        데이터 소스
                      </p>
                      <div className="flex items-center justify-center gap-3 flex-wrap">
                        <Badge variant="primary" className="text-sm px-4 py-2 hover:scale-105 transition-transform cursor-default">
                          GCF
                        </Badge>
                        <Badge variant="secondary" className="text-sm px-4 py-2 hover:scale-105 transition-transform cursor-default">
                          CarbonPlan
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        최종 업데이트: {new Date().toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">데이터 탐색</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              다양한 방식으로 기후 프로젝트 데이터를 탐색하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Link to="/projects" className="group">
              <Card className="h-full hover:shadow-xl hover:border-primary-500 transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Database className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary-600 transition-colors">
                    전체 프로젝트
                  </CardTitle>
                  <CardDescription className="text-base">
                    GCF와 CarbonPlan의 모든 프로젝트를 검색하고 필터링하세요
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/gcf" className="group">
              <Card className="h-full hover:shadow-xl hover:border-emerald-500 transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Globe2 className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">
                    GCF 프로젝트
                  </CardTitle>
                  <CardDescription className="text-base">
                    Green Climate Fund의 기후 금융 프로젝트를 탐색하세요
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/carbon-offsets" className="group">
              <Card className="h-full hover:shadow-xl hover:border-sky-500 transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Leaf className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-sky-600 transition-colors">
                    탄소 상쇄
                  </CardTitle>
                  <CardDescription className="text-base">
                    Verra, Gold Standard 등의 탄소 크레딧 프로젝트를 확인하세요
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/analytics" className="group">
              <Card className="h-full hover:shadow-xl hover:border-violet-500 transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <BarChart3 className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-violet-600 transition-colors">
                    통계 및 분석
                  </CardTitle>
                  <CardDescription className="text-base">
                    테마별, 국가별, 연도별 통계와 트렌드를 분석하세요
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/compare" className="group">
              <Card className="h-full hover:shadow-xl hover:border-amber-500 transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <FileText className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">
                    프로젝트 비교
                  </CardTitle>
                  <CardDescription className="text-base">
                    여러 프로젝트를 나란히 비교하고 분석하세요
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/download" className="group">
              <Card className="h-full bg-gradient-to-br from-primary-50 via-emerald-50 to-white hover:shadow-xl border-primary-200 transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Download className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary-600 transition-colors">
                    데이터 다운로드
                  </CardTitle>
                  <CardDescription className="text-base">
                    필터링된 데이터를 CSV, JSON 형식으로 다운로드하세요
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-600 to-sky-600"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              기후 행동 데이터로
              <br />
              변화를 만들어보세요
            </h2>
            <p className="text-xl sm:text-2xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
              오픈 데이터와 투명한 정보로 더 나은 의사결정을 지원합니다
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/projects"
                className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                지금 시작하기
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                더 알아보기
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      </section>
    </div>
  );
}

