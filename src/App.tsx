import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
