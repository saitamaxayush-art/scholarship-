import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { INITIAL_TRACKER, SCHOLARSHIPS, STAGES } from '../data/scholarships';
import { todayISO } from '../lib/format';

const AppStateContext = createContext(null);

const TRACKER_KEY = 'meritrail.tracker.v1';
const PROFILE_KEY = 'meritrail.profile.v1';

// Storage can be unavailable (private windows, blocked site data). The app must still work.
function readStore(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeStore(key, value) {
  try {
    if (value == null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: state stays in memory for this session */
  }
}

const byId = Object.fromEntries(SCHOLARSHIPS.map((s) => [s.id, s]));
const stageLabel = (id) => STAGES.find((s) => s.id === id)?.label ?? id;

export function AppStateProvider({ children }) {
  const [tracker, setTracker] = useState(() => readStore(TRACKER_KEY, INITIAL_TRACKER));
  const [profile, setProfileState] = useState(() => readStore(PROFILE_KEY, null));
  const [toasts, setToasts] = useState([]);
  const [detailId, setDetailId] = useState(null);
  const toastSeq = useRef(0);

  useEffect(() => writeStore(TRACKER_KEY, tracker), [tracker]);
  useEffect(() => writeStore(PROFILE_KEY, profile), [profile]);

  const notify = useCallback((message) => {
    const id = ++toastSeq.current;
    setToasts((t) => [...t.slice(-2), { id, message }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);
  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const setStage = useCallback(
    (sid, stage, { silent = false } = {}) => {
      const s = byId[sid];
      if (!s) return;
      setTracker((prev) => {
        const base = prev[sid] ?? { done: s.documents.map(() => false) };
        return {
          ...prev,
          [sid]: {
            ...base,
            stage,
            updatedAt: todayISO(),
            outcome: stage === 'decision' ? base.outcome ?? 'waiting' : base.outcome,
          },
        };
      });
      if (!silent) notify(`${s.title} moved to ${stageLabel(stage)}.`);
    },
    [notify],
  );

  const save = useCallback(
    (sid) => {
      if (tracker[sid]) {
        notify('Already in your tracker.');
        return;
      }
      setStage(sid, 'saved', { silent: true });
      notify(`Saved ${byId[sid]?.title}. Find it in your tracker.`);
    },
    [tracker, setStage, notify],
  );

  const startApplication = useCallback(
    (sid) => {
      const current = tracker[sid]?.stage;
      if (current === 'in_progress' || current === 'submitted' || current === 'decision') {
        notify(`This application is already ${stageLabel(current).toLowerCase()}.`);
        return;
      }
      setStage(sid, 'in_progress', { silent: true });
      notify(`Application started for ${byId[sid]?.title}.`);
    },
    [tracker, setStage, notify],
  );

  const remove = useCallback(
    (sid) => {
      setTracker((prev) => {
        const next = { ...prev };
        delete next[sid];
        return next;
      });
      notify(`Removed ${byId[sid]?.title} from your tracker.`);
    },
    [notify],
  );

  const toggleDoc = useCallback((sid, index) => {
    setTracker((prev) => {
      const item = prev[sid];
      if (!item) return prev;
      const done = [...item.done];
      done[index] = !done[index];
      return { ...prev, [sid]: { ...item, done, updatedAt: todayISO() } };
    });
  }, []);

  const setOutcome = useCallback((sid, outcome) => {
    setTracker((prev) => (prev[sid] ? { ...prev, [sid]: { ...prev[sid], outcome, updatedAt: todayISO() } } : prev));
  }, []);

  const closeDetail = useCallback(() => setDetailId(null), []);

  const resetDemo = useCallback(() => {
    setTracker(INITIAL_TRACKER);
    notify('Tracker reset to the sample records.');
  }, [notify]);

  const setProfile = useCallback(
    (p) => {
      setProfileState(p);
      notify(p ? 'Profile saved. Your matches are ready.' : 'Profile cleared.');
    },
    [notify],
  );

  const value = useMemo(
    () => ({
      tracker,
      profile,
      toasts,
      detailId,
      openDetail: setDetailId,
      closeDetail,
      save,
      startApplication,
      setStage,
      remove,
      toggleDoc,
      setOutcome,
      resetDemo,
      setProfile,
      notify,
      dismissToast,
    }),
    [tracker, profile, toasts, detailId, closeDetail, save, startApplication, setStage, remove, toggleDoc, setOutcome, resetDemo, setProfile, notify, dismissToast],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider');
  return ctx;
}

export const getScholarship = (id) => byId[id];
