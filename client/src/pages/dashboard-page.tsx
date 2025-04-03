import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  Home, 
  Users, 
  Clock, 
  AlertTriangle, 
  Activity as ActivityIcon,
  FileText,
  Calendar,
  FolderPlus,
  UserCog
} from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatCard from "@/components/dashboard/stat-card";
import ActivityFeed, { Activity as ActivityItem } from "@/components/dashboard/activity-feed";
import ResidentsTable, { Resident } from "@/components/dashboard/residents-table";
import Schedule, { ScheduleEvent } from "@/components/dashboard/schedule";
import Alerts, { Alert } from "@/components/dashboard/alerts";
import QuickActions from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Sample data for dashboard
  const [residents, setResidents] = useState<Resident[]>([
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
    }
  ]);

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "log",
      message: {
        actor: "Sarah Johnson",
        action: "added a new daily log for",
        subject: "Alex Matthews"
      },
      timestamp: new Date().toISOString()
    },
    {
      id: "2",
      type: "medication",
      message: {
        actor: "Mark Wilson",
        action: "completed medication administration for",
        subject: "Jamie Parker"
      },
      timestamp: new Date(new Date().setHours(new Date().getHours() - 1)).toISOString()
    },
    {
      id: "3",
      type: "event",
      message: {
        actor: "School trip to Science Museum",
        action: "has been scheduled for next Friday"
      },
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()
    },
    {
      id: "4",
      type: "incident",
      message: {
        actor: "New incident report",
        action: "filed by Lisa Chen regarding",
        subject: "Taylor Smith"
      },
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()
    },
    {
      id: "5",
      type: "update",
      message: {
        actor: "Support plan",
        action: "for Riley Cooper was updated by",
        subject: "Dr. James Rodriguez"
      },
      timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
    }
  ]);

  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      time: "08:30",
      title: "Morning Medication",
      description: "All residents",
      type: "medication"
    },
    {
      id: "2",
      time: "09:15",
      title: "School Transport",
      description: "Taylor Smith, Alex Matthews",
      type: "transport"
    },
    {
      id: "3",
      time: "11:00",
      title: "Therapy Session",
      description: "Riley Cooper",
      type: "therapy"
    },
    {
      id: "4",
      time: "14:30",
      title: "Group Activity",
      description: "Art & Crafts - All residents",
      type: "activity"
    },
    {
      id: "5",
      time: "17:00",
      title: "Evening Medication",
      description: "All residents",
      type: "medication"
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "error",
      title: "Incident Report Pending",
      description: "Incident report for Taylor Smith requires your review.",
      action: {
        label: "Review Now",
        onClick: () => setLocation("/incidents")
      }
    },
    {
      id: "2",
      type: "warning",
      title: "Training Reminder",
      description: "Safeguarding training needs to be renewed for 3 staff members within 14 days.",
      action: {
        label: "View Details",
        onClick: () => setLocation("/staff")
      }
    },
    {
      id: "3",
      type: "info",
      title: "Document Update",
      description: "New safeguarding policy has been uploaded. All staff should review by the end of the week.",
      action: {
        label: "Review Document",
        onClick: () => setLocation("/documents")
      }
    }
  ]);

  // Navigation handlers
  const handleViewAllResidents = () => setLocation("/residents");
  const handleViewAllActivity = () => setLocation("/daily-logs");
  const handleViewFullCalendar = () => setLocation("/calendar");

  // Quick actions
  const quickActions = [
    {
      id: "new-daily-log",
      label: "New Daily Log",
      icon: <FileText className="h-6 w-6 mb-2" />,
      bgColor: "text-primary",
      textColor: "text-gray-700",
      onClick: () => setLocation("/daily-logs/new")
    },
    {
      id: "report-incident",
      label: "Report Incident",
      icon: <AlertTriangle className="h-6 w-6 mb-2" />,
      bgColor: "text-red-500",
      textColor: "text-gray-700",
      onClick: () => setLocation("/incidents/new")
    },
    {
      id: "add-event",
      label: "Add Event",
      icon: <Calendar className="h-6 w-6 mb-2" />,
      bgColor: "text-purple-500",
      textColor: "text-gray-700",
      onClick: () => setLocation("/calendar/new")
    },
    {
      id: "upload-document",
      label: "Upload Document",
      icon: <FolderPlus className="h-6 w-6 mb-2" />,
      bgColor: "text-green-500",
      textColor: "text-gray-700",
      onClick: () => setLocation("/documents/new")
    }
  ];
  
  // Handle clicks outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('.sidebar');
      const sidebarToggle = document.getElementById('sidebar-toggle');
      
      if (window.innerWidth < 1024 && 
          sidebar && 
          !sidebar.contains(event.target as Node) && 
          sidebarToggle && 
          !sidebarToggle.contains(event.target as Node) && 
          sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Header title="Dashboard" toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-4 lg:p-6 bg-gray-50 min-h-screen overflow-y-auto">
          {/* Dashboard Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, {user?.username}</h1>
            <p className="text-gray-600">Here's what's happening at Sunshine Children's Home today.</p>
          </div>

          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Residents" 
              value={12} 
              icon={<Users className="h-5 w-5" />}
              iconBgColor="bg-blue-100"
              iconColor="text-primary"
              trend={{
                value: "+2 this month",
                isPositive: true
              }}
            />
            
            <StatCard 
              title="Staff On Duty" 
              value={8} 
              icon={<UserCog className="h-5 w-5" />}
              iconBgColor="bg-green-100"
              iconColor="text-secondary"
              secondaryText="of 14 total"
            />
            
            <StatCard 
              title="Today's Activities" 
              value={5} 
              icon={<ActivityIcon className="h-5 w-5" />}
              iconBgColor="bg-purple-100"
              iconColor="text-accent"
              secondaryText="scheduled"
            />
            
            <StatCard 
              title="Open Incidents" 
              value={2} 
              icon={<AlertTriangle className="h-5 w-5" />}
              iconBgColor="bg-red-100"
              iconColor="text-danger"
              trend={{
                value: "Needs attention",
                isPositive: false
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity Feed + Residents Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="border-b border-gray-100 px-5 py-4">
                  <h2 className="font-semibold text-lg text-gray-800">Recent Activity</h2>
                </div>
                <div className="p-5">
                  <ActivityFeed 
                    activities={activities}
                    onViewAllClick={handleViewAllActivity}
                  />
                </div>
              </div>

              {/* Residents Overview */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-100 px-5 py-4 flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-gray-800">Residents Overview</h2>
                  <button 
                    onClick={handleViewAllResidents}
                    className="text-sm text-primary font-medium hover:text-blue-700"
                  >
                    View All
                  </button>
                </div>
                <div className="p-5">
                  <ResidentsTable residents={residents} />
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Today's Schedule */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-100 px-5 py-4 flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-gray-800">Today's Schedule</h2>
                  <button 
                    onClick={handleViewFullCalendar}
                    className="text-sm text-primary font-medium hover:text-blue-700"
                  >
                    Full Calendar
                  </button>
                </div>
                <div className="p-5">
                  <Schedule events={events} />
                </div>
              </div>

              {/* Alerts & Notifications */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-100 px-5 py-4">
                  <h2 className="font-semibold text-lg text-gray-800">Alerts & Notifications</h2>
                </div>
                <div className="p-5">
                  <Alerts alerts={alerts} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-100 px-5 py-4">
                  <h2 className="font-semibold text-lg text-gray-800">Quick Actions</h2>
                </div>
                <div className="p-5">
                  <QuickActions actions={quickActions} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
