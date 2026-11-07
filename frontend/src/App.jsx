import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTransitions } from './lib/motion';
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

const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

export default function App() {
  const location = useLocation();
  const { reduce, t } = useTransitions();
  // Reduced motion: pages swap instantly, with no fade (not even a zero-length one).
  const fade = reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: t('base') };

  return (
    <>
      <ScrollManager />
      <Nav />
      <main id="main" tabIndex={-1} className="min-h-screen">
        {/* Route transition: the outgoing page fades out, scroll resets to the top
            while nothing is on screen, then the new page fades in. Keyed by pathname
            so query-string changes (filters, deep links) never trigger it. */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={resetScroll}>
          <motion.div key={location.pathname} {...fade}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/start" element={<Start />} />
              <Route path="/resources/:slug" element={<Article />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScholarshipDetail />
      <Toasts />
    </>
  );
}
