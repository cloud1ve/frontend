import { useState } from 'react';
import { Download, FileText, Database, CheckCircle } from 'lucide-react';

const formatOptions = [
  { id: 'csv', name: 'CSV', description: 'Comma-separated values, Excel 호환' },
  { id: 'json', name: 'JSON', description: 'JavaScript Object Notation, API 친화적' },
  { id: 'excel', name: 'Excel', description: 'Microsoft Excel 파일 (.xlsx)' },
];

const datasetOptions = [
  { id: 'all', name: '전체 데이터셋', count: 488084, description: 'GCF + CarbonPlan 통합 데이터' },
  { id: 'gcf', name: 'GCF 프로젝트만', count: 150, description: 'Green Climate Fund 프로젝트' },
  { id: 'carbon', name: '탄소 상쇄 프로젝트만', count: 487934, description: 'CarbonPlan 레지스트리 데이터' },
];

export function DownloadPage() {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedDataset, setSelectedDataset] = useState('all');
  const [includeFilters, setIncludeFilters] = useState(false);

  const handleDownload = () => {
    // TODO: 실제 다운로드 로직 구현
    alert(`다운로드 시작!\n형식: ${selectedFormat}\n데이터셋: ${selectedDataset}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="container-custom py-16">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-12 h-12" />
            <h1 className="heading-2">데이터 다운로드</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            기후 프로젝트 데이터를 원하는 형식으로 다운로드하세요
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Info Card */}
            <div className="card p-6 mb-8 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-4">
                <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    오픈 데이터 정책
                  </h3>
                  <p className="text-blue-800 text-sm">
                    모든 데이터는 오픈 라이선스 하에 제공됩니다. 
                    연구, 분석, 교육 목적으로 자유롭게 사용하실 수 있습니다.
                    상업적 이용 시에는 출처를 명시해 주세요.
                  </p>
                </div>
              </div>
            </div>

            {/* Download Form */}
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                다운로드 설정
              </h2>

              {/* Dataset Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  데이터셋 선택
                </label>
                <div className="space-y-3">
                  {datasetOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedDataset(option.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedDataset === option.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {option.name}
                            </h3>
                            <span className="text-sm text-gray-600">
                              ({option.count.toLocaleString()}개)
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                        </div>
                        {selectedDataset === option.id && (
                          <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  파일 형식
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {formatOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedFormat(option.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedFormat === option.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="w-6 h-6 text-gray-400" />
                        {selectedFormat === option.id && (
                          <CheckCircle className="w-5 h-5 text-primary-600" />
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {option.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  추가 옵션
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeFilters}
                      onChange={(e) => setIncludeFilters(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        현재 필터 적용
                      </p>
                      <p className="text-xs text-gray-600">
                        현재 페이지의 필터링된 결과만 다운로드
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Download Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleDownload}
                  className="btn-primary w-full justify-center text-lg py-4"
                >
                  <Download className="w-5 h-5 mr-2" />
                  데이터 다운로드
                </button>
                <p className="text-sm text-gray-500 text-center mt-3">
                  다운로드는 몇 초 정도 소요될 수 있습니다
                </p>
              </div>
            </div>

            {/* API Info */}
            <div className="card p-6 mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                API를 통한 데이터 접근
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                프로그래밍 방식으로 데이터에 접근하려면 REST API를 사용하세요.
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-green-400"># GET /api/projects</div>
                <div className="text-gray-400 mt-2">
                  curl https://api.climatedata.hub/projects
                </div>
              </div>
              <div className="mt-4">
                <a
                  href="/api-docs"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center"
                >
                  API 문서 보기 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

