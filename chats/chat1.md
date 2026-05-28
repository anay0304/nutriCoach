# NutriCoach Design System

_Started 2026-05-24 23:26 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "AI_Nutrition_Coach"
Project is currently empty (no files)
Current date is now May 24, 2026
</system-info>

<default aesthetic>
If no references, art direction or design systems were provided, use this default professional modern, minimal aesthetic as a base. Declare your choice out loud so you stick to it. Guidance:
- Choose a type pairing from web-safe set or Google Fonts. Helvetica is a good choice. Avoid hard-to-read or overly stylized fonts. Use 1-3 fonts only.
- Foreground and background: choose a color tone (warm, cool, neutral, something in-between). Use subtly-toned whites and blacks; avoid saturations above 0.02 for whites.
- Accents: choose 0-2 additional accent colors using oklch. All accents should share same chroma and lightness; vary hue.
- NEVER write out an SVG yourself that's more complicated than a square, circle, diamond, etc.
- For imagery, never hand-draw SVGs; use subtly-striped SVG placeholders instead with monospace explainers for what should be dropped there (e.g. “product shot”)

CRITICAL: ignore default aesthetic entirely if given other aesthetic instructions like reference images, design systems or guidance, or if there are files in the project already.
</default aesthetic>

<pasted_text name="Pasted text (163 lines)">
Project: Full desktop web app UI for an AI Nutrition Coaching App
Goal: Generate a complete, production‑ready UI system for a desktop web application that delivers a personalized coaching experience using behavior‑change principles.

1. High‑Level Purpose
Design a desktop web app that helps users build sustainable, healthier eating habits through personalized AI‑guided coaching.
The UI should feel like a supportive coaching environment, grounded in behavior change psychology, with a clean, modern, structured aesthetic.

Ignore non‑visual elements like AI behavior logic — focus on the user experience, layout, navigation, and visual system.

2. Core User Experience Requirements
Create a full UI flow that includes:

Landing Page + Sign Up
Clean, welcoming landing page

Clear CTA to sign up

After sign‑up → redirect to dashboard

Dashboard (Primary Home Screen)
Always shows the user’s next steps

For first‑time users:

Prominent CTA to start the Initial Coaching Session

For returning users:

Number of sessions completed

Summary of goals collected during the initial session

Summary of the most recent session (action steps, struggles, backup plans)

Should feel like a coaching hub with clear structure and guidance

Sidebar Navigation
Include the following sections:

Dashboard

Coaching

Resources

Sign Out

Use a desktop‑first layout with a left sidebar and main content area.

Coaching Page
This is the core experience. Include:

List of past sessions / conversation history

Ability to start a new session

Ability to start a check‑in session

Chat interface for the AI coaching conversation

Clear layout for session summaries and context

Resources Page
List of downloadable PDFs (e.g., “Tips to Improve Sleep”)

Clean card‑based layout

Space for future resources

Sign Out
Simple, clear sign‑out flow

3. Core Features to Represent Visually
Design UI elements for:

Coaching progress (session count, streaks, milestones)

Session summaries (action steps, struggles, backup plans)

Conversation history

Chat interface for coaching

Goal summaries

Behavior‑change‑friendly visual cues (gentle colors, clarity, structure)

4. Design Requirements
Desktop‑first layout

Clean, modern, minimal aesthetic

Behavior‑change‑oriented tone (supportive, calm, structured)

Consistent spacing, typography, and component patterns

Clear hierarchy and information architecture

Modular components that map cleanly to React/Next.js

Accessible color contrast

Card‑based content areas

Smooth spacing rhythm

5. Component System to Build
Please design a reusable component library including:

Sidebar navigation

Top bar (if needed)

Buttons (primary, secondary, subtle)

Cards (info, data, action)

Session summary components

Chat interface components

Progress widgets

Input fields

Resource cards

Session history list

Goal summary blocks

Label each component clearly so it can be implemented in code later.

6. Inspiration (Screenshots Will Be Uploaded)
I will upload screenshots for visual inspiration.
Please analyze them and match:

Layout patterns

Spacing

Typography

Color mood

Component shapes

Do not copy the screenshots — reinterpret them for this app.

7. Output Expectations
Produce:

Full multi‑screen UI

All flows described above

A consistent design system

A labeled component library

Variations where helpful

A structure that can be cleanly handed off to Claude Code for implementation
</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Hi-fi design">
Create a high-fidelity, polished design. Follow the instructions about design in your system prompt, particularly the 'How to do design work' section. Use the design_canvas starter component, or make a full-bleed prototype and offer options via Tweaks.
</attached-skill>

