import { FC } from "react";
import { FileText, ClipboardCheck, Calendar, AlertTriangle, Edit } from "lucide-react";

export interface Activity {
  id: string;
  type: 'log' | 'medication' | 'event' | 'incident' | 'update';
  message: {
    actor: string;
    action: string;
    subject?: string;
  };
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  onViewAllClick?: () => void;
}

const ActivityFeed: FC<ActivityFeedProps> = ({ activities, onViewAllClick }) => {
  const getIconForType = (type: Activity['type']) => {
    switch (type) {
      case 'log':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
            <FileText className="h-5 w-5" />
          </div>
        );
      case 'medication':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <ClipboardCheck className="h-5 w-5" />
          </div>
        );
      case 'event':
        return (
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <Calendar className="h-5 w-5" />
          </div>
        );
      case 'incident':
        return (
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
        );
      case 'update':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Edit className="h-5 w-5" />
          </div>
        );
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-5">
      {activities.map((activity) => (
        <div key={activity.id} className="flex">
          <div className="flex-shrink-0 mr-3">
            {getIconForType(activity.type)}
          </div>
          <div>
            <p className="text-gray-800">
              <span className="font-medium">{activity.message.actor}</span> {activity.message.action} 
              {activity.message.subject && (
                <span className="font-medium"> {activity.message.subject}</span>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-1">{formatTimestamp(activity.timestamp)}</p>
          </div>
        </div>
      ))}

      {onViewAllClick && (
        <div className="mt-6 text-center">
          <button 
            onClick={onViewAllClick}
            className="text-primary hover:text-blue-700 font-medium text-sm"
          >
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
