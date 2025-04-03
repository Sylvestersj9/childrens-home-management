import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, BarChartHorizontal, PieChart, LineChart } from "lucide-react";

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Header title="Reports" toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-4 lg:p-6 bg-gray-50 min-h-screen overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Reports</h1>
              <p className="text-gray-600">Generate and view reports for resident care and home operations</p>
            </div>
            <Dialog open={showGenerateModal} onOpenChange={setShowGenerateModal}>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0" onClick={() => setShowGenerateModal(true)}>
                  <BarChart className="h-4 w-4 mr-2" />
                  Generate New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate New Report</DialogTitle>
                  <DialogDescription>
                    Select the type of report you want to generate
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div 
                    className={`p-4 border rounded-md cursor-pointer transition-all ${selectedReport === 'resident' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}
                    onClick={() => setSelectedReport('resident')}
                  >
                    <h4 className="font-medium">Resident Progress Report</h4>
                    <p className="text-sm text-gray-500">Summary of all residents' care progress</p>
                  </div>
                  <div 
                    className={`p-4 border rounded-md cursor-pointer transition-all ${selectedReport === 'incident' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}
                    onClick={() => setSelectedReport('incident')}
                  >
                    <h4 className="font-medium">Incident Report</h4>
                    <p className="text-sm text-gray-500">Summary of all incidents in a time period</p>
                  </div>
                  <div 
                    className={`p-4 border rounded-md cursor-pointer transition-all ${selectedReport === 'staff' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}
                    onClick={() => setSelectedReport('staff')}
                  >
                    <h4 className="font-medium">Staff Performance Report</h4>
                    <p className="text-sm text-gray-500">Overview of staff activities and metrics</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowGenerateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    disabled={!selectedReport || isGenerating}
                    onClick={() => {
                      setIsGenerating(true);
                      // Simulate report generation
                      setTimeout(() => {
                        setIsGenerating(false);
                        setShowGenerateModal(false);
                        toast({
                          title: "Report Generated",
                          description: "Your report has been generated successfully.",
                        });
                      }, 1500);
                    }}
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </div>
                    ) : (
                      "Generate Report"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="residents">Resident Reports</TabsTrigger>
              <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Resident Status</CardTitle>
                    <CardDescription>Current resident occupancy</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                      <PieChart className="h-32 w-32 text-gray-400" />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 text-sm">
                    Last updated: Today at 9:30 AM
                  </CardFooter>
                </Card>
                
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Incident Trends</CardTitle>
                    <CardDescription>Last 30 days of incidents</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                      <LineChart className="h-32 w-32 text-gray-400" />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 text-sm">
                    Last updated: Today at 9:30 AM
                  </CardFooter>
                </Card>
                
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Staff Distribution</CardTitle>
                    <CardDescription>By role and shift</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                      <BarChartHorizontal className="h-32 w-32 text-gray-400" />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 text-sm">
                    Last updated: Today at 9:30 AM
                  </CardFooter>
                </Card>
              </div>
              
              <Card className="mt-6 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Recently generated and viewed reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Monthly Resident Progress Report</h4>
                        <p className="text-sm text-gray-500">Generated on April 1, 2023</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Report Opened",
                            description: "Monthly Resident Progress Report has been opened.",
                          });
                        }}
                      >
                        View
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Quarterly Incident Summary</h4>
                        <p className="text-sm text-gray-500">Generated on March 31, 2023</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Report Opened",
                            description: "Quarterly Incident Summary has been opened.",
                          });
                        }}
                      >
                        View
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Staff Performance Overview</h4>
                        <p className="text-sm text-gray-500">Generated on March 15, 2023</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Report Opened",
                            description: "Staff Performance Overview has been opened.",
                          });
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="residents">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Resident Reports</CardTitle>
                  <CardDescription>Reports on resident care, progress, and outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Resident reporting features coming soon!</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="incidents">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Incident Reports</CardTitle>
                  <CardDescription>Reports on incidents, outcomes, and follow-up actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Incident reporting features coming soon!</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="compliance">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Compliance Reports</CardTitle>
                  <CardDescription>Reports on regulatory compliance and audits</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Compliance reporting features coming soon!</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}