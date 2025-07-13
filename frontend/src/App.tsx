import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

import { ConversionForm, ConversionHistory } from "./components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mt-8 mb-6 text-gray-800">
        Roman Numerals Converter
      </h1>
      <div>
        <ConversionForm />
        <ConversionHistory />
      </div>
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default function Root() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      }
    >
      <App />
    </Suspense>
  );
}
