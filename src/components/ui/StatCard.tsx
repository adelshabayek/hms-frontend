import { TrendingUp, TrendingDown } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  delay = 0,
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;
  const trendAbs = trend !== undefined ? Math.abs(trend) : 0;

  return (
    <div
      className="bg-card rounded-2xl border border-border p-5 flex flex-col gap-4 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-0.5 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-1 leading-none">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={`w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1.5">
          <div
            className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md ${
              isPositive
                ? "bg-accent/10 text-accent"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trendAbs}%
          </div>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}
