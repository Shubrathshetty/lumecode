import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    
    if (!code || typeof code !== "string" || code.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide code to explain" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service is not configured");
    }

    console.log("Processing code explanation request, code length:", code.length);

    const systemPrompt = `You are Lumecode, an expert code explainer. Your task is to:

1. **Detect the programming language** based on syntax patterns, keywords, and structure
2. **Provide a clear, structured explanation** of the code

Format your response EXACTLY as follows:

## Detected Language: [Language Name]

## Summary
[1-2 sentences describing what the code does at a high level]

## Step-by-Step Explanation

1. **[First concept/section]**: [Explanation]
2. **[Second concept/section]**: [Explanation]
[Continue as needed...]

## Key Concepts
- **[Concept 1]**: [Brief explanation]
- **[Concept 2]**: [Brief explanation]
[Only include 2-4 most important concepts]

Guidelines:
- Use simple, beginner-friendly language
- Explain WHY the code works, not just WHAT it does
- Highlight important programming concepts
- If you detect functions, loops, conditionals, or variables, explain their purpose
- Keep explanations concise but thorough`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please explain this code:\n\n\`\`\`\n${code}\n\`\`\`` }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to analyze code. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Explain code error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
