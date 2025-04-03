import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  secondaryText?: string;
}

const StatCard: FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  iconBgColor = "bg-blue-100", 
  iconColor = "text-primary",
  trend,
  secondaryText
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className={cn("rounded-full p-2", iconBgColor)}>
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        {trend && (
          <span className={cn(
            "ml-2 text-sm font-medium flex items-center",
            trend.isPositive ? "text-green-500" : "text-red-500"
          )}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={trend.isPositive 
                  ? "M5 10l7-7m0 0l7 7m-7-7v18" 
                  : "M19 14l-7 7m0 0l-7-7m7 7V3"} 
              />
            </svg>
            <span className="ml-1">{trend.value}</span>
          </span>
        )}
        {secondaryText && (
          <span className="ml-2 text-sm font-medium text-gray-500">{secondaryText}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
