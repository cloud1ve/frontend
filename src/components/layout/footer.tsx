import { Link } from 'react-router-dom';
import { Globe, Github, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  Climate Action Hub
                </div>
                <div className="text-sm text-gray-500">
                  기후 행동 데이터 플랫폼
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              전 세계 기후 프로젝트 데이터를 통합하여 투명하고 접근 가능한 
              정보를 제공합니다. GCF와 CarbonPlan 데이터를 기반으로 합니다.
            </p>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              탐색
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects" className="text-sm text-gray-600 hover:text-primary-600">
                  프로젝트 목록
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-sm text-gray-600 hover:text-primary-600">
                  통계 및 분석
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-sm text-gray-600 hover:text-primary-600">
                  데이터 다운로드
                </Link>
              </li>
            </ul>
          </div>

          {/* 정보 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              정보
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary-600">
                  소개
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="text-sm text-gray-600 hover:text-primary-600">
                  방법론
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary-600 flex items-center gap-1"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Climate Action Hub. 
              데이터 출처: GCF, CarbonPlan
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:contact@example.com"
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

