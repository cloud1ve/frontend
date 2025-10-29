import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: '홈', href: '/' },
    { name: '프로젝트', href: '/projects' },
    { name: 'GCF', href: '/gcf' },
    { name: '탄소 상쇄', href: '/carbon-offsets' },
    { name: '통계', href: '/analytics' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-gray-900 tracking-tight">
                Climate Action Hub
              </div>
              <div className="text-xs text-gray-500 font-medium">
                기후 행동 데이터 플랫폼
              </div>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/download">
              <Button variant="outline" size="sm" className="font-semibold">
                데이터 다운로드
              </Button>
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            type="button"
            className="md:hidden p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 focus-ring transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-lg animate-slide-down">
          <div className="container-custom py-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `block px-5 py-3.5 rounded-lg text-base font-semibold transition-colors ${
                    isActive
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4">
              <Link
                to="/download"
                className="block btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                데이터 다운로드
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

