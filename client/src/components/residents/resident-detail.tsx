import { useState } from 'react';
import { CalendarClock, Clock, File, Pill, Phone, Mail, MapPin, UserCheck, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProfileForm } from './forms/profile-form';
import { ContactForm } from './forms/contact-form';

import { Resident } from '@/components/dashboard/residents-table';

interface ResidentDetailProps {
  resident: Resident;
  onClose?: () => void;
  onBack?: () => void;
}

export const ResidentDetail = ({ resident, onClose, onBack }: ResidentDetailProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editing, setEditing] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'school':
        return 'bg-blue-100 text-blue-800';
      case 'appointment':
        return 'bg-purple-100 text-purple-800';
      case 'leave':
        return 'bg-orange-100 text-orange-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with profile info */}
      <div className="p-6 pb-0">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={resident.photo} alt={resident.name} />
              <AvatarFallback className="bg-primary text-white text-xl">
                {getInitials(resident.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{resident.name}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className={`${getStatusColor(resident.status)}`}>
                  {resident.status.charAt(0).toUpperCase() + resident.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  Age: {resident.age}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  Room: {resident.room}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            {onBack && (
              <Button variant="outline" onClick={onBack} className="mr-2" size="sm">
                Back
              </Button>
            )}
            {onClose && (
              <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
                ✕
              </Button>
            )}
          </div>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="plans">Care Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-md flex items-center">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Key Worker
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="font-medium">{resident.keyWorker}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Phone className="h-3 w-3 mr-1" />
                    <span>+44 20 7123 4567</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-md flex items-center">
                    <CalendarClock className="h-4 w-4 mr-2" />
                    Next Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="font-medium">Therapy Session</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{format(new Date().setHours(new Date().getHours() + 26), "MMM d, yyyy 'at' h:mm a")}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-md flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Health Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="font-medium">Good</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Pill className="h-3 w-3 mr-1" />
                    <span>No current medications</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-md">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                    <p className="mt-1">{format(new Date().setFullYear(new Date().getFullYear() - resident.age), "MMMM d, yyyy")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Admission Date</h4>
                    <p className="mt-1">{format(new Date().setMonth(new Date().getMonth() - 6), "MMMM d, yyyy")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Education</h4>
                    <p className="mt-1">Greenwood Secondary School</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Local Authority</h4>
                    <p className="mt-1">West London Borough Council</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-md">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <File className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Health assessment completed</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date().setHours(new Date().getHours() - 48), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <UserCheck className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Key worker session</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date().setDate(new Date().getDate() - 4), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-4 pb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
              
              {editing ? (
                <div className="bg-white p-4 rounded-lg border">
                  <ProfileForm 
                    resident={{
                      id: resident.id,
                      name: resident.name,
                      age: resident.age,
                      dob: new Date(new Date().setFullYear(new Date().getFullYear() - resident.age)).toISOString(),
                      room: resident.room,
                      status: resident.status,
                      keyWorker: resident.keyWorker,
                      photo: resident.photo || '',
                      education: 'Greenwood Secondary School',
                      localAuthority: 'West London Borough Council',
                      admissionDate: new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString(),
                    }}
                    onSave={() => setEditing(false)}
                    onCancel={() => setEditing(false)}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-md">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                          <p className="mt-1">{resident.name}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                          <p className="mt-1">{format(new Date().setFullYear(new Date().getFullYear() - resident.age), "MMMM d, yyyy")}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Age</h4>
                          <p className="mt-1">{resident.age} years</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Room</h4>
                          <p className="mt-1">{resident.room}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Key Worker</h4>
                          <p className="mt-1">{resident.keyWorker}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Status</h4>
                          <p className="mt-1">{resident.status.charAt(0).toUpperCase() + resident.status.slice(1)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-md">Education</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">School</h4>
                          <p className="mt-1">Greenwood Secondary School</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Year Group</h4>
                          <p className="mt-1">Year {resident.age - 11}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">SEN Status</h4>
                          <p className="mt-1">EHCP in place</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">School Contact</h4>
                          <p className="mt-1">Ms. Rebecca Thompson</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-md">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Social Worker</h4>
                          <p className="mt-1">Jennifer Wilson</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Phone className="h-3 w-3 mr-1" />
                            <span>+44 20 7123 5678</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            <span>j.wilson@wlbc.gov.uk</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Emergency Contact</h4>
                          <p className="mt-1">James Matthews (Uncle)</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Phone className="h-3 w-3 mr-1" />
                            <span>+44 20 7123 9876</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            <span>james.matthews@email.com</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="logs">
            <div className="space-y-4 pb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Daily Logs</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-md">Daily Log Entry</CardTitle>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          Education
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date().setHours(new Date().getHours() - i * 24), "MMM d, yyyy 'at' h:mm a")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-gray-700">
                        {i === 1 ? 
                          `${resident.name} had a good day at school. Completed all assignments and participated well in group activities. Teacher reported positive behavior throughout the day.` :
                          i === 2 ?
                          `${resident.name} attended therapy session with Dr. Robinson. Session focused on developing coping strategies for anxiety. Showed good engagement.` :
                          `${resident.name} participated in house activity night. Helped prepare dinner and showed good teamwork skills. Interacted positively with peers.`
                        }
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Logged by: {i === 1 ? 'Sarah Johnson' : i === 2 ? 'Mark Wilson' : 'Lisa Chen'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plans">
            <div className="space-y-4 pb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Care Plans</h3>
                <Button variant="outline" size="sm">Add New Plan</Button>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-md">Education Support Plan</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <CalendarClock className="h-3 w-3 mr-1" />
                          Last updated: {format(new Date().setDate(new Date().getDate() - 30), "MMM d, yyyy")}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-gray-700">
                      Education plan focusing on academic support needs, strategies for classroom engagement, and learning accommodations.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-md">Behavioral Support Plan</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <CalendarClock className="h-3 w-3 mr-1" />
                          Last updated: {format(new Date().setDate(new Date().getDate() - 45), "MMM d, yyyy")}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-gray-700">
                      Behavior management plan with strategies for managing anxiety, promoting positive behavior, and developing self-regulation skills.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-md">Health Care Plan</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <CalendarClock className="h-3 w-3 mr-1" />
                          Last updated: {format(new Date().setDate(new Date().getDate() - 60), "MMM d, yyyy")}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-gray-700">
                      Health and wellbeing plan covering medication management, appointment schedule, and physical/mental health monitoring protocols.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};