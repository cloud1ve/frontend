import { Info, Target, Users, Zap, Database, Github, Mail, Sparkles, Heart } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const features = [
  {
    icon: Database,
    title: '통합 데이터',
    description: 'GCF와 CarbonPlan의 데이터를 하나의 플랫폼에서 통합 제공합니다.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Zap,
    title: '빠른 검색',
    description: '50만 개 이상의 프로젝트를 빠르게 검색하고 필터링할 수 있습니다.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Target,
    title: '정확한 분석',
    description: '테마별, 국가별, 연도별 상세한 통계와 트렌드를 제공합니다.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Users,
    title: '오픈 액세스',
    description: '모든 데이터는 오픈 라이선스로 누구나 자유롭게 이용할 수 있습니다.',
    color: 'from-violet-500 to-violet-600',
  },
];

const techStack = [
  { category: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS'] },
  { category: 'UI/UX', items: ['Shadcn UI', 'Radix UI', 'Lucide Icons'] },
  { category: 'Data', items: ['React Query', 'Zustand', 'Axios'] },
  { category: 'Visualization', items: ['Recharts', 'D3.js'] },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container-custom relative z-10 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Info className="w-4 h-4" />
              <span className="text-sm font-medium">About Us</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Climate Action
              <br />
              Data Hub
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              전 세계 기후 행동 데이터를 한눈에 확인하고 분석할 수 있는 통합 플랫폼
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Mission Section */}
      <section className="section -mt-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <Badge variant="primary" className="mb-4">
                  <Heart className="w-3 h-3 mr-1" />
                  Our Mission
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">우리의 미션</h2>
                <p className="text-lg sm:text-xl text-gray-600">
                  투명하고 접근 가능한 기후 데이터로 더 나은 의사결정을 지원합니다
                </p>
              </div>

              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  기후 변화는 우리 시대의 가장 중요한 도전 과제입니다. 
                  전 세계에서 수많은 기후 프로젝트가 진행되고 있지만, 
                  이러한 정보들은 여러 곳에 분산되어 있어 접근하기 어렵습니다.
                </p>
                <p className="text-lg leading-relaxed">
                  Climate Action Data Hub는 Green Climate Fund(GCF), CarbonPlan 등 
                  주요 기후 데이터 소스를 통합하여 하나의 플랫폼에서 제공합니다. 
                  연구자, 정책 입안자, 기업, 일반 시민 누구나 쉽게 기후 프로젝트 정보에 
                  접근하고 분석할 수 있도록 돕습니다.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">주요 특징</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              사용자 중심의 직관적인 기능으로 기후 데이터를 쉽게 탐색하세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">데이터 소스</h2>
              <p className="text-lg text-gray-600">
                신뢰할 수 있는 글로벌 기후 데이터 제공 기관의 정보를 통합합니다
              </p>
            </div>
            
            <div className="space-y-6">
              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Database className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <Badge variant="primary" className="mb-3">GCF</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Green Climate Fund
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      세계 최대 규모의 기후 금융 메커니즘. 개발도상국의 기후 변화 
                      적응 및 완화 프로젝트를 지원합니다.
                    </p>
                    <a
                      href="https://www.greenclimate.fund/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      greenclimate.fund
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Database className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-3">CarbonPlan</Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      CarbonPlan OffsetsDB
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      주요 탄소 레지스트리(Verra, Gold Standard, ACR 등)의 
                      탄소 크레딧 발급 및 거래 데이터를 통합 제공합니다.
                    </p>
                    <a
                      href="https://carbonplan.org/research/offsets-db"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:text-sky-700 font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      carbonplan.org
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">기술 스택</h2>
              <p className="text-lg text-gray-600">
                최신 웹 기술로 빠르고 안정적인 서비스를 제공합니다
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((tech) => (
                <Card key={tech.category} className="p-6 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                    {tech.category}
                  </h3>
                  <ul className="space-y-2.5">
                    {tech.items.map((item) => (
                      <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-600 to-sky-600"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">문의하기</h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              프로젝트에 대한 질문이나 제안사항이 있으신가요?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-white/90 font-bold shadow-xl">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </a>
              <a href="mailto:contact@climatedata.hub">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md font-bold">
                  <Mail className="w-5 h-5 mr-2" />
                  이메일 보내기
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
