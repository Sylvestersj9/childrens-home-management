import { FC, useState } from 'react';
import { 
  User, 
  Phone, 
  Calendar, 
  Mail, 
  Shield, 
  FileText, 
  AlertTriangle, 
  Heart, 
  AlertOctagon, 
  Clipboard, 
  ArrowLeft,
  Plus
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Resident } from '@/components/dashboard/residents-table';
import { ProfileForm } from './forms/profile-form';
import { ContactForm } from './forms/contact-form';
import { 
  MeetingForm,
  EmailForm,
  SafeguardingForm,
  ReportForm,
  IncidentForm,
  SupportPlanForm,
  RiskAssessmentForm,
  KeyworkForm
} from './forms/form-placeholders';

interface ResidentDetailProps {
  resident: Resident;
  onBack: () => void;
}

export const ResidentDetail: FC<ResidentDetailProps> = ({ resident, onBack }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showForm, setShowForm] = useState(false);
  
  const getStatusBadge = (status: Resident['status']) => {
    switch (status) {
      case 'present':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>;
      case 'school':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">School</Badge>;
      case 'appointment':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Appointment</Badge>;
      case 'leave':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Leave</Badge>;
      case 'absent':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Absent</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const renderFormBasedOnTab = () => {
    if (!showForm) return null;

    switch (activeTab) {
      case 'profile':
        return <ProfileForm resident={resident} onClose={handleCloseForm} />;
      case 'contacts':
        return <ContactForm residentId={resident.id} onClose={handleCloseForm} />;
      case 'meetings':
        return <MeetingForm residentId={resident.id} onClose={handleCloseForm} />;
      case 'emails':
        return <EmailForm residentId={resident.id} onClose={handleCloseForm} />;
      case 'safeguarding':
        return <SafeguardingForm residentId={resident.id} onClose={handleCloseForm} />;
      case 'reports':
        return <ReportForm residentId={resident.id} onClose={handleCloseForm} />;
      case 'incidents':
        return <IncidentForm residentId={resident.id} onClose={handleCloseForm} />;
      case 'support-plans':
        return <SupportPlanForm residentId={resident.id} onClose={handleCloseForm} />;
      case 'risk-assessments':
        return <RiskAssessmentForm residentId={resident.id} onClose={handleCloseForm} />;
      case 'keywork':
        return <KeyworkForm residentId={resident.id} onClose={handleCloseForm} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Residents
            </Button>
            <h2 className="text-2xl font-bold">{resident.name}</h2>
            {getStatusBadge(resident.status)}
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-80 flex flex-col items-center">
              <Avatar className="h-32 w-32 rounded-full mb-4">
                <AvatarImage src={resident.photo} alt={resident.name} />
                <AvatarFallback className="bg-primary text-white text-3xl">
                  {getInitials(resident.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{resident.name}</h3>
                <p className="text-gray-500">Age: {resident.age}</p>
                <p className="text-gray-500">Room: {resident.room}</p>
                <p className="text-gray-500 mt-2">Key Worker: {resident.keyWorker}</p>
              </div>
            </div>
            
            <div className="flex-grow">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500">Date of Birth</dt>
                      <dd>January 15, 2010</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Admission Date</dt>
                      <dd>March 20, 2023</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Social Worker</dt>
                      <dd>Emma Thompson</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Education</dt>
                      <dd>Oakwood High School</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Medical Needs</dt>
                      <dd>Asthma, ADHD</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Dietary Requirements</dt>
                      <dd>No nuts, lactose intolerant</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
          <div className="flex justify-between items-center border-b">
            <TabsList className="bg-transparent h-auto p-0 mb-0">
              <TabsTrigger
                value="profile"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="contacts"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contacts
              </TabsTrigger>
              <TabsTrigger
                value="meetings"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Meetings
              </TabsTrigger>
              <TabsTrigger
                value="emails"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <Mail className="h-4 w-4 mr-2" />
                Emails
              </TabsTrigger>
              <TabsTrigger
                value="safeguarding"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <Shield className="h-4 w-4 mr-2" />
                Safeguarding
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="incidents"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Incidents
              </TabsTrigger>
              <TabsTrigger
                value="support-plans"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <Heart className="h-4 w-4 mr-2" />
                Support Plans
              </TabsTrigger>
              <TabsTrigger
                value="risk-assessments"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <AlertOctagon className="h-4 w-4 mr-2" />
                Risk Assessments
              </TabsTrigger>
              <TabsTrigger
                value="keywork"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                Key Work
              </TabsTrigger>
            </TabsList>
            <Button 
              size="sm" 
              className="mr-2 mb-2" 
              onClick={handleAddNew}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>

          <TabsContent value="profile" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Personal Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500">Full Name</dt>
                      <dd>{resident.name}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Preferred Name</dt>
                      <dd>{resident.name.split(' ')[0]}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Date of Birth</dt>
                      <dd>January 15, 2010</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Gender</dt>
                      <dd>Male</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Religious Beliefs</dt>
                      <dd>Christian</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Nationality</dt>
                      <dd>British</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Ethnicity</dt>
                      <dd>White British</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">First Language</dt>
                      <dd>English</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Care Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500">Legal Status</dt>
                      <dd>Child Arrangement Order</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Admission Date</dt>
                      <dd>March 20, 2023</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Key Worker</dt>
                      <dd>{resident.keyWorker}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Social Worker</dt>
                      <dd>Emma Thompson</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Local Authority</dt>
                      <dd>West Midlands County Council</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Care Plan Review Date</dt>
                      <dd>September 15, 2023</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Educational Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500">Current School</dt>
                      <dd>Oakwood High School</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">School Year</dt>
                      <dd>Year 10</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">SEN Status</dt>
                      <dd>EHCP</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">School Contact</dt>
                      <dd>Ms. Patricia Johnson (Head of Year)</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Educational Needs</dt>
                      <dd>Additional support for Mathematics, ADHD accommodations</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Health Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500">GP Name</dt>
                      <dd>Dr. John Smith</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">GP Practice</dt>
                      <dd>Greenfield Medical Center</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Medical Conditions</dt>
                      <dd>Asthma, ADHD</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Allergies</dt>
                      <dd>Nuts, Dairy</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Current Medications</dt>
                      <dd>Ventolin inhaler (as needed), Methylphenidate 10mg (daily)</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Dietary Requirements</dt>
                      <dd>No nuts, lactose intolerant</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Family Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-medium">Sarah Matthews (Mother)</h4>
                      <p className="text-sm text-gray-500">Phone: 07700 900123</p>
                      <p className="text-sm text-gray-500">Email: sarah.matthews@example.com</p>
                      <p className="text-sm text-gray-500">Address: 45 Willow Road, Birmingham</p>
                      <Badge className="mt-2">Primary Contact</Badge>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium">David Matthews (Father)</h4>
                      <p className="text-sm text-gray-500">Phone: 07700 900456</p>
                      <p className="text-sm text-gray-500">Email: david.matthews@example.com</p>
                      <p className="text-sm text-gray-500">Address: 22 Oak Lane, Manchester</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Jennifer Lewis (Grandmother)</h4>
                      <p className="text-sm text-gray-500">Phone: 07700 900789</p>
                      <p className="text-sm text-gray-500">Email: jennifer.lewis@example.com</p>
                      <p className="text-sm text-gray-500">Address: 17 Elder Close, Birmingham</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Professional Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-medium">Emma Thompson (Social Worker)</h4>
                      <p className="text-sm text-gray-500">Phone: 07700 900234</p>
                      <p className="text-sm text-gray-500">Email: emma.thompson@socialservices.gov.uk</p>
                      <p className="text-sm text-gray-500">Organization: West Midlands County Council</p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium">Dr. John Smith (GP)</h4>
                      <p className="text-sm text-gray-500">Phone: 0121 123 4567</p>
                      <p className="text-sm text-gray-500">Email: reception@greenfieldmedical.org</p>
                      <p className="text-sm text-gray-500">Location: Greenfield Medical Center</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Ms. Patricia Johnson (Head of Year)</h4>
                      <p className="text-sm text-gray-500">Phone: 0121 765 4321</p>
                      <p className="text-sm text-gray-500">Email: p.johnson@oakwoodhigh.sch.uk</p>
                      <p className="text-sm text-gray-500">School: Oakwood High School</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-medium">Sarah Matthews (Mother)</h4>
                      <p className="text-sm text-gray-500">Phone: 07700 900123</p>
                      <Badge className="mt-2">Primary Emergency Contact</Badge>
                    </div>
                    <div>
                      <h4 className="font-medium">Jennifer Lewis (Grandmother)</h4>
                      <p className="text-sm text-gray-500">Phone: 07700 900789</p>
                      <Badge className="mt-2">Secondary Emergency Contact</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Meetings</h3>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Care Plan Review Meeting</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">September 15, 2023 | 10:00 AM - 11:30 AM</p>
                    </div>
                    <Badge>Upcoming</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Quarterly review of care plan goals and progress with all stakeholders.</p>
                  <h4 className="font-medium mb-2">Attendees:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Emma Thompson (Social Worker)</li>
                    <li>Sarah Matthews (Mother)</li>
                    <li>{resident.keyWorker} (Key Worker)</li>
                    <li>Home Manager</li>
                    <li>Alex Matthews (Young Person)</li>
                    <li>Ms. Patricia Johnson (School Representative)</li>
                  </ul>
                  <h4 className="font-medium mb-2">Location:</h4>
                  <p className="text-sm">Meeting Room 2, Children's Home</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Educational Progress Meeting</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">August 5, 2023 | 3:30 PM - 4:30 PM</p>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Discussion of recent academic progress and behavior at school.</p>
                  <h4 className="font-medium mb-2">Attendees:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Ms. Patricia Johnson (Head of Year)</li>
                    <li>Mr. Thomas Richards (Math Teacher)</li>
                    <li>{resident.keyWorker} (Key Worker)</li>
                    <li>Alex Matthews (Young Person)</li>
                  </ul>
                  <h4 className="font-medium mb-2">Notes:</h4>
                  <p className="text-sm">
                    Alex has shown significant improvement in Mathematics this term. Behavior has been mostly positive
                    with occasional disruptions when medication wears off in the afternoon. Agreed to request homework
                    extension for large projects and additional support during afternoon classes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Contact Arrangement Review</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">July 12, 2023 | 2:00 PM - 3:00 PM</p>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Review of family contact arrangements and schedule adjustments.</p>
                  <h4 className="font-medium mb-2">Attendees:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Emma Thompson (Social Worker)</li>
                    <li>Sarah Matthews (Mother)</li>
                    <li>David Matthews (Father)</li>
                    <li>{resident.keyWorker} (Key Worker)</li>
                    <li>Home Manager</li>
                  </ul>
                  <h4 className="font-medium mb-2">Decisions:</h4>
                  <p className="text-sm">
                    Agreed to increase contact with father to twice monthly. Mother's visits to remain weekly with
                    additional overnight stay once per month. All contact to be supervised initially with review after 3 months.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emails" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Emails</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>School Attendance Update</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">From: p.johnson@oakwoodhigh.sch.uk</p>
                      <p className="text-sm text-gray-500">To: keyworker@childrensfirst.org</p>
                      <p className="text-sm text-gray-500">Date: September 12, 2023</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border-l-4 border-gray-200 pl-4 py-2 mb-4">
                    <p className="text-sm">
                      Dear {resident.keyWorker},<br/><br/>
                      I wanted to provide a quick update on Alex's attendance this month. His overall attendance has improved to 92%, which is a positive step forward from last term's 85%. He has been arriving on time consistently since the new transportation arrangements were put in place.<br/><br/>
                      However, I noticed he missed two afternoon sessions last week. Could you confirm if these were related to his medical appointments?<br/><br/>
                      Best regards,<br/>
                      Patricia Johnson<br/>
                      Head of Year 10<br/>
                      Oakwood High School
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>CAMHS Appointment Confirmation</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">From: appointments@camhs.nhs.uk</p>
                      <p className="text-sm text-gray-500">To: keyworker@childrensfirst.org</p>
                      <p className="text-sm text-gray-500">Date: September 5, 2023</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border-l-4 border-gray-200 pl-4 py-2 mb-4">
                    <p className="text-sm">
                      Dear {resident.keyWorker},<br/><br/>
                      This email confirms Alex Matthews' appointment with Dr. Rebecca Stevens at Child and Adolescent Mental Health Services.<br/><br/>
                      Date: September 18, 2023<br/>
                      Time: 2:30 PM<br/>
                      Location: CAMHS Clinic, 45 Hillside Road<br/><br/>
                      Please arrive 15 minutes prior to the appointment time. If you need to cancel or reschedule, please give at least 24 hours notice.<br/><br/>
                      Kind regards,<br/>
                      CAMHS Appointment Team
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Monthly Update for Parent</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">From: keyworker@childrensfirst.org</p>
                      <p className="text-sm text-gray-500">To: sarah.matthews@example.com</p>
                      <p className="text-sm text-gray-500">CC: emma.thompson@socialservices.gov.uk</p>
                      <p className="text-sm text-gray-500">Date: August 30, 2023</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border-l-4 border-gray-200 pl-4 py-2 mb-4">
                    <p className="text-sm">
                      Dear Sarah,<br/><br/>
                      I hope this email finds you well. I wanted to provide you with our monthly update on Alex's progress and activities for August.<br/><br/>
                      <strong>Education:</strong> Alex has completed his summer learning activities as recommended by school. He's particularly shown interest in the science experiments we did as part of the summer program.<br/><br/>
                      <strong>Health:</strong> Alex had his medication review with Dr. Smith on August 15th. No changes were made to his current prescriptions, and the doctor was satisfied with his progress.<br/><br/>
                      <strong>Well-being:</strong> Alex has been engaging well with the group activities, particularly enjoying the football sessions on Wednesdays. He has formed a good friendship with two other residents and they often play games together.<br/><br/>
                      <strong>Upcoming:</strong> As you know, school resumes on September 4th. Alex's school uniform has been prepared, and all necessary supplies have been purchased.<br/><br/>
                      As always, please feel free to contact me if you have any questions or would like more details on any aspect of Alex's care.<br/><br/>
                      Best regards,<br/>
                      {resident.keyWorker}<br/>
                      Key Worker
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safeguarding" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Safeguarding Issues</h3>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Internet Safety Concern</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Reported by: {resident.keyWorker} | September 2, 2023</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium Risk</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Description:</h4>
                  <p className="mb-4">
                    Alex was observed attempting to access inappropriate content online during evening leisure time. When approached,
                    he closed the browser tab quickly and appeared embarrassed.
                  </p>
                  <h4 className="font-medium mb-2">Actions Taken:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Private discussion with Alex about internet safety and appropriate online behavior</li>
                    <li>Reviewed and reinforced home's internet usage policy</li>
                    <li>Implemented additional monitoring of internet usage during evening hours</li>
                    <li>Scheduled internet safety workshop for all residents</li>
                  </ul>
                  <h4 className="font-medium mb-2">Status:</h4>
                  <p className="text-sm">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge> - Follow-up discussion held on September 9. 
                    Alex demonstrated improved understanding of internet safety. Will continue to monitor for 30 days.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Concerning Phone Calls</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Reported by: Night Staff | July 15, 2023</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Risk</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Description:</h4>
                  <p className="mb-4">
                    Alex received multiple phone calls from an unknown adult male claiming to be a family friend. The caller was asking questions about
                    Alex's whereabouts and routine. Alex appeared distressed after the calls.
                  </p>
                  <h4 className="font-medium mb-2">Actions Taken:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Immediately reported to Social Worker and Home Manager</li>
                    <li>Contacted mother to verify if caller was a legitimate family contact (not recognized)</li>
                    <li>Implemented screening of all incoming calls</li>
                    <li>Reported to police with caller details</li>
                    <li>Provided emotional support to Alex and reassured about safety measures</li>
                  </ul>
                  <h4 className="font-medium mb-2">Status:</h4>
                  <p className="text-sm">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Ongoing Investigation</Badge> - Police investigating the source 
                    of calls. No further contact from the unknown caller for over 6 weeks. Safety measures remain in place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Reports</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Monthly Progress Report</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Generated: September 1, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Comprehensive monthly assessment of progress against care plan objectives, behavioral observations,
                    educational achievements, and recommendations for the upcoming month.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium">Prepared By:</h4>
                      <p>{resident.keyWorker}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Distributed To:</h4>
                      <p>Social Worker, Parents, Home Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Educational Assessment</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Generated: August 15, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Detailed assessment of educational needs, progress, and recommendations based on school reports and
                    observations. Includes recommendations for additional support.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium">Prepared By:</h4>
                      <p>Education Liaison Officer</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Distributed To:</h4>
                      <p>School, Social Worker, Key Worker, Parents</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Quarterly Review Report</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Generated: July 1, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Comprehensive review of care plan implementation, progress, and outcomes over the last quarter.
                    Includes updated goals and action plans for the next quarter.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium">Prepared By:</h4>
                      <p>Home Manager, Key Worker</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Distributed To:</h4>
                      <p>Social Worker, Parents, Local Authority</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Health Assessment</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Generated: June 15, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Annual health assessment including physical health, mental wellbeing, medication review, and
                    recommendations for healthcare needs.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium">Prepared By:</h4>
                      <p>Dr. John Smith (GP), CAMHS Team</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Distributed To:</h4>
                      <p>Key Worker, Social Worker, Parents, Home Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Incidents</h3>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Verbal Altercation with Peer</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Incident Date: August 27, 2023 | Reported by: Evening Staff</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Severity</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Description:</h4>
                  <p className="mb-4">
                    Alex was involved in a verbal disagreement with another resident over the use of the gaming console.
                    The altercation included raised voices and some inappropriate language but was quickly de-escalated
                    by staff intervention.
                  </p>
                  <h4 className="font-medium mb-2">Actions Taken:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Staff separated the residents and allowed cooling off period</li>
                    <li>Individual discussions with both residents about appropriate communication</li>
                    <li>Mediated conversation between both parties resulting in apologies</li>
                    <li>Implemented clearer schedule for shared resources</li>
                  </ul>
                  <h4 className="font-medium mb-2">Outcome:</h4>
                  <p className="text-sm">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge> - Both residents 
                    reconciled and have been observed playing games together cooperatively since the incident. No further conflicts.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Property Damage</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Incident Date: July 5, 2023 | Reported by: {resident.keyWorker}</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium Severity</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Description:</h4>
                  <p className="mb-4">
                    Following a difficult phone call with a family member, Alex became upset and kicked his bedroom door,
                    causing damage to the door handle and surrounding wood.
                  </p>
                  <h4 className="font-medium mb-2">Actions Taken:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Staff provided emotional support and de-escalation</li>
                    <li>Maintenance team repaired the door</li>
                    <li>Discussion with Alex about appropriate ways to manage strong emotions</li>
                    <li>Additional session with therapist scheduled</li>
                    <li>Agreement made for Alex to contribute to repair costs through chores</li>
                  </ul>
                  <h4 className="font-medium mb-2">Outcome:</h4>
                  <p className="text-sm">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge> - Alex completed agreed
                    chores and has been working with therapist on emotional regulation strategies. No similar incidents since.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support-plans" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Support Plans</h3>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Education Support Plan</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Created: June 10, 2023 | Review Date: December 10, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Plan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Objectives:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Improve mathematics attainment to age-expected level</li>
                    <li>Maintain consistent school attendance above 90%</li>
                    <li>Develop study routines and homework completion skills</li>
                    <li>Manage ADHD symptoms in classroom environment</li>
                  </ul>
                  <h4 className="font-medium mb-2">Support Strategies:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Weekly tutoring sessions focused on mathematics</li>
                    <li>Daily homework routine with staff support</li>
                    <li>Regular communication with school about work and deadlines</li>
                    <li>Timer and structured breaks for homework completion</li>
                    <li>Morning routine to ensure medication is taken before school</li>
                  </ul>
                  <h4 className="font-medium mb-2">Progress:</h4>
                  <p className="text-sm mb-2">Mathematics assessment scores have improved from 45% to 62% in the last term.</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  <p className="text-sm mb-2">Attendance has improved to 92% (target: 90%).</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Emotional Regulation Plan</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Created: July 15, 2023 | Review Date: October 15, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Plan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Objectives:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Develop skills to identify and name emotions</li>
                    <li>Learn and practice appropriate coping strategies for strong emotions</li>
                    <li>Reduce frequency of emotional outbursts</li>
                    <li>Build resilience to handle disappointment and frustration</li>
                  </ul>
                  <h4 className="font-medium mb-2">Support Strategies:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Weekly sessions with therapist</li>
                    <li>Use of emotion cards and reflective journaling</li>
                    <li>Sensory box with calming items accessible at all times</li>
                    <li>"Time-out" protocol with staff support when emotions escalate</li>
                    <li>Regular exercise and physical activity to manage stress</li>
                  </ul>
                  <h4 className="font-medium mb-2">Progress:</h4>
                  <p className="text-sm mb-2">Emotional outbursts have decreased from 5 per week to 2 per week.</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm mb-2">Use of coping strategies without prompting has increased.</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Health Management Plan</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Created: May 5, 2023 | Review Date: November 5, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Plan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Objectives:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Ensure consistent medication adherence</li>
                    <li>Manage asthma symptoms effectively</li>
                    <li>Promote healthy diet and regular exercise</li>
                    <li>Increase awareness of personal health needs</li>
                  </ul>
                  <h4 className="font-medium mb-2">Support Strategies:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Supervised medication administration twice daily</li>
                    <li>Asthma management education and emergency protocols</li>
                    <li>Structured menu planning with involvement from Alex</li>
                    <li>Three physical activities scheduled weekly (swimming, football, cycling)</li>
                    <li>Regular health check-ups and follow-up appointments</li>
                  </ul>
                  <h4 className="font-medium mb-2">Progress:</h4>
                  <p className="text-sm mb-2">Medication adherence is at 100%.</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-sm mb-2">Asthma attacks have decreased from 2 per month to 0 in the last 3 months.</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk-assessments" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Risk Assessments</h3>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>General Risk Assessment</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Last Updated: August 1, 2023 | Next Review: November 1, 2023</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Risk</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Absconding Risk:</h4>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">Low</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm ml-2">High</span>
                      </div>
                      <p className="text-sm mt-1">No history of absconding. Good compliance with boundaries and curfews.</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Self-Harm Risk:</h4>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">Low</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        <span className="text-sm ml-2">High</span>
                      </div>
                      <p className="text-sm mt-1">No history or indicators of self-harm behavior.</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Risk to Others:</h4>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">Low</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                        <span className="text-sm ml-2">High</span>
                      </div>
                      <p className="text-sm mt-1">Occasional verbal outbursts when frustrated. No physical aggression.</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Substance Use Risk:</h4>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">Low</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-sm ml-2">High</span>
                      </div>
                      <p className="text-sm mt-1">No history or indicators of substance use. Good awareness of risks.</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Overall Risk Level:</h4>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">Low</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm ml-2">High</span>
                      </div>
                      <p className="text-sm mt-1">General risk level is low. Standard supervision is appropriate.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Community Activities Risk Assessment</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Last Updated: July 10, 2023 | Next Review: October 10, 2023</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Risk</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Activity Types Assessed:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Independent travel to/from school</li>
                    <li>Community leisure activities</li>
                    <li>Sports clubs and group activities</li>
                    <li>Shopping trips</li>
                  </ul>
                  <h4 className="font-medium mb-2">Risk Factors:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Time management - Occasional lateness returning from activities</li>
                    <li>Money management - Some impulsive spending on snacks/games</li>
                    <li>Peer relationships - Generally positive but occasional peer pressure situations</li>
                  </ul>
                  <h4 className="font-medium mb-2">Control Measures:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Mobile phone contact required for independent activities</li>
                    <li>Clear time boundaries and expectations set</li>
                    <li>Budget planning for outings with appropriate amount of money</li>
                    <li>Regular check-ins when in community settings</li>
                  </ul>
                  <h4 className="font-medium mb-2">Conclusion:</h4>
                  <p className="text-sm">
                    Alex can safely participate in community activities with standard supervision and clear boundaries.
                    Independent travel to and from school is approved. Other activities assessed on case-by-case basis.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Family Contact Risk Assessment</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Last Updated: June 20, 2023 | Next Review: December 20, 2023</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Risk</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Contact Types Assessed:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Supervised visits with mother</li>
                    <li>Supervised visits with father</li>
                    <li>Unsupervised visits with grandmother</li>
                    <li>Phone calls with family members</li>
                    <li>Home visits/overnight stays</li>
                  </ul>
                  <h4 className="font-medium mb-2">Risk Factors:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>History of domestic violence between parents</li>
                    <li>Father's inconsistent engagement</li>
                    <li>Mother's occasional emotional dysregulation during visits</li>
                    <li>Alex's emotional responses following certain contacts</li>
                  </ul>
                  <h4 className="font-medium mb-2">Control Measures:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Supervised contact with both parents (review after 3 months)</li>
                    <li>Parents to attend separately</li>
                    <li>Staff support before and after contact</li>
                    <li>Clear ending times communicated to all parties</li>
                    <li>Unsupervised contact with grandmother approved</li>
                  </ul>
                  <h4 className="font-medium mb-2">Conclusion:</h4>
                  <p className="text-sm">
                    Family contact beneficial but requires management. Current arrangements are working well
                    but emotional impact continues to be monitored. Consider unsupervised contact with mother
                    at next review if progress continues.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="keywork" className="pt-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Key Work Sessions</h3>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Emotional Regulation Session</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Session Date: September 5, 2023 | Key Worker: {resident.keyWorker}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Objectives:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Review emotional regulation strategies</li>
                    <li>Explore recent incident where Alex became angry</li>
                    <li>Practice calm-down techniques</li>
                    <li>Set goals for the coming week</li>
                  </ul>
                  <h4 className="font-medium mb-2">Discussion Notes:</h4>
                  <p className="text-sm mb-3">
                    Alex was able to identify that he becomes most frustrated when he feels others aren't listening to him.
                    He recognized that his anger during the recent gaming incident was disproportionate to the situation.
                    When discussing alternatives, Alex suggested he could have taken a break or used "I" statements
                    instead of raising his voice.
                  </p>
                  <p className="text-sm mb-3">
                    We practiced deep breathing exercises and counting to ten. Alex showed good engagement with these techniques
                    and was able to demonstrate them independently.
                  </p>
                  <h4 className="font-medium mb-2">Actions:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Alex to use his emotion journal daily this week</li>
                    <li>Staff to remind Alex of breathing techniques when early signs of frustration are noticed</li>
                    <li>Create visual reminder card for "I" statements to keep in Alex's room</li>
                    <li>Schedule follow-up session in one week</li>
                  </ul>
                  <h4 className="font-medium mb-2">Young Person's Comments:</h4>
                  <p className="text-sm italic">
                    "I think the breathing stuff helps. I'm going to try using it next time I get annoyed with someone.
                    I don't want to shout at people like I did before."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Education Planning Session</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Session Date: August 28, 2023 | Key Worker: {resident.keyWorker}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Objectives:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Prepare for new school term</li>
                    <li>Review academic goals</li>
                    <li>Develop homework routine</li>
                    <li>Address any school-related concerns</li>
                  </ul>
                  <h4 className="font-medium mb-2">Discussion Notes:</h4>
                  <p className="text-sm mb-3">
                    Alex expressed some anxiety about returning to school, particularly about math class where he feels behind.
                    We discussed what support he might need and agreed to continue with the tutoring arrangement.
                  </p>
                  <p className="text-sm mb-3">
                    Alex has set himself a goal of improving his attendance and being on time every day. We created a morning
                    routine checklist to help with this. Alex also wants to join the school football team this year and we
                    discussed how to manage this alongside his academic responsibilities.
                  </p>
                  <h4 className="font-medium mb-2">Actions:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Create morning routine visual checklist</li>
                    <li>Contact math teacher about additional support</li>
                    <li>Set up dedicated homework area in Alex's room</li>
                    <li>Purchase required school supplies (list completed)</li>
                    <li>Schedule weekly education check-in sessions</li>
                  </ul>
                  <h4 className="font-medium mb-2">Young Person's Comments:</h4>
                  <p className="text-sm italic">
                    "I want to do better in math this year. I also really want to make the football team. I'm going to
                    try harder to get to school on time."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Family Relationships Session</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Session Date: August 15, 2023 | Key Worker: {resident.keyWorker}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Objectives:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Discuss recent contact visits</li>
                    <li>Explore feelings about family relationships</li>
                    <li>Address emotional impact of contact</li>
                    <li>Identify support needs around family relationships</li>
                  </ul>
                  <h4 className="font-medium mb-2">Discussion Notes:</h4>
                  <p className="text-sm mb-3">
                    Alex spoke positively about recent visits with his mother, noting that they were more relaxed than
                    previous visits. He mentioned enjoying the activity they did together (baking) during the visit.
                  </p>
                  <p className="text-sm mb-3">
                    Alex expressed disappointment that his father canceled their scheduled visit. We explored his feelings
                    about this, with Alex acknowledging that this has happened several times before. He was able to express
                    his sadness and frustration appropriately.
                  </p>
                  <p className="text-sm mb-3">
                    Alex spoke warmly about his grandmother and expressed that he feels most comfortable during her visits.
                    He would like to have more contact with her if possible.
                  </p>
                  <h4 className="font-medium mb-2">Actions:</h4>
                  <ul className="list-disc pl-5 mb-4 text-sm">
                    <li>Provide feedback to social worker about positive mother contact</li>
                    <li>Discuss with social worker possibility of increased grandmother contact</li>
                    <li>Continue to provide pre and post contact support</li>
                    <li>Add more activity options for future contact visits</li>
                  </ul>
                  <h4 className="font-medium mb-2">Young Person's Comments:</h4>
                  <p className="text-sm italic">
                    "I liked baking with mum. She seemed happier this time. I wish Dad would come when he says he will.
                    I really want to see Nan more, she always makes me feel better."
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {showForm && renderFormBasedOnTab()}
    </>
  );
};