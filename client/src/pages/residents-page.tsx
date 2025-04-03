import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  UserPlus, 
  Search, 
  Filter, 
  X,
  Users
} from "lucide-react";
import { Resident } from "@/components/dashboard/residents-table";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { ResidentFormModal } from "@/components/residents/resident-form-modal";
import { ResidentSidebar } from "@/components/residents/resident-sidebar";
import { ResidentDetail } from "@/components/residents/resident-detail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ResidentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);

  // Sample residents data - in a real app this would come from API
  const { data: residents = [], isLoading } = useQuery<Resident[]>({
    queryKey: ["/api/residents"],
    queryFn: () => {
      // Simulated data as we don't have a real API yet
      return [
        {
          id: 1,
          name: "Alex Matthews",
          age: 14,
          room: "12",
          status: "present",
          keyWorker: "Sarah Johnson"
        },
        {
          id: 2,
          name: "Jamie Parker",
          age: 16,
          room: "8",
          status: "present",
          keyWorker: "Mark Wilson"
        },
        {
          id: 3,
          name: "Taylor Smith",
          age: 15,
          room: "5",
          status: "school",
          keyWorker: "Lisa Chen"
        },
        {
          id: 4,
          name: "Riley Cooper",
          age: 17,
          room: "3",
          status: "appointment",
          keyWorker: "Dr. James Rodriguez"
        },
        {
          id: 5,
          name: "Jordan Bailey",
          age: 13,
          room: "7",
          status: "present",
          keyWorker: "Sarah Johnson"
        },
        {
          id: 6,
          name: "Casey Morgan",
          age: 16,
          room: "9",
          status: "leave",
          keyWorker: "Mark Wilson"
        },
        {
          id: 7,
          name: "Avery Wilson",
          age: 14,
          room: "11",
          status: "school",
          keyWorker: "Lisa Chen"
        },
        {
          id: 8,
          name: "Quinn Thomas",
          age: 15,
          room: "6",
          status: "present",
          keyWorker: "Dr. James Rodriguez"
        }
      ];
    },
  });

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

  const filteredResidents = residents
    .filter(resident => 
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.keyWorker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.room.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(resident => 
      statusFilter === 'all' || resident.status === statusFilter
    );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const handleSelectResident = (resident: Resident) => {
    setSelectedResident(resident);
  };
  
  const handleBack = () => {
    setSelectedResident(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Resident Form Modal */}
      <ResidentFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Header title="Residents" toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-0 bg-gray-50 h-[calc(100vh-4rem)] overflow-hidden">
          {!selectedResident ? (
            // Residents List View
            <div className="p-4 lg:p-6 h-full overflow-y-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">Residents</h1>
                  <p className="text-gray-600">Manage all residents and their details</p>
                </div>
                <Button 
                  className="mt-4 md:mt-0"
                  onClick={() => setIsFormModalOpen(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Resident
                </Button>
              </div>

              <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search residents..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchTerm("")}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                <div className="w-full md:w-56 flex items-center gap-2">
                  <Filter size={18} className="text-gray-400" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="leave">Leave</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mx-auto"></div>
                  <p className="mt-4 text-gray-500">Loading residents...</p>
                </div>
              ) : filteredResidents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No residents found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResidents.map(resident => (
                    <Card key={resident.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{resident.name}</CardTitle>
                          {getStatusBadge(resident.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-14 w-14 rounded-full mr-3">
                            <AvatarImage src={resident.photo} alt={resident.name} />
                            <AvatarFallback className="bg-primary text-white text-lg">
                              {getInitials(resident.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-gray-500 text-sm">Room {resident.room}</p>
                            <p className="text-gray-500 text-sm">Age: {resident.age}</p>
                            <p className="text-gray-500 text-sm">Key Worker: {resident.keyWorker}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 flex justify-between pt-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSelectResident(resident)}
                        >
                          Profile
                        </Button>
                        <Button variant="ghost" size="sm">Daily Log</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Resident Detail View with sidebar layout
            <div className="flex h-full">
              <div className="hidden lg:block">
                <ResidentSidebar
                  residents={residents}
                  selectedResidentId={selectedResident.id}
                  onSelectResident={handleSelectResident}
                />
              </div>
              <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                <ResidentDetail 
                  resident={selectedResident} 
                  onBack={handleBack} 
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
