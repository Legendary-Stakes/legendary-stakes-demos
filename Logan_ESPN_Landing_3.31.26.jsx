import { useState, useEffect, useRef } from "react";

const DISCIPLINES_MAIN = [
  "Cutting", "Reining", "Cow Horse", "Barrel Racing", "Team Roping",
  "Tie-Down", "Breakaway", "Steer Wrestling"
];
const DISCIPLINES_MORE = [
  "Pole Bending", "Western Pleasure", "Hunter Under Saddle",
  "Trail", "Showmanship", "Halter", "Western Riding", "Ranch Riding"
];

const LIVE_EVENTS = [
  { event: "NCHA Summer Spectacular", loc: "Fort Worth, TX", class: "Open", leader: "Metallic Cat x Smart Little Lena", score: "228", status: "Final" },
  { event: "NRHA Futurity", loc: "OKC, OK", class: "Open L4", leader: "Gunner x Topsail Whiz", score: "224.5", status: "Go 2" },
  { event: "AQHA World", loc: "OKC, OK", class: "Jr Cutting", leader: "Dual Rey x Peptoboonsmal", score: "221", status: "Live" },
  { event: "Snaffle Bit Fut.", loc: "Reno, NV", class: "Open RCH", leader: "One Time Pepto x Boon San", score: "219", status: "Final" },
  { event: "The Run For A Million", loc: "Las Vegas, NV", class: "Barrel Racing", leader: "French Streaktovegas", score: "14.82s", status: "Semi" },
  { event: "NRBC", loc: "Ogden, UT", class: "Open Reining", leader: "Spooks Gotta Whiz x Custom Crome", score: "226", status: "Go 3" },
  { event: "World Series Team Roping", loc: "Stephenville, TX", class: "#12 Header", leader: "Coleman / Smith", score: "4.8s", status: "Live" },
  { event: "PCCHA Stakes", loc: "Paso Robles, CA", class: "Non-Pro", leader: "Hottish x Smooth As A Cat", score: "220.5", status: "Final" },
];

const TOP_HEADLINES = [
  "Metallic Cat progeny surpass $100M in lifetime earnings",
  "NCHA announces record $12M added money for Summer Spectacular",
  "Reining sensation 'Gunnatrashya' sells for $1.2M at Heritage Sale",
  "AQHA membership hits all-time high of 285,000 active members",
  "New futurity age rules spark debate among cutting horse trainers",
  "Barrel racing's French Streaktovegas named Horse of the Year",
  "Legendary Stakes launches AI-powered cross-matching for breeders",
  "Team roping prize money up 34% year-over-year across all events",
  "Oklahoma's new equine tax incentive expected to draw major events",
  "Ranch riding discipline sees 78% growth in amateur entries"
];

const FEATURED_STORIES = [
  { title: "How Todd Bergen Built a Dynasty: Inside the $40M Program", time: "2h", author: "Sarah Mitchell" },
  { title: "The Economics of a $500K Stallion Breeding Season", time: "5h", author: "Legendary Stakes Analytics" },
  { title: "2026 Futurity Preview: 15 Horses to Watch This Fall", time: "8h", author: "Jake Telford" },
];

const QUICK_LINKS = [
  "NCHA Standings", "NRHA Standings", "AQHA World Qualifiers",
  "Barrel Racing Results", "Team Roping Standings", "Bloodstock Exchange"
];

