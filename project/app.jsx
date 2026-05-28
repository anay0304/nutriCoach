// ============================================================
// NutriCoach — App entry: routes + Tweaks integration
// ============================================================
/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect, useTweaks,
   Sidebar, Topbar, DashboardReturning, DashboardFirstTime, Coaching, Resources, InitialSession,
   Landing, SignUpModal, SignOutModal, I */
const { useState: useStateA, useEffect: useEffectA } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sand",
  "typography": "newsreader-geist",
  "density": "regular",
  "dashLayout": "hero",
  "chatStyle": "bubble",
  "userState": "returning"
}/*EDITMODE-END*/;

// Palette presets — each defines the four tokens.
// Constraint: navy structure, beige bg, sage progress, amber/coral CTA.
const PALETTES = {
  sand: {
    label: "Warm Sand",
    swatches: ["#c97a4a", "#1a2435", "#7e9479", "#f1ead9"],
    css: {
      "--bg": "#f1ead9", "--bg-soft": "#ebe3cf", "--surface": "#fbf7ee", "--surface-2": "#f6efde",
      "--hairline": "#e5dcc4", "--hairline-strong": "#d8cdb1",
      "--ink": "#1a2435", "--ink-2": "#2f3b50", "--ink-3": "#5b6577", "--ink-4": "#8a8f9c",
      "--sage": "#7e9479", "--sage-soft": "#d8e1d1", "--sage-ink": "#4a5e46",
      "--amber": "#c97a4a", "--amber-hover": "#b86a3b", "--amber-soft": "#efd6c2", "--amber-ink": "#7a3f1b",
    }
  },
  linen: {
    label: "Soft Linen",
    swatches: ["#d8836a", "#202a3d", "#85a08a", "#f4ede0"],
    css: {
      "--bg": "#f4ede0", "--bg-soft": "#ede4d0", "--surface": "#fcf8ef", "--surface-2": "#f5ecd9",
      "--hairline": "#e3dac1", "--hairline-strong": "#d3c8aa",
      "--ink": "#202a3d", "--ink-2": "#36425a", "--ink-3": "#5e6679", "--ink-4": "#8d909d",
      "--sage": "#85a08a", "--sage-soft": "#dce6d8", "--sage-ink": "#4f6651",
      "--amber": "#d8836a", "--amber-hover": "#c4715a", "--amber-soft": "#f0d7c9", "--amber-ink": "#7e3a25",
    }
  },
  clay: {
    label: "Quiet Clay",
    swatches: ["#b76548", "#161e2d", "#788e74", "#ede4d1"],
    css: {
      "--bg": "#ede4d1", "--bg-soft": "#e4d8be", "--surface": "#f8f1de", "--surface-2": "#efe5cc",
      "--hairline": "#ddd0b3", "--hairline-strong": "#cabe9d",
      "--ink": "#161e2d", "--ink-2": "#2d3548", "--ink-3": "#555d70", "--ink-4": "#878a98",
      "--sage": "#788e74", "--sage-soft": "#d2dccc", "--sage-ink": "#475c43",
      "--amber": "#b76548", "--amber-hover": "#a55939", "--amber-soft": "#ebcab8", "--amber-ink": "#6f351c",
    }
  },
  mist: {
    label: "Cool Mist",
    swatches: ["#a76a4f", "#1c2a3d", "#7e948c", "#eee9dd"],
    css: {
      "--bg": "#eee9dd", "--bg-soft": "#e2dcce", "--surface": "#f9f5ec", "--surface-2": "#ebe5d4",
      "--hairline": "#dfd7c1", "--hairline-strong": "#cdc4ab",
      "--ink": "#1c2a3d", "--ink-2": "#33405a", "--ink-3": "#5e6b7c", "--ink-4": "#8d949f",
      "--sage": "#7e948c", "--sage-soft": "#d6dfd9", "--sage-ink": "#445651",
      "--amber": "#a76a4f", "--amber-hover": "#965d40", "--amber-soft": "#e7cdba", "--amber-ink": "#623422",
    }
  },
};

