import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import ResidentsPage from "@/pages/residents-page";
import StaffPage from "@/pages/staff-page";
import DailyLogsPage from "@/pages/daily-logs-page";
import IncidentsPage from "@/pages/incidents-page";
import CalendarPage from "@/pages/calendar-page";
import DocumentsPage from "@/pages/documents-page";
import ReportsPage from "@/pages/reports-page";
import SettingsPage from "@/pages/settings-page";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={DashboardPage} />
      <ProtectedRoute path="/residents" component={ResidentsPage} />
      <ProtectedRoute path="/staff" component={StaffPage} />
      <ProtectedRoute path="/daily-logs" component={DailyLogsPage} />
      <ProtectedRoute path="/incidents" component={IncidentsPage} />
      <ProtectedRoute path="/calendar" component={CalendarPage} />
      <ProtectedRoute path="/documents" component={DocumentsPage} />
      <ProtectedRoute path="/reports" component={ReportsPage} />
      <ProtectedRoute path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
