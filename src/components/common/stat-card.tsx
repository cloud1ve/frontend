import type { LucideIcon } from 'lucide-react';
import { formatCompactNumber } from '../../utils/format';
import { Card } from '../ui/card';

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
  colorClass = 'text-emerald-600',
}: StatCardProps) {
  const displayValue =
    typeof value === 'number' ? formatCompactNumber(value) : value;

  return (
    <Card className="stat-card group cursor-default">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">{title}</p>
          <div className="flex items-baseline gap-2.5">
            <h3 className="text-4xl lg:text-5xl font-bold font-mono text-gray-900 tracking-tight">
              {displayValue}
            </h3>
            {suffix && (
              <span className="text-base font-semibold text-gray-500">{suffix}</span>
            )}
          </div>
          {trend && (
            <div className="mt-3 flex items-center gap-1.5">
              <span
                className={`text-sm font-semibold ${
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
          className={`p-3.5 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm group-hover:shadow-md transition-all ${colorClass}`}
        >
          <Icon className="w-8 h-8" strokeWidth={2} />
        </div>
      </div>
    </Card>
  );
}

