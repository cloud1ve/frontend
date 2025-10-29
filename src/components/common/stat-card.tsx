import type { LucideIcon } from 'lucide-react';
import { formatCompactNumber } from '../../utils/format';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  suffix?: string;
  colorClass?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  suffix,
  colorClass = 'text-primary-500',
}: StatCardProps) {
  const displayValue =
    typeof value === 'number' ? formatCompactNumber(value) : value;

  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-4xl font-bold font-mono text-gray-900">
              {displayValue}
            </h3>
            {suffix && (
              <span className="text-lg text-gray-500">{suffix}</span>
            )}
          </div>
          {trend && (
            <div className="mt-2 flex items-center space-x-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-gray-500">전월 대비</span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow ${colorClass}`}
        >
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

