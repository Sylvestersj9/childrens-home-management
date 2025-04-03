import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { 
  Plus, 
  Search, 
  Filter, 
  X, 
  Clock,
  CalendarX,
  Users
} from "lucide-react";
import { format } from "date-fns";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import ResidentSidebar, { ResidentProfile } from "@/components/residents/resident-sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface DailyLog {
  id: string;
  residentId: number;
  residentName: string;
  residentPhoto?: string;
  staffName: string;
  timestamp: string;
  category: 'general' | 'health' | 'education' | 'behavior' | 'activity';
  content: string;
  important: boolean;
}

export default function DailyLogsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Resident filtering
  const [selectedResidentId, setSelectedResidentId] = useState<number | null>(null);
  
  // Chat-style input form state
  const [selectedResident, setSelectedResident] = useState<string>("1");
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [staffName, setStaffName] = useState<string>("Sarah Johnson");
  const [isImportant, setIsImportant] = useState<boolean>(false);
  const [logContent, setLogContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Ref for scroll container
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Sample daily logs data - in a real app this would come from API
  const { data: dailyLogs = [], isLoading } = useQuery<DailyLog[]>({
    queryKey: ["/api/daily-logs"],
    queryFn: () => {
      // Simulated data as we don't have a real API yet
      return [
        {
          id: "1",
          residentId: 1,
          residentName: "Alex Matthews",
          staffName: "Sarah Johnson",
          timestamp: new Date().toISOString(),
          category: "general",
          content: "Alex had a good day today. Participated well in group activities and completed homework. Good appetite at dinner.",
          important: false
        },
        {
          id: "2",
          residentId: 2,
          residentName: "Jamie Parker",
          staffName: "Mark Wilson",
          timestamp: new Date().toISOString(),
          category: "health",
          content: "Jamie complained of a headache after school. Given paracetamol at 4pm. Will monitor and check temperature before bedtime.",
          important: true
        },
        {
          id: "3",
          residentId: 3,
          residentName: "Taylor Smith",
          staffName: "Lisa Chen",
          timestamp: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
          category: "education",
          content: "Taylor received positive feedback from Math teacher. Completed all assignments and showed improvement in problem-solving.",
          important: false
        },
        {
          id: "4",
          residentId: 4,
          residentName: "Riley Cooper",
          staffName: "Dr. James Rodriguez",
          timestamp: new Date(new Date().setHours(new Date().getHours() - 5)).toISOString(),
          category: "behavior",
          content: "Riley had a difficult session today discussing family history. Became withdrawn afterward. Recommended extra support from key worker this evening.",
          important: true
        },
        {
          id: "5",
          residentId: 1,
          residentName: "Alex Matthews",
          staffName: "Emily Taylor",
          timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
          category: "activity",
          content: "Alex participated in the art workshop and created a painting for his room. Showed enthusiasm and shared materials well with others.",
          important: false
        },
        {
          id: "6",
          residentId: 2,
          residentName: "Jamie Parker",
          staffName: "Mark Wilson",
          timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
          category: "health",
          content: "Jamie attended dental appointment. No issues found. Next check-up in 6 months.",
          important: false
        }
      ];
    },
  });

  const getCategoryBadge = (category: DailyLog['category']) => {
    switch (category) {
      case 'general':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">General</Badge>;
      case 'health':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Health</Badge>;
      case 'education':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Education</Badge>;
      case 'behavior':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Behavior</Badge>;
      case 'activity':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Activity</Badge>;
      default:
        return null;
    }
  };

  const getFilteredLogs = () => {
    let filtered = dailyLogs;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(log => log.category === categoryFilter);
    }
    
    // Filter by tab (time period)
    const now = new Date();
    if (activeTab === 'today') {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate.toDateString() === now.toDateString();
      });
    } else if (activeTab === 'yesterday') {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate.toDateString() === yesterday.toDateString();
      });
    } else if (activeTab === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= weekAgo;
      });
    }
    
    return filtered;
  };

  const filteredLogs = getFilteredLogs();
  
  // Scroll to bottom when new logs are added or when a resident is selected
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [dailyLogs, selectedResidentId]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };
  
  // Function to get resident name from ID
  const getResidentName = (id: string) => {
    const residents = [
      { id: "1", name: "Alex Matthews" },
      { id: "2", name: "Jamie Parker" },
      { id: "3", name: "Taylor Smith" },
      { id: "4", name: "Riley Cooper" }
    ];
    return residents.find(resident => resident.id === id)?.name || "";
  };
  
  // Daily log submission mutation
  const { toast } = useToast();
  
  const createLogMutation = useMutation({
    mutationFn: async (log: Omit<DailyLog, "id" | "timestamp">) => {
      // In a real app, this would be an API call
      // For now, simulate a success response after a short delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id: Date.now().toString(), ...log, timestamp: new Date().toISOString() };
    },
    onSuccess: () => {
      // Reset form
      setLogContent("");
      setIsImportant(false);
      
      // Show success toast
      toast({
        title: "Log added successfully",
        description: "Your daily log has been recorded.",
        variant: "default",
      });
      
      // Refetch data
      queryClient.invalidateQueries({ queryKey: ["/api/daily-logs"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error adding log",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleSubmitLog = () => {
    if (!logContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a log entry.",
        variant: "destructive",
      });
      return;
    }
    
    createLogMutation.mutate({
      residentId: parseInt(selectedResident),
      residentName: getResidentName(selectedResident),
      staffName,
      category: selectedCategory as any,
      content: logContent,
      important: isImportant
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Header title="Daily Logs" toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-4 lg:p-6 bg-gray-50 min-h-screen overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Daily Logs</h1>
              <p className="text-gray-600">Record and track daily activities and observations</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Young People Sidebar */}
            <div className="w-full md:w-1/4 lg:w-1/5">
              <ResidentSidebar
                residents={[
                  { id: 1, name: "Alex Matthews", status: "present", age: 14, room: "A1" },
                  { id: 2, name: "Jamie Parker", status: "school", age: 15, room: "A2" },
                  { id: 3, name: "Taylor Smith", status: "appointment", age: 16, room: "B1" },
                  { id: 4, name: "Riley Cooper", status: "present", age: 13, room: "B2" }
                ]}
                selectedResidentId={selectedResidentId}
                onSelectResident={(id) => {
                  setSelectedResidentId(selectedResidentId === id ? null : id);
                  // Also update the form's selected resident for quick entry
                  if (selectedResidentId !== id) {
                    setSelectedResident(id.toString());
                  }
                }}
              />
            </div>

            {/* Main Content Area */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              <div className="mb-6 bg-white p-4 rounded-lg shadow space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search logs..."
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
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="behavior">Behavior</SelectItem>
                        <SelectItem value="activity">Activity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 md:w-[400px]">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Scrollable logs container */}
              <div 
                ref={logsContainerRef} 
                className="h-[calc(100vh-440px)] overflow-y-auto pr-2"
              >
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading daily logs...</p>
                  </div>
                ) : filteredLogs.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto">
                      <Clock className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No daily logs found</h3>
                    <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredLogs
                      .filter(log => selectedResidentId === null || log.residentId === selectedResidentId)
                      .map(log => (
                      <Card 
                        key={log.id} 
                        className={`overflow-hidden ${log.important ? 'border-l-4 border-yellow-500' : ''}`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 rounded-full mr-3">
                                <AvatarImage src={log.residentPhoto} alt={log.residentName} />
                                <AvatarFallback className="bg-primary text-white">
                                  {getInitials(log.residentName)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{log.residentName}</CardTitle>
                                <CardDescription className="flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatTimestamp(log.timestamp)}
                                </CardDescription>
                              </div>
                            </div>
                            {getCategoryBadge(log.category)}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-gray-700">{log.content}</p>
                        </CardContent>
                        <CardFooter className="bg-gray-50 text-sm text-gray-500 py-2">
                          Logged by: {log.staffName}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Always-visible chat-style input */}
          <div className="sticky bottom-4 mt-8 w-full bg-white shadow-lg rounded-lg border overflow-hidden">
            <div className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select 
                    value={selectedResident} 
                    onValueChange={setSelectedResident}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select resident" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Alex Matthews</SelectItem>
                      <SelectItem value="2">Jamie Parker</SelectItem>
                      <SelectItem value="3">Taylor Smith</SelectItem>
                      <SelectItem value="4">Riley Cooper</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="behavior">Behavior</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex">
                  <Input 
                    className="flex-1 mr-2" 
                    placeholder="Enter staff name" 
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="important" 
                      checked={isImportant}
                      onCheckedChange={(checked) => setIsImportant(checked === true)}
                    />
                    <label
                      htmlFor="important"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Important
                    </label>
                  </div>
                </div>
                
                <Textarea 
                  placeholder="Type your daily log entry..." 
                  className="min-h-[100px]"
                  value={logContent}
                  onChange={(e) => setLogContent(e.target.value)}
                />
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSubmitLog}
                    disabled={createLogMutation.isPending || !logContent.trim()}
                  >
                    {createLogMutation.isPending ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      "Submit Log"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}
