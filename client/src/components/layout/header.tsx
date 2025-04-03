import { FC, useState } from "react";
import { Bell, Menu, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ title, toggleSidebar }) => {
  const { user, logoutMutation } = useAuth();
  const [notificationCount, setNotificationCount] = useState(3);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white h-16 shadow-sm flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center lg:hidden">
        <button 
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-primary ml-4 lg:hidden">ChildrenFirst</h1>
      </div>
      
      <div className="hidden lg:block">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 relative">
          <Bell className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
        
        <div className="relative hidden sm:block">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="text-sm font-medium">
                  {user ? user.username.substring(0, 2).toUpperCase() : "?"}
                </span>
              </div>
              <span className="font-medium hidden lg:inline-block">{user?.username || "Guest"}</span>
              <ChevronDown className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