<attached-skill name="Interactive prototype">
Create a fully interactive prototype with realistic state management and transitions. Use React useState/useEffect for dynamic behavior. Include hover states, click interactions, form validation, animated transitions, and multi-step navigation flows. It should feel like a real working app, not a static mockup.
</attached-skill>


<system-reminder>Auto-injected reminder (ignore if not relevant): do not recreate copyrighted or branded UI unless the user's email domain matches that company. Create original designs instead.</system-reminder>

## Assistant

_[tool: questions_v2]_

## User

Questions answered:
- inspiration: uploads/inspiration-1779665353712.png
- aesthetic_direction: Calm clinical — soft neutrals, generous whitespace, serif accents (think Notion + a wellness clinic)
- presentation_format: Both — prototype as primary, canvas for component library
- screens_priority: Dashboard (returning user), Dashboard (first-time / empty state), Coaching chat interface, Initial coaching session flow
- chat_personality: Decide for me
- progress_viz: Moderate — progress widgets and milestone cards, but no heavy analytics
- tone_words: Supportive, Warm, Compassionate
- color_accent: 3
- brand_name: NutriCoach
- tweaks_focus: Color palette / accent swap, Typography pairings, Sidebar density (compact vs spacious), Dashboard layout variants, Chat bubble styles
- variation_count: 3
- anything_else: The app should feel like a supportive coaching environment, not a fitness tracker.

Avoid overly bright greens or “wellness app cliché” color schemes.

Use my defined color system: navy (structure), warm beige (background), sage (progress only), amber/coral (CTAs).

Keep the coach identity abstract — no human photos, no persona, no avatar.

Prioritize clarity, calmness, and behavior‑change psychology.

The dashboard should always communicate “next steps” clearly.

Progress visualization should be moderate — supportive, not overwhelming.

Avoid clutter, avoid heavy analytics, avoid gamification.

Target user: busy adults trying to build sustainable habits, not track macros.

Tone: calm, structured, encouraging, non‑judgmental.

## Assistant

_[tool: view_image]_

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

Looking at the inspiration: rounded cards, soft elevation, segmented toggles, clean metric cards across the top, calm sidebar. I'll reinterpret with your palette — navy structure, warm beige bg, sage for progress, amber/coral for CTAs — and an abstract coach identity (a soft geometric mark, no human imagery).

**Design system declared:**
- Type: **Newsreader** (serif headings) + **Geist** (sans body) + **JetBrains Mono** (small labels)
- Palette: warm beige `#f4ede0` bg, cream `#fbf7ee` cards, navy `#1f2a3d` structure, sage `#7e9479` progress only, amber `#c97a4a` CTAs
- Cards: 16-20px radius, soft shadow, subtle hairlines
- Coach identity: an abstract concentric-arc mark (no avatar, no photo)

Let me build.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Now let me build the icons module and the screens.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Now the main app shell with routing, Tweaks panel, and the entry HTML.

_[tool: write_file]_

## Assistant

_[tool: write_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now the entry HTML:

_[tool: write_file]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

Clean. Let me see what landed.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Landing looks great. Small fix: headline wrapping. Then I'll continue with the canvas + verify dashboards.Let me check the dashboard, then build the design canvas component library.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

The screenshot was from before my CSS edit. Let me reload.

_[tool: view_image]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

_[tool: read_file]_

Let me build the Component Library design canvas and then finalize.

_[tool: write_file]_

_[tool: write_file]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: save_screenshot]_

_[tool: show_html]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

A couple of layout issues from title-wrapping under flex row. Quick fix:

_[tool: update_todos]_

_[tool: delete_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Delivered both files.

**`NutriCoach Prototype.html`** — full clickable app:
- Landing + sign-up (placeholder name/email, no validation)
- First-time and returning dashboards (3 layout variants)
- Initial 5-step coaching session flow
- Coaching screen with sessions list, live chat (3 bubble styles), and context panel
- Resources library with tag filters
- Sidebar navigation, top bar, sign-out modal

**`NutriCoach Component Library.html`** — design canvas with foundations (palette, type, spacing, brand mark), atoms (buttons, inputs, cards), and domain components (sidebar, goal block, session summary, chat styles, resource card, history list).

**Tweaks panel** exposes: user state (first-time/returning), 4 palettes, 4 type pairings, sidebar density, dashboard layout, chat bubble style.

**Design system honored your rules:** navy structure, warm beige bg, sage *only* for progress, amber/coral CTAs. Abstract concentric-arc coach mark — no avatars, no photos, no gamification. Type pairing is Newsreader + Geist by default.

Next steps if helpful: real PDF previews for resources, populate more session detail views, or add a settings/account page.