const TYPE_PAIRS = {
  "newsreader-geist": {
    label: "Newsreader + Geist",
    css: {
      "--serif": "'Newsreader', ui-serif, Georgia, serif",
      "--sans": "'Geist', -apple-system, BlinkMacSystemFont, sans-serif",
      "--mono": "'JetBrains Mono', ui-monospace, monospace",
    }
  },
  "instrument-manrope": {
    label: "Instrument Serif + Manrope",
    css: {
      "--serif": "'Instrument Serif', ui-serif, Georgia, serif",
      "--sans": "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      "--mono": "'JetBrains Mono', ui-monospace, monospace",
    }
  },
  "playfair-dmsans": {
    label: "Playfair + DM Sans",
    css: {
      "--serif": "'Playfair Display', ui-serif, Georgia, serif",
      "--sans": "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      "--mono": "'JetBrains Mono', ui-monospace, monospace",
    }
  },
  "lora-ibm": {
    label: "Lora + IBM Plex Sans",
    css: {
      "--serif": "'Lora', ui-serif, Georgia, serif",
      "--sans": "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      "--mono": "'IBM Plex Mono', ui-monospace, monospace",
    }
  },
};

// Apply tweaks to root style
const useApplyTokens = (t) => {
  useEffectA(() => {
    const root = document.documentElement;
    const p = PALETTES[t.palette] || PALETTES.sand;
    Object.entries(p.css).forEach(([k, v]) => root.style.setProperty(k, v));
    const f = TYPE_PAIRS[t.typography] || TYPE_PAIRS["newsreader-geist"];
    Object.entries(f.css).forEach(([k, v]) => root.style.setProperty(k, v));
    document.body.className = `density-${t.density}`;
  }, [t.palette, t.typography, t.density]);
};

// ---- Main app ---------------------------------------------
const App = () => {
  const [tweaks, setTweak] = useTweaks(DEFAULTS);
  useApplyTokens(tweaks);

  const [route, setRoute] = useStateA("landing");   // landing | dashboard | coaching | resources | intake
  const [authed, setAuthed] = useStateA(false);
  const [signupOpen, setSignupOpen] = useStateA(false);
  const [signoutOpen, setSignoutOpen] = useStateA(false);
  const [authMode, setAuthMode] = useStateA("signup");
  const [hasCompletedIntake, setHasCompletedIntake] = useStateA(tweaks.userState === "returning");

  useEffectA(() => {
    setHasCompletedIntake(tweaks.userState === "returning");
  }, [tweaks.userState]);

  const openSignup = (mode = "signup") => { setAuthMode(mode); setSignupOpen(true); };
  const completeAuth = () => {
    setAuthed(true);
    setSignupOpen(false);
    setRoute("dashboard");
  };
  const completeIntake = () => {
    setHasCompletedIntake(true);
    setTweak("userState", "returning");
    setRoute("dashboard");
  };

  // Auto-route landing if not authed
  useEffectA(() => {
    if (!authed && route !== "landing") setRoute("landing");
  }, [authed]);

  // ============ Render ============
  if (!authed || route === "landing") {
    return (
      <>
        <Landing
          onSignUp={() => openSignup("signup")}
          onSignIn={() => openSignup("signin")}
        />
        {signupOpen && (
          <SignUpModal
            mode={authMode}
            onClose={() => setSignupOpen(false)}
            onSuccess={completeAuth}
          />
        )}
        <Tweaks tweaks={tweaks} setTweak={setTweak} />
      </>
    );
  }

  const sessionsCount = window.NC_DATA.sessions.length;
  const crumb = {
    dashboard: <span>Dashboard <span style={{ color: "var(--ink-4)" }}>· {hasCompletedIntake ? "Returning" : "First-time"}</span></span>,
    coaching:  <span>Coaching <span style={{ color: "var(--ink-4)" }}>· Conversations</span></span>,
    resources: <span>Resources <span style={{ color: "var(--ink-4)" }}>· Library</span></span>,
    intake:    <span>Initial coaching session</span>,
  }[route];

  return (
    <>
      <div className="app">
        <Sidebar
          current={route === "intake" ? "coaching" : route}
          onNav={setRoute}
          sessionsCount={sessionsCount}
          onSignOut={() => setSignoutOpen(true)}
        />
        <div className="main">
          <Topbar
            crumb={crumb}
            right={
              route === "dashboard" && hasCompletedIntake
                ? <button className="btn btn-primary btn-sm" onClick={() => setRoute("coaching")}>
                    <I.chat size={13}/> Open coaching
                  </button>
                : null
            }
          />

          {route === "dashboard" && (hasCompletedIntake
            ? <DashboardReturning
                layout={tweaks.dashLayout}
                onStartSession={() => setRoute("coaching")}
                onOpenCoaching={() => setRoute("coaching")}
                onOpenResources={() => setRoute("resources")}
              />
            : <DashboardFirstTime onStartIntake={() => setRoute("intake")} />
          )}

          {route === "coaching" && <Coaching chatStyle={tweaks.chatStyle} onStartNewSession={() => setRoute("intake")} />}
          {route === "resources" && <Resources />}
          {route === "intake" && (
            <InitialSession
              onBack={() => setRoute("dashboard")}
              onComplete={completeIntake}
            />
          )}
        </div>
      </div>

      {signoutOpen && (
        <SignOutModal
          onCancel={() => setSignoutOpen(false)}
          onConfirm={() => { setSignoutOpen(false); setAuthed(false); setRoute("landing"); }}
        />
      )}

      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
};

// ---- Custom palette swatch picker -------------------------
const PaletteSwatches = ({ value, onChange }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, padding: "4px 0" }}>
    {Object.entries(PALETTES).map(([k, p]) => {
      const active = k === value;
      return (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 10px",
            borderRadius: 8,
            background: active ? "rgba(255,255,255,0.06)" : "transparent",
            border: active ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer", color: "inherit", textAlign: "left",
            font: "inherit",
          }}
        >
          <span style={{ display: "flex", gap: 2 }}>
            {p.swatches.map((c, i) => (
              <span key={i} style={{ width: 12, height: 18, background: c, borderRadius: 2, border: "1px solid rgba(0,0,0,0.1)" }}></span>
            ))}
          </span>
          <span style={{ fontSize: 11.5, opacity: active ? 1 : 0.75 }}>{p.label}</span>
        </button>
      );
    })}
  </div>
);

