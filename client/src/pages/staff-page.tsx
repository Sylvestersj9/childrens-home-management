import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  UserPlus, 
  Search, 
  Filter, 
  X, 
  Users,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { StaffFormModal } from "@/components/staff/staff-form-modal";
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

interface StaffMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  photo?: string;
  status: 'active' | 'off-duty' | 'leave' | 'training';
  nextShift?: string;
}

export default function StaffPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Sample staff data - in a real app this would come from API
  const { data: staffMembers = [], isLoading } = useQuery<StaffMember[]>({
    queryKey: ["/api/staff"],
    queryFn: () => {
      // Simulated data as we don't have a real API yet
      return [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Home Manager",
          email: "sarah.johnson@example.com",
          phone: "555-0123",
          status: "active",
          nextShift: "Today, 8:00 AM - 4:00 PM"
        },
        {
          id: 2,
          name: "Mark Wilson",
          role: "Senior Care Worker",
          email: "mark.wilson@example.com",
          phone: "555-0124",
          status: "active",
          nextShift: "Today, 2:00 PM - 10:00 PM"
        },
        {
          id: 3,
          name: "Lisa Chen",
          role: "Care Worker",
          email: "lisa.chen@example.com",
          phone: "555-0125",
          status: "off-duty",
          nextShift: "Tomorrow, 8:00 AM - 4:00 PM"
        },
        {
          id: 4,
          name: "Dr. James Rodriguez",
          role: "Psychologist",
          email: "james.rodriguez@example.com",
          phone: "555-0126",
          status: "leave",
          nextShift: "Next Monday, 9:00 AM - 5:00 PM"
        },
        {
          id: 5,
          name: "Emily Taylor",
          role: "Care Worker",
          email: "emily.taylor@example.com",
          phone: "555-0127",
          status: "active",
          nextShift: "Today, 6:00 PM - 2:00 AM"
        },
        {
          id: 6,
          name: "David Patel",
          role: "Senior Care Worker",
          email: "david.patel@example.com",
          phone: "555-0128",
          status: "training",
          nextShift: "Thursday, 8:00 AM - 4:00 PM"
        },
        {
          id: 7,
          name: "Sophie Adams",
          role: "Care Worker",
          email: "sophie.adams@example.com",
          phone: "555-0129",
          status: "off-duty",
          nextShift: "Wednesday, 2:00 PM - 10:00 PM"
        },
        {
          id: 8,
          name: "Michael Brown",
          role: "Maintenance",
          email: "michael.brown@example.com",
          phone: "555-0130",
          status: "active",
          nextShift: "Today, 9:00 AM - 5:00 PM"
        }
      ];
    },
  });

  const getStatusBadge = (status: StaffMember['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'off-duty':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Off Duty</Badge>;
      case 'leave':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">On Leave</Badge>;
      case 'training':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Training</Badge>;
      default:
        return null;
    }
  };

  const filteredStaff = staffMembers
    .filter(staff => 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(staff => 
      roleFilter === 'all' || staff.role.toLowerCase().includes(roleFilter.toLowerCase())
    );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Staff Form Modal */}
      <StaffFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Header title="Staff" toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-4 lg:p-6 bg-gray-50 min-h-screen overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Staff</h1>
              <p className="text-gray-600">Manage staff members and their schedules</p>
            </div>
            <Button 
              className="mt-4 md:mt-0"
              onClick={() => setIsFormModalOpen(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Staff
            </Button>
          </div>

          <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search staff..."
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
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="senior">Senior Care Worker</SelectItem>
                  <SelectItem value="care worker">Care Worker</SelectItem>
                  <SelectItem value="psychologist">Psychologist</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading staff...</p>
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No staff members found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStaff.map(staff => (
                <Card key={staff.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{staff.name}</CardTitle>
                      {getStatusBadge(staff.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-14 w-14 rounded-full mr-3">
                        <AvatarImage src={staff.photo} alt={staff.name} />
                        <AvatarFallback className="bg-primary text-white text-lg">
                          {getInitials(staff.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-gray-500 text-sm">{staff.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{staff.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{staff.phone}</span>
                      </div>
                      {staff.nextShift && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{staff.nextShift}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 flex justify-between pt-3">
                    <Button variant="outline" size="sm">Profile</Button>
                    <Button variant="ghost" size="sm">Schedule</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
