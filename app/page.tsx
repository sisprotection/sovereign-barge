'use client'

import { useMemo, useState } from 'react'
import {
  Anchor,
  ArrowDownToLine,
  ArrowUpRight,
  Box,
  Calculator,
  ChevronRight,
  CircleGauge,
  Clock3,
  Compass,
  Crosshair,
  Gauge,
  MapPin,
  Menu,
  Navigation,
  PackageCheck,
  Radio,
  Ruler,
  Route,
  ShipWheel,
  SlidersHorizontal,
  Sparkles,
  Waves,
  X,
} from 'lucide-react'

const routes = [
  { id: '01', name: 'Mississippi Corridor', origin: 'St. Louis, MO', destination: 'New Orleans, LA', distance: '1,218 mi', duration: '09d 04h', status: 'CLEAR', progress: 78, eta: 'OCT 21 · 14:40' },
  { id: '02', name: 'Ohio River Run', origin: 'Pittsburgh, PA', destination: 'Cairo, IL', distance: '981 mi', duration: '07d 16h', status: 'WATCH', progress: 42, eta: 'OCT 24 · 08:10' },
  { id: '03', name: 'Illinois Link', origin: 'Chicago, IL', destination: 'St. Louis, MO', distance: '297 mi', duration: '02d 12h', status: 'STAGED', progress: 12, eta: 'OCT 27 · 19:25' },
]

