import { Route, Routes } from 'react-router-dom';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { ScrollManager } from './components/layout/ScrollManager';
import { Toasts } from './components/ui/Toasts';
import { ScholarshipDetail } from './components/scholarships/ScholarshipDetail';
import Home from './pages/Home';
import Scholarships from './pages/Scholarships';
import Dashboard from './pages/Dashboard';
import Start from './pages/Start';
import Article from './pages/Article';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main id="main" tabIndex={-1} className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/start" element={<Start />} />
          <Route path="/resources/:slug" element={<Article />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScholarshipDetail />
      <Toasts />
    </>
  );
}
