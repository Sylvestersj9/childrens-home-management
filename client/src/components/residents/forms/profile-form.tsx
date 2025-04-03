import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

// Form schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.number().min(10, { message: "Age must be at least 10" }).max(18, { message: "Age must be at most 18" }),
  dob: z.string(),
  room: z.string(),
  status: z.string(),
  keyWorker: z.string(),
  photo: z.string().optional(),
  education: z.string(),
  localAuthority: z.string(),
  admissionDate: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  resident: ProfileFormValues & { id: number };
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileForm({ resident, onSave, onCancel }: ProfileFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: resident.name,
      age: resident.age,
      dob: resident.dob,
      room: resident.room,
      status: resident.status,
      keyWorker: resident.keyWorker,
      photo: resident.photo,
      education: resident.education,
      localAuthority: resident.localAuthority,
      admissionDate: resident.admissionDate,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    toast({
      title: "Profile updated",
      description: "The resident profile has been updated successfully.",
    });
    
    onSave();
  };

  const formatDateInput = (isoString: string) => {
    const date = parseISO(isoString);
    return format(date, "yyyy-MM-dd");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            {...form.register("name")} 
            className={form.formState.errors.name ? "border-red-500" : ""}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input 
            id="age" 
            type="number" 
            {...form.register("age", { valueAsNumber: true })} 
            className={form.formState.errors.age ? "border-red-500" : ""}
          />
          {form.formState.errors.age && (
            <p className="text-sm text-red-500">{form.formState.errors.age.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input 
            id="dob" 
            type="date" 
            {...form.register("dob")} 
            error={form.formState.errors.dob?.message}
            defaultValue={formatDateInput(resident.dob)}
          />
          {form.formState.errors.dob && (
            <p className="text-sm text-red-500">{form.formState.errors.dob.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="room">Room</Label>
          <Input 
            id="room" 
            {...form.register("room")} 
            error={form.formState.errors.room?.message}
          />
          {form.formState.errors.room && (
            <p className="text-sm text-red-500">{form.formState.errors.room.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            defaultValue={resident.status} 
            onValueChange={(val) => form.setValue("status", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="appointment">Appointment</SelectItem>
              <SelectItem value="leave">Leave</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.status && (
            <p className="text-sm text-red-500">{form.formState.errors.status.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="keyWorker">Key Worker</Label>
          <Input 
            id="keyWorker" 
            {...form.register("keyWorker")} 
            error={form.formState.errors.keyWorker?.message}
          />
          {form.formState.errors.keyWorker && (
            <p className="text-sm text-red-500">{form.formState.errors.keyWorker.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="education">Education</Label>
          <Input 
            id="education" 
            {...form.register("education")} 
            error={form.formState.errors.education?.message}
          />
          {form.formState.errors.education && (
            <p className="text-sm text-red-500">{form.formState.errors.education.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="localAuthority">Local Authority</Label>
          <Input 
            id="localAuthority" 
            {...form.register("localAuthority")} 
            error={form.formState.errors.localAuthority?.message}
          />
          {form.formState.errors.localAuthority && (
            <p className="text-sm text-red-500">{form.formState.errors.localAuthority.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="admissionDate">Admission Date</Label>
          <Input 
            id="admissionDate" 
            type="date" 
            {...form.register("admissionDate")} 
            error={form.formState.errors.admissionDate?.message}
            defaultValue={formatDateInput(resident.admissionDate)}
          />
          {form.formState.errors.admissionDate && (
            <p className="text-sm text-red-500">{form.formState.errors.admissionDate.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="photo">Photo URL</Label>
          <Input 
            id="photo" 
            {...form.register("photo")} 
            error={form.formState.errors.photo?.message}
          />
          {form.formState.errors.photo && (
            <p className="text-sm text-red-500">{form.formState.errors.photo.message}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}