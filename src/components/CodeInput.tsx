import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CodeInput({ value, onChange, disabled }: CodeInputProps) {
  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={`// Paste your code here...

function example() {
  console.log("Hello, World!");
}

// Lumecode will detect the language
// and explain what the code does`}
        className={cn(
          "code-area min-h-[300px] resize-none p-4 font-mono text-sm",
          "placeholder:text-muted-foreground/50",
          "focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "transition-all duration-200",
          disabled && "opacity-60"
        )}
      />
      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground/50">
        {value.length > 0 && `${value.split("\n").length} lines`}
      </div>
    </div>
  );
}
