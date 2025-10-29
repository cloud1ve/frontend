import { useState } from 'react';
import { Search, X, Plus, ArrowRight, GitCompare } from 'lucide-react';
import {
  formatCurrency,
  formatCompactNumber,
  formatDate,
  formatTheme,
} from '../utils/format';
import type { Project } from '../types/project';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

// TODO: 실제 API 연동
const mockProjects: Project[] = [
  {
    id: 'FP043',
    source: 'GCF',
    name: 'The Saïss Water Conservation Project',
    developer: 'EBRD',
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
  },
  {
    id: 'VCS902',
    source: 'CarbonPlan',
    name: 'KARIBA REDD+ PROJECT',
    developer: 'Carbon Green Investments',
    theme: null,
    primaryDate: new Date('2013-12-23'),
    dateType: 'Listing',
    carbon: {
      protocol: ['vm0009'],
      registry: 'verra',
      creditQuantity: 600000,
      firstTransactionDate: new Date('2013-12-23'),
      lastTransactionDate: new Date('2025-10-23'),
      vintageRange: '2011-2019',
    },
  },
];

export function ComparePage() {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const addProject = (project: Project) => {
    if (selectedProjects.length < 5 && !selectedProjects.find((p) => p.id === project.id)) {
      setSelectedProjects([...selectedProjects, project]);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const removeProject = (projectId: string) => {
    setSelectedProjects(selectedProjects.filter((p) => p.id !== projectId));
  };

  const filteredProjects = mockProjects.filter(
    (project) =>
      searchQuery &&
      (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !selectedProjects.find((p) => p.id === project.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container-custom relative z-10 py-16 sm:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <GitCompare className="w-4 h-4" />
              <span className="text-sm font-medium">Compare Projects</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <ArrowRight className="w-9 h-9" strokeWidth={2} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                프로젝트 비교
              </h1>
            </div>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl leading-relaxed">
              최대 5개의 프로젝트를 선택하여 주요 지표를 비교하세요
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content */}
      <section className="section -mt-16">
        <div className="container-custom">
          {/* Project Selector */}
          <Card className="p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  프로젝트 선택
                </h2>
                <p className="text-gray-600">
                  선택된 프로젝트: {selectedProjects.length}/5
                </p>
              </div>
              {selectedProjects.length < 5 && (
                <Button
                  onClick={() => setShowSearch(!showSearch)}
                  size="lg"
                  className="shadow-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  프로젝트 추가
                </Button>
              )}
            </div>

            {/* Search */}
            {showSearch && (
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="프로젝트 이름 또는 ID로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11"
                    autoFocus
                  />
                </div>

                {/* Search Results */}
                {filteredProjects.length > 0 && (
                  <Card className="mt-3 max-h-64 overflow-y-auto">
                    {filteredProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => addProject(project)}
                        className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">
                              {project.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant={project.source === 'GCF' ? 'primary' : 'secondary'} className="text-xs">
                                {project.source}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                ID: {project.id}
                              </span>
                            </div>
                          </div>
                          <Plus className="w-5 h-5 text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </Card>
                )}
              </div>
            )}

            {/* Selected Projects Pills */}
            {selectedProjects.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {selectedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 px-5 py-2.5 rounded-full border border-amber-200 shadow-sm"
                  >
                    <span className="font-semibold text-sm">{project.name}</span>
                    <button
                      onClick={() => removeProject(project.id)}
                      className="hover:bg-amber-200 rounded-full p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Comparison Table */}
          {selectedProjects.length === 0 ? (
            <Card className="p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ArrowRight className="w-10 h-10 text-amber-600" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  프로젝트를 선택하세요
                </h3>
                <p className="text-lg text-gray-600">
                  비교할 프로젝트를 추가하여 주요 지표를 나란히 확인하세요
                </p>
              </div>
            </Card>
          ) : (
            <Card className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-5 font-bold text-gray-900 bg-gradient-to-r from-gray-50 to-white sticky left-0 z-10">
                      항목
                    </th>
                    {selectedProjects.map((project) => (
                      <th
                        key={project.id}
                        className="text-left p-5 font-semibold text-gray-900 min-w-[240px] bg-white"
                      >
                        <Badge 
                          variant={project.source === 'GCF' ? 'primary' : 'secondary'}
                          className="mb-3"
                        >
                          {project.source}
                        </Badge>
                        <p className="text-base font-bold text-gray-900 leading-snug">
                          {project.name}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Basic Info */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                      프로젝트 ID
                    </td>
                    {selectedProjects.map((project) => (
                      <td key={project.id} className="p-5 font-mono font-medium text-gray-900">
                        {project.id}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                      개발자
                    </td>
                    {selectedProjects.map((project) => (
                      <td key={project.id} className="p-5 text-gray-900">
                        {project.developer || <span className="text-gray-400">-</span>}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                      테마
                    </td>
                    {selectedProjects.map((project) => (
                      <td key={project.id} className="p-5">
                        {project.theme ? (
                          <Badge variant="outline" className="font-medium">
                            {formatTheme(project.theme)}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b-2 border-gray-200 hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                      날짜
                    </td>
                    {selectedProjects.map((project) => (
                      <td key={project.id} className="p-5 text-gray-900">
                        {project.primaryDate
                          ? formatDate(project.primaryDate)
                          : <span className="text-gray-400">-</span>}
                      </td>
                    ))}
                  </tr>

                  {/* GCF Metrics */}
                  {selectedProjects.some((p) => p.gcf) && (
                    <>
                      <tr className="bg-gradient-to-r from-emerald-50 to-green-50">
                        <td
                          colSpan={selectedProjects.length + 1}
                          className="p-5 font-bold text-emerald-900 text-lg sticky left-0 z-10"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                            GCF 정보
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                          총 프로젝트 가치
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-5 font-bold text-gray-900">
                            {project.gcf?.totalProjectValue
                              ? formatCurrency(project.gcf.totalProjectValue)
                              : <span className="text-gray-400 font-normal">-</span>}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                          GCF 금융
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-5 font-bold text-emerald-600">
                            {project.gcf?.totalGcfFunding
                              ? formatCurrency(project.gcf.totalGcfFunding)
                              : <span className="text-gray-400 font-normal">-</span>}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                          국가
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-5 text-gray-900">
                            {project.gcf?.countries.join(', ') || <span className="text-gray-400">-</span>}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b-2 border-gray-200 hover:bg-gray-50/50 transition-colors">
                        <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                          프로젝트 규모
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-5">
                            {project.gcf?.projectSize ? (
                              <Badge variant="default">
                                {project.gcf.projectSize}
                              </Badge>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {/* Carbon Metrics */}
                  {selectedProjects.some((p) => p.carbon) && (
                    <>
                      <tr className="bg-gradient-to-r from-sky-50 to-blue-50">
                        <td
                          colSpan={selectedProjects.length + 1}
                          className="p-5 font-bold text-sky-900 text-lg sticky left-0 z-10"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-sky-600"></div>
                            탄소 크레딧 정보
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                          레지스트리
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-5">
                            {project.carbon?.registry ? (
                              <Badge variant="secondary" className="uppercase">
                                {project.carbon.registry}
                              </Badge>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                          발급 크레딧
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-5 font-bold text-sky-600">
                            {project.carbon?.creditQuantity
                              ? `${formatCompactNumber(project.carbon.creditQuantity)} tCO2e`
                              : <span className="text-gray-400 font-normal">-</span>}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-5 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                          빈티지
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-5 text-gray-900">
                            {project.carbon?.vintageRange || <span className="text-gray-400">-</span>}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
