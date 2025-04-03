import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
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
import { useToast } from '@/hooks/use-toast';

// Form schema with validation
const residentFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  age: z.coerce.number().min(0).max(100),
  room: z.string().min(1, { message: 'Room number is required' }),
  status: z.enum(['present', 'school', 'appointment', 'leave', 'absent']),
  keyWorker: z.string().min(2, { message: 'Key worker name is required' }),
});

type ResidentFormValues = z.infer<typeof residentFormSchema>;

interface ResidentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResidentFormModal({ isOpen, onClose }: ResidentFormModalProps) {
  const { toast } = useToast();
  
  // Default values for the form
  const defaultValues: Partial<ResidentFormValues> = {
    name: '',
    age: undefined,
    room: '',
    status: 'present',
    keyWorker: '',
  };

  const form = useForm<ResidentFormValues>({
    resolver: zodResolver(residentFormSchema),
    defaultValues,
  });

  function onSubmit(data: ResidentFormValues) {
    // In a real app, you would save this data to your API
    console.log(data);
    
    toast({
      title: "Resident created",
      description: "New resident has been successfully created.",
    });
    
    form.reset(defaultValues);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Resident</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new resident profile.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Age" 
                        {...field} 
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
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
                    <FormLabel>Room Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="school">At School</SelectItem>
                      <SelectItem value="appointment">At Appointment</SelectItem>
                      <SelectItem value="leave">On Leave</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="keyWorker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Worker</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Sarah Johnson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Resident</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}