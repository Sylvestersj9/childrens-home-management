import { useState } from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AiAssistantProps {
  incidentDetails: string;
  onSuggestionSelect: (suggestion: string) => void;
}

// This is a demonstration component showing how we'd integrate with OpenAI
// In a real implementation, this would make actual API calls to OpenAI
export function AiAssistant({ incidentDetails, onSuggestionSelect }: AiAssistantProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Function to generate suggestions based on incident details
  const generateSuggestions = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // These would normally come from the OpenAI API
      const mockSuggestions = [
        "The incident appears to involve a breach of safety protocols. Consider reviewing relevant safety procedures with all staff members.",
        "Based on the description, this may require follow-up with the resident's guardian or social worker within 24 hours.",
        "Similar incidents have occurred in the past. Consider implementing a preventive measure such as increased supervision during transition periods.",
        "This incident may need to be reported to regulatory authorities under Section 42 of the Care Act."
      ];
      
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle custom prompts
  const handleCustomPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would normally be generated based on the prompt via OpenAI API
      const generatedResponse = `Based on your query "${prompt}", I recommend documenting the following: 1) Exact time and location of the incident, 2) All staff and residents present, 3) Any immediate actions taken to address the situation, 4) Whether any medical attention was required.`;
      
      setSuggestions(prev => [generatedResponse, ...prev]);
      setPrompt("");
    } catch (error) {
      console.error("Error processing prompt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          AI Incident Report Assistant
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions to help complete your incident report
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {incidentDetails.length < 20 ? (
            <p className="text-sm text-gray-500 italic">
              Add more details to your incident description to receive relevant suggestions
            </p>
          ) : suggestions.length === 0 && !isLoading ? (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={generateSuggestions}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Suggestions
            </Button>
          ) : isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="bg-card p-3 rounded-md border">
                  <p className="text-sm mb-2">{suggestion}</p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onSuggestionSelect(suggestion)}
                  >
                    Use Suggestion
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-3">
        <div className="flex w-full space-x-2">
          <Input
            placeholder="Ask a specific question..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomPrompt()}
            disabled={isLoading}
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleCustomPrompt}
            disabled={isLoading || !prompt.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}