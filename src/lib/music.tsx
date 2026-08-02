import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Ambient Japanese instrumental (koto-style plucks + shakuhachi-like pad)
 * synthesised with the Web Audio API so no audio file is required.
 * Replace `startEngine` with an <audio> element if you have a real track.
 */

type Ctx = {
  playing: boolean;
  muted: boolean;
  volume: number;
  start: () => void;
  toggle: () => void;
  setMuted: (m: boolean) => void;
  setVolume: (v: number) => void;
};

const MusicContext = createContext<Ctx>({
  playing: false,
  muted: false,
  volume: 0.4,
  start: () => {},
  toggle: () => {},
  setMuted: () => {},
  setVolume: () => {},
});

// Hirajoshi pentatonic scale (classic koto tuning)
const SCALE = [220, 246.94, 293.66, 329.63, 392.0, 440, 493.88, 587.33];

export function MusicProvider({ children }: { children: ReactNode }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMutedState] = useState(false);
  const [volume, setVolumeState] = useState(0.4);

  const targetGain = () => (muted ? 0 : volume * 0.5);

  useEffect(() => {
    if (gainRef.current && ctxRef.current) {
      gainRef.current.gain.setTargetAtTime(targetGain(), ctxRef.current.currentTime, 0.2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted, volume]);

  const pluck = (ac: AudioContext, out: GainNode, freq: number, when: number) => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    const filt = ac.createBiquadFilter();
    filt.type = "lowpass";
    filt.frequency.value = 2200;
    osc.type = "triangle";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(0.35, when + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 2.6);
    osc.connect(filt).connect(g).connect(out);
    osc.start(when);
    osc.stop(when + 2.8);
  };

  const startEngine = () => {
    if (ctxRef.current) return;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ac = new AC();
    const master = ac.createGain();
    master.gain.value = 0;
    master.connect(ac.destination);

    // shakuhachi-like breathy pad
    const pad = ac.createOscillator();
    const padGain = ac.createGain();
    const padFilt = ac.createBiquadFilter();
    padFilt.type = "lowpass";
    padFilt.frequency.value = 700;
    pad.type = "sine";
    pad.frequency.value = 110;
    padGain.gain.value = 0.12;
    pad.connect(padFilt).connect(padGain).connect(master);
    pad.start();

    ctxRef.current = ac;
    gainRef.current = master;
    master.gain.setTargetAtTime(targetGain(), ac.currentTime, 1.2);

    const loop = () => {
      const now = ac.currentTime;
      const notes = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < notes; i++) {
        pluck(ac, master, SCALE[Math.floor(Math.random() * SCALE.length)], now + i * 0.55);
      }
      timerRef.current = window.setTimeout(loop, 1400 + Math.random() * 1400);
    };
    loop();
    setPlaying(true);
  };

  const start = () => {
    startEngine();
    void ctxRef.current?.resume();
    setPlaying(true);
  };

  const toggle = () => {
    if (!ctxRef.current) return start();
    if (playing) {
      void ctxRef.current.suspend();
      setPlaying(false);
    } else {
      void ctxRef.current.resume();
      setPlaying(true);
    }
  };

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <MusicContext.Provider
      value={{
        playing,
        muted,
        volume,
        start,
        toggle,
        setMuted: setMutedState,
        setVolume: setVolumeState,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
