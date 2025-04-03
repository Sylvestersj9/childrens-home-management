import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { useToast } from "@/hooks/use-toast";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, Database, Globe, HardDrive } from "lucide-react";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: "Admin User",
    email: "admin@carehome.org",
    phone: "+44 123 456 7890"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Header title="Settings" toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-4 lg:p-6 bg-gray-50 min-h-screen overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
              <p className="text-gray-600">Manage application settings and preferences</p>
            </div>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-0">
                  <nav className="flex flex-col space-y-1 p-2">
                    <Button variant="ghost" className="justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Database className="mr-2 h-4 w-4" />
                      Data Management
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Globe className="mr-2 h-4 w-4" />
                      Appearance
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <HardDrive className="mr-2 h-4 w-4" />
                      System
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-12 lg:col-span-9">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Profile</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="displayName" className="text-right">
                          Display Name
                        </Label>
                        <Input
                          id="displayName"
                          value={profileFormData.name}
                          onChange={(e) => setProfileFormData({...profileFormData, name: e.target.value})}
                          className="col-span-3"
                          readOnly={!isEditing}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileFormData.email}
                          onChange={(e) => setProfileFormData({...profileFormData, email: e.target.value})}
                          className="col-span-3"
                          readOnly={!isEditing}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileFormData.phone}
                          onChange={(e) => setProfileFormData({...profileFormData, phone: e.target.value})}
                          className="col-span-3"
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <Separator />
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">
                            Receive email notifications for important events
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Daily Summary</h4>
                          <p className="text-sm text-gray-500">
                            Receive a daily summary of activities
                          </p>
                        </div>
                        <Switch checked={false} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Incident Alerts</h4>
                          <p className="text-sm text-gray-500">
                            Receive immediate alerts for all incidents
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Security</h3>
                    <Separator />
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                          Password
                        </Label>
                        <div className="col-span-3">
                          <Button 
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Password Change",
                                description: "Password change functionality will be implemented in the next update.",
                              });
                            }}
                          >
                            Change Password
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch checked={false} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 bg-gray-50">
                  {isEditing ? (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          // Reset form data to original values
                          setProfileFormData({
                            name: "Admin User",
                            email: "admin@carehome.org",
                            phone: "+44 123 456 7890"
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={() => {
                          setIsSaving(true);
                          // Simulate saving profile changes
                          setTimeout(() => {
                            setIsSaving(false);
                            setIsEditing(false);
                            toast({
                              title: "Profile Updated",
                              description: "Your profile has been updated successfully."
                            });
                          }, 1000);
                        }}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </div>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}