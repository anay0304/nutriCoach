// ============================================================
// NutriCoach — Seed Data
// ============================================================
/* global window */

const NC_DATA = {
  user: {
    name: "Mira",
    fullName: "Mira Halvorsen",
    email: "mira@nutricoach.app",
    joinedDays: 41,
  },
  goals: [
    {
      id: "g1",
      title: "Eat a real lunch, not just a snack",
      detail: "Aim for a balanced plate at lunch on weekdays — protein, veg, slow carb.",
      cadence: "Mon–Fri",
      progress: 0.62,
    },
    {
      id: "g2",
      title: "Sit down for dinner without screens",
      detail: "Family meal, no phone, no laptop. Even if it's a quick one.",
      cadence: "4 nights / week",
      progress: 0.45,
    },
    {
      id: "g3",
      title: "Drink water before coffee",
      detail: "A glass of water as the first thing in the morning, before caffeine.",
      cadence: "Daily",
      progress: 0.85,
    },
  ],
  lastSession: {
    id: "s7",
    when: "Yesterday · 6:48 PM",
    title: "Check-in: navigating busy weeks",
    sessionNumber: 7,
    durationMin: 18,
    summary: "We talked about how this week's travel made lunches harder. Mira noticed she defaulted to coffee + a pastry on the road, then felt depleted by 3pm.",
    actionSteps: [
      { id: "a1", text: "Pack two protein bars in your travel bag tonight", done: true },
      { id: "a2", text: "Eat a real breakfast at the hotel — not just coffee", done: true },
      { id: "a3", text: "Walk 10 minutes after lunch on travel days", done: false },
      { id: "a4", text: "Notice (don't fix) afternoon energy dips this week", done: false },
    ],
    struggles: [
      "Hotel lobbies make pastries feel like the default choice",
      "Evening meetings push dinner past 9pm",
    ],
    backupPlans: [
      "If breakfast isn't possible → pack overnight oats from home",
      "If dinner runs late → light, warm, low effort: soup or eggs on toast",
    ],
  },
  sessions: [
    { id: "s7", title: "Check-in: navigating busy weeks", date: "Yesterday", type: "check-in", duration: 18, preview: "Travel weeks felt like a step back. We reframed them as data, not failure." },
    { id: "s6", title: "When the plan meets reality", date: "Fri, May 16", type: "session", duration: 32, preview: "Lunch sometimes turns into chips at her desk. We mapped the triggers." },
    { id: "s5", title: "Quick check-in", date: "Tue, May 13", type: "check-in", duration: 9, preview: "Two wins this week: dinner-table dinners, water before coffee." },
    { id: "s4", title: "Designing easier defaults", date: "Fri, May 9", type: "session", duration: 41, preview: "We talked about the friction between intention and 5pm hunger." },
    { id: "s3", title: "Check-in", date: "Mon, May 5", type: "check-in", duration: 12, preview: "Mira noticed an emotional eating pattern after long meetings." },
    { id: "s2", title: "Identifying your why", date: "Wed, Apr 30", type: "session", duration: 36, preview: "What 'eating well' actually means for Mira's life, not a magazine's." },
    { id: "s1", title: "Initial coaching session", date: "Mon, Apr 28", type: "intake", duration: 48, preview: "First conversation. Goals, history, what's worked, what hasn't." },
  ],
  weekStreak: [true, true, true, false, true, true, false], // sage = day completed
  todayIndex: 6,
  resources: [
    { id: "r1", title: "A gentler approach to evening eating", kind: "Guide", pages: 8, time: "12 min read", tag: "Behavior change", desc: "Why willpower fails at 9pm — and what to try instead." },
    { id: "r2", title: "Five-minute meal scaffolds", kind: "Worksheet", pages: 4, time: "Print & use", tag: "Meals", desc: "A template for assembling a meal when you have no plan." },
    { id: "r3", title: "Tips to improve sleep on busy weeks", kind: "Guide", pages: 6, time: "8 min read", tag: "Sleep", desc: "Small, non-negotiable anchors that protect rest." },
    { id: "r4", title: "When you don't feel hungry in the morning", kind: "Guide", pages: 5, time: "7 min read", tag: "Mornings", desc: "Reading your body's signals without forcing breakfast." },
    { id: "r5", title: "A backup plan for the day you're depleted", kind: "Worksheet", pages: 2, time: "Fill in 5 min", tag: "Resilience", desc: "Pre-decided choices for the hardest version of your day." },
    { id: "r6", title: "Reframing 'I blew it' moments", kind: "Audio", pages: null, time: "14 min listen", tag: "Mindset", desc: "Self-talk scripts to use when the day didn't go as planned." },
    { id: "r7", title: "Grocery list, no recipes required", kind: "Worksheet", pages: 3, time: "Print & use", tag: "Meals", desc: "Ten flexible categories so you can shop without a plan." },
    { id: "r8", title: "What to eat when you're traveling", kind: "Guide", pages: 7, time: "10 min read", tag: "Travel", desc: "Hotel breakfasts, airport stops, and conference catering, made calmer." },
  ],
  conversation: [
    { role: "coach", text: "Welcome back, Mira. Last time we talked about how travel weeks made lunch harder. How did this week feel?" },
    { role: "user", text: "Honestly? Better than I expected. The protein bar trick actually worked twice." },
    { role: "coach", text: "That's worth noticing. What made it work — the bars themselves, or that they were already packed?" },
    { role: "user", text: "Definitely that they were packed. I didn't have to decide anything at 11am, hungry, in a meeting." },
    { role: "coach", text: "That's a behavior-change principle in action: removing decisions from the moment of greatest friction. What's one other moment in your day that could use that same trick?" },
  ],
};

window.NC_DATA = NC_DATA;
