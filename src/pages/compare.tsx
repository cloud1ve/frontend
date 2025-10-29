import { useState } from 'react';
import { Search, X, Plus, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container-custom py-16">
          <div className="flex items-center gap-3 mb-4">
            <ArrowRight className="w-12 h-12" />
            <h1 className="heading-2">프로젝트 비교</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            최대 5개의 프로젝트를 선택하여 주요 지표를 비교하세요
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          {/* Project Selector */}
          <div className="card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                프로젝트 선택 ({selectedProjects.length}/5)
              </h2>
              {selectedProjects.length < 5 && (
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="btn-primary px-4 py-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  프로젝트 추가
                </button>
              )}
            </div>

            {/* Search */}
            {showSearch && (
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="프로젝트 이름 또는 ID로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10"
                    autoFocus
                  />
                </div>

                {/* Search Results */}
                {filteredProjects.length > 0 && (
                  <div className="mt-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => addProject(project)}
                        className="w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {project.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              ID: {project.id} • {project.source}
                            </p>
                          </div>
                          <Plus className="w-5 h-5 text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Selected Projects Pills */}
            {selectedProjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full"
                  >
                    <span className="font-medium">{project.name}</span>
                    <button
                      onClick={() => removeProject(project.id)}
                      className="hover:bg-primary-200 rounded-full p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comparison Table */}
          {selectedProjects.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  프로젝트를 선택하세요
                </h3>
                <p className="text-gray-600">
                  비교할 프로젝트를 추가하여 주요 지표를 나란히 확인하세요
                </p>
              </div>
            </div>
          ) : (
            <div className="card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-900 bg-gray-50">
                      항목
                    </th>
                    {selectedProjects.map((project) => (
                      <th
                        key={project.id}
                        className="text-left p-4 font-semibold text-gray-900 min-w-[200px]"
                      >
                        <div className="mb-2">
                          <span
                            className={`badge ${getSourceBadgeClass(project.source)}`}
                          >
                            {project.source}
                          </span>
                        </div>
                        <p className="text-sm font-normal text-gray-600">
                          {project.name}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Basic Info */}
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">
                      프로젝트 ID
                    </td>
                    {selectedProjects.map((project) => (
                      <td key={project.id} className="p-4 text-gray-900">
                        {project.id}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">
                      개발자
                    </td>
                    {selectedProjects.map((project) => (
                      <td key={project.id} className="p-4 text-gray-900">
                        {project.developer || '-'}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">
                      테마
                    </td>
                    {selectedProjects.map((project) => (
                      <td key={project.id} className="p-4">
                        {project.theme ? (
                          <span
                            className={`badge ${getThemeBadgeClass(project.theme)}`}
                          >
                            {formatTheme(project.theme)}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">
                      날짜
                    </td>
                    {selectedProjects.map((project) => (
                      <td key={project.id} className="p-4 text-gray-900">
                        {project.primaryDate
                          ? formatDate(project.primaryDate)
                          : '-'}
                      </td>
                    ))}
                  </tr>

                  {/* GCF Metrics */}
                  {selectedProjects.some((p) => p.gcf) && (
                    <>
                      <tr className="border-b border-gray-200 bg-green-50">
                        <td
                          colSpan={selectedProjects.length + 1}
                          className="p-4 font-semibold text-gray-900"
                        >
                          GCF 정보
                        </td>
                      </tr>

                      <tr className="border-b border-gray-100">
                        <td className="p-4 font-medium text-gray-700 bg-gray-50">
                          총 프로젝트 가치
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-4 text-gray-900">
                            {project.gcf?.totalProjectValue
                              ? formatCurrency(project.gcf.totalProjectValue)
                              : '-'}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-gray-100">
                        <td className="p-4 font-medium text-gray-700 bg-gray-50">
                          GCF 금융
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-4 text-gray-900">
                            {project.gcf?.totalGcfFunding
                              ? formatCurrency(project.gcf.totalGcfFunding)
                              : '-'}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-gray-100">
                        <td className="p-4 font-medium text-gray-700 bg-gray-50">
                          국가
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-4 text-gray-900">
                            {project.gcf?.countries.join(', ') || '-'}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-gray-100">
                        <td className="p-4 font-medium text-gray-700 bg-gray-50">
                          프로젝트 규모
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-4 text-gray-900">
                            {project.gcf?.projectSize || '-'}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {/* Carbon Metrics */}
                  {selectedProjects.some((p) => p.carbon) && (
                    <>
                      <tr className="border-b border-gray-200 bg-blue-50">
                        <td
                          colSpan={selectedProjects.length + 1}
                          className="p-4 font-semibold text-gray-900"
                        >
                          탄소 크레딧 정보
                        </td>
                      </tr>

                      <tr className="border-b border-gray-100">
                        <td className="p-4 font-medium text-gray-700 bg-gray-50">
                          레지스트리
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-4 text-gray-900">
                            {project.carbon?.registry.toUpperCase() || '-'}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-gray-100">
                        <td className="p-4 font-medium text-gray-700 bg-gray-50">
                          발급 크레딧
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-4 text-gray-900">
                            {project.carbon?.creditQuantity
                              ? `${formatCompactNumber(project.carbon.creditQuantity)} tCO2e`
                              : '-'}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-b border-gray-100">
                        <td className="p-4 font-medium text-gray-700 bg-gray-50">
                          빈티지
                        </td>
                        {selectedProjects.map((project) => (
                          <td key={project.id} className="p-4 text-gray-900">
                            {project.carbon?.vintageRange || '-'}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

