# Lumecode - Code Explainer

Live Demo: https://lumecode.vercel.app/

Lumecode is a web application that detects programming languages and provides AI-generated explanations of code snippets.

## Features

- **Automatic Language Detection**: Intelligently identifies the programming language from code syntax
- **AI-Powered Explanations**: Uses advanced AI to generate structured, step-by-step code explanations
- **Real-time Streaming**: Provides explanations in real-time with streaming responses
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Error Handling**: Robust error handling for rate limits, API failures, and invalid inputs
- **Mobile-Friendly**: Responsive design that works on all devices

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - High-quality React components built on Radix UI
- **React Router** - Client-side routing
- **TanStack Query** - Powerful data fetching and caching
- **Lucide React** - Beautiful icons

### Backend
- **Supabase Edge Functions** - Serverless functions running on Deno
- **AI Integration** - Powered by Google's Gemini AI through Lovable's AI Gateway

### Development Tools
- **ESLint** - Code linting and formatting
- **Vitest** - Fast unit testing
- **PostCSS** - CSS processing
- **TypeScript** - Type checking

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lumecode
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with the following variables:

   - VITE_SUPABASE_URL
   - VITE_SUPABASE_PUBLISHABLE_KEY

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Usage

1. Open the application in your browser
2. Paste your code snippet in the input area
3. Click "Explain Code" to get an AI-generated explanation
4. The explanation will appear in real-time, structured with:
   - Detected programming language
   - High-level summary
   - Step-by-step breakdown
   - Key concepts highlighted

## Project Structure

```
lumecode/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # ShadCN UI components
│   │   └── ...            # Custom components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── lib/               # Utility functions
│   └── integrations/      # External service integrations
├── supabase/
│   └── functions/         # Edge functions
└── package.json           # Dependencies and scripts
```

## API

The application uses a Supabase Edge Function for AI processing:

- **Endpoint**: `/functions/v1/explain-code`
- **Method**: POST
- **Body**: `{ "code": "your code here" }`
- **Response**: Streaming text/event-stream with explanation

## Testing

Run the test suite:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Deployment

The app is deployed on Vercel. For deployment, run 'npm run build' and deploy the dist folder.

The application can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

For Supabase functions:
```bash
supabase functions deploy explain-code
```

## Learnings from This Project

Building Lumecode provided valuable experience in modern web development and AI integration:

### Frontend Development
- **React with TypeScript**: Learned to build type-safe React applications using hooks, context, and modern patterns
- **Component Architecture**: Experience with building reusable UI components using ShadCN UI and Radix primitives
- **Styling with Tailwind CSS**: Mastered utility-first CSS approach for rapid UI development
- **State Management**: Implemented complex state logic with custom hooks and React Query for server state

### Backend & API Integration
- **Serverless Functions**: Gained experience with Supabase Edge Functions running on Deno runtime
- **Streaming Responses**: Implemented real-time streaming of AI responses using Server-Sent Events
- **Error Handling**: Built robust error handling for API failures, rate limits, and user input validation
- **CORS Configuration**: Properly configured CORS headers for cross-origin requests

### AI & Machine Learning
- **AI API Integration**: Learned to integrate with AI services through REST APIs
- **Streaming Data Processing**: Handled streaming JSON responses and parsed them in real-time

### Development Tools & Practices
- **Vite Build Tool**: Experience with modern build tools for fast development and optimized production builds
- **Testing with Vitest**: Set up and wrote unit tests for React components and hooks
- **Code Quality**: Implemented ESLint rules and TypeScript for better code quality
- **Package Management**: Used npm and bun for dependency management

### UI/UX Design
- **Responsive Design**: Built mobile-first responsive interfaces
- **Loading States**: Implemented proper loading indicators and skeleton screens
- **User Feedback**: Added toast notifications and error messages for better user experience
- **Accessibility**: Used semantic HTML and ARIA attributes for better accessibility

### DevOps & Deployment
- **Environment Variables**: Managed sensitive configuration with environment variables
- **Static Site Deployment**: Prepared the app for deployment on static hosting platforms
- **Version Control**: Followed Git best practices for collaborative development

