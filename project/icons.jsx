// ============================================================
// NutriCoach — Icon set (stroke-based, lucide-style, inline SVG)
// ============================================================
/* global React */

const Icon = ({ children, size = 16, stroke = 1.6, className = "", style = {} }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
    className={className} style={style}
  >{children}</svg>
);

const I = {
  home: (p) => <Icon {...p}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></Icon>,
  chat: (p) => <Icon {...p}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.7-5.5A8 8 0 1 1 21 12z"/></Icon>,
  library: (p) => <Icon {...p}><path d="M4 4h6v16H4z"/><path d="M14 4h6v16h-6z"/><path d="M7 8h0M7 12h0M7 16h0"/></Icon>,
  logout: (p) => <Icon {...p}><path d="M15 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4"/><path d="M10 17l-5-5 5-5"/><path d="M15 12H5"/></Icon>,
  arrowRight: (p) => <Icon {...p}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></Icon>,
  plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></Icon>,
  send: (p) => <Icon {...p}><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></Icon>,
  download: (p) => <Icon {...p}><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/></Icon>,
  check: (p) => <Icon {...p}><path d="M4 12l5 5 11-12"/></Icon>,
  sparkle: (p) => <Icon {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></Icon>,
  flame: (p) => <Icon {...p}><path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4-1 3 1 4 3 3 0-2-1-4 0-9z"/></Icon>,
  target: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></Icon>,
  clock: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  calendar: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 3v4M16 3v4"/></Icon>,
  bell: (p) => <Icon {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/></Icon>,
  settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.3l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.2.5.62.89 1.11 1H21a2 2 0 0 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z"/></Icon>,
  leaf: (p) => <Icon {...p}><path d="M11 20A7 7 0 0 1 4 13c0-6 5-10 17-10-1 12-5 17-10 17z"/><path d="M2 22l6-6"/></Icon>,
  book: (p) => <Icon {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></Icon>,
  cup: (p) => <Icon {...p}><path d="M5 4h13v8a6 6 0 0 1-12 0z"/><path d="M18 7h2a2 2 0 0 1 0 4h-2"/><path d="M3 21h18"/></Icon>,
  moon: (p) => <Icon {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></Icon>,
  user: (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></Icon>,
  more: (p) => <Icon {...p}><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></Icon>,
  chevronRight: (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>,
  chevronDown: (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>,
  paperclip: (p) => <Icon {...p}><path d="M21 12.5l-9 9a5.5 5.5 0 0 1-7.78-7.78l9-9a3.5 3.5 0 0 1 4.95 4.95l-9 9a1.5 1.5 0 0 1-2.12-2.12l8.5-8.5"/></Icon>,
  mic: (p) => <Icon {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></Icon>,
  notes: (p) => <Icon {...p}><path d="M5 4h11l3 3v13H5z"/><path d="M9 12h6M9 16h4"/></Icon>,
  fileText: (p) => <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/></Icon>,
  filter: (p) => <Icon {...p}><path d="M4 5h16l-6 8v5l-4 2v-7z"/></Icon>,
  refresh: (p) => <Icon {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></Icon>,
};

window.I = I;
window.Icon = Icon;
