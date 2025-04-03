import { FC } from "react";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AlertsProps {
  alerts: Alert[];
}

const Alerts: FC<AlertsProps> = ({ alerts }) => {
  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-500',
          titleColor: 'text-red-800',
          textColor: 'text-red-700',
          actionColor: 'text-red-800 hover:text-red-600',
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-500',
          titleColor: 'text-yellow-800',
          textColor: 'text-yellow-700',
          actionColor: 'text-yellow-800 hover:text-yellow-600',
          icon: <AlertCircle className="h-5 w-5 text-yellow-500" />
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-500',
          titleColor: 'text-blue-800',
          textColor: 'text-blue-700',
          actionColor: 'text-blue-800 hover:text-blue-600',
          icon: <Info className="h-5 w-5 text-blue-500" />
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-500',
          titleColor: 'text-gray-800',
          textColor: 'text-gray-700',
          actionColor: 'text-gray-800 hover:text-gray-600',
          icon: <Info className="h-5 w-5 text-gray-500" />
        };
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map(alert => {
        const styles = getAlertStyles(alert.type);
        
        return (
          <div key={alert.id} className={cn(
            "border-l-4 p-4",
            styles.bg,
            styles.border
          )}>
            <div className="flex">
              <div className="flex-shrink-0">
                {styles.icon}
              </div>
              <div className="ml-3">
                <h3 className={cn("text-sm font-medium", styles.titleColor)}>
                  {alert.title}
                </h3>
                <div className={cn("mt-1 text-sm", styles.textColor)}>
                  <p>{alert.description}</p>
                </div>
                {alert.action && (
                  <div className="mt-2">
                    <button 
                      type="button" 
                      className={cn("text-sm font-medium", styles.actionColor)}
                      onClick={alert.action.onClick}
                    >
                      {alert.action.label}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Alerts;
