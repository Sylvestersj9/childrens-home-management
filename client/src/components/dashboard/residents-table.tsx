import { FC } from "react";
import { Link } from "wouter";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface Resident {
  id: number;
  name: string;
  age: number;
  photo?: string;
  room: string;
  status: 'present' | 'school' | 'appointment' | 'leave' | 'absent';
  keyWorker: string;
}

interface ResidentsTableProps {
  residents: Resident[];
  onViewAll?: () => void;
}

const ResidentsTable: FC<ResidentsTableProps> = ({ residents, onViewAll }) => {
  const getStatusBadge = (status: Resident['status']) => {
    switch (status) {
      case 'present':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>;
      case 'school':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">School</Badge>;
      case 'appointment':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Appointment</Badge>;
      case 'leave':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Leave</Badge>;
      case 'absent':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Absent</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resident
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Worker
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {residents.map((resident) => (
              <TableRow key={resident.id}>
                <TableCell className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 rounded-full">
                      <AvatarImage src={resident.photo} alt={resident.name} />
                      <AvatarFallback className="bg-primary text-white">
                        {getInitials(resident.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                      <div className="text-sm text-gray-500">Room {resident.room}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{resident.age}</div>
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(resident.status)}
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {resident.keyWorker}
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/residents/${resident.id}`}>
                    <a className="text-primary hover:text-blue-700 mr-3">View</a>
                  </Link>
                  <Link href={`/daily-logs/new?resident=${resident.id}`}>
                    <a className="text-gray-600 hover:text-gray-900">Log</a>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {onViewAll && (
        <div className="mt-4 text-center">
          <button 
            onClick={onViewAll}
            className="text-primary hover:text-blue-700 font-medium text-sm"
          >
            View All Residents
          </button>
        </div>
      )}
    </>
  );
};

export default ResidentsTable;
