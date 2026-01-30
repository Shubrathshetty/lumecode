import lumeLogo from "@/assets/lumecode-logo.jpeg";

export function Header() {
  return (
    <header className="text-center space-y-4 mb-8">
      <div className="flex items-center justify-center gap-4">
        <img 
          src={lumeLogo} 
          alt="Lumecode Logo" 
          className="w-16 h-16 rounded-xl shadow-lg"
        />
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="gradient-text">LUME</span>
            <span className="text-foreground">CODE</span>
          </h1>
          <p className="text-muted-foreground text-sm">From mystery → clarity</p>
        </div>
      </div>
      
      <p className="text-muted-foreground max-w-lg mx-auto">
        Paste any code snippet and get an instant, human-readable explanation. 
        Language detection is automatic.
      </p>
    </header>
  );
}
