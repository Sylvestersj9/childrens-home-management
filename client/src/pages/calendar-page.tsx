import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from "date-fns";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  attendees: string[];
  location?: string;
  type: 'appointment' | 'activity' | 'education' | 'medication' | 'staff' | 'other';
  allDay: boolean;
}

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample events data - in a real app this would come from API
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: () => {
      // Simulated data as we don't have a real API yet
      return [
        {
          id: "1",
          title: "Morning Medication",
          description: "Regular morning medication for all residents",
          start: new Date(new Date().setHours(8, 30, 0, 0)).toISOString(),
          end: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
          attendees: ["All Residents"],
          type: "medication",
          allDay: false
        },
        {
          id: "2",
          title: "School Transport",
          description: "Transport to school for Taylor Smith and Alex Matthews",
          start: new Date(new Date().setHours(9, 15, 0, 0)).toISOString(),
          end: new Date(new Date().setHours(9, 45, 0, 0)).toISOString(),
          attendees: ["Taylor Smith", "Alex Matthews"],
          type: "education",
          allDay: false
        },
        {
          id: "3",
          title: "Therapy Session",
          description: "Weekly therapy session with Dr. Rodriguez",
          start: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
          end: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
          attendees: ["Riley Cooper"],
          location: "Therapy Room 2",
          type: "appointment",
          allDay: false
        },
        {
          id: "4",
          title: "Art & Crafts",
          description: "Group activity for all residents",
          start: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(),
          end: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(),
          attendees: ["All Residents"],
          location: "Activity Room",
          type: "activity",
          allDay: false
        },
        {
          id: "5",
          title: "Evening Medication",
          description: "Regular evening medication for all residents",
          start: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
          end: new Date(new Date().setHours(17, 30, 0, 0)).toISOString(),
          attendees: ["All Residents"],
          type: "medication",
          allDay: false
        },
        {
          id: "6",
          title: "Staff Meeting",
          description: "Weekly staff coordination meeting",
          start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
          end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
          attendees: ["All Staff"],
          location: "Conference Room",
          type: "staff",
          allDay: true
        },
        {
          id: "7",
          title: "Dental Appointment",
          description: "Regular check-up at dentist",
          start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
          end: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
          attendees: ["Jamie Parker"],
          location: "City Dental Clinic",
          type: "appointment",
          allDay: true
        },
        {
          id: "8",
          title: "Field Trip",
          description: "Trip to Science Museum",
          start: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
          end: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
          attendees: ["All Residents"],
          location: "Science Museum",
          type: "activity",
          allDay: true
        }
      ];
    },
  });

  const getEventsByDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return isSameDay(eventDate, date);
    });
  };

  const getEventTypeClass = (type: Event['type']) => {
    switch (type) {
      case 'appointment':
        return 'bg-red-50 border-red-500';
      case 'activity':
        return 'bg-yellow-50 border-yellow-500';
      case 'education':
        return 'bg-purple-50 border-purple-500';
      case 'medication':
        return 'bg-blue-50 border-primary';
      case 'staff':
        return 'bg-green-50 border-green-500';
      default:
        return 'bg-gray-50 border-gray-500';
    }
  };

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'appointment':
        return <div className="rounded-full bg-red-100 p-2 w-8 h-8 text-red-600 flex items-center justify-center"><User size={16} /></div>;
      case 'activity':
        return <div className="rounded-full bg-yellow-100 p-2 w-8 h-8 text-yellow-600 flex items-center justify-center"><Calendar size={16} /></div>;
      case 'education':
        return <div className="rounded-full bg-purple-100 p-2 w-8 h-8 text-purple-600 flex items-center justify-center"><Book size={16} /></div>;
      case 'medication':
        return <div className="rounded-full bg-blue-100 p-2 w-8 h-8 text-primary flex items-center justify-center"><Pill size={16} /></div>;
      case 'staff':
        return <div className="rounded-full bg-green-100 p-2 w-8 h-8 text-green-600 flex items-center justify-center"><Users size={16} /></div>;
      default:
        return <div className="rounded-full bg-gray-100 p-2 w-8 h-8 text-gray-600 flex items-center justify-center"><Calendar size={16} /></div>;
    }
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
  };

  const formatEventTime = (event: Event) => {
    if (event.allDay) {
      return "All day";
    } else {
      return `${formatTime(event.start)} - ${formatTime(event.end)}`;
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const resetToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // For UI purposes, get the day of week index for the first day of the month
  // to properly align the calendar grid
  const startingDayOfWeek = monthStart.getDay();
  
  // Create array of empty cells for days before the month start
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
        <Header title="Calendar" toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-4 lg:p-6 bg-gray-50 min-h-screen overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Calendar</h1>
              <p className="text-gray-600">Schedule and manage appointments and activities</p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add New Event
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Grid */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{format(currentDate, 'MMMM yyyy')}</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={previousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetToToday}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div key={index} className="bg-gray-100 p-2 text-center text-gray-500 text-sm font-medium">
                    {day}
                  </div>
                ))}
                
                {/* Empty cells for days before the month starts */}
                {emptyDays.map((_, index) => (
                  <div key={`empty-${index}`} className="bg-white p-2 min-h-[80px]"></div>
                ))}
                
                {/* Days of the month */}
                {days.map((day, index) => {
                  const dayEvents = getEventsByDate(day);
                  const isSelected = isSameDay(day, selectedDate);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  
                  return (
                    <div 
                      key={index}
                      className={cn(
                        "bg-white p-2 min-h-[80px] relative cursor-pointer hover:bg-gray-50",
                        isSelected ? "bg-blue-50" : "",
                        !isCurrentMonth ? "text-gray-400" : ""
                      )}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={cn(
                        "h-6 w-6 flex items-center justify-center text-sm",
                        isToday(day) ? "bg-primary text-white rounded-full" : ""
                      )}>
                        {format(day, 'd')}
                      </div>
                      
                      {/* Event indicators - show max 3 */}
                      <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, 2).map((event, i) => (
                          <div 
                            key={i}
                            className={cn("text-xs truncate rounded px-1 py-0.5", 
                              event.type === 'appointment' ? "bg-red-100 text-red-800" :
                              event.type === 'activity' ? "bg-yellow-100 text-yellow-800" :
                              event.type === 'education' ? "bg-purple-100 text-purple-800" :
                              event.type === 'medication' ? "bg-blue-100 text-blue-800" :
                              event.type === 'staff' ? "bg-green-100 text-green-800" :
                              "bg-gray-100 text-gray-800"
                            )}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Events for selected day */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="font-semibold text-lg text-gray-800">
                  Events for {format(selectedDate, 'MMMM d, yyyy')}
                </h2>
              </div>
              <div className="p-5">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : getEventsByDate(selectedDate).length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-base font-medium text-gray-900">No events scheduled</h3>
                    <p className="mt-1 text-sm text-gray-500">Add a new event to get started.</p>
                    <Button className="mt-4" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getEventsByDate(selectedDate).map((event) => (
                      <Card 
                        key={event.id} 
                        className={cn("overflow-hidden border-l-4", getEventTypeClass(event.type))}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{event.title}</CardTitle>
                              <CardDescription className="text-xs mt-1">
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatEventTime(event)}
                                </div>
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3 pt-0">
                          <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                          <div className="flex flex-col text-xs text-gray-500 space-y-1">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {event.attendees.join(', ')}
                            </div>
                            {event.location && (
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.location}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Import a Book and Pill component for the event type icons
function Book({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function Pill({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}
