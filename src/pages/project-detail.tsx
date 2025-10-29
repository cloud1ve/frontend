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
} from 'lucide-react';
import {
  formatCurrency,
  formatCompactNumber,
  formatDate,
  getSourceBadgeClass,
  getThemeBadgeClass,
  formatTheme,
} from '../utils/format';
import type { Project } from '../types/project';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            프로젝트를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-6">
            ID: {id}에 해당하는 프로젝트가 없습니다.
          </p>
          <Link to="/projects" className="btn-primary">
            프로젝트 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            프로젝트 목록으로 돌아가기
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`badge ${getSourceBadgeClass(project.source)}`}>
              {project.source}
            </span>
            {project.theme && (
              <span className={`badge ${getThemeBadgeClass(project.theme)}`}>
                {formatTheme(project.theme)}
              </span>
            )}
            {project.gcf && (
              <>
                <span className="badge bg-gray-100 text-gray-700">
                  {project.gcf.projectSize}
                </span>
                <span className="badge bg-blue-100 text-blue-700">
                  {project.gcf.status}
                </span>
              </>
            )}
          </div>

          <h1 className="heading-2 mb-2">{project.name}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              ID: {project.id}
            </span>
            {project.developer && (
              <span className="flex items-center">
                <Building2 className="w-4 h-4 mr-1" />
                {project.developer}
              </span>
            )}
            {project.primaryDate && (
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(project.primaryDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                핵심 지표
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gcf && (
                  <>
                    {project.gcf.totalProjectValue > 0 && (
                      <div className="p-4 bg-primary-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-primary-700 mb-1">
                              총 프로젝트 가치
                            </p>
                            <p className="text-2xl font-bold text-primary-900">
                              {formatCurrency(project.gcf.totalProjectValue)}
                            </p>
                          </div>
                          <DollarSign className="w-8 h-8 text-primary-500" />
                        </div>
                      </div>
                    )}
                    {project.gcf.totalGcfFunding > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-green-700 mb-1">
                              GCF 금융 지원
                            </p>
                            <p className="text-2xl font-bold text-green-900">
                              {formatCurrency(project.gcf.totalGcfFunding)}
                            </p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                      </div>
                    )}
                  </>
                )}
                {project.carbon && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-blue-700 mb-1">
                          발급 크레딧
                        </p>
                        <p className="text-2xl font-bold text-blue-900">
                          {formatCompactNumber(project.carbon.creditQuantity)}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">tCO2e</p>
                      </div>
                      <Leaf className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Overview */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                프로젝트 개요
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p>
                  이 프로젝트는 기후 변화 대응을 위한 중요한 이니셔티브로,
                  지속 가능한 개발과 환경 보호를 목표로 합니다.
                </p>
                <p className="mt-4">
                  상세한 프로젝트 설명은 추후 업데이트될 예정입니다.
                </p>
              </div>
            </div>

            {/* GCF Specific Info */}
            {project.gcf && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  GCF 프로젝트 정보
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Board Meeting</p>
                      <p className="font-semibold text-gray-900">
                        {project.gcf.boardMeeting}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Modality</p>
                      <p className="font-semibold text-gray-900">
                        {project.gcf.modality}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">ESS Category</p>
                      <p className="font-semibold text-gray-900">
                        {project.gcf.essCategory}
                      </p>
                    </div>
                    {project.gcf.countries.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">국가</p>
                        <p className="font-semibold text-gray-900">
                          {project.gcf.countries.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Carbon Specific Info */}
            {project.carbon && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  탄소 크레딧 정보
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">레지스트리</p>
                      <p className="font-semibold text-gray-900 uppercase">
                        {project.carbon.registry}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">빈티지</p>
                      <p className="font-semibold text-gray-900">
                        {project.carbon.vintageRange}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">첫 거래일</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(project.carbon.firstTransactionDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">마지막 거래일</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(project.carbon.lastTransactionDate)}
                      </p>
                    </div>
                  </div>
                  {project.carbon.protocol.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">프로토콜</p>
                      <div className="flex flex-wrap gap-2">
                        {project.carbon.protocol.map((p) => (
                          <span
                            key={p}
                            className="badge bg-gray-100 text-gray-700"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info */}
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  프로젝트 정보
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">프로젝트 ID</p>
                    <p className="text-sm font-medium text-gray-900">
                      {project.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">데이터 소스</p>
                    <p className="text-sm font-medium text-gray-900">
                      {project.source}
                    </p>
                  </div>
                  {project.dateType && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">날짜 유형</p>
                      <p className="text-sm font-medium text-gray-900">
                        {project.dateType}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">액션</h3>
                <div className="space-y-2">
                  <button className="btn-primary w-full justify-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    원본 소스 보기
                  </button>
                  <Link
                    to={`/compare?projects=${project.id}`}
                    className="btn-secondary w-full justify-center inline-flex items-center"
                  >
                    프로젝트 비교하기
                  </Link>
                </div>
              </div>

              {/* Related Projects */}
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  유사 프로젝트
                </h3>
                <p className="text-sm text-gray-500">
                  유사한 프로젝트를 곧 추천해드릴 예정입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

