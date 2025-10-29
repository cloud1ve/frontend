import { Link } from 'react-router-dom';
import { Leaf, Github, Mail, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200/50 mt-auto">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* 브랜드 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 tracking-tight">
                  Climate Action Hub
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  기후 행동 데이터 플랫폼
                </div>
              </div>
            </div>
            <p className="text-base text-gray-600 max-w-md leading-relaxed mb-6">
              전 세계 기후 프로젝트 데이터를 통합하여 투명하고 접근 가능한 
              정보를 제공합니다. GCF와 CarbonPlan 데이터를 기반으로 합니다.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>for the planet</span>
            </div>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wide">
              탐색
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/projects" className="text-base text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  프로젝트 목록
                </Link>
              </li>
              <li>
                <Link to="/gcf" className="text-base text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  GCF 프로젝트
                </Link>
              </li>
              <li>
                <Link to="/carbon-offsets" className="text-base text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  탄소 상쇄
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-base text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  통계 및 분석
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-base text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  데이터 다운로드
                </Link>
              </li>
            </ul>
          </div>

          {/* 정보 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wide">
              정보
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  소개
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="text-base text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  방법론
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              © {currentYear} Climate Action Hub. All rights reserved.
              <br className="sm:hidden" />
              <span className="text-gray-400 ml-2">데이터 출처: GCF, CarbonPlan</span>
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:contact@example.com"
                className="p-2 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                aria-label="GitHub"
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

