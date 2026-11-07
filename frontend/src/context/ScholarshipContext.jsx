import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SCHOLARSHIPS_DATA, INITIAL_TRACKER_ITEMS } from '../data/scholarships';

const ScholarshipContext = createContext(null);

const STORAGE_KEY = 'grantly_tracker_data_v1';

export const ScholarshipProvider = ({ children }) => {
  const [scholarships] = useState(SCHOLARSHIPS_DATA);
  const [trackerItems, setTrackerItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using initial tracker items", e);
    }
    return INITIAL_TRACKER_ITEMS;
  });

  const [toast, setToast] = useState({ visible: false, message: '', type: 'info', id: null });
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Persist trackerItems to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerItems));
    } catch (e) {
      console.warn("Failed to save to localStorage", e);
    }
  }, [trackerItems]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToast({ visible: true, message, type, id });
    setTimeout(() => {
      setToast(prev => (prev.id === id ? { ...prev, visible: false } : prev));
    }, 3800);
  }, []);

  const dismissToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const getScholarshipById = useCallback((id) => {
    return scholarships.find(s => s.id === id);
  }, [scholarships]);

  const getTrackerItemByScholarshipId = useCallback((scholarshipId) => {
    return trackerItems.find(t => t.scholarshipId === scholarshipId);
  }, [trackerItems]);

  const addToTracker = useCallback((scholarshipId, stage = 'saved') => {
    const targetScholarship = scholarships.find(s => s.id === scholarshipId);
    if (!targetScholarship) return;

    setTrackerItems(prev => {
      const existing = prev.find(item => item.scholarshipId === scholarshipId);
      if (existing) {
        // If already tracked, update its stage
        showToast(`Moved "${targetScholarship.title}" to ${stage.replace('_', ' ')}.`, 'success');
        return prev.map(item =>
          item.scholarshipId === scholarshipId
            ? { ...item, stage, lastUpdated: new Date().toISOString().split('T')[0] }
            : item
        );
      }

      // Create new tracker entry
      const newItem = {
        id: `track-${Date.now()}`,
        scholarshipId,
        stage,
        targetDate: targetScholarship.deadline,
        notes: `Saved to tracker on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.`,
        documents: targetScholarship.requiredDocuments.map(doc => ({
          ...doc,
          completed: false
        })),
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      showToast(`Added "${targetScholarship.title}" to tracker (${stage.replace('_', ' ')}).`, 'success');
      return [newItem, ...prev];
    });
  }, [scholarships, showToast]);

  const updateTrackerStage = useCallback((trackId, newStage) => {
    setTrackerItems(prev => {
      const target = prev.find(t => t.id === trackId);
      const scholarship = target ? scholarships.find(s => s.id === target.scholarshipId) : null;
      const title = scholarship ? scholarship.title : 'Application';

      const stageLabels = {
        saved: 'Saved',
        in_progress: 'In Progress',
        submitted: 'Submitted',
        decision: 'Decision Received'
      };

      showToast(`Updated "${title}" stage to ${stageLabels[newStage] || newStage}.`, 'success');

      return prev.map(item =>
        item.id === trackId
          ? {
              ...item,
              stage: newStage,
              lastUpdated: new Date().toISOString().split('T')[0],
              ...(newStage === 'submitted' && !item.submissionConfirmation
                ? { submissionConfirmation: `GRT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}` }
                : {})
            }
          : item
      );
    });
  }, [scholarships, showToast]);

  const updateDocumentStatus = useCallback((trackId, docId, completed) => {
    setTrackerItems(prev =>
      prev.map(item => {
        if (item.id !== trackId) return item;
        const updatedDocs = item.documents.map(d =>
          d.id === docId ? { ...d, completed } : d
        );
        return {
          ...item,
          documents: updatedDocs,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      })
    );
  }, []);

  const updateTrackerNotes = useCallback((trackId, notes) => {
    setTrackerItems(prev =>
      prev.map(item =>
        item.id === trackId
          ? { ...item, notes, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      )
    );
  }, []);

  const removeFromTracker = useCallback((trackId) => {
    setTrackerItems(prev => {
      const target = prev.find(t => t.id === trackId);
      const scholarship = target ? scholarships.find(s => s.id === target.scholarshipId) : null;
      const title = scholarship ? scholarship.title : 'Application';
      showToast(`Removed "${title}" from your tracker.`, 'info');
      return prev.filter(item => item.id !== trackId);
    });
  }, [scholarships, showToast]);

  const resetTrackerToDefaults = useCallback(() => {
    setTrackerItems(INITIAL_TRACKER_ITEMS);
    showToast("Application tracker restored to initial sample records.", "info");
  }, [showToast]);

  const openScholarshipModal = useCallback((scholarship) => {
    setSelectedScholarship(scholarship);
  }, []);

  const closeScholarshipModal = useCallback(() => {
    setSelectedScholarship(null);
  }, []);

  return (
    <ScholarshipContext.Provider
      value={{
        scholarships,
        trackerItems,
        toast,
        selectedScholarship,
        globalSearchQuery,
        setGlobalSearchQuery,
        addToTracker,
        updateTrackerStage,
        updateDocumentStatus,
        updateTrackerNotes,
        removeFromTracker,
        resetTrackerToDefaults,
        openScholarshipModal,
        closeScholarshipModal,
        showToast,
        dismissToast,
        getScholarshipById,
        getTrackerItemByScholarshipId
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
};

export const useScholarship = () => {
  const context = useContext(ScholarshipContext);
  if (!context) {
    throw new Error('useScholarship must be used within a ScholarshipProvider');
  }
  return context;
};

