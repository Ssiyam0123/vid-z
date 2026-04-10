import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
}

export function MetricsCard({ title, value, description, icon: Icon, trend }: MetricsCardProps) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          
          {(description || trend) && (
            <div className="mt-2 flex items-center gap-2 text-sm">
              {trend && (
                <span className={`font-semibold ${trend.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {trend.isUp ? '+' : '-'}{trend.value}%
                </span>
              )}
              {description && <span className="text-muted-foreground">{description}</span>}
            </div>
          )}
        </div>
        <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
