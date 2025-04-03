import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the form schema
const residentFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  gender: z.string().min(1, "Gender is required"),
  room: z.string().min(1, "Room number is required"),
  medicalInfo: z.string().optional(),
  educationInfo: z.string().optional(),
  supportPlans: z.string().optional(),
  guardianDetails: z.string().optional(),
  notes: z.string().optional(),
  // We'll handle file uploads separately as they're not easily managed by zod form validation
});

type ResidentFormValues = z.infer<typeof residentFormSchema>;

interface ResidentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResidentFormModal({ isOpen, onClose }: ResidentFormModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<ResidentFormValues>({
    resolver: zodResolver(residentFormSchema),
    defaultValues: {
      name: "",
      room: "",
      gender: "",
      medicalInfo: "",
      educationInfo: "",
      supportPlans: "",
      guardianDetails: "",
      notes: "",
    },
  });

  // Handle photo file selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Set up the mutation for submitting the form
  const createResidentMutation = useMutation({
    mutationFn: async (values: ResidentFormValues) => {
      // Convert the form values to the format expected by the API
      const data = {
        ...values,
        age: calculateAge(values.dateOfBirth),
        dateOfBirth: format(values.dateOfBirth, "yyyy-MM-dd"),
        admissionDate: format(new Date(), "yyyy-MM-dd"),
        status: "present",
        photo: photoPreview, // In a real app, this would be a URL after file upload
        // Additional fields would be handled here
      };

      // Send the data to the API
      const response = await apiRequest("POST", "/api/residents", data);
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate the residents query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/residents"] });
      
      // Show success message
      toast({
        title: "Resident created",
        description: "The new resident has been added successfully.",
      });

      // Close the modal and reset the form
      onClose();
      form.reset();
      setPhotoFile(null);
      setPhotoPreview(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create resident. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (values: ResidentFormValues) => {
    createResidentMutation.mutate(values);
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Resident</DialogTitle>
          <DialogDescription>
            Enter the details of the new resident. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter gender" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter room number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Profile Picture</FormLabel>
                  <div className="border rounded-md p-4">
                    {photoPreview ? (
                      <div className="relative">
                        <img 
                          src={photoPreview} 
                          alt="Profile preview" 
                          className="mx-auto h-32 w-32 object-cover rounded-md" 
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-0 right-0"
                          type="button"
                          onClick={() => {
                            setPhotoFile(null);
                            setPhotoPreview(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-32 w-32 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <span className="text-gray-400">No photo</span>
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          className="mt-4"
                          onChange={handlePhotoChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Information</h3>
                
                <FormField
                  control={form.control}
                  name="medicalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical History</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter medical history, allergies, medications, etc."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="educationInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Educational Background</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter school, grade, special educational needs, etc."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supportPlans"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placement and Support Plans</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter placement details, support requirements, goals, etc."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guardianDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guardian Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter guardian name, contact information, relationship, etc."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any additional notes or information"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={createResidentMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createResidentMutation.isPending}
              >
                {createResidentMutation.isPending ? "Creating..." : "Create Resident"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}