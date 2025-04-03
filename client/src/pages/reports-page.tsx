import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
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
            <Button className="mt-4 md:mt-0">
              <BarChart className="h-4 w-4 mr-2" />
              Generate New Report
            </Button>
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
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Quarterly Incident Summary</h4>
                        <p className="text-sm text-gray-500">Generated on March 31, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Staff Performance Overview</h4>
                        <p className="text-sm text-gray-500">Generated on March 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
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