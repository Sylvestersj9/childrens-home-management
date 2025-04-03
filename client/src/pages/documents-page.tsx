import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Plus, 
  Search, 
  Filter, 
  X, 
  FileText,
  Download,
  Trash2,
  Eye,
  Share2,
  Calendar,
  User,
  FolderOpen,
  File as FileIcon
} from "lucide-react";
import { format } from "date-fns";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  title: string;
  description?: string;
  fileType: 'pdf' | 'doc' | 'xls' | 'img' | 'other';
  category: 'policy' | 'resident' | 'staff' | 'medical' | 'education' | 'other';
  uploadedBy: string;
  uploadDate: string;
  size: string;
  lastAccessed?: string;
  restricted: boolean;
}

export default function DocumentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");

  // Sample documents data - in a real app this would come from API
  const { data: documents = [], isLoading } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
    queryFn: () => {
      // Simulated data as we don't have a real API yet
      return [
        {
          id: "1",
          title: "Safeguarding Policy 2023",
          description: "Updated safeguarding policy for all staff to review",
          fileType: "pdf",
          category: "policy",
          uploadedBy: "Sarah Johnson",
          uploadDate: new Date().toISOString(),
          size: "1.2 MB",
          lastAccessed: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
          restricted: false
        },
        {
          id: "2",
          title: "Medical Assessment - Jamie Parker",
          description: "Annual medical assessment report",
          fileType: "pdf",
          category: "medical",
          uploadedBy: "Dr. James Rodriguez",
          uploadDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
          size: "3.5 MB",
          restricted: true
        },
        {
          id: "3",
          title: "Staff Training Schedule Q2",
          description: "Training schedule and requirements for all staff",
          fileType: "xls",
          category: "staff",
          uploadedBy: "Mark Wilson",
          uploadDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
          size: "450 KB",
          lastAccessed: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
          restricted: false
        },
        {
          id: "4",
          title: "School Report - Taylor Smith",
          description: "End of term academic report",
          fileType: "doc",
          category: "education",
          uploadedBy: "Lisa Chen",
          uploadDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
          size: "780 KB",
          restricted: false
        },
        {
          id: "5",
          title: "Placement Plan - Alex Matthews",
          description: "Updated placement plan with goals and objectives",
          fileType: "doc",
          category: "resident",
          uploadedBy: "Sarah Johnson",
          uploadDate: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
          size: "1.7 MB",
          lastAccessed: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
          restricted: true
        },
        {
          id: "6",
          title: "Health and Safety Risk Assessment",
          description: "Annual risk assessment for the premises",
          fileType: "pdf",
          category: "policy",
          uploadedBy: "Michael Brown",
          uploadDate: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString(),
          size: "2.3 MB",
          restricted: false
        },
        {
          id: "7",
          title: "Therapy Progress Notes - Riley Cooper",
          description: "Confidential therapy session notes",
          fileType: "doc",
          category: "medical",
          uploadedBy: "Dr. James Rodriguez",
          uploadDate: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
          size: "650 KB",
          restricted: true
        },
        {
          id: "8",
          title: "Monthly Budget Report",
          description: "Financial report for the current month",
          fileType: "xls",
          category: "other",
          uploadedBy: "Sarah Johnson",
          uploadDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
          size: "1.1 MB",
          restricted: true
        }
      ];
    },
  });

  const getFileTypeIcon = (fileType: Document['fileType']) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'doc':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'xls':
        return <FileText className="h-8 w-8 text-green-500" />;
      case 'img':
        return <FileIcon className="h-8 w-8 text-purple-500" />;
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const getCategoryBadge = (category: Document['category']) => {
    switch (category) {
      case 'policy':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Policy</Badge>;
      case 'resident':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Resident</Badge>;
      case 'staff':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Staff</Badge>;
      case 'medical':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Medical</Badge>;
      case 'education':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Education</Badge>;
      case 'other':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Other</Badge>;
      default:
        return null;
    }
  };

  const getFilteredDocuments = () => {
    let filtered = documents;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(doc => doc.category === categoryFilter);
    }
    
    // Filter by tab (document type)
    if (activeTab !== 'all') {
      filtered = filtered.filter(doc => doc.fileType === activeTab);
    }
    
    return filtered;
  };

  const filteredDocuments = getFilteredDocuments();

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Header title="Documents" toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-4 lg:p-6 bg-gray-50 min-h-screen overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Documents</h1>
              <p className="text-gray-600">Upload and manage important documents</p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>

          <div className="mb-6 bg-white p-4 rounded-lg shadow space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search documents..."
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
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="resident">Resident</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="all">All Types</TabsTrigger>
                <TabsTrigger value="pdf">PDF</TabsTrigger>
                <TabsTrigger value="doc">DOC</TabsTrigger>
                <TabsTrigger value="xls">XLS</TabsTrigger>
                <TabsTrigger value="img">Images</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading documents...</p>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto">
                <FolderOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No documents found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDocuments.map(doc => (
                <Card key={doc.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base truncate" title={doc.title}>
                        {doc.title}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            <span>Share</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex flex-col items-center mb-4">
                      {getFileTypeIcon(doc.fileType)}
                      <span className="text-sm text-gray-500 mt-2">{doc.size}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      {doc.description && (
                        <p className="text-gray-700">{doc.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500">
                          <User className="h-3 w-3 mr-1" />
                          <span className="text-xs">{doc.uploadedBy}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className="text-xs">{formatDate(doc.uploadDate)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 flex justify-between pt-3">
                    {getCategoryBadge(doc.category)}
                    {doc.restricted && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                        Restricted
                      </Badge>
                    )}
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
