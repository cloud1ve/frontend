import { BookOpen, Database, RefreshCw, Shield, FileCheck, GitBranch } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: '데이터 수집',
    description: 'GCF API와 CarbonPlan 데이터베이스에서 정기적으로 데이터를 수집합니다.',
    icon: Database,
  },
  {
    number: 2,
    title: '데이터 표준화',
    description: '서로 다른 데이터 형식을 통일된 스키마로 변환하고 정규화합니다.',
    icon: GitBranch,
  },
  {
    number: 3,
    title: '데이터 검증',
    description: '데이터 품질을 검증하고 중복을 제거하며 무결성을 확인합니다.',
    icon: Shield,
  },
  {
    number: 4,
    title: '데이터 통합',
    description: '표준화된 데이터를 통합 데이터베이스에 저장합니다.',
    icon: FileCheck,
  },
  {
    number: 5,
    title: '정기 업데이트',
    description: '주기적으로 데이터를 업데이트하여 최신 정보를 유지합니다.',
    icon: RefreshCw,
  },
];

const dataSources = [
  {
    name: 'Green Climate Fund',
    endpoint: 'https://www.greenclimate.fund/api',
    frequency: '주간',
    fields: ['프로젝트 ID', '프로젝트명', '국가', '금융 정보', '테마', '승인일'],
  },
  {
    name: 'CarbonPlan OffsetsDB',
    endpoint: 'https://carbonplan.org/data',
    frequency: '월간',
    fields: ['프로젝트 ID', '레지스트리', '프로토콜', '크레딧량', '거래일'],
  },
];

export function MethodologyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container-custom py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <BookOpen className="w-10 h-10" />
            </div>
            <h1 className="heading-1 mb-6">방법론</h1>
            <p className="text-xl text-white/90">
              데이터 수집, 처리, 검증 프로세스를 투명하게 공개합니다
            </p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-center mb-8">데이터 파이프라인</h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              신뢰할 수 있는 기후 데이터를 제공하기 위한 5단계 프로세스
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-primary-500 to-primary-300"></div>
                  )}
                  <div className="card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <step.icon className="w-6 h-6 text-primary-600" />
                          <h3 className="text-xl font-semibold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources Details */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-center mb-12">데이터 소스 상세</h2>
            
            <div className="space-y-6">
              {dataSources.map((source) => (
                <div key={source.name} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {source.name}
                    </h3>
                    <span className="badge bg-primary-100 text-primary-700">
                      {source.frequency} 업데이트
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">API Endpoint</p>
                    <code className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">
                      {source.endpoint}
                    </code>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">수집 필드</p>
                    <div className="flex flex-wrap gap-2">
                      {source.fields.map((field) => (
                        <span
                          key={field}
                          className="badge bg-gray-100 text-gray-700"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Schema */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-center mb-8">통합 데이터 스키마</h2>
            <p className="text-gray-600 text-center mb-12">
              서로 다른 데이터 소스를 통일된 형식으로 변환합니다
            </p>

            <div className="card p-6">
              <div className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm">
{`interface Project {
  // 기본 정보
  id: string;                    // 프로젝트 고유 ID
  source: 'GCF' | 'CarbonPlan';  // 데이터 소스
  name: string;                  // 프로젝트명
  developer: string | null;       // 개발자/제안자
  
  // 테마 및 날짜
  theme: 'Adaptation' | 'Mitigation' | 'Cross-cutting' | null;
  primaryDate: Date | null;
  dateType: 'Approval' | 'Listing' | null;
  
  // GCF 전용 필드
  gcf?: {
    status: string;
    modality: string;
    countries: string[];
    boardMeeting: string;
    projectSize: 'Small' | 'Medium' | 'Large';
    essCategory: string;
    faFinancing: number;
    totalGcfFunding: number;
    totalProjectValue: number;
  };
  
  // Carbon 전용 필드
  carbon?: {
    protocol: string[];
    registry: string;
    creditQuantity: number;
    firstTransactionDate: Date;
    lastTransactionDate: Date;
    vintageRange: string;
  };
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-center mb-12">품질 보증</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  데이터 검증
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 필수 필드 존재 여부 확인</li>
                  <li>• 데이터 타입 및 형식 검증</li>
                  <li>• 범위 및 논리적 일관성 검사</li>
                  <li>• 중복 데이터 자동 제거</li>
                </ul>
              </div>

              <div className="card p-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  업데이트 정책
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• GCF 데이터: 주 1회 업데이트</li>
                  <li>• CarbonPlan 데이터: 월 1회 업데이트</li>
                  <li>• 증분 업데이트로 효율성 확보</li>
                  <li>• 마지막 업데이트 시간 표시</li>
                </ul>
              </div>

              <div className="card p-6">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  에러 처리
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• API 요청 실패 시 자동 재시도</li>
                  <li>• 에러 로깅 및 모니터링</li>
                  <li>• 부분 실패 시 롤백 메커니즘</li>
                  <li>• 관리자 알림 시스템</li>
                </ul>
              </div>

              <div className="card p-6">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  데이터 백업
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 일일 자동 백업</li>
                  <li>• 30일간 버전 히스토리 유지</li>
                  <li>• 재해 복구 계획 수립</li>
                  <li>• 정기적인 복원 테스트</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-center mb-8">한계점 및 주의사항</h2>
            
            <div className="card p-6 border-l-4 border-amber-500">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-1">•</span>
                  <span>
                    데이터는 원본 소스의 업데이트 주기에 따라 지연될 수 있습니다.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-1">•</span>
                  <span>
                    일부 프로젝트는 정보가 불완전하거나 누락될 수 있습니다.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-1">•</span>
                  <span>
                    데이터 표준화 과정에서 일부 세부 정보가 손실될 수 있습니다.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-1">•</span>
                  <span>
                    정확한 정보는 반드시 원본 소스를 확인해 주세요.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

