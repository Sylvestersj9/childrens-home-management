import { FC } from 'react';
import { X } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface FormPlaceholderProps {
  title: string;
  description: string;
  residentId: number;
  onClose: () => void;
}

const FormPlaceholder: FC<FormPlaceholderProps> = ({ 
  title, 
  description, 
  residentId, 
  onClose 
}) => {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Form submitted",
      description: `${title} data has been submitted for resident ID: ${residentId}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-500">
              This is a placeholder for the {title.toLowerCase()} form. In a complete implementation, 
              this would include all relevant fields for capturing detailed information.
            </p>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit {title}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Meeting Form
export const MeetingForm: FC<{ residentId: number; onClose: () => void }> = (props) => {
  return (
    <FormPlaceholder
      title="New Meeting"
      description="Schedule a new meeting related to this resident"
      {...props}
    />
  );
};

// Email Form
export const EmailForm: FC<{ residentId: number; onClose: () => void }> = (props) => {
  return (
    <FormPlaceholder
      title="New Email"
      description="Record a new email communication for this resident"
      {...props}
    />
  );
};

// Safeguarding Form
export const SafeguardingForm: FC<{ residentId: number; onClose: () => void }> = (props) => {
  return (
    <FormPlaceholder
      title="Safeguarding Concern"
      description="Record a new safeguarding concern for this resident"
      {...props}
    />
  );
};

// Report Form
export const ReportForm: FC<{ residentId: number; onClose: () => void }> = (props) => {
  return (
    <FormPlaceholder
      title="New Report"
      description="Create a new report for this resident"
      {...props}
    />
  );
};

// Incident Form
export const IncidentForm: FC<{ residentId: number; onClose: () => void }> = (props) => {
  return (
    <FormPlaceholder
      title="New Incident"
      description="Record a new incident involving this resident"
      {...props}
    />
  );
};

// Support Plan Form
export const SupportPlanForm: FC<{ residentId: number; onClose: () => void }> = (props) => {
  return (
    <FormPlaceholder
      title="New Support Plan"
      description="Create a new support plan for this resident"
      {...props}
    />
  );
};

// Risk Assessment Form
export const RiskAssessmentForm: FC<{ residentId: number; onClose: () => void }> = (props) => {
  return (
    <FormPlaceholder
      title="New Risk Assessment"
      description="Create a new risk assessment for this resident"
      {...props}
    />
  );
};

// Keywork Form
export const KeyworkForm: FC<{ residentId: number; onClose: () => void }> = (props) => {
  return (
    <FormPlaceholder
      title="New Key Work Session"
      description="Record a new key work session with this resident"
      {...props}
    />
  );
};