import { FC } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface ResidentProfile {
  id: number;
  name: string;
  photo?: string;
  status: 'present' | 'school' | 'appointment' | 'leave' | 'absent';
  age?: number;
  room?: string;
}

interface ResidentSidebarProps {
  residents: ResidentProfile[];
  selectedResidentId: number | null;
  onSelectResident: (id: number) => void;
}

const ResidentSidebar: FC<ResidentSidebarProps> = ({ 
  residents, 
  selectedResidentId, 
  onSelectResident 
}) => {
  // Function to get resident initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Function to get status badge styling
  const getStatusBadge = (status: ResidentProfile['status']) => {
    switch (status) {
      case 'present':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Present</Badge>;
      case 'school':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">School</Badge>;
      case 'appointment':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Appointment</Badge>;
      case 'leave':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Leave</Badge>;
      case 'absent':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Absent</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="resident-sidebar bg-white p-4 rounded-lg shadow h-[calc(100vh-280px)] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Young People</h3>
      
      <div className="space-y-3">
        {residents.map((resident) => (
          <div 
            key={resident.id}
            className={cn(
              "flex items-center p-3 rounded-md cursor-pointer transition-colors",
              {
                "bg-gray-100 border-l-2 border-primary": selectedResidentId === resident.id,
                "hover:bg-gray-50": selectedResidentId !== resident.id
              }
            )}
            onClick={() => onSelectResident(resident.id)}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={resident.photo} alt={resident.name} />
              <AvatarFallback className="bg-primary text-white">
                {getInitials(resident.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{resident.name}</p>
              <div className="flex items-center space-x-2">
                {resident.room && (
                  <span className="text-xs text-gray-500">Room: {resident.room}</span>
                )}
                {resident.age && (
                  <span className="text-xs text-gray-500">Age: {resident.age}</span>
                )}
              </div>
            </div>
            
            <div className="ml-2">
              {getStatusBadge(resident.status)}
            </div>
          </div>
        ))}
        
        {residents.length === 0 && (
          <p className="text-gray-500 text-center py-4">No residents found</p>
        )}
      </div>
    </div>
  );
};

export default ResidentSidebar;