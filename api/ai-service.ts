import OpenAI from "openai";

// Helper to determine if we have OpenAI API access
export function hasOpenAIAccess(): boolean {
  return !!process.env.OPENAI_API_KEY;
}

// Initialize OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

/**
 * Generate suggestions for an incident report
 * @param incidentDescription The description of the incident
 * @returns Array of suggestions
 */
export async function generateIncidentSuggestions(incidentDescription: string): Promise<string[]> {
  try {
    if (!hasOpenAIAccess()) {
      console.log("OpenAI API key not found, returning fallback suggestions");
      return getFallbackSuggestions();
    }

    // Initialize OpenAI client
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are an expert assistant for care home staff who helps with incident reporting. 
          Provide 3-4 helpful, specific, and actionable suggestions for incident reports based on the description provided.
          Focus on regulatory compliance, safeguarding, documentation requirements, and follow-up actions.
          Each suggestion should be a separate item in a JSON array.`
        },
        {
          role: "user",
          content: incidentDescription
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 500
    });

    // Process the response
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    // Parse the JSON response
    const parsedResponse = JSON.parse(content);
    
    // Return the suggestions array or default to fallback if invalid
    return Array.isArray(parsedResponse.suggestions) 
      ? parsedResponse.suggestions 
      : getFallbackSuggestions();

  } catch (error) {
    console.error("Error generating suggestions with OpenAI:", error);
    return getFallbackSuggestions();
  }
}

/**
 * Process a custom prompt for incident assistance
 * @param customPrompt The user's custom prompt
 * @returns A response to the custom prompt
 */
export async function processCustomPrompt(customPrompt: string): Promise<string> {
  try {
    if (!hasOpenAIAccess()) {
      console.log("OpenAI API key not found, returning fallback response");
      return "I'm unable to process custom prompts without an OpenAI API key. Please check your environment configuration.";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are an expert assistant for care home staff. 
          Provide helpful, specific, and actionable guidance in response to queries about incident reporting,
          resident care, safeguarding, and regulatory compliance. Be concise but thorough.`
        },
        {
          role: "user",
          content: customPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    // Return the content or a fallback message
    return response.choices[0].message.content || 
      "I'm sorry, I couldn't generate a response. Please try rephrasing your question.";

  } catch (error) {
    console.error("Error processing custom prompt with OpenAI:", error);
    return "I encountered an error while processing your request. Please try again later or contact support if the issue persists.";
  }
}

/**
 * Get fallback suggestions when OpenAI is not available
 * @returns Array of fallback suggestions
 */
function getFallbackSuggestions(): string[] {
  return [
    "Document all relevant details including time, location, persons involved, and immediate actions taken in response to the incident.",
    "Assess whether this incident requires notification to regulatory authorities or other external stakeholders under safeguarding protocols.",
    "Schedule a follow-up meeting with relevant staff to discuss preventative measures and avoid similar incidents in the future.",
    "Update the resident's care plan to reflect any new information or requirements revealed by this incident."
  ];
}