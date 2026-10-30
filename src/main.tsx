import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HttpError } from './api/client'
import './index.css'
import {RouterProvider} from 'react-router';
import routes from './components/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      // לא מנסים שוב על שגיאות 4xx, כי ניסיון חוזר לא ישנה את התוצאה
      retry: (count, error) =>
        !(error instanceof HttpError && error.status >= 400 && error.status < 500) && count < 2,
    },
  },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <QueryClientProvider client={queryClient}>
      
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
    </StrictMode>,
  
)
