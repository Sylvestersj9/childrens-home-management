import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Resident } from '@/components/dashboard/residents-table';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  preferredName: z.string().min(1, { message: 'Preferred name is required' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  religion: z.string().optional(),
  nationality: z.string().min(1, { message: 'Nationality is required' }),
  ethnicity: z.string().min(1, { message: 'Ethnicity is required' }),
  firstLanguage: z.string().min(1, { message: 'First language is required' }),
  legalStatus: z.string().optional(),
  socialWorker: z.string().min(1, { message: 'Social worker name is required' }),
  localAuthority: z.string().min(1, { message: 'Local authority is required' }),
  carePlanReviewDate: z.string().optional(),
  currentSchool: z.string().optional(),
  schoolYear: z.string().optional(),
  senStatus: z.string().optional(),
  schoolContact: z.string().optional(),
  educationalNeeds: z.string().optional(),
  gpName: z.string().min(1, { message: 'GP name is required' }),
  gpPractice: z.string().min(1, { message: 'GP practice is required' }),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  dietaryRequirements: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  resident: Resident;
  onClose: () => void;
}

export const ProfileForm: FC<ProfileFormProps> = ({ resident, onClose }) => {
  const { toast } = useToast();

  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    preferredName: resident.name.split(' ')[0],
    dateOfBirth: '2010-01-15', // Format as YYYY-MM-DD for input type="date"
    gender: 'Male',
    religion: 'Christian',
    nationality: 'British',
    ethnicity: 'White British',
    firstLanguage: 'English',
    legalStatus: 'Child Arrangement Order',
    socialWorker: 'Emma Thompson',
    localAuthority: 'West Midlands County Council',
    carePlanReviewDate: '2023-09-15',
    currentSchool: 'Oakwood High School',
    schoolYear: 'Year 10',
    senStatus: 'EHCP',
    schoolContact: 'Ms. Patricia Johnson (Head of Year)',
    educationalNeeds: 'Additional support for Mathematics, ADHD accommodations',
    gpName: 'Dr. John Smith',
    gpPractice: 'Greenfield Medical Center',
    medicalConditions: 'Asthma, ADHD',
    allergies: 'Nuts, Dairy',
    currentMedications: 'Ventolin inhaler (as needed), Methylphenidate 10mg (daily)',
    dietaryRequirements: 'No nuts, lactose intolerant',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, you would save this data to your API
    console.log(data);
    toast({
      title: "Profile updated",
      description: "The resident's profile has been successfully updated.",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">Update Profile Information</CardTitle>
              <CardDescription>
                Update the profile information for {resident.name}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">Personal Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="preferredName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="religion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Religious Beliefs</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ethnicity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ethnicity</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="firstLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Language</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">Care Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="legalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select legal status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Child Arrangement Order">Child Arrangement Order</SelectItem>
                            <SelectItem value="Care Order">Care Order</SelectItem>
                            <SelectItem value="Section 20">Section 20</SelectItem>
                            <SelectItem value="Special Guardianship">Special Guardianship</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="socialWorker"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Worker</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="localAuthority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local Authority</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="carePlanReviewDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Care Plan Review Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <h3 className="font-medium text-lg border-b pb-2 mt-6">Educational Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="currentSchool"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current School</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="schoolYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Year</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">Educational Information (continued)</h3>
                  
                  <FormField
                    control={form.control}
                    name="senStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEN Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select SEN status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="SEN Support">SEN Support</SelectItem>
                            <SelectItem value="EHCP">EHCP</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="schoolContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Contact</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="educationalNeeds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Educational Needs</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">Health Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="gpName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GP Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gpPractice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GP Practice</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="medicalConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Conditions</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currentMedications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Medications</FormLabel>
                        <FormControl>
                          <Textarea rows={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dietaryRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Requirements</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Button type="submit" className="mr-2">Save Changes</Button>
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};