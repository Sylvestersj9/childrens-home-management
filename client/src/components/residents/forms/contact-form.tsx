import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Form schema
const contactFormSchema = z.object({
  socialWorkerName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  socialWorkerPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
  socialWorkerEmail: z.string().email({ message: "Please enter a valid email address" }),
  emergencyContactName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  emergencyContactRelation: z.string().min(2, { message: "Relation must be at least 2 characters" }),
  emergencyContactPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
  emergencyContactEmail: z.string().email({ message: "Please enter a valid email address" }),
  notes: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  initialData: {
    socialWorkerName: string;
    socialWorkerPhone: string;
    socialWorkerEmail: string;
    emergencyContactName: string;
    emergencyContactRelation: string;
    emergencyContactPhone: string;
    emergencyContactEmail: string;
    notes?: string;
  };
  onSave: () => void;
  onCancel: () => void;
}

export function ContactForm({ initialData, onSave, onCancel }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    toast({
      title: "Contact information updated",
      description: "The contact information has been updated successfully.",
    });
    
    onSave();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Social Worker</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="socialWorkerName">Name</Label>
            <Input 
              id="socialWorkerName" 
              {...form.register("socialWorkerName")} 
              error={form.formState.errors.socialWorkerName?.message}
            />
            {form.formState.errors.socialWorkerName && (
              <p className="text-sm text-red-500">{form.formState.errors.socialWorkerName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="socialWorkerPhone">Phone</Label>
            <Input 
              id="socialWorkerPhone" 
              {...form.register("socialWorkerPhone")} 
              error={form.formState.errors.socialWorkerPhone?.message}
            />
            {form.formState.errors.socialWorkerPhone && (
              <p className="text-sm text-red-500">{form.formState.errors.socialWorkerPhone.message}</p>
            )}
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="socialWorkerEmail">Email</Label>
            <Input 
              id="socialWorkerEmail" 
              type="email" 
              {...form.register("socialWorkerEmail")} 
              error={form.formState.errors.socialWorkerEmail?.message}
            />
            {form.formState.errors.socialWorkerEmail && (
              <p className="text-sm text-red-500">{form.formState.errors.socialWorkerEmail.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName">Name</Label>
            <Input 
              id="emergencyContactName" 
              {...form.register("emergencyContactName")} 
              error={form.formState.errors.emergencyContactName?.message}
            />
            {form.formState.errors.emergencyContactName && (
              <p className="text-sm text-red-500">{form.formState.errors.emergencyContactName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emergencyContactRelation">Relationship</Label>
            <Input 
              id="emergencyContactRelation" 
              {...form.register("emergencyContactRelation")} 
              error={form.formState.errors.emergencyContactRelation?.message}
            />
            {form.formState.errors.emergencyContactRelation && (
              <p className="text-sm text-red-500">{form.formState.errors.emergencyContactRelation.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone">Phone</Label>
            <Input 
              id="emergencyContactPhone" 
              {...form.register("emergencyContactPhone")} 
              error={form.formState.errors.emergencyContactPhone?.message}
            />
            {form.formState.errors.emergencyContactPhone && (
              <p className="text-sm text-red-500">{form.formState.errors.emergencyContactPhone.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emergencyContactEmail">Email</Label>
            <Input 
              id="emergencyContactEmail" 
              type="email" 
              {...form.register("emergencyContactEmail")} 
              error={form.formState.errors.emergencyContactEmail?.message}
            />
            {form.formState.errors.emergencyContactEmail && (
              <p className="text-sm text-red-500">{form.formState.errors.emergencyContactEmail.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea 
          id="notes" 
          {...form.register("notes")} 
          error={form.formState.errors.notes?.message}
          placeholder="Add any additional contact information or notes here..."
          className="min-h-[100px]"
        />
        {form.formState.errors.notes && (
          <p className="text-sm text-red-500">{form.formState.errors.notes.message}</p>
        )}
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