// ---- Tweaks panel content ---------------------------------
const Tweaks = ({ tweaks, setTweak }) => (
  <TweaksPanel title="Tweaks">
    <TweakSection label="User state">
      <TweakRadio
        label="Dashboard mode"
        value={tweaks.userState}
        onChange={v => setTweak("userState", v)}
        options={[
          { value: "first-time", label: "First-time" },
          { value: "returning", label: "Returning" },
        ]}
      />
    </TweakSection>

    <TweakSection label="Palette">
      <PaletteSwatches value={tweaks.palette} onChange={v => setTweak("palette", v)} />
    </TweakSection>

    <TweakSection label="Typography">
      <TweakSelect
        label="Type pairing"
        value={tweaks.typography}
        onChange={v => setTweak("typography", v)}
        options={Object.entries(TYPE_PAIRS).map(([k, p]) => ({ value: k, label: p.label }))}
      />
    </TweakSection>

    <TweakSection label="Sidebar density">
      <TweakRadio
        label="Density"
        value={tweaks.density}
        onChange={v => setTweak("density", v)}
        options={[
          { value: "compact", label: "Compact" },
          { value: "regular", label: "Regular" },
          { value: "spacious", label: "Spacious" },
        ]}
      />
    </TweakSection>

    <TweakSection label="Dashboard layout">
      <TweakSelect
        label="Returning dashboard"
        value={tweaks.dashLayout}
        onChange={v => setTweak("dashLayout", v)}
        options={[
          { value: "hero", label: "Hero strip" },
          { value: "focus", label: "Single focus column" },
          { value: "split", label: "Coach card + steps" },
        ]}
      />
    </TweakSection>

    <TweakSection label="Chat style">
      <TweakRadio
        label="Bubbles"
        value={tweaks.chatStyle}
        onChange={v => setTweak("chatStyle", v)}
        options={[
          { value: "bubble", label: "Bubble" },
          { value: "minimal", label: "Minimal" },
          { value: "paper", label: "Paper" },
        ]}
      />
    </TweakSection>
  </TweaksPanel>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
