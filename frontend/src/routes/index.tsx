import { createBrowserRouter } from 'react-router';
import ErrorFallback from '@/components/layouts/ErrorFallback';
import RootLayout from '@/components/layouts/RootLayout';
import LandingPage from '@/routes/LandingPage';
import NotFound from '@/routes/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: (
            <ErrorFallback
                error={new Error('An unexpected routing error occurred')}
                resetErrorBoundary={() => window.location.assign('/')}
            />
        ),
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
