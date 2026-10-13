interface StartScreenProps {
  onStart: () => void;
  onHelp: () => void;
  onTeacher: () => void;
  onReset: () => void;
  showReset: boolean;
}

export function StartScreen({ onStart, onHelp, onTeacher, onReset, showReset }: StartScreenProps) {
  return (
    <main className="start-screen">
      <button type="button" className="gear" onClick={onTeacher} aria-label="Teacher menu">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M19.4 13.5a7.7 7.7 0 0 0 .1-1.5 7.7 7.7 0 0 0-.1-1.5l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-2.6-1.5l-.4-2.5h-4l-.4 2.5a7.6 7.6 0 0 0-2.6 1.5l-2.4-1-2 3.4 2 1.6a7.7 7.7 0 0 0-.1 1.5 7.7 7.7 0 0 0 .1 1.5l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 2.6 1.5l.4 2.5h4l.4-2.5a7.6 7.6 0 0 0 2.6-1.5l2.4 1 2-3.4-2-1.6zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z" />
        </svg>
      </button>
      <div className="hero" aria-hidden="true">
        <span className="hero-glow" />
        <svg className="hero-volcano" viewBox="0 0 200 120">
          <path d="M10 110 L70 40 L100 78 L130 28 L190 110 Z" />
          <path className="lava" d="M92 110 L100 70 L108 110 Z" />
        </svg>
      </div>
      <p className="eyebrow">Ring of Fire</p>
      <h1>VOLCANO EXPLORER</h1>
      <p className="lede">Identify famous volcanoes and place them on the map.</p>
      <div className="mission-row">
        <article className="mission">
          <h2>MISSION 1</h2>
          <p>One volcano at a time. Choose its type and its boundary type.</p>
        </article>
        <article className="mission">
          <h2>MISSION 2</h2>
          <p>Drag each volcano onto an empty spot on the Ring of Fire.</p>
        </article>
      </div>
      <div className="start-actions">
        <button type="button" className="primary xl" onClick={onStart}>START EXPLORING</button>
        <button type="button" className="ghost" onClick={onHelp}>HOW TO PLAY</button>
        {showReset && (
          <button type="button" className="ghost" onClick={onReset}>RESET PROGRESS</button>
        )}
      </div>
      <a className="text-link" href="../plate.html">Back to Plate Explorer</a>
    </main>
  );
}