export default function LegendaryStakesLanding() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeDiscipline, setActiveDiscipline] = useState(null);
  const [tickerOffset, setTickerOffset] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => { setHeroLoaded(true); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset(prev => {
        const maxScroll = LIVE_EVENTS.length * 220 - 900;
        if (prev >= maxScroll) return 0;
        return prev + 220;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const gold = "#B8960C";
  const goldLight = "#D4AF37";
  const goldBg = "#FDF8E8";
  const goldBorder = "#E8D48A";
  const dark = "#1a1a1a";
  const midGray = "#555";
  const lightGray = "#888";
  const borderColor = "#e0e0e0";
  const hoverBg = "#f5f5f5";

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#ffffff", color: dark, minHeight: "100vh", maxWidth: "100%", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* LIVE TICKER BAR */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${borderColor}`, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            background: goldBg, padding: "8px 16px", display: "flex", alignItems: "center", gap: 8,
            borderRight: `1px solid ${goldBorder}`, flexShrink: 0, zIndex: 2
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: gold, letterSpacing: 1, textTransform: "uppercase" }}>Live Events</span>
            <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke={gold} strokeWidth="1.5" fill="none" /></svg>
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{
              display: "flex", transition: "transform 0.6s cubic-bezier(.4,0,.2,1)",
              transform: `translateX(-${tickerOffset}px)`
            }}>
              {LIVE_EVENTS.map((ev, i) => (
                <div key={i} style={{
                  minWidth: 220, padding: "6px 16px", borderRight: `1px solid ${borderColor}`,
                  cursor: "pointer", transition: "background .2s"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ fontSize: 10, color: lightGray, fontWeight: 500, letterSpacing: 0.5 }}>{ev.event}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: 0.5, padding: "1px 6px", borderRadius: 3,
                      background: ev.status === "Live" ? gold : ev.status === "Semi" ? "#4CAF50" : "#e8e8e8",
                      color: ev.status === "Live" ? "#fff" : ev.status === "Semi" ? "#fff" : "#666"
                    }}>{ev.status}</span>
                  </div>
                  <div style={{ fontSize: 11, color: midGray, marginBottom: 1 }}>{ev.class}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: dark, fontWeight: 600, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.leader}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: gold }}>{ev.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setTickerOffset(prev => Math.max(0, prev - 220))}
            style={{ background: "#fafafa", border: "none", color: lightGray, padding: "12px 8px", cursor: "pointer", borderLeft: `1px solid ${borderColor}`, fontSize: 16 }}>‹</button>
          <button onClick={() => setTickerOffset(prev => prev + 220)}
            style={{ background: "#fafafa", border: "none", color: lightGray, padding: "12px 8px", cursor: "pointer", borderLeft: `1px solid ${borderColor}`, fontSize: 16 }}>›</button>
        </div>
      </div>

      {/* MAIN NAV BAR */}
      <nav style={{
        background: "#fff", borderBottom: `3px solid ${gold}`, padding: "0 24px",
        display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 4px rgba(0,0,0,.06)"
      }}>
        <div style={{ marginRight: 28, padding: "10px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 0, lineHeight: 1 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: dark, letterSpacing: 2 }}>LEGEN</span>
            <span style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22,
              background: `linear-gradient(135deg, ${gold}, ${goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: 2
            }}>D</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: dark, letterSpacing: 2 }}>ARY</span>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: 5, color: gold, textAlign: "center", marginTop: -2, textTransform: "uppercase" }}>stakes</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 0, flex: 1, overflow: "hidden" }}>
          {DISCIPLINES_MAIN.map((d) => (
            <button key={d}
              onClick={() => setActiveDiscipline(d)}
              onMouseEnter={e => { e.currentTarget.style.background = goldBg; e.currentTarget.style.color = gold; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = activeDiscipline === d ? gold : midGray; }}
              style={{
                background: "transparent", border: "none", color: activeDiscipline === d ? gold : midGray,
                fontSize: 13, fontWeight: 600, padding: "16px 14px", cursor: "pointer",
                borderBottom: activeDiscipline === d ? `2px solid ${gold}` : "2px solid transparent",
                transition: "all .2s", whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif"
              }}
            >{d}</button>
          ))}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              onMouseEnter={e => e.currentTarget.style.color = gold}
              onMouseLeave={e => e.currentTarget.style.color = lightGray}
              style={{
                background: "transparent", border: "none", color: lightGray, fontSize: 13,
                fontWeight: 500, padding: "16px 14px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap"
              }}
            >
              More Disciplines
              <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
            </button>
            {moreOpen && (
              <div style={{
                position: "absolute", top: "100%", left: 0, background: "#fff", border: `1px solid ${borderColor}`,
                borderRadius: 8, padding: 8, minWidth: 200, zIndex: 200, boxShadow: "0 12px 40px rgba(0,0,0,.12)"
              }}>
                {DISCIPLINES_MORE.map(d => (
                  <button key={d}
                    onClick={() => { setActiveDiscipline(d); setMoreOpen(false); }}
                    onMouseEnter={e => e.currentTarget.style.background = goldBg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    style={{
                      display: "block", width: "100%", textAlign: "left", background: "transparent",
                      border: "none", color: "#444", fontSize: 13, fontWeight: 500, padding: "8px 12px",
                      cursor: "pointer", borderRadius: 4, fontFamily: "'DM Sans', sans-serif"
                    }}
                  >{d}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0, marginLeft: 16 }}>
          {[
            { icon: "▶", label: "Watch" },
            { icon: "🏆", label: "Fantasy" },
            { icon: "📍", label: "Where to Watch" }
          ].map((item, i) => (
            <button key={i}
              onMouseEnter={e => e.currentTarget.style.color = gold}
              onMouseLeave={e => e.currentTarget.style.color = midGray}
              style={{
                background: "transparent", border: "none", color: midGray, fontSize: 12,
                fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap"
              }}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span> {item.label}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: borderColor }} />
          <button style={{ background: "transparent", border: "none", color: midGray, cursor: "pointer", padding: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </button>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: "#f0f0f0", border: `1px solid ${borderColor}`,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={lightGray} strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
        </div>
      </nav>

      {/* BANNER / PROMO */}
      <div style={{
        background: goldBg, borderBottom: `1px solid ${goldBorder}`, padding: "16px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700,
            background: `linear-gradient(135deg, ${gold}, ${goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>LS</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: dark, letterSpacing: 1 }}>
              LEGENDARY STAKES IS NOW THE HOME OF LIVE SHOWS
            </div>
            <div style={{ fontSize: 12, color: lightGray, marginTop: 2 }}>All Major Western Performance Events. Live Results. All in One Place.*</div>
          </div>
        </div>
        <button
          onMouseEnter={e => { e.currentTarget.style.background = goldLight; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = gold; e.currentTarget.style.transform = "scale(1)"; }}
          style={{
            background: gold, color: "#fff", border: "none", padding: "10px 28px",
            fontSize: 13, fontWeight: 700, letterSpacing: 1.5, cursor: "pointer", borderRadius: 4,
            textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", transition: "all .2s"
          }}
        >SIGN UP NOW</button>
      </div>

      {/* MAIN CONTENT GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr 300px", gap: 0, maxWidth: 1400, margin: "0 auto" }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ padding: "20px 16px", borderRight: `1px solid ${borderColor}` }}>
          <div style={{
            background: dark, borderRadius: 10, padding: 24, textAlign: "center", marginBottom: 20
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 4 }}>
              ALL OF <span style={{ color: goldLight }}>LEGENDARY STAKES.</span>
            </div>
            <div style={{ fontSize: 13, color: "#999", marginBottom: 16 }}>ALL IN ONE PLACE.</div>
            <button
              onMouseEnter={e => e.currentTarget.style.background = goldLight}
              onMouseLeave={e => e.currentTarget.style.background = gold}
              style={{
                background: gold, color: "#fff", border: "none", padding: "10px 32px",
                fontSize: 13, fontWeight: 600, borderRadius: 4, cursor: "pointer", width: "100%",
                fontFamily: "'DM Sans', sans-serif", transition: "background .2s"
              }}
            >Sign Up Now</button>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <span style={{ color: gold, fontSize: 14 }}>📍</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: dark }}>Watch on Legendary Stakes</span>
            </div>
            <button
              onMouseEnter={e => e.currentTarget.style.background = goldLight}
              onMouseLeave={e => e.currentTarget.style.background = gold}
              style={{
                background: gold, color: "#fff", border: "none", padding: "10px 0",
                fontSize: 13, fontWeight: 700, borderRadius: 4, cursor: "pointer", width: "100%",
                marginBottom: 14, fontFamily: "'DM Sans', sans-serif", transition: "background .2s"
              }}
            >Subscribe Now</button>

            {[
              { icon: "🐴", label: "NCHA Summer Spectacular — Live" },
              { icon: "🎯", label: "NRHA Futurity — Go Round 2" },
              { icon: "🏟️", label: "Snaffle Bit Futurity Replay" },
              { icon: "⏱️", label: "Run For A Million — Semis" },
              { icon: "📺", label: "Legendary Stakes Originals" },
            ].map((item, i) => (
              <div key={i}
                onMouseEnter={e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.paddingLeft = "12px"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "8px"; }}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 8px",
                  cursor: "pointer", borderRadius: 6, transition: "all .2s", fontSize: 13, color: "#444"
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: dark, marginBottom: 10, letterSpacing: 0.5 }}>Quick Links</div>
            {QUICK_LINKS.map((link, i) => (
              <div key={i}
                onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.paddingLeft = "12px"; }}
                onMouseLeave={e => { e.currentTarget.style.color = midGray; e.currentTarget.style.paddingLeft = "8px"; }}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "7px 8px",
                  fontSize: 13, color: midGray, cursor: "pointer", borderRadius: 4, transition: "all .2s"
                }}
              >
                <span style={{ fontSize: 10, color: gold }}>◆</span> {link}
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ padding: "20px 24px" }}>
          {/* Hero Story */}
          <div style={{
            position: "relative", borderRadius: 10, overflow: "hidden", marginBottom: 24,
            cursor: "pointer", transform: heroLoaded ? "translateY(0)" : "translateY(12px)",
            opacity: heroLoaded ? 1 : 0, transition: "all .8s cubic-bezier(.4,0,.2,1)",
            border: `1px solid ${borderColor}`
          }}>
            <div style={{
              width: "100%", height: 380, position: "relative",
              background: `linear-gradient(135deg, ${goldBg} 0%, #f5eed4 30%, #e8dbb8 60%, #f0e8d0 100%)`
            }}>
              <svg viewBox="0 0 600 380" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
                <path d="M350 80 Q380 60 390 40 Q395 30 400 35 Q405 45 395 60 Q390 70 385 80 L400 100 Q440 90 460 110 Q500 140 510 200 Q515 230 500 260 L480 290 Q470 310 460 330 L450 360 L430 360 L440 320 Q445 300 440 280 L420 280 L410 360 L390 360 L400 300 Q380 310 360 310 Q340 310 330 300 L320 360 L300 360 L315 290 Q310 280 300 270 L280 270 L270 360 L250 360 L265 280 Q250 260 240 230 Q230 200 240 170 Q250 140 280 120 Q300 100 330 90 Z" fill={gold} />
              </svg>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "65%",
                background: "linear-gradient(transparent, rgba(255,255,255,.97))"
              }} />
              <div style={{
                position: "absolute", top: 16, left: 16, background: gold, color: "#fff",
                fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 4, letterSpacing: 1.5
              }}>FEATURED</div>
            </div>

            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 24px 24px" }}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700,
                color: dark, lineHeight: 1.25, marginBottom: 10, maxWidth: 500
              }}>
                The $2.4M Mare That Changed Cutting Forever — And the Breeding Empire She Built
              </h1>
              <p style={{ fontSize: 14, color: midGray, lineHeight: 1.5, maxWidth: 480, marginBottom: 10 }}>
                From a $35,000 yearling purchase to the most decorated mare in NCHA history. How one owner's gamble reshaped the cutting horse landscape.
              </p>
              <div style={{ fontSize: 12, color: lightGray }}>
                12h · <span style={{ color: gold, fontWeight: 600 }}>Sarah Mitchell</span> and <span style={{ color: gold, fontWeight: 600 }}>Jake Telford</span>
              </div>
            </div>
          </div>

          {/* Secondary Stories */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            {[
              {
                tag: "REINING", title: "NRHA Futurity Go 2: Three Horses Score 224+ in Historic Night",
                desc: "The Open finals are shaping up to be one of the most competitive in a decade.",
                time: "4h", author: "LS Staff", bg: `linear-gradient(135deg, ${goldBg}, #f0f8f0)`
              },
              {
                tag: "BARREL RACING", title: "2026 Run For A Million Semifinals: Who Punched Their Ticket",
                desc: "Eight riders advance to the million-dollar final round in Las Vegas.",
                time: "6h", author: "Tammy West", bg: `linear-gradient(135deg, ${goldBg}, #f8f0f0)`
              }
            ].map((story, i) => (
              <div key={i}
                onMouseEnter={e => e.currentTarget.style.borderColor = goldBorder}
                onMouseLeave={e => e.currentTarget.style.borderColor = borderColor}
                style={{
                  background: "#fff", borderRadius: 8, overflow: "hidden", border: `1px solid ${borderColor}`,
                  cursor: "pointer", transition: "border-color .3s"
                }}
              >
                <div style={{
                  height: 140, background: story.bg,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <span style={{ fontSize: 48, opacity: 0.2 }}>{i === 0 ? "🎯" : "🏇"}</span>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: gold, letterSpacing: 1.5, marginBottom: 6 }}>{story.tag}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: dark, lineHeight: 1.3, marginBottom: 6 }}>{story.title}</div>
                  <div style={{ fontSize: 12, color: lightGray, lineHeight: 1.4, marginBottom: 8 }}>{story.desc}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>{story.time} · {story.author}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Inline Links Row */}
          <div style={{
            display: "flex", gap: 24, padding: "12px 0", borderTop: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`, marginBottom: 24
          }}>
            {["💰 Bloodstock Exchange trending lots", "📊 Updated RPI Rankings", "🏆 Stakes Standings"].map((item, i) => (
              <span key={i}
                onMouseEnter={e => e.currentTarget.style.color = gold}
                onMouseLeave={e => e.currentTarget.style.color = midGray}
                style={{ fontSize: 12, color: midGray, cursor: "pointer", transition: "color .2s" }}
              >{item}</span>
            ))}
          </div>

          {/* Featured Stories List */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 4, height: 20, background: gold, borderRadius: 2 }} />
              <span style={{ fontSize: 16, fontWeight: 700, color: dark, fontFamily: "'Playfair Display', serif" }}>Top Stories</span>
            </div>
            {FEATURED_STORIES.map((story, i) => (
              <div key={i}
                onMouseEnter={e => e.currentTarget.style.background = hoverBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                style={{
                  padding: "12px 12px", borderRadius: 6, cursor: "pointer",
                  transition: "background .2s", borderBottom: `1px solid ${borderColor}`
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: dark, lineHeight: 1.35, marginBottom: 4 }}>{story.title}</div>
                <div style={{ fontSize: 11, color: lightGray }}>{story.time} · {story.author}</div>
              </div>
            ))}
          </div>

          {/* Bloodstock Exchange Banner */}
          <div style={{
            background: dark, borderRadius: 10, padding: 24,
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: goldLight, letterSpacing: 2, marginBottom: 6 }}>BLOODSTOCK EXCHANGE</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                Heritage Select Sale — Live Now
              </div>
              <div style={{ fontSize: 13, color: "#999" }}>142 lots · $18.4M in total sales · 94% sell rate</div>
            </div>
            <button
              onMouseEnter={e => e.currentTarget.style.background = goldLight}
              onMouseLeave={e => e.currentTarget.style.background = gold}
              style={{
                background: gold, color: "#fff", border: "none", padding: "10px 24px",
                fontSize: 12, fontWeight: 700, borderRadius: 4, cursor: "pointer",
                letterSpacing: 1, fontFamily: "'DM Sans', sans-serif", transition: "background .2s", flexShrink: 0
              }}
            >VIEW SALE</button>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside style={{ padding: "20px 16px", borderLeft: `1px solid ${borderColor}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 3, height: 16, background: gold, borderRadius: 2 }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: dark }}>Top Headlines</span>
          </div>

          {TOP_HEADLINES.map((headline, i) => (
            <div key={i}
              onMouseEnter={e => e.currentTarget.style.color = gold}
              onMouseLeave={e => e.currentTarget.style.color = "#444"}
              style={{
                padding: "10px 0", borderBottom: `1px solid ${borderColor}`, fontSize: 13,
                color: "#444", cursor: "pointer", lineHeight: 1.4, transition: "color .2s"
              }}
            >
              {headline}
            </div>
          ))}

          {/* RPI Rankings Widget */}
          <div style={{
            background: "#fafafa", borderRadius: 8, padding: 16, marginTop: 20,
            border: `1px solid ${borderColor}`
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: gold, letterSpacing: 2, marginBottom: 12 }}>RPI POWER RANKINGS</div>
            {[
              { rank: 1, name: "Metallic Cat", pts: "2,847", change: "+2" },
              { rank: 2, name: "Smooth As A Cat", pts: "2,691", change: "—" },
              { rank: 3, name: "High Brow Cat", pts: "2,584", change: "-1" },
              { rank: 4, name: "One Time Pepto", pts: "2,410", change: "+3" },
              { rank: 5, name: "Dual Rey", pts: "2,388", change: "-1" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
                borderBottom: i < 4 ? `1px solid ${borderColor}` : "none"
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: i === 0 ? gold : "#e8e8e8",
                  color: i === 0 ? "#fff" : lightGray,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, flexShrink: 0
                }}>{item.rank}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: dark }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: lightGray }}>{item.pts} pts</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600,
                  color: item.change.startsWith("+") ? "#4CAF50" : item.change === "—" ? "#aaa" : "#e74c3c"
                }}>{item.change}</span>
              </div>
            ))}
            <button
              onMouseEnter={e => e.currentTarget.style.color = gold}
              onMouseLeave={e => e.currentTarget.style.color = midGray}
              style={{
                background: "transparent", border: "none", color: midGray, fontSize: 12,
                fontWeight: 600, cursor: "pointer", marginTop: 10, padding: 0,
                fontFamily: "'DM Sans', sans-serif", transition: "color .2s"
              }}
            >View Full Rankings →</button>
          </div>

          {/* Promo Card */}
          <div style={{
            background: dark, borderRadius: 8, padding: 20, marginTop: 20, textAlign: "center"
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700,
              background: `linear-gradient(135deg, ${gold}, ${goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 4
            }}>LS</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4, lineHeight: 1.3 }}>
              THE HOME OF WESTERN PERFORMANCE
            </div>
            <div style={{ fontSize: 11, color: "#999", marginBottom: 16, lineHeight: 1.4 }}>
              All Shows. All Disciplines. All in One Place.*
            </div>
            <button
              onMouseEnter={e => e.currentTarget.style.background = goldLight}
              onMouseLeave={e => e.currentTarget.style.background = gold}
              style={{
                background: gold, color: "#fff", border: "none", padding: "10px 24px",
                fontSize: 12, fontWeight: 700, borderRadius: 4, cursor: "pointer", width: "100%",
                letterSpacing: 1, fontFamily: "'DM Sans', sans-serif", transition: "background .2s"
              }}
            >SIGN UP NOW</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