export default function Page() {
  const [activeRoute, setActiveRoute] = useState(0)
  const [bargeCount, setBargeCount] = useState(4)
  const [cargoWeight, setCargoWeight] = useState(1_840)
  const [draft, setDraft] = useState(8.5)
  const [mobileOpen, setMobileOpen] = useState(false)

  const capacity = useMemo(() => Math.min(100, Math.round((cargoWeight / (bargeCount * 2_200)) * 100)), [cargoWeight, bargeCount])
  const remaining = Math.max(0, bargeCount * 2_200 - cargoWeight)
  const active = routes[activeRoute]

  return (
    <main className="cockpit-shell">
      <div className="scanlines" aria-hidden="true" />
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><ShipWheel /></div>
          <div>
            <p className="eyebrow">SOVEREIGN / COMMAND DECK</p>
            <h1>SOVEREIGN BARGE <span>&amp;</span> INLAND NAVIGATION</h1>
          </div>
        </div>
        <div className="security-stamp"><span className="status-dot" /> SECURED BY SERPENT INTELLIGENCE SYSTEMS</div>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
          {mobileOpen ? <X /> : <Menu />}
        </button>
        <nav className={mobileOpen ? 'nav-links is-open' : 'nav-links'}>
          <a href="#operations">01 / OPERATIONS</a>
          <a href="#capacity">02 / CAPACITY</a>
          <a href="#credentials">03 / CREDENTIALS</a>
        </nav>
      </header>

      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow amber">INLAND FREIGHT / LIVE TELEMETRY</p>
          <h2>Move tonnage.<br /><em>With intent.</em></h2>
          <p className="hero-description">A hardened operations layer for river commerce. Schedule with precision, read the water, and keep every hold accountable.</p>
          <div className="hero-actions">
            <a className="gold-button" href="#operations"><Route /> OPEN ROUTE BOARD <ArrowUpRight /></a>
            <span className="live-readout"><Radio /> SYSTEMS NOMINAL <b>00:04:18</b></span>
          </div>
        </div>
        <div className="radar-panel" aria-label="River telemetry visualization">
          <div className="radar-label"><Crosshair /> RIVERWAY TELEMETRY <span>LAT 38.6270 / LON -90.1994</span></div>
          <div className="radar-grid"><div className="radar-circle r1" /><div className="radar-circle r2" /><div className="radar-circle r3" /><div className="radar-line horizontal" /><div className="radar-line diagonal" /><div className="radar-ping p1" /><div className="radar-ping p2" /><div className="radar-ping p3" /><div className="radar-center"><Anchor /></div></div>
          <div className="radar-footer"><span><i className="legend-dot amber-dot" /> ACTIVE FLEET</span><span><i className="legend-dot dim-dot" /> CHANNEL DEPTH</span><strong>RIVER LEVEL <b>+6.4 FT</b></strong></div>
        </div>
      </section>

      <section id="operations" className="section-block">
        <div className="section-heading"><div><p className="eyebrow amber">01 / ROUTE SCHEDULING</p><h3>Operations board</h3></div><div className="heading-meta"><span>UTC−05:00</span><span className="green-text"><span className="status-dot" /> 03 ACTIVE RUNS</span></div></div>
        <div className="operations-layout">
          <div className="route-list">{routes.map((route, index) => <button key={route.id} className={activeRoute === index ? 'route-card selected' : 'route-card'} onClick={() => setActiveRoute(index)}><span className="route-index">{route.id}</span><span className="route-details"><b>{route.name}</b><small>{route.origin} <ChevronRight /> {route.destination}</small><span className="mini-progress"><i style={{ width: `${route.progress}%` }} /></span></span><span className={`route-status ${route.status.toLowerCase()}`}>{route.status}</span></button>)}</div>
          <div className="route-detail-panel"><div className="panel-topline"><span>SELECTED RUN / {active.id}</span><span><Clock3 /> ETA {active.eta}</span></div><h4>{active.name}</h4><div className="route-path"><div className="endpoint"><MapPin /><b>ORIGIN</b><strong>{active.origin}</strong><small>LOCK 27 / DEPARTED</small></div><div className="path-line"><span>{active.distance}</span><i style={{ width: `${active.progress}%` }} /><span>{active.duration}</span></div><div className="endpoint right"><MapPin /><b>DESTINATION</b><strong>{active.destination}</strong><small>BERTH 04 / RESERVED</small></div></div><div className="detail-stats"><div><span>VOYAGE PROGRESS</span><strong>{active.progress}%</strong></div><div><span>WATERWAY STATE</span><strong className="green-text">{active.status === 'WATCH' ? 'MONITOR' : 'CLEAR'}</strong></div><div><span>FLEET ASSIGNMENT</span><strong>SB-{String(activeRoute + 12).padStart(3, '0')}</strong></div></div><button className="text-button">VIEW FULL MANIFEST <ArrowUpRight /></button></div>
        </div>
      </section>

      <section id="capacity" className="section-block capacity-section">
        <div className="section-heading"><div><p className="eyebrow amber">02 / LOAD PLANNING</p><h3>Cargo capacity calculator</h3></div><div className="heading-meta"><Calculator /> LIVE MODEL / REV 2.4</div></div>
        <div className="calculator-layout"><div className="control-panel"><div className="control-row"><label htmlFor="barges"><span><Box /> BARGE UNITS</span><b>{bargeCount}</b></label><input id="barges" type="range" min="1" max="12" value={bargeCount} onChange={(e) => setBargeCount(Number(e.target.value))} /></div><div className="control-row"><label htmlFor="cargo"><span><PackageCheck /> CARGO WEIGHT</span><b>{cargoWeight.toLocaleString()} <small>ST</small></b></label><input id="cargo" type="range" min="200" max="26400" step="40" value={cargoWeight} onChange={(e) => setCargoWeight(Number(e.target.value))} /></div><div className="control-row"><label htmlFor="draft"><span><Ruler /> OPERATING DRAFT</span><b>{draft.toFixed(1)} <small>FT</small></b></label><input id="draft" type="range" min="3" max="14" step="0.5" value={draft} onChange={(e) => setDraft(Number(e.target.value))} /></div><div className="control-actions"><button className="ghost-button"><SlidersHorizontal /> ADVANCED PARAMETERS</button><span>MODEL CONFIDENCE <b>98.6%</b></span></div></div><div className="capacity-readout"><div className="capacity-ring" style={{ '--capacity': `${capacity * 3.6}deg` } as React.CSSProperties}><div><strong>{capacity}<small>%</small></strong><span>UTILIZED</span></div></div><div className="capacity-copy"><p className="eyebrow">COMBINED HOLD CAPACITY</p><h4>{(bargeCount * 2_200).toLocaleString()} <small>ST TOTAL</small></h4><div className="capacity-figures"><span>REMAINING <b>{remaining.toLocaleString()} ST</b></span><span>SAFE DRAFT <b>{draft.toFixed(1)} FT</b></span></div><div className="capacity-warning"><Gauge /> {capacity > 85 ? 'LOAD NEAR OPERATING LIMIT' : 'LOAD WITHIN OPERATING LIMIT'}</div></div></div></div>
      </section>

      <section className="signal-strip"><span><Waves /> CHANNEL CONDITIONS: <b>FAVORABLE</b></span><span><CircleGauge /> CURRENT SPEED: <b>2.8 KNOTS</b></span><span><Navigation /> NEXT LOCK: <b>ALTON / 42 NM</b></span><span><Sparkles /> DISPATCH QUALITY: <b>OPTIMAL</b></span></section>

      <footer id="credentials" className="footer"><div><p className="eyebrow amber">CORPORATE CREDENTIALS</p><h3>Built for the<br /><em>long haul.</em></h3></div><div className="credential-grid"><div><span>01</span><b>SILENT SECURITY</b><small>Operational discretion<br />for critical movement.</small></div><div><span>02</span><b>SERPENT INTELLIGENCE SYSTEMS</b><small>Strategic systems<br />for sovereign operators.</small></div><div><span>03</span><b>DOMENICK ARLON HALL</b><small>Personal brand portfolio<br />/ principal creative.</small></div></div><div className="footer-bottom"><span>© 2026 SOVEREIGN BARGE &amp; INLAND NAVIGATION</span><span>ALL SYSTEMS PROVISIONAL / INTERNAL USE</span><span>SB-OPS / 001</span></div></footer>
    </main>
  )
}
