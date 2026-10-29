// Weekly CECOM-Intel status shown on /cecom-intel and /cecom-intel/es.
// Edit this file every Monday (or whenever the picture changes), then push to main to publish.
// Blocks hide themselves when their data is stale, so the page never shows an old picture:
//   - status strip: hidden 48 h after updatedAt
//   - "This week in 3 points": hidden 8 days after updatedAt
//   - risk calendar: only events between today and the next 30 days are shown
// Keep it factual and politically neutral: what changed and what it means for operations.

export type Level = 'low' | 'moderate' | 'elevated' | 'high' | 'critical';

export interface WeekPoint {
  en: { title: string; impact: string };
  es: { title: string; impact: string };
}

export interface CalendarEvent {
  /** YYYY-MM-DD */
  date: string;
  en: string;
  es: string;
}

export interface CecomStatus {
  /** ISO date-time of the last review, e.g. '2026-11-02T06:30:00-04:00'. null = nothing published yet. */
  updatedAt: string | null;
  level: Level | null;
  week: WeekPoint[];
  calendar: CalendarEvent[];
}

export const STATUS: CecomStatus = {
  updatedAt: null,
  level: null,
  week: [],
  calendar: [],
};
