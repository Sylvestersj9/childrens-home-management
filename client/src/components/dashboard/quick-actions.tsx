import { FC, ReactNode } from "react";
import { FileText, AlertTriangle, Calendar, FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  label: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const defaultActions: QuickAction[] = [
  {
    id: 'new-daily-log',
    label: 'New Daily Log',
    icon: <FileText className="h-6 w-6 mb-2" />,
    bgColor: 'text-primary',
    textColor: 'text-gray-700',
    onClick: () => {}
  },
  {
    id: 'report-incident',
    label: 'Report Incident',
    icon: <AlertTriangle className="h-6 w-6 mb-2" />,
    bgColor: 'text-red-500',
    textColor: 'text-gray-700',
    onClick: () => {}
  },
  {
    id: 'add-event',
    label: 'Add Event',
    icon: <Calendar className="h-6 w-6 mb-2" />,
    bgColor: 'text-purple-500',
    textColor: 'text-gray-700',
    onClick: () => {}
  },
  {
    id: 'upload-document',
    label: 'Upload Document',
    icon: <FolderPlus className="h-6 w-6 mb-2" />,
    bgColor: 'text-green-500',
    textColor: 'text-gray-700',
    onClick: () => {}
  }
];

const QuickActions: FC<QuickActionsProps> = ({ actions = defaultActions }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map(action => (
        <button 
          key={action.id}
          className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200"
          onClick={action.onClick}
        >
          <div className={cn(action.bgColor)}>
            {action.icon}
          </div>
          <span className={cn("text-sm font-medium", action.textColor)}>{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
