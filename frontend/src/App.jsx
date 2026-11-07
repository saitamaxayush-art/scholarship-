import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ScholarshipModal } from './components/scholarships/ScholarshipModal';
import { LandingPage } from './pages/LandingPage';
import { ScholarshipDiscoveryPage } from './pages/ScholarshipDiscoveryPage';
import { DashboardPage } from './pages/DashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

export const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-gold selection:text-ink font-sans">
      <ScrollToTop />
      <Header />
      <ScholarshipModal />
      <Toast />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/scholarships" element={<ScholarshipDiscoveryPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default App;

