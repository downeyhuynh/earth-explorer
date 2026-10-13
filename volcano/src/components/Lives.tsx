import { useEffect, useRef, useState } from "react";

interface LivesProps {
  count: number;
  loss: number;
  gainTick: number;
  gainAmount: number;
  wipe: number;
  wipeMessage: string;
}

const LOSS_MS = 1400;
const GAIN_MS = 2800;

export function Lives({ count, loss, gainTick, gainAmount, wipe, wipeMessage }: LivesProps) {
  const [showLoss, setShowLoss] = useState(false);
  const [shownGain, setShownGain] = useState(0);
  const [showWipe, setShowWipe] = useState(false);
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (loss === 0) return;
    const app = document.querySelector(".app");
    app?.classList.remove("screen-shake");
    if (app instanceof HTMLElement) void app.offsetWidth;
    app?.classList.add("screen-shake");
    setShowLoss(true);
    setShownGain(0);
    const timer = window.setTimeout(() => {
      setShowLoss(false);
      app?.classList.remove("screen-shake");
    }, LOSS_MS);
    return () => {
      window.clearTimeout(timer);
      app?.classList.remove("screen-shake");
    };
  }, [loss]);

  useEffect(() => {
    if (gainTick === 0 || gainAmount < 1) return;
    setShownGain(gainAmount);
    setShowLoss(false);
    const timer = window.setTimeout(() => setShownGain(0), GAIN_MS);
    return () => window.clearTimeout(timer);
  }, [gainTick, gainAmount]);

  useEffect(() => {
    if (wipe === 0) return;
    const app = document.querySelector(".app");
    app?.classList.remove("screen-shake");
    if (app instanceof HTMLElement) void app.offsetWidth;
    app?.classList.add("screen-shake");
    setShowWipe(true);
    setShowLoss(false);
    setShownGain(0);
    const timer = window.setTimeout(() => app?.classList.remove("screen-shake"), 700);
    return () => {
      window.clearTimeout(timer);
      app?.classList.remove("screen-shake");
    };
  }, [wipe]);

  useEffect(() => {
    if (showWipe) continueRef.current?.focus();
  }, [showWipe]);

  return (
    <>
      <p className="lives" aria-live="polite">
        Lives: {count}
        <span className="life-pips" aria-hidden="true">
          {Array.from({ length: count }, (_, index) => (
            <span key={index} className={shownGain > 0 && index >= count - shownGain ? "life-pip arrived" : "life-pip"} />
          ))}
        </span>
      </p>
      {showLoss && (
        <div className="life-flash" role="alert">
          <span className="life-pip lost" />
          <strong>−1 LIFE</strong>
        </div>
      )}
      {shownGain > 0 && (
        <div className="life-flash gain" role="alert">
          {Array.from({ length: shownGain }, (_, index) => <span key={index} className="life-pip gained" />)}
          <strong>+{shownGain} {shownGain === 1 ? "LIFE" : "LIVES"}</strong>
        </div>
      )}
      {showWipe && (
        <div className="wipe-screen" role="alertdialog" aria-modal="true" aria-labelledby="wipe-title">
          <div className="life-flash wipe">
            <strong id="wipe-title">YOU LOST</strong>
            <span>{wipeMessage}</span>
            <button ref={continueRef} type="button" className="primary" onClick={() => setShowWipe(false)}>CONTINUE</button>
          </div>
        </div>
      )}
    </>
  );
}
