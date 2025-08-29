import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Layout } from '@/views/layouts/main-layout';

// Lazy load pages
const HomePage = lazy(() =>
  import('../views/pages/home/index').then((module) => ({
    default: module.HomePage,
  }))
);
const DetailPage = lazy(() =>
  import('../views/pages/details/index').then((module) => ({
    default: module.DetailPage,
  }))
);
const NotFoundPage = lazy(() =>
  import('../views/pages/not-found/index').then((module) => ({
    default: module.NotFoundPage,
  }))
);

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
      <p className="text-muted-foreground">Carregando página...</p>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <NotFoundPage />
      </Layout>
    ),
  },
  {
    path: '/pessoa/:id',
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <DetailPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <NotFoundPage />
      </Layout>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
