import { useState } from "react";
import { Sparkles, Send, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
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

interface SuggestionsResponse {
  suggestions: string[];
  aiAvailable: boolean;
}

interface PromptResponse {
  response: string;
  aiAvailable: boolean;
}

export function AiAssistant({ incidentDetails, onSuggestionSelect }: AiAssistantProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Function to generate suggestions based on incident details
  const generateSuggestions = async () => {
    if (incidentDetails.length < 20) return;
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/ai/suggestions", {
        incidentDescription: incidentDetails
      });
      
      const data: SuggestionsResponse = await response.json();
      
      setSuggestions(data.suggestions);
      setAiAvailable(data.aiAvailable);
      
      if (!data.aiAvailable) {
        toast({
          title: "AI Assistant Limited",
          description: "OpenAI integration is not available. Using fallback suggestions.",
        });
      }
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle custom prompts
  const handleCustomPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/ai/prompt", {
        prompt: prompt
      });
      
      const data: PromptResponse = await response.json();
      
      setSuggestions(prev => [data.response, ...prev]);
      setAiAvailable(data.aiAvailable);
      setPrompt("");
      
      if (!data.aiAvailable) {
        toast({
          title: "AI Assistant Limited",
          description: "OpenAI integration is not available. Using fallback responses.",
        });
      }
    } catch (error) {
      console.error("Error processing prompt:", error);
      toast({
        title: "Error",
        description: "Failed to process your question. Please try again later.",
        variant: "destructive",
      });
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
          {aiAvailable === false && (
            <span className="ml-2 text-amber-500 flex items-center text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Limited Mode
            </span>
          )}
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
            <div className="space-y-3 max-h-[240px] overflow-y-auto">
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