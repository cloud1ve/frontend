import { Info, Target, Users, Zap, Database, Github, Mail } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: '통합 데이터',
    description: 'GCF와 CarbonPlan의 데이터를 하나의 플랫폼에서 통합 제공합니다.',
  },
  {
    icon: Zap,
    title: '빠른 검색',
    description: '50만 개 이상의 프로젝트를 빠르게 검색하고 필터링할 수 있습니다.',
  },
  {
    icon: Target,
    title: '정확한 분석',
    description: '테마별, 국가별, 연도별 상세한 통계와 트렌드를 제공합니다.',
  },
  {
    icon: Users,
    title: '오픈 액세스',
    description: '모든 데이터는 오픈 라이선스로 누구나 자유롭게 이용할 수 있습니다.',
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Info className="w-10 h-10" />
            </div>
            <h1 className="heading-1 mb-6">Climate Action Data Hub</h1>
            <p className="text-xl text-white/90">
              전 세계 기후 행동 데이터를 한눈에 확인하고 분석할 수 있는 통합 플랫폼
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">우리의 미션</h2>
              <p className="text-lg text-gray-600">
                투명하고 접근 가능한 기후 데이터로 더 나은 의사결정을 지원합니다
              </p>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg">
                기후 변화는 우리 시대의 가장 중요한 도전 과제입니다. 
                전 세계에서 수많은 기후 프로젝트가 진행되고 있지만, 
                이러한 정보들은 여러 곳에 분산되어 있어 접근하기 어렵습니다.
              </p>
              <p className="text-lg">
                Climate Action Data Hub는 Green Climate Fund(GCF), CarbonPlan 등 
                주요 기후 데이터 소스를 통합하여 하나의 플랫폼에서 제공합니다. 
                연구자, 정책 입안자, 기업, 일반 시민 누구나 쉽게 기후 프로젝트 정보에 
                접근하고 분석할 수 있도록 돕습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">주요 특징</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-center mb-12">데이터 소스</h2>
            
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Green Climate Fund (GCF)
                    </h3>
                    <p className="text-gray-600 mb-3">
                      세계 최대 규모의 기후 금융 메커니즘. 개발도상국의 기후 변화 
                      적응 및 완화 프로젝트를 지원합니다.
                    </p>
                    <a
                      href="https://www.greenclimate.fund/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      greenclimate.fund →
                    </a>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      CarbonPlan OffsetsDB
                    </h3>
                    <p className="text-gray-600 mb-3">
                      주요 탄소 레지스트리(Verra, Gold Standard, ACR 등)의 
                      탄소 크레딧 발급 및 거래 데이터를 통합 제공합니다.
                    </p>
                    <a
                      href="https://carbonplan.org/research/offsets-db"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      carbonplan.org →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-center mb-12">기술 스택</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((tech) => (
                <div key={tech.category} className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {tech.category}
                  </h3>
                  <ul className="space-y-2">
                    {tech.items.map((item) => (
                      <li key={item} className="text-sm text-gray-600">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">문의하기</h2>
            <p className="text-xl text-white/90 mb-8">
              프로젝트에 대한 질문이나 제안사항이 있으신가요?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/yourusername/climate-data-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-primary-600 hover:bg-white/90 px-6 py-3 inline-flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="mailto:contact@climatedata.hub"
                className="btn bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 py-3 inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                이메일 보내기
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

