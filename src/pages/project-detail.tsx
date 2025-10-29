import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Leaf,
  MapPin,
  ExternalLink,
  TrendingUp,
  Building2,
  FileText,
  Globe2,
} from 'lucide-react';
import {
  formatCurrency,
  formatCompactNumber,
  formatDate,
  formatTheme,
} from '../utils/format';
import type { Project } from '../types/project';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

// TODO: 실제 API 연동
const mockProjectDetail: Project = {
  id: 'FP043',
  source: 'GCF',
  name: 'The Saïss Water Conservation Project',
  developer: 'European Bank for Reconstruction and Development (EBRD)',
  theme: 'Adaptation',
  primaryDate: new Date('2020-03-15'),
  dateType: 'Approval',
  gcf: {
    status: 'Approved',
    modality: 'PAP',
    countries: ['Morocco'],
    boardMeeting: 'B.16',
    projectSize: 'Medium',
    essCategory: 'Category B',
    faFinancing: 36959537.57,
    totalGcfFunding: 36959537.57,
    totalProjectValue: 50000000,
  },
};

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  // TODO: useQuery로 실제 데이터 가져오기
  const project = mockProjectDetail;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <Card className="p-16 text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            프로젝트를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-8">
            ID: {id}에 해당하는 프로젝트가 없습니다.
          </p>
          <Link to="/projects">
            <Button size="lg" className="shadow-xl">
              프로젝트 목록으로 돌아가기
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-200/50">
        <div className="container-custom py-8 sm:py-12">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            프로젝트 목록으로 돌아가기
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge 
              variant={project.source === 'GCF' ? 'primary' : 'secondary'}
              className="font-semibold text-sm px-4 py-1.5"
            >
              {project.source}
            </Badge>
            {project.theme && (
              <Badge variant="outline" className="font-medium text-sm px-4 py-1.5">
                {formatTheme(project.theme)}
              </Badge>
            )}
            {project.gcf && (
              <>
                <Badge variant="default" className="text-sm px-4 py-1.5">
                  {project.gcf.projectSize}
                </Badge>
                <Badge variant="success" className="text-sm px-4 py-1.5 bg-green-100 text-green-700">
                  {project.gcf.status}
                </Badge>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 tracking-tight leading-tight">
            {project.name}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="font-mono font-medium">ID: {project.id}</span>
            </div>
            {project.developer && (
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{project.developer}</span>
              </div>
            )}
            {project.primaryDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{formatDate(project.primaryDate)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">핵심 지표</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {project.gcf && (
                  <>
                    {project.gcf.totalProjectValue > 0 && (
                      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/50 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-emerald-700 mb-2 uppercase tracking-wide">
                              총 프로젝트 가치
                            </p>
                            <p className="text-3xl font-bold text-emerald-900">
                              {formatCurrency(project.gcf.totalProjectValue)}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                            <DollarSign className="w-6 h-6 text-white" strokeWidth={2} />
                          </div>
                        </div>
                      </Card>
                    )}
                    {project.gcf.totalGcfFunding > 0 && (
                      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-green-700 mb-2 uppercase tracking-wide">
                              GCF 금융 지원
                            </p>
                            <p className="text-3xl font-bold text-green-900">
                              {formatCurrency(project.gcf.totalGcfFunding)}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-6 h-6 text-white" strokeWidth={2} />
                          </div>
                        </div>
                      </Card>
                    )}
                  </>
                )}
                {project.carbon && (
                  <Card className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200/50 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-sky-700 mb-2 uppercase tracking-wide">
                          발급 크레딧
                        </p>
                        <p className="text-3xl font-bold text-sky-900">
                          {formatCompactNumber(project.carbon.creditQuantity)}
                        </p>
                        <p className="text-sm font-semibold text-sky-600 mt-1">tCO2e</p>
                      </div>
                      <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Leaf className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* Project Overview */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">프로젝트 개요</h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
                <p className="text-base">
                  이 프로젝트는 기후 변화 대응을 위한 중요한 이니셔티브로,
                  지속 가능한 개발과 환경 보호를 목표로 합니다.
                </p>
                <p className="text-base">
                  상세한 프로젝트 설명은 추후 업데이트될 예정입니다.
                </p>
              </div>
            </Card>

            {/* GCF Specific Info */}
            {project.gcf && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">GCF 프로젝트 정보</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Board Meeting</p>
                    <p className="text-lg font-bold text-gray-900">
                      {project.gcf.boardMeeting}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Modality</p>
                    <p className="text-lg font-bold text-gray-900">
                      {project.gcf.modality}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">ESS Category</p>
                    <p className="text-lg font-bold text-gray-900">
                      {project.gcf.essCategory}
                    </p>
                  </div>
                  {project.gcf.countries.length > 0 && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">국가</p>
                      <p className="text-lg font-bold text-gray-900">
                        {project.gcf.countries.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Carbon Specific Info */}
            {project.carbon && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-sky-600" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">탄소 크레딧 정보</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">레지스트리</p>
                    <Badge variant="secondary" className="uppercase font-bold">
                      {project.carbon.registry}
                    </Badge>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">빈티지</p>
                    <p className="text-lg font-bold text-gray-900">
                      {project.carbon.vintageRange}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">첫 거래일</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatDate(project.carbon.firstTransactionDate)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">마지막 거래일</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatDate(project.carbon.lastTransactionDate)}
                    </p>
                  </div>
                </div>
                
                {project.carbon.protocol.length > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">프로토콜</p>
                    <div className="flex flex-wrap gap-2">
                      {project.carbon.protocol.map((p) => (
                        <Badge
                          key={p}
                          variant="default"
                          className="font-medium"
                        >
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  프로젝트 정보
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">프로젝트 ID</p>
                    <p className="text-base font-mono font-bold text-gray-900">
                      {project.id}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">데이터 소스</p>
                    <Badge variant={project.source === 'GCF' ? 'primary' : 'secondary'}>
                      {project.source}
                    </Badge>
                  </div>
                  {project.dateType && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">날짜 유형</p>
                      <p className="text-base font-bold text-gray-900">
                        {project.dateType}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">액션</h3>
                <div className="space-y-3">
                  <Button className="w-full shadow-lg" size="lg">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    원본 소스 보기
                  </Button>
                  <Link
                    to={`/compare?projects=${project.id}`}
                    className="block"
                  >
                    <Button variant="outline" className="w-full" size="lg">
                      프로젝트 비교하기
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Related Projects */}
              <Card className="p-6 bg-gradient-to-br from-gray-50 to-white">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  유사 프로젝트
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  유사한 프로젝트를 곧 추천해드릴 예정입니다.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
