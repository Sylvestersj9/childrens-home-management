import { FC } from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  Users, 
  UserCog, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  FolderOpen, 
  ChartBarStacked, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const routes = [
    { path: "/", label: "Dashboard", icon: <Home className="h-5 w-5 mr-3 text-gray-500" /> },
    { path: "/residents", label: "Residents", icon: <Users className="h-5 w-5 mr-3 text-gray-500" /> },
    { path: "/staff", label: "Staff", icon: <UserCog className="h-5 w-5 mr-3 text-gray-500" /> },
    { path: "/daily-logs", label: "Daily Logs", icon: <FileText className="h-5 w-5 mr-3 text-gray-500" /> },
    { path: "/incidents", label: "Incidents", icon: <AlertTriangle className="h-5 w-5 mr-3 text-gray-500" /> },
    { path: "/calendar", label: "Calendar", icon: <Calendar className="h-5 w-5 mr-3 text-gray-500" /> },
    { path: "/documents", label: "Documents", icon: <FolderOpen className="h-5 w-5 mr-3 text-gray-500" /> },
    { path: "/reports", label: "Reports", icon: <ChartBarStacked className="h-5 w-5 mr-3 text-gray-500" /> },
    { path: "/settings", label: "Settings", icon: <Settings className="h-5 w-5 mr-3 text-gray-500" /> }
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const sidebarClasses = cn(
    "sidebar bg-white h-screen w-64 fixed top-0 left-0 shadow-md z-30 lg:translate-x-0",
    "transition-transform duration-300",
    {
      "-translate-x-full": !isOpen,
      "translate-x-0": isOpen
    }
  );

  const handleClickLink = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className={sidebarClasses}>
      <div className="p-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-primary">ChildrenFirst</h1>
      </div>
      
      <div className="overflow-y-auto h-full pb-20">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="text-lg font-medium">
                {user ? user.username.substring(0, 2).toUpperCase() : "?"}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.username || "Guest"}</p>
              <p className="text-xs text-gray-500">{user?.role || "Loading..."}</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-2">
          <ul>
            {routes.map((route) => (
              <li key={route.path}>
                <Link href={route.path}>
                  <a 
                    className={cn(
                      "flex items-center py-3 px-4 text-gray-700 hover:bg-gray-100 sidebar-link",
                      {
                        "bg-gray-100 border-l-3 border-primary": location === route.path
                      }
                    )}
                    onClick={handleClickLink}
                  >
                    {route.icon}
                    {route.label}
                  </a>
                </Link>
              </li>
            ))}
            <li>
              <button 
                className="w-full flex items-center py-3 px-4 text-gray-700 hover:bg-gray-100 sidebar-link"
                onClick={handleLogout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
