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
      <section className="gradient-hero text-white relative overflow-hidden min-h-[600px] flex items-center">
        <div className="container-custom relative z-10 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">전 세계 48만+ 기후 프로젝트 데이터</span>
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
            
            <div className="flex flex-wrap justify-center gap-4">
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
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gradient-to-b from-white via-gray-50 to-white -mt-16">
        <div className="container-custom">
          <div className="text-center mb-16">
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
              colorClass="text-emerald-600"
            />
            <StatCard
              title="탄소 상쇄 프로젝트"
              value={stats.carbonProjects}
              icon={Leaf}
              colorClass="text-sky-500"
            />
            <StatCard
              title="총 발급 크레딧"
              value={stats.totalCredits}
              icon={TrendingUp}
              suffix="tCO2e"
              colorClass="text-green-600"
            />
            <StatCard
              title="총 기후 금융"
              value={stats.totalFinancing}
              icon={TrendingUp}
              suffix="USD"
              colorClass="text-blue-600"
            />
            <Card className="bg-gradient-to-br from-gradient-to-br from-emerald-50 via-sky-50 to-white border-emerald-200/50">
              <CardContent className="pt-8 pb-6">
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                    데이터 소스
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Badge variant="primary" className="text-sm px-4 py-2">
                      GCF
                    </Badge>
                    <Badge variant="secondary" className="text-sm px-4 py-2">
                      CarbonPlan
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
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

