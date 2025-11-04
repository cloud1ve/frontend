import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  Briefcase,
} from 'lucide-react';
import {
  formatCurrency,
  formatCompactNumber,
  formatDate,
  formatTheme,
} from '../utils/format';
import type { Project } from '../types/project';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { projectsApi } from '../services/api';
import { Loading } from '../components/common/loading';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProject() {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await projectsApi.getProjectDetail(id);
        setProject(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '프로젝트를 불러오는데 실패했습니다');
        console.error('Failed to load project:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <Loading />
      </div>
    );
  }

  if (error || !project) {
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
            {error || `ID: ${id}에 해당하는 프로젝트가 없습니다.`}
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

  // API 응답의 필드들을 추출
  const projectData = project as Project & {
    sector?: string | null;
    fafinancing?: string | number | null;
    fa_financing?: number | null;
    ess_category?: string | null;
    esscategory?: string | null;
    project_size?: string | null;
    projectsize?: string | null;
    approval_date?: string | null;
    approvaldate?: string | null;
    carbon_registry?: string | null;
    carbon_protocol?: string | null;
    credit_quantity?: number | null;
    cc_vintage_range?: string | null;
    cc_first_transaction_date?: string | null;
    cc_last_transaction_date?: string | null;
  };

  // FA 금융 값 추출 (여러 필드명 지원)
  const faFinancingValue = projectData.fafinancing || projectData.fa_financing;
  const faFinancing = typeof faFinancingValue === 'string' 
    ? parseFloat(faFinancingValue) 
    : faFinancingValue;
  
  const totalGcfFunding = project.total_gcf_funding;
  const totalProjectValue = project.total_project_value;
  const sector = projectData.sector;
  const essCategory = projectData.ess_category || projectData.esscategory;
  const projectSize = projectData.project_size || projectData.projectsize;
  const approvalDate = projectData.approval_date || projectData.approvaldate || project.approval_date;
  const status = project.status;
  const modality = project.modality;
  const bm = project.bm;
  const countries = project.countries;
  const entity = project.entity;

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
              variant={modality === 'PAP' ? 'primary' : 'secondary'}
              className="font-semibold text-sm px-4 py-1.5"
            >
              {modality === 'PAP' ? 'GCF' : 'CarbonPlan'}
            </Badge>
            {project.theme && (
              <Badge variant="outline" className="font-medium text-sm px-4 py-1.5">
                {formatTheme(project.theme)}
              </Badge>
            )}
            {projectSize && (
              <Badge variant="default" className="text-sm px-4 py-1.5">
                {projectSize}
              </Badge>
            )}
            {status && (
              <Badge variant="success" className="text-sm px-4 py-1.5 bg-green-100 text-green-700">
                {status}
              </Badge>
            )}
            {sector && (
              <Badge variant="outline" className="text-sm px-4 py-1.5">
                {sector}
              </Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 tracking-tight leading-tight">
            {project.project_name}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="font-mono font-medium">ID: {project.ref}</span>
            </div>
            {entity && (
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{entity}</span>
              </div>
            )}
            {countries && (
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{countries}</span>
              </div>
            )}
            {approvalDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{formatDate(new Date(approvalDate))}</span>
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
                {totalProjectValue && totalProjectValue > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/50 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-emerald-700 mb-2 uppercase tracking-wide">
                          총 프로젝트 가치
                        </p>
                        <p className="text-3xl font-bold text-emerald-900">
                          {formatCurrency(totalProjectValue)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <DollarSign className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                    </div>
                  </Card>
                )}
                {totalGcfFunding && totalGcfFunding > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-green-700 mb-2 uppercase tracking-wide">
                          GCF 금융 지원
                        </p>
                        <p className="text-3xl font-bold text-green-900">
                          {formatCurrency(totalGcfFunding)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                    </div>
                  </Card>
                )}
                {faFinancing && !isNaN(faFinancing) && faFinancing > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wide">
                          FA 금융
                        </p>
                        <p className="text-3xl font-bold text-blue-900">
                          {formatCurrency(faFinancing)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Briefcase className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                    </div>
                  </Card>
                )}
                {projectData.credit_quantity && projectData.credit_quantity > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200/50 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-sky-700 mb-2 uppercase tracking-wide">
                          발급 크레딧
                        </p>
                        <p className="text-3xl font-bold text-sky-900">
                          {formatCompactNumber(projectData.credit_quantity)}
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
                  {project.project_name}
                </p>
              </div>
            </Card>

            {/* GCF Specific Info */}
            {modality === 'PAP' && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">GCF 프로젝트 정보</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {bm && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Board Meeting</p>
                      <p className="text-lg font-bold text-gray-900">
                        {bm}
                      </p>
                    </div>
                  )}
                  {modality && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Modality</p>
                      <p className="text-lg font-bold text-gray-900">
                        {modality}
                      </p>
                    </div>
                  )}
                  {essCategory && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">ESS Category</p>
                      <p className="text-lg font-bold text-gray-900">
                        {essCategory}
                      </p>
                    </div>
                  )}
                  {projectSize && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">프로젝트 규모</p>
                      <p className="text-lg font-bold text-gray-900">
                        {projectSize}
                      </p>
                    </div>
                  )}
                  {countries && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">국가</p>
                      <p className="text-lg font-bold text-gray-900">
                        {countries}
                      </p>
                    </div>
                  )}
                  {entity && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Entity</p>
                      <p className="text-lg font-bold text-gray-900">
                        {entity}
                      </p>
                    </div>
                  )}
                  {sector && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Sector</p>
                      <p className="text-lg font-bold text-gray-900">
                        {sector}
                      </p>
                    </div>
                  )}
                  {status && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">상태</p>
                      <p className="text-lg font-bold text-gray-900">
                        {status}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Carbon Specific Info */}
            {modality === 'SAP' && projectData.carbon_registry && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-sky-600" strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">탄소 크레딧 정보</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {projectData.carbon_registry && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">레지스트리</p>
                      <Badge variant="secondary" className="uppercase font-bold">
                        {projectData.carbon_registry}
                      </Badge>
                    </div>
                  )}
                  {projectData.carbon_protocol && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">프로토콜</p>
                      <p className="text-lg font-bold text-gray-900">
                        {projectData.carbon_protocol}
                      </p>
                    </div>
                  )}
                  {projectData.cc_vintage_range && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">빈티지</p>
                      <p className="text-lg font-bold text-gray-900">
                        {projectData.cc_vintage_range}
                      </p>
                    </div>
                  )}
                  {projectData.cc_first_transaction_date && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">첫 거래일</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatDate(new Date(projectData.cc_first_transaction_date))}
                      </p>
                    </div>
                  )}
                  {projectData.cc_last_transaction_date && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">마지막 거래일</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatDate(new Date(projectData.cc_last_transaction_date))}
                      </p>
                    </div>
                  )}
                </div>
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
                      {project.ref}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Modality</p>
                    <Badge variant={modality === 'PAP' ? 'primary' : 'secondary'}>
                      {modality}
                    </Badge>
                  </div>
                  {modality && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">데이터 소스</p>
                      <Badge variant={modality === 'PAP' ? 'primary' : 'secondary'}>
                        {modality === 'PAP' ? 'GCF' : 'CarbonPlan'}
                      </Badge>
                    </div>
                  )}
                  {approvalDate && (
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">승인일</p>
                      <p className="text-base font-bold text-gray-900">
                        {formatDate(new Date(approvalDate))}
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
                    to={`/compare?projects=${project.ref}`}
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
