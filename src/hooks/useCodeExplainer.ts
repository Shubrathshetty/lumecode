import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseCodeExplainerResult {
  explanation: string;
  isLoading: boolean;
  explainCode: (code: string) => Promise<void>;
  reset: () => void;
}

export function useCodeExplainer(): UseCodeExplainerResult {
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reset = useCallback(() => {
    setExplanation("");
  }, []);

  const explainCode = useCallback(async (code: string) => {
    if (!code.trim()) {
      toast.error("Please enter some code to explain");
      return;
    }

    setIsLoading(true);
    setExplanation("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/explain-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ code }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || "Failed to explain code";
        
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please wait a moment and try again.");
        } else if (response.status === 402) {
          toast.error("AI service limit reached. Please try again later.");
        } else {
          toast.error(errorMessage);
        }
        setIsLoading(false);
        return;
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullExplanation = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullExplanation += content;
              setExplanation(fullExplanation);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Handle any remaining buffer
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullExplanation += content;
              setExplanation(fullExplanation);
            }
          } catch {
            /* ignore */
          }
        }
      }

    } catch (error) {
      console.error("Error explaining code:", error);
      toast.error("Failed to explain code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { explanation, isLoading, explainCode, reset };
}
