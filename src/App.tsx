import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import { HomePage } from './pages/home';
import { ProjectsListPage } from './pages/projects-list';
import { ProjectDetailPage } from './pages/project-detail';
import { GCFPage } from './pages/gcf';
import { CarbonOffsetsPage } from './pages/carbon-offsets';
import { AnalyticsPage } from './pages/analytics';
import { ComparePage } from './pages/compare';
import { DownloadPage } from './pages/download';
import { AboutPage } from './pages/about';
import { MethodologyPage } from './pages/methodology';

// Query Client 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsListPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/gcf" element={<GCFPage />} />
              <Route path="/carbon-offsets" element={<CarbonOffsetsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/methodology" element={<MethodologyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
