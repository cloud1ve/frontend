import { format, parseISO } from 'date-fns';

// 숫자 포맷팅 (천 단위 콤마)
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '-';
  return new Intl.NumberFormat('ko-KR').format(num);
}

// 금액 포맷팅 (USD)
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// 큰 숫자 축약 (1,000,000 → 1M)
export function formatCompactNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '-';
  
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

// 날짜 포맷팅
export function formatDate(
  date: string | Date | null | undefined,
  formatStr: string = 'yyyy-MM-dd'
): string {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch {
    return '-';
  }
}

// 상대적 날짜 (예: "2 days ago")
export function formatRelativeDate(date: string | Date | null | undefined): string {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
    return `${Math.floor(diffDays / 365)}년 전`;
  } catch {
    return '-';
  }
}

// 프로젝트 크기 한글화
export function formatProjectSize(size: string | null | undefined): string {
  if (!size) return '-';
  
  const sizeMap: Record<string, string> = {
    'Small': '소규모',
    'Medium': '중규모',
    'Large': '대규모',
  };
  
  return sizeMap[size] || size;
}

// 테마 한글화
export function formatTheme(theme: string | null | undefined): string {
  if (!theme) return '-';
  
  const themeMap: Record<string, string> = {
    'Adaptation': '적응',
    'Mitigation': '완화',
    'Cross-cutting': '통합',
  };
  
  return themeMap[theme] || theme;
}

// 레지스트리 이름 정리
export function formatRegistry(registry: string | null | undefined): string {
  if (!registry) return '-';
  
  const registryMap: Record<string, string> = {
    'verra': 'Verra (VCS)',
    'gold-standard': 'Gold Standard',
    'car': 'Climate Action Reserve',
    'acr': 'American Carbon Registry',
    'art': 'ART REDD+',
  };
  
  return registryMap[registry.toLowerCase()] || registry.toUpperCase();
}

// 퍼센티지 포맷팅
export function formatPercentage(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-';
  return `${value.toFixed(1)}%`;
}

// 텍스트 축약 (긴 텍스트)
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

// 소스 뱃지 색상
export function getSourceBadgeClass(source: 'GCF' | 'CarbonPlan'): string {
  return source === 'GCF' ? 'badge-gcf' : 'badge-carbon';
}

// 테마 뱃지 색상
export function getThemeBadgeClass(theme: string | null): string {
  if (!theme) return 'badge';
  
  const themeMap: Record<string, string> = {
    'Mitigation': 'badge-mitigation',
    'Adaptation': 'badge-adaptation',
    'Cross-cutting': 'badge-crosscutting',
  };
  
  return themeMap[theme] || 'badge';
}

