import { FC } from "react";
import { cn } from "@/lib/utils";

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'medication' | 'transport' | 'therapy' | 'activity' | 'other';
}

interface ScheduleProps {
  events: ScheduleEvent[];
  onViewFullCalendar?: () => void;
}

const Schedule: FC<ScheduleProps> = ({ events, onViewFullCalendar }) => {
  const getEventStyles = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'medication':
        return {
          bg: 'bg-blue-50',
          border: 'border-primary'
        };
      case 'transport':
        return {
          bg: 'bg-purple-50',
          border: 'border-accent'
        };
      case 'therapy':
        return {
          bg: 'bg-green-50',
          border: 'border-secondary'
        };
      case 'activity':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-400'
        };
    }
  };

  return (
    <div className="space-y-4">
      {events.map(event => {
        const styles = getEventStyles(event.type);
        
        return (
          <div key={event.id} className="flex items-start">
            <div className="flex-shrink-0 w-12 text-right mr-4">
              <span className="text-sm font-semibold text-gray-600">{event.time}</span>
            </div>
            <div className={cn(
              "flex-grow rounded-lg p-3 border-l-4",
              styles.bg,
              styles.border
            )}>
              <h4 className="font-medium text-gray-800">{event.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            </div>
          </div>
        );
      })}

      {onViewFullCalendar && (
        <div className="mt-4 text-center">
          <button
            onClick={onViewFullCalendar}
            className="text-primary hover:text-blue-700 font-medium text-sm"
          >
            View Full Calendar
          </button>
        </div>
      )}
    </div>
  );
};

export default Schedule;
