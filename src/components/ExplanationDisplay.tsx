import { cn } from "@/lib/utils";

interface ExplanationDisplayProps {
  content: string;
  isLoading: boolean;
}

export function ExplanationDisplay({ content, isLoading }: ExplanationDisplayProps) {
  if (!content && !isLoading) {
    return (
      <div className="explanation-block min-h-[300px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <p className="text-muted-foreground">
            Paste code and click "Explain Code" to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("explanation-block min-h-[300px] animate-fade-in")}>
      {isLoading && !content && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground">Analyzing code...</span>
        </div>
      )}
      
      <div className="prose prose-invert prose-sm max-w-none">
        {content.split("\n").map((line, index) => {
          // Handle headers
          if (line.startsWith("## ")) {
            const headerText = line.replace("## ", "");
            const isLanguageHeader = headerText.startsWith("Detected Language:");
            
            if (isLanguageHeader) {
              const language = headerText.replace("Detected Language:", "").trim();
              return (
                <div key={index} className="mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium text-foreground">{language}</span>
                  </span>
                </div>
              );
            }
            
            return (
              <h3 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3 gradient-text">
                {headerText}
              </h3>
            );
          }
          
          // Handle numbered list items
          if (/^\d+\.\s/.test(line)) {
            return (
              <div key={index} className="flex gap-3 my-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                  {line.match(/^\d+/)?.[0]}
                </span>
                <span className="text-foreground/90" dangerouslySetInnerHTML={{ 
                  __html: line.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
                }} />
              </div>
            );
          }
          
          // Handle bullet points
          if (line.startsWith("- ")) {
            return (
              <div key={index} className="flex gap-3 my-2 ml-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary" />
                <span className="text-foreground/90" dangerouslySetInnerHTML={{ 
                  __html: line.replace(/^-\s/, "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
                }} />
              </div>
            );
          }
          
          // Handle empty lines
          if (!line.trim()) {
            return <div key={index} className="h-2" />;
          }
          
          // Regular paragraph
          return (
            <p key={index} className="text-foreground/80 my-2" dangerouslySetInnerHTML={{ 
              __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>').replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted text-primary text-xs font-mono">$1</code>')
            }} />
          );
        })}
      </div>
      
      {isLoading && content && (
        <div className="mt-4 flex items-center gap-2 text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs">Generating...</span>
        </div>
      )}
    </div>
  );
}
