import { useState } from 'react';
import { Download, FileText, Database, CheckCircle, Sparkles, Code2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { formatCompactNumber } from '../utils/format';

const formatOptions = [
  { id: 'csv', name: 'CSV', description: 'Comma-separated values, Excel 호환', icon: FileText },
  { id: 'json', name: 'JSON', description: 'JavaScript Object Notation, API 친화적', icon: Code2 },
  { id: 'excel', name: 'Excel', description: 'Microsoft Excel 파일 (.xlsx)', icon: Database },
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-600 to-sky-600 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container-custom relative z-10 py-16 sm:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Data Export</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Download className="w-9 h-9" strokeWidth={2} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                데이터 다운로드
              </h1>
            </div>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl leading-relaxed">
              기후 프로젝트 데이터를 원하는 형식으로 다운로드하세요
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content */}
      <section className="section -mt-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Info Card */}
            <Card className="p-6 mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Database className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">
                    오픈 데이터 정책
                  </h3>
                  <p className="text-blue-800 leading-relaxed">
                    모든 데이터는 오픈 라이선스 하에 제공됩니다. 
                    연구, 분석, 교육 목적으로 자유롭게 사용하실 수 있습니다.
                    상업적 이용 시에는 출처를 명시해 주세요.
                  </p>
                </div>
              </div>
            </Card>

            {/* Download Form */}
            <Card className="p-8 sm:p-10">
              <div className="mb-8">
                <Badge variant="primary" className="mb-4">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Step 1
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  데이터셋 선택
                </h2>
                <p className="text-gray-600">
                  다운로드할 데이터의 범위를 선택하세요
                </p>
              </div>

              {/* Dataset Selection */}
              <div className="mb-10">
                <div className="space-y-4">
                  {datasetOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedDataset(option.id)}
                      className={`w-full p-5 rounded-xl border-2 transition-all text-left group ${
                        selectedDataset === option.id
                          ? 'border-cyan-500 bg-cyan-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">
                              {option.name}
                            </h3>
                            <Badge variant={selectedDataset === option.id ? "secondary" : "default"}>
                              {formatCompactNumber(option.count)}개
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                        </div>
                        {selectedDataset === option.id && (
                          <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 ml-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Selection */}
              <div className="mb-10">
                <Badge variant="primary" className="mb-4">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Step 2
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  파일 형식
                </h2>
                <p className="text-gray-600 mb-6">
                  데이터를 내보낼 파일 형식을 선택하세요
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formatOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedFormat(option.id)}
                        className={`p-6 rounded-xl border-2 transition-all group ${
                          selectedFormat === option.id
                            ? 'border-cyan-500 bg-cyan-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <Icon className={`w-8 h-8 ${
                            selectedFormat === option.id ? 'text-cyan-600' : 'text-gray-400 group-hover:text-gray-600'
                          }`} strokeWidth={2} />
                          {selectedFormat === option.id && (
                            <CheckCircle className="w-6 h-6 text-cyan-600" />
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {option.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Options */}
              <div className="mb-10">
                <Badge variant="primary" className="mb-4">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Step 3
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  추가 옵션
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-4 p-5 rounded-xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                    <input
                      type="checkbox"
                      checked={includeFilters}
                      onChange={(e) => setIncludeFilters(e.target.checked)}
                      className="w-5 h-5 text-cyan-600 rounded mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">
                        현재 필터 적용
                      </p>
                      <p className="text-sm text-gray-600">
                        현재 페이지의 필터링된 결과만 다운로드합니다
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Download Button */}
              <div className="pt-8 border-t border-gray-200">
                <Button
                  onClick={handleDownload}
                  size="lg"
                  className="w-full text-lg font-bold shadow-xl hover:shadow-2xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  데이터 다운로드
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  다운로드는 몇 초 정도 소요될 수 있습니다
                </p>
              </div>
            </Card>

            {/* API Info */}
            <Card className="p-8 mt-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Code2 className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    API를 통한 데이터 접근
                  </h3>
                  <p className="text-gray-600">
                    프로그래밍 방식으로 데이터에 접근하려면 REST API를 사용하세요.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-950 text-gray-100 p-6 rounded-xl font-mono text-sm overflow-x-auto border border-gray-800">
                <div className="text-green-400 mb-1"># GET /api/projects</div>
                <div className="text-gray-400">
                  curl https://api.climatedata.hub/projects
                </div>
              </div>
              
              <div className="mt-6">
                <a
                  href="/api-docs"
                  className="text-cyan-600 hover:text-cyan-700 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  API 문서 보기
                  <span>→</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
