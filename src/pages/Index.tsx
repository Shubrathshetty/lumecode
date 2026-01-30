import { useState } from "react";
import { Header } from "@/components/Header";
import { CodeInput } from "@/components/CodeInput";
import { ExplanationDisplay } from "@/components/ExplanationDisplay";
import { Button } from "@/components/ui/button";
import { useCodeExplainer } from "@/hooks/useCodeExplainer";
import { Sparkles, RotateCcw } from "lucide-react";

const Index = () => {
  const [code, setCode] = useState("");
  const { explanation, isLoading, explainCode, reset } = useCodeExplainer();

  const handleExplain = () => {
    explainCode(code);
  };

  const handleReset = () => {
    setCode("");
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-6xl py-8 px-4">
        <Header />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Input Code
              </h2>
              {code && (
                <button
                  onClick={handleReset}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
            
            <CodeInput
              value={code}
              onChange={setCode}
              disabled={isLoading}
            />

            <Button
              onClick={handleExplain}
              disabled={isLoading || !code.trim()}
              variant="gradient"
              size="lg"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Explain Code
                </>
              )}
            </Button>
          </div>

          {/* Explanation Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Explanation
            </h2>
            
            <ExplanationDisplay
              content={explanation}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-muted-foreground">
          <p>Powered by AI • Automatic language detection • Read-only explanations</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
