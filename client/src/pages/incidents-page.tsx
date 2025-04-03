import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Plus, 
  Search, 
  Filter, 
  X, 
  AlertTriangle,
  Calendar,
  Clock,
  User
} from "lucide-react";
import { format } from "date-fns";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Incident {
  id: string;
  title: string;
  residentName: string;
  reportedBy: string;
  timestamp: string;
  category: 'accident' | 'behavior' | 'security' | 'safeguarding' | 'other';
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'under-investigation' | 'resolved';
  description: string;
}

export default function IncidentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");

  // Sample incidents data - in a real app this would come from API
  const { data: incidents = [], isLoading } = useQuery<Incident[]>({
    queryKey: ["/api/incidents"],
    queryFn: () => {
      // Simulated data as we don't have a real API yet
      return [
        {
          id: "1",
          title: "Fall in the garden",
          residentName: "Alex Matthews",
          reportedBy: "Sarah Johnson",
          timestamp: new Date().toISOString(),
          category: "accident",
          severity: "medium",
          status: "open",
          description: "Alex slipped on wet grass in the garden. Minor abrasion on right knee. First aid administered. Parents notified."
        },
        {
          id: "2",
          title: "Medication administration error",
          residentName: "Jamie Parker",
          reportedBy: "Mark Wilson",
          timestamp: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
          category: "safeguarding",
          severity: "high",
          status: "under-investigation",
          description: "Jamie was given incorrect dosage of medication. Doctor contacted immediately. No adverse effects observed. Full investigation underway."
        },
        {
          id: "3",
          title: "Verbal altercation between residents",
          residentName: "Taylor Smith and Riley Cooper",
          reportedBy: "Lisa Chen",
          timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
          category: "behavior",
          severity: "low",
          status: "resolved",
          description: "Taylor and Riley had a verbal altercation over TV program. Situation de-escalated by staff. Both residents spoke with key workers separately."
        },
        {
          id: "4",
          title: "Window found unlocked overnight",
          residentName: "N/A",
          reportedBy: "Michael Brown",
          timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
          category: "security",
          severity: "medium",
          status: "resolved",
          description: "Ground floor window in the common room found unlocked during morning checks. No evidence of entry. Security protocols reviewed with all staff."
        },
        {
          id: "5",
          title: "Unauthorized visitor attempt",
          residentName: "Riley Cooper",
          reportedBy: "Emily Taylor",
          timestamp: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
          category: "security",
          severity: "high",
          status: "resolved",
          description: "Unknown individual attempted to visit Riley, claiming to be a relative. Not on approved contacts list. Police notified. All staff briefed."
        },
        {
          id: "6",
          title: "Self-harm risk identified",
          residentName: "Jamie Parker",
          reportedBy: "Dr. James Rodriguez",
          timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
          category: "safeguarding",
          severity: "high",
          status: "open",
          description: "During therapy session, Jamie expressed thoughts of self-harm. Safety plan implemented. Increased monitoring in place. Mental health team contacted."
        }
      ];
    },
  });

  const getCategoryBadge = (category: Incident['category']) => {
    switch (category) {
      case 'accident':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Accident</Badge>;
      case 'behavior':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Behavior</Badge>;
      case 'security':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Security</Badge>;
      case 'safeguarding':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Safeguarding</Badge>;
      case 'other':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Other</Badge>;
      default:
        return null;
    }
  };
  
  const getSeverityBadge = (severity: Incident['severity']) => {
    switch (severity) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0">Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-0">Medium</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-0">High</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: Incident['status']) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="bg-red-50 text-red-800 hover:bg-red-50">Open</Badge>;
      case 'under-investigation':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-50">Under Investigation</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-800 hover:bg-green-50">Resolved</Badge>;
      default:
        return null;
    }
  };

  const getFilteredIncidents = () => {
    let filtered = incidents;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(incident => 
        incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(incident => incident.status === statusFilter);
    }
    
    // Filter by severity
    if (severityFilter !== 'all') {
      filtered = filtered.filter(incident => incident.severity === severityFilter);
    }
    
    // Filter by tab (time period)
    const now = new Date();
    if (activeTab === 'today') {
      filtered = filtered.filter(incident => {
        const incidentDate = new Date(incident.timestamp);
        return incidentDate.toDateString() === now.toDateString();
      });
    } else if (activeTab === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(incident => {
        const incidentDate = new Date(incident.timestamp);
        return incidentDate >= weekAgo;
      });
    } else if (activeTab === 'month') {
      const monthAgo = new Date(now);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      filtered = filtered.filter(incident => {
        const incidentDate = new Date(incident.timestamp);
        return incidentDate >= monthAgo;
      });
    } else if (activeTab === 'unresolved') {
      filtered = filtered.filter(incident => incident.status !== 'resolved');
    }
    
    return filtered;
  };

  const filteredIncidents = getFilteredIncidents();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Header title="Incidents" toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-4 lg:p-6 bg-gray-50 min-h-screen overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Incidents</h1>
              <p className="text-gray-600">Report and manage incidents and safeguarding concerns</p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Report New Incident
            </Button>
          </div>

          <div className="mb-6 bg-white p-4 rounded-lg shadow space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search incidents..."
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
              <div className="w-full md:w-48 flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="under-investigation">Under Investigation</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48 flex items-center gap-2">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 w-full md:w-[500px]">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
                <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading incidents...</p>
            </div>
          ) : filteredIncidents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto">
                <AlertTriangle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No incidents found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredIncidents.map(incident => (
                <Card 
                  key={incident.id} 
                  className={`overflow-hidden border-l-4 ${
                    incident.severity === 'high' 
                      ? 'border-red-500' 
                      : incident.severity === 'medium'
                        ? 'border-yellow-500'
                        : 'border-green-500'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2 text-gray-500" />
                          {incident.title}
                        </CardTitle>
                        <CardDescription className="mt-1 flex flex-wrap gap-2 items-center">
                          {getCategoryBadge(incident.category)}
                          {getSeverityBadge(incident.severity)}
                          {getStatusBadge(incident.status)}
                        </CardDescription>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatTimestamp(incident.timestamp)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-gray-700 mb-3">{incident.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>Involved: {incident.residentName}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>Reported by: {incident.reportedBy}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 py-2 justify-end">
                    <Button variant="ghost" size="sm" className="mr-2">Update Status</Button>
                    <Button variant="outline" size="sm">View Details</Button>
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
