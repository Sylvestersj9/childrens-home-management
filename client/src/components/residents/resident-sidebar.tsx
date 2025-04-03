import { FC, useState } from 'react';
import { Search, User, X, Home, Calendar, UserCheck, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Resident } from '@/components/dashboard/residents-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResidentSidebarProps {
  residents: Resident[];
  selectedResidentId: number | null;
  onSelectResident: (resident: Resident) => void;
}

export const ResidentSidebar: FC<ResidentSidebarProps> = ({
  residents,
  selectedResidentId,
  onSelectResident,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusIndicator = (status: Resident['status']) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'school':
        return 'bg-yellow-500';
      case 'appointment':
        return 'bg-red-500';
      case 'leave':
        return 'bg-blue-500';
      case 'absent':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full lg:w-80 h-full flex flex-col overflow-hidden bg-gray-50 border-r">
      <div className="p-4 border-b">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium">Residents</h2>
          <Badge className="ml-2">{residents.length}</Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search residents..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm('')}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredResidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <User className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-gray-500 mb-1">No residents found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search term</p>
          </div>
        ) : (
          <div className="px-3 py-2">
            {filteredResidents.map((resident) => (
              <TooltipProvider key={resident.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      key={resident.id}
                      variant="ghost"
                      className={`w-full justify-start px-3 py-6 mb-2 ${
                        selectedResidentId === resident.id ? 'bg-white shadow-sm' : ''
                      }`}
                      onClick={() => onSelectResident(resident)}
                    >
                      <div className="flex items-start w-full">
                        <div className="relative mr-3">
                          <Avatar>
                            <AvatarImage src={resident.photo} alt={resident.name} />
                            <AvatarFallback className="bg-primary text-white">
                              {getInitials(resident.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusIndicator(
                              resident.status
                            )}`}
                          ></span>
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="font-medium">{resident.name}</span>
                          <div className="grid gap-1 mt-1">
                            <div className="flex items-center text-xs text-gray-500">
                              <Home className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">Room {resident.room}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">Age {resident.age}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <UserCheck className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{resident.keyWorker}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <div className="text-sm">
                      <div className="flex items-center">
                        <p className="font-semibold text-base">{resident.name}</p>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            resident.status === 'present' ? 'bg-green-100 text-green-800' :
                            resident.status === 'school' ? 'bg-yellow-100 text-yellow-800' :
                            resident.status === 'appointment' ? 'bg-red-100 text-red-800' :
                            resident.status === 'leave' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {resident.status.charAt(0).toUpperCase() + resident.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="mt-2 grid gap-1">
                        <p className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-gray-500" />
                          Room {resident.room}
                        </p>
                        <p className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          {resident.age} years old
                        </p>
                        <p className="flex items-center">
                          <UserCheck className="h-4 w-4 mr-2 text-gray-500" />
                          Key Worker: {resident.keyWorker}
                        </p>
                        <p className="flex items-center mt-1 text-xs text-gray-500">
                          <Info className="h-3 w-3 mr-1" />
                          Click for full profile
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};