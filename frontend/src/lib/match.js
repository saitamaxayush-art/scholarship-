// Matching rules for the demo. Each check returns a plain-language reason so the UI
// can explain exactly why a scholarship does or does not fit the student's profile.

export function evaluateMatch(s, profile) {
  if (!profile) return null;
  const reasons = [];
  let eligible = true;
  let score = 0;

  if (s.levels.includes(profile.level)) {
    score += 35;
    reasons.push({ ok: true, text: `Open to ${profile.level.toLowerCase()} students` });
  } else {
    eligible = false;
    reasons.push({ ok: false, text: `Only for ${s.levels.join(' or ').toLowerCase()} students` });
  }

  if (s.field === 'Any') {
    score += 20;
    reasons.push({ ok: true, text: 'Any major can apply' });
  } else if (s.field === profile.field) {
    score += 30;
    reasons.push({ ok: true, text: `Matches your field: ${s.field}` });
  } else {
    eligible = false;
    reasons.push({ ok: false, text: `Limited to ${s.field} students` });
  }

  const gpa = parseFloat(profile.gpa);
  if (s.minGpa == null) {
    score += 15;
    reasons.push({ ok: true, text: 'No minimum GPA' });
  } else if (!Number.isNaN(gpa) && gpa >= s.minGpa) {
    score += 15;
    reasons.push({ ok: true, text: `Your GPA meets the ${s.minGpa.toFixed(1)} minimum` });
  } else if (Number.isNaN(gpa)) {
    reasons.push({ ok: null, text: `Needs a ${s.minGpa.toFixed(1)} GPA. Add yours to check.` });
  } else {
    eligible = false;
    reasons.push({ ok: false, text: `Needs a ${s.minGpa.toFixed(1)} GPA` });
  }

  if (s.requiresNeed) {
    if (profile.financialNeed) {
      score += 10;
      reasons.push({ ok: true, text: 'You told us you have financial need' });
    } else {
      eligible = false;
      reasons.push({ ok: false, text: 'Requires demonstrated financial need' });
    }
  }

  if (s.identity) {
    if (profile.identities?.includes(s.identity)) {
      score += 20;
      reasons.push({ ok: true, text: 'Fits something you shared in your profile' });
    } else {
      eligible = false;
      reasons.push({ ok: false, text: 'Reserved for a specific student group' });
    }
  }

  const percent = eligible ? Math.min(99, 55 + Math.round(score * 0.45)) : Math.min(40, Math.round(score * 0.4));
  return { eligible, percent, reasons };
}

export const matchLabel = (m) => {
  if (!m) return null;
  if (!m.eligible) return 'Not a fit yet';
  if (m.percent >= 90) return 'Strong match';
  return 'Good match';
};
