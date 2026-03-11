import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Activity, User, Code, Layers, Terminal, Zap, X, ChevronRight, Cpu, Box } from 'lucide-react';

// ─── DATOS ────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: '001', title: 'NEURAL_MESH', desc: 'Distributed neural packet analysis with real-time WebGL visualization and edge computing.', tags: ['RUST', 'WEBGL', 'WASM'], color: '#00ffcc' },
  { id: '002', title: 'VOID_PROTOCOL', desc: 'Zero-knowledge authentication layer for decentralized identity systems on-chain.', tags: ['SOLIDITY', 'ZK', 'REACT'], color: '#ff2d78' },
  { id: '003', title: 'HELIX_OS', desc: 'Browser-based OS simulation with custom shell, filesystem, and windowing system.', tags: ['TS', 'CANVAS', 'INDEXEDDB'], color: '#7c3aed' },
  { id: '004', title: 'SYNTHWAVE_AI', desc: 'Generative music composition engine driven by transformer models and real-time MIDI output.', tags: ['PYTHON', 'TORCH', 'TONE.JS'], color: '#f59e0b' },
  { id: '005', title: 'PHANTOM_CDN', desc: 'Edge-cached content delivery with intelligent prefetching and adaptive bitrate streaming.', tags: ['GO', 'REDIS', 'K8S'], color: '#00ffcc' },
  { id: '006', title: 'DRIFT_ENGINE', desc: '3D physics sandbox with custom constraint solver and GPU-accelerated particle systems.', tags: ['C++', 'VULKAN', 'WASM'], color: '#ff2d78' },
];

const SKILLS = [
  { name: 'FRONTEND', value: 95 }, { name: 'BACKEND', value: 88 },
  { name: 'SYSTEMS', value: 79 }, { name: 'WEB3', value: 83 },
  { name: 'AI/ML', value: 71 }, { name: 'DEVOPS', value: 76 },
];

const BOOT_LINES = [
  "BIOS v2.0.4 — CRISTIAN_SYSTEMS INC.",
  "Performing memory test... [████████████] 16384MB OK",
  "Loading kernel modules...",
  "> neural.ko loaded",
  "> interface.ko loaded",
  "> perception.ko loaded",
  "Mounting filesystems... OK",
  "Starting network daemon... OK",
  "Authenticating operator credentials...",
  ">> ACCESS GRANTED — WELCOME BACK, OPERATOR <<",
  "Launching CRISTIAN_OS v2.0.4...",
];

// ─── AUDIO ENGINE ─────────────────────────────────────────────────────
// Todos los sonidos son sintetizados con Web Audio API, sin archivos externos
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.masterGain = null;
  }

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.35;
      this.masterGain.connect(this.ctx.destination);
      this.enabled = true;
    } catch (e) {
      console.warn('AudioContext not available');
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  // Sonido de hover — blip suave
  playHover() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain); gain.connect(this.masterGain);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(1100, t + 0.06);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.start(t); osc.stop(t + 0.08);
  }

  // Sonido de click — golpe digital
  playClick() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    // Tono principal
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain); gain.connect(this.masterGain);
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.05);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.start(t); osc.stop(t + 0.1);
    // Sub-click
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.connect(gain2); gain2.connect(this.masterGain);
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(110, t);
    gain2.gain.setValueAtTime(0.2, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc2.start(t); osc2.stop(t + 0.06);
  }

  // Sonido de tecla — clic mecánico retro
  playKeypress() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    const bufSize = this.ctx.sampleRate * 0.04;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 4);
    }
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 0.5;
    src.buffer = buf;
    src.connect(filter); filter.connect(gain); gain.connect(this.masterGain);
    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    src.start(t);
  }

  // Sonido de navegación — transición
  playNavigate() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    [0, 0.06, 0.12].forEach((delay, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain); gain.connect(this.masterGain);
      osc.type = 'sine';
      const freqs = [330, 440, 550];
      osc.frequency.setValueAtTime(freqs[i], t + delay);
      gain.gain.setValueAtTime(0.2, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.12);
      osc.start(t + delay); osc.stop(t + delay + 0.12);
    });
  }

  // Sonido de boot — arranque del sistema
  playBoot() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain); gain.connect(this.masterGain);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.4);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.setValueAtTime(0.3, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.start(t); osc.stop(t + 0.5);
  }

  // Sonido de error
  playError() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    [0, 0.1].forEach((delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain); gain.connect(this.masterGain);
      osc.type = 'square';
      osc.frequency.setValueAtTime(160, t + delay);
      osc.frequency.exponentialRampToValueAtTime(80, t + delay + 0.12);
      gain.gain.setValueAtTime(0.25, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.15);
      osc.start(t + delay); osc.stop(t + delay + 0.15);
    });
  }

  // Sonido de éxito / comando OK
  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    [523, 659, 784].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain); gain.connect(this.masterGain);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0, t + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.18, t + i * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.15);
      osc.start(t + i * 0.07); osc.stop(t + i * 0.07 + 0.15);
    });
  }

  // Hacker mode toggle — glitch
  playHackerToggle() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    for (let i = 0; i < 8; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain); gain.connect(this.masterGain);
      osc.type = 'square';
      osc.frequency.setValueAtTime(100 + Math.random() * 800, t + i * 0.04);
      gain.gain.setValueAtTime(0.15, t + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.04 + 0.04);
      osc.start(t + i * 0.04); osc.stop(t + i * 0.04 + 0.04);
    }
  }
}

const audioEngine = new AudioEngine();

// ─── HOOK: CURSOR CYBERPUNK ───────────────────────────────────────────
const useCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const dotRef = useRef(null);
  const particlesRef = useRef([]);
  const posRef = useRef({ x: -100, y: -100 });
  const trailPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    const dot = dotRef.current;
    if (!cursor || !trail || !dot) return;

    let animId;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => {
      cursor.style.transform = `translate(${posRef.current.x - 18}px, ${posRef.current.y - 18}px) scale(0.7)`;
      cursor.style.borderColor = '#ff2d78';
      cursor.style.boxShadow = '0 0 20px #ff2d78, inset 0 0 10px #ff2d7844';
    };

    const onUp = () => {
      cursor.style.borderColor = '#00ffcc';
      cursor.style.boxShadow = '0 0 12px #00ffcc66';
    };

    const onEnterClickable = () => {
      cursor.style.transform = `translate(${posRef.current.x - 18}px, ${posRef.current.y - 18}px) scale(1.5)`;
      cursor.style.borderColor = '#00ffcc';
      cursor.style.background = 'rgba(0,255,204,0.06)';
    };

    const onLeaveClickable = () => {
      cursor.style.background = 'transparent';
    };

    // Añadir listeners a todos los elementos clicables
    const addHoverListeners = () => {
      document.querySelectorAll('button, a, [class*="cursor-pointer"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterClickable);
        el.addEventListener('mouseleave', onLeaveClickable);
      });
    };
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      const { x, y } = posRef.current;
      const cursor = cursorRef.current;
      // Cursor principal — instantáneo
      cursor.style.transform = `translate(${x - 18}px, ${y - 18}px)`;
      // Punto central
      dot.style.transform = `translate(${x - 2}px, ${y - 2}px)`;
      // Trail — lag suave
      trailPosRef.current.x += (x - trailPosRef.current.x) * 0.1;
      trailPosRef.current.y += (y - trailPosRef.current.y) * 0.1;
      trail.style.transform = `translate(${trailPosRef.current.x - 28}px, ${trailPosRef.current.y - 28}px)`;
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return { cursorRef, trailRef, dotRef };
};

// ─── HOOK: CLOCK ──────────────────────────────────────────────────────
const useClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

// ─── COMPONENTE: GLITCH TEXT ──────────────────────────────────────────
const GlitchText = ({ text, className = '' }) => (
  <span className={`glitch-wrap ${className}`} data-text={text}>{text}</span>
);

// ─── COMPONENTE: PROGRESS BAR ─────────────────────────────────────────
const SkillBar = ({ name, value, delay }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className="mb-4">
      <div className="flex justify-between text-[11px] mb-1 font-mono">
        <span className="text-cyan-400">{name}</span>
        <span className="text-white/40">{value}%</span>
      </div>
      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full transition-all duration-1000 ease-out skill-glow" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

// ─── COMPONENTE: PROJECT CARD ─────────────────────────────────────────
const ProjectCard = ({ project, onSound }) => {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className="project-card-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onMouseEnter={() => onSound('hover')}
      onClick={() => { setFlipped(!flipped); onSound('click'); }}
      style={{ transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
    >
      <div className={`project-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* FRONT */}
        <div className="project-card-face project-card-front" style={{ '--accent': project.color }}>
          <div className="corner-tl" /><div className="corner-tr" /><div className="corner-bl" /><div className="corner-br" />
          <div className="flex justify-between items-start mb-auto">
            <span className="text-[10px] font-mono opacity-40">PRJ_{project.id}</span>
            <ExternalLink size={14} style={{ color: project.color }} />
          </div>
          <h3 className="text-2xl font-black tracking-tight mt-auto mb-2" style={{ color: project.color, textShadow: `0 0 20px ${project.color}66` }}>
            {project.title}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {project.tags.map(t => (
              <span key={t} className="text-[9px] px-2 py-0.5 rounded border font-mono" style={{ borderColor: `${project.color}33`, color: project.color, background: `${project.color}11` }}>{t}</span>
            ))}
          </div>
          <div className="text-[9px] opacity-30 mt-3 font-mono text-right">[ CLICK TO EXPAND ]</div>
        </div>
        {/* BACK */}
        <div className="project-card-face project-card-back" style={{ '--accent': project.color }}>
          <div className="corner-tl" /><div className="corner-tr" /><div className="corner-bl" /><div className="corner-br" />
          <span className="text-[10px] font-mono mb-4 block" style={{ color: project.color }}>// DESCRIPTION</span>
          <p className="text-sm opacity-80 leading-relaxed font-mono flex-1">{project.desc}</p>
          <button className="mt-4 text-[11px] border px-4 py-2 rounded font-mono hover:opacity-80 transition-opacity self-start" style={{ borderColor: project.color, color: project.color }}>
            VIEW_SOURCE →
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── COMPONENTE: MATRIX CANVAS ────────────────────────────────────────
const MatrixCanvas = ({ isHacker }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ@#$%&";
    const fontSize = 13;
    let drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
    const draw = () => {
      ctx.fillStyle = isHacker ? 'rgba(0,0,0,0.06)' : 'rgba(2,2,2,0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isHacker ? '#00ff41' : '#00ffcc18';
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 40);
    return () => { clearInterval(id); window.removeEventListener('resize', resize); };
  }, [isHacker]);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />;
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────
export default function Portfolio() {
  const [booting, setBooting] = useState(true);
  const [bootLines, setBootLines] = useState([]);
  const [bootProgress, setBootProgress] = useState(0);
  const [view, setView] = useState('home');
  const [isHacker, setIsHacker] = useState(false);
  const [termHistory, setTermHistory] = useState([{ t: 'sys', v: "Type 'help' for available commands." }]);
  const [cmdInput, setCmdInput] = useState('');
  const [scanlines, setScanlines] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const time = useClock();
  const { cursorRef, trailRef, dotRef } = useCursor();

  // Función central de sonido
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    switch (type) {
      case 'hover': audioEngine.playHover(); break;
      case 'click': audioEngine.playClick(); break;
      case 'key': audioEngine.playKeypress(); break;
      case 'navigate': audioEngine.playNavigate(); break;
      case 'boot': audioEngine.playBoot(); break;
      case 'error': audioEngine.playError(); break;
      case 'success': audioEngine.playSuccess(); break;
      case 'hacker': audioEngine.playHackerToggle(); break;
    }
  }, [soundEnabled]);

  // Activar audio en primer clic/tecla
  const activateAudio = useCallback(() => {
    audioEngine.init();
    setSoundEnabled(true);
  }, []);

  useEffect(() => {
    const handler = () => { activateAudio(); };
    window.addEventListener('click', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [activateAudio]);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setBootLines(p => [...p, BOOT_LINES[i]]);
      setBootProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      i++;
      if (i >= BOOT_LINES.length) { clearInterval(iv); setTimeout(() => setBooting(false), 900); }
    }, 350);
  }, []);

  // Sonido al terminar boot
  useEffect(() => {
    if (!booting && soundEnabled) playSound('boot');
  }, [booting, soundEnabled]);

  const navigateTo = (v) => {
    playSound('navigate');
    setView(v);
  };

  const [cursor, setCursor] = useState({ x: 0, y: 0 });

useEffect(() => {
  const moveCursor = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const handleCmd = (e) => {
    if (e.key !== 'Enter' || !cmdInput.trim()) return;
    const cmd = cmdInput.trim().toLowerCase();
    let res = { t: 'err', v: `Command not found: '${cmd}'. Type 'help'.` };
    if (cmd === 'help') { res = { t: 'sys', v: 'Commands: help | projects | about | home | clear | hacker | matrix | sound' }; playSound('success'); }
    else if (cmd === 'projects') { navigateTo('projects'); res = { t: 'ok', v: 'Loading projects...' }; }
    else if (cmd === 'about') { navigateTo('about'); res = { t: 'ok', v: 'Loading about...' }; }
    else if (cmd === 'home') { navigateTo('home'); res = { t: 'ok', v: 'Returning to home...' }; }
    else if (cmd === 'hacker') { setIsHacker(p => !p); res = { t: 'ok', v: 'HACKER MODE TOGGLED.' }; playSound('hacker'); }
    else if (cmd === 'matrix') { setScanlines(p => !p); res = { t: 'ok', v: 'Scanlines toggled.' }; playSound('success'); }
    else if (cmd === 'sound') { setSoundEnabled(p => !p); res = { t: 'ok', v: `Sound ${soundEnabled ? 'OFF' : 'ON'}.` }; playSound('success'); }
    else if (cmd === 'clear') { setTermHistory([]); setCmdInput(''); return; }
    else { playSound('error'); }
    setTermHistory(p => [...p, { t: 'inp', v: cmd }, res]);
    setCmdInput('');
  };

  const handleKeyInput = (e) => {
    if (e.key !== 'Enter' && e.key !== 'Backspace') playSound('key');
    handleCmd(e);
  };

  if (booting) return (
    <div className="bg-black h-screen flex items-center justify-center font-mono text-cyan-400 p-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,204,0.015) 2px, rgba(0,255,204,0.015) 4px)' }} />
      <div className="max-w-xl w-full z-10">
        <div className="text-cyan-400/40 text-xs mb-6 tracking-widest">CRISTIAN_SYSTEMS BIOS v2.0.4</div>
        <div className="space-y-1 mb-8 min-h-[280px]">
          {bootLines.filter(Boolean).map((line, i) => (
            <div key={i} className={`text-sm ${typeof line === 'string' && line.includes('GRANTED') ? 'text-green-400 font-bold' : typeof line === 'string' && line.includes('OK') ? 'text-cyan-300' : 'text-cyan-400/70'}`}>
              {line}
            </div>
          ))}
          {bootLines.length > 0 && bootLines.length < BOOT_LINES.length && (
            <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1" />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] text-cyan-400/50">
            <span>LOADING CRISTIAN_OS</span><span>{bootProgress}%</span>
          </div>
          <div className="h-[2px] bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-300" style={{ width: `${bootProgress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── CURSOR CYBERPUNK ── */}
      {/* Punto central sólido — siempre visible */}
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none"
        style={{
          top: 0, left: 0,
          width: 4, height: 4,
          borderRadius: '50%',
          background: '#00ffcc',
          boxShadow: '0 0 6px #00ffcc, 0 0 12px #00ffcc',
        }}
      />
      {/* Anillo exterior — con lag */}
      <div
        ref={cursorRef}
        className="fixed z-[9998] pointer-events-none"
        style={{
          top: 0, left: 0,
          width: 36, height: 36,
          border: '1px solid #00ffcc',
          borderRadius: '50%',
          boxShadow: '0 0 12px #00ffcc66',
          transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s, transform 0.06s linear',
          // Reticle lines
          backgroundImage: `
            linear-gradient(#00ffcc44 1px, transparent 1px),
            linear-gradient(90deg, #00ffcc44 1px, transparent 1px)
          `,
          backgroundSize: '100% 50%, 50% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Trail exterior — más lento */}
      <div
        ref={trailRef}
        className="fixed z-[9997] pointer-events-none"
        style={{
          top: 0, left: 0,
          width: 56, height: 56,
          border: '1px solid rgba(0,255,204,0.15)',
          borderRadius: '50%',
          transition: 'none',
        }}
      />

      {/* Toast de sonido */}
      {!soundEnabled && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9995] pointer-events-none">
          <div className="text-[10px] font-mono text-white/20 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md bg-black/40 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 inline-block"/>
            CLICK ANYWHERE TO ENABLE SOUND
          </div>
        </div>
      )}

      <div className={`fixed inset-0 font-mono overflow-hidden transition-all duration-700 ${isHacker ? 'bg-black text-green-400' : 'bg-[#020202] text-white'}`}>
        <MatrixCanvas isHacker={isHacker} />

        {/* Scanlines */}
        {scanlines && <div className="absolute inset-0 z-[1] pointer-events-none scanlines-overlay" />}

        {/* Grid holográfico */}
        <div className="absolute inset-0 z-[1] pointer-events-none holo-grid" />

        {/* Viñeta */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)' }} />

        {/* HUD DECORATIVO */}
        <div className="absolute top-20 left-4 z-[5] pointer-events-none hidden md:block">
          {['LAT: 4.7110° N', 'LNG: 74.0721° W', `TIME: ${time}`, 'STATUS: ONLINE'].map((l, i) => (
            <div key={i} className="text-[9px] text-cyan-400/25 font-mono leading-5">{l}</div>
          ))}
        </div>
        <div className="absolute top-20 right-4 z-[5] pointer-events-none hidden md:block text-right">
          {['NODE: CRISTIAN_01', 'PING: 2ms', 'PKT: 1.2M', 'UPTIME: 99.9%'].map((l, i) => (
            <div key={i} className="text-[9px] text-cyan-400/25 font-mono leading-5">{l}</div>
          ))}
        </div>

        {/* HEADER */}
        <header className="relative z-20 flex justify-between items-center px-6 py-3 border-b border-white/[0.06] backdrop-blur-xl bg-black/50">
          <div className="flex items-center gap-6">
            <button onClick={() => { navigateTo('home'); playSound('click'); }} className="flex items-center gap-2"
              onMouseEnter={() => playSound('hover')}>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00ffcc]" />
              <GlitchText text="CRISTIAN_OS" className="text-cyan-400 font-black tracking-widest text-sm" />
              <span className="text-[9px] text-white/20">v2.0.4</span>
            </button>
            <nav className="hidden md:flex gap-1">
              {['home', 'projects', 'about'].map(v => (
                <button key={v} onClick={() => navigateTo(v)}
                  onMouseEnter={() => playSound('hover')}
                  className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded transition-all font-mono ${view === v ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30' : 'text-white/30 hover:text-white/60'}`}>
                  {v}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-3 text-[9px] text-white/20 font-mono">
              <span>CPU 12%</span><span>|</span><span>RAM 1.2G</span><span>|</span><span className="text-cyan-400/50">{time}</span>
            </div>
            {/* Botón de sonido */}
            <button
              onClick={() => { setSoundEnabled(p => { if (!p) audioEngine.init(); return !p; }); playSound('click'); }}
              onMouseEnter={() => playSound('hover')}
              className={`text-[9px] border px-3 py-1 rounded font-mono transition-all flex items-center gap-1.5 ${soundEnabled ? 'border-cyan-400/40 text-cyan-400 bg-cyan-400/10' : 'border-white/10 text-white/30 hover:border-white/20'}`}>
              <span>{soundEnabled ? '▶' : '▷'}</span>
              <span>{soundEnabled ? 'SFX_ON' : 'SFX_OFF'}</span>
            </button>
            <button
              onClick={() => { setIsHacker(p => !p); playSound('hacker'); }}
              onMouseEnter={() => playSound('hover')}
              className={`text-[9px] border px-3 py-1 rounded font-mono transition-all ${isHacker ? 'border-green-400/50 text-green-400 bg-green-400/10' : 'border-white/10 text-white/40 hover:border-cyan-400/40 hover:text-cyan-400'}`}>
              {isHacker ? '■ HACKER' : '○ NORMAL'}
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className="relative z-10 h-[calc(100vh-49px)] p-5 overflow-hidden">

          {/* HOME */}
          {view === 'home' && (
            <div className="grid grid-cols-12 grid-rows-6 gap-3 h-full">

              {/* BIO */}
              <div onClick={() => navigateTo('about')} onMouseEnter={() => playSound('hover')}
                className="col-span-12 md:col-span-4 row-span-3 bento-card group cursor-pointer relative overflow-hidden" style={{ '--glow': '#00ffcc' }}>
                <div className="corner-tl"/><div className="corner-tr"/><div className="corner-bl"/><div className="corner-br"/>
                <div className="h-12 w-12 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mb-auto">
                  <User size={22} className="text-cyan-400" />
                </div>
                <div className="mt-auto">
                  <div className="text-[9px] text-white/25 mb-2 tracking-widest">OPERATOR.PROFILE</div>
                  <GlitchText text="WHO_AM_I" className="text-4xl font-black text-white block mb-2" />
                  <p className="text-[11px] text-white/40 leading-relaxed">Digital Architect & Fullstack Engineer. Building at the intersection of systems, design, and human experience.</p>
                  <div className="flex items-center gap-1 mt-4 text-cyan-400 text-[10px]">
                    <ChevronRight size={12}/><span>EXPLORE →</span>
                  </div>
                </div>
              </div>

              {/* PROJECTS HERO */}
              <div onClick={() => navigateTo('projects')} onMouseEnter={() => playSound('hover')}
                className="col-span-12 md:col-span-8 row-span-3 bento-card cursor-pointer group relative overflow-hidden"
                style={{ '--glow': '#ff2d78', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0010 100%)' }}>
                <div className="corner-tl" style={{ borderColor: '#ff2d7844' }}/><div className="corner-tr" style={{ borderColor: '#ff2d7844' }}/><div className="corner-bl" style={{ borderColor: '#ff2d7844' }}/><div className="corner-br" style={{ borderColor: '#ff2d7844' }}/>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 50%, #ff2d7811 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="text-[9px] text-fuchsia-500/50 mb-3 tracking-widest">WORKS.SELECTED // {PROJECTS.length} PROJECTS</div>
                  <div className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white mb-3" style={{ textShadow: '0 0 40px #ff2d7833' }}>
                    EXPLORE<br/><span className="text-fuchsia-500">_PROJS</span>
                  </div>
                  <div className="flex gap-3 text-[10px] text-white/30 font-mono">
                    {['WEB3','AI','SYSTEMS','RUST','WEBGL'].map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
                <Layers size={180} className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:rotate-12 group-hover:scale-110" style={{ color: '#ff2d78' }} />
              </div>

              {/* TERMINAL */}
              <div className="col-span-12 md:col-span-5 row-span-3 bento-card flex flex-col" style={{ '--glow': '#00ffcc', background: '#020202' }}>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70"/>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70"/>
                    <div className="w-3 h-3 rounded-full bg-green-500/70"/>
                  </div>
                  <span className="text-[10px] text-white/20 font-mono ml-2">cristian@os:~$</span>
                </div>
                <div className="flex-1 overflow-y-auto text-[11px] space-y-0.5 custom-scrollbar mb-3">
                  {termHistory.map((line, i) => (
                    <div key={i} className={`font-mono leading-5 ${line?.t === 'inp' ? 'text-white/70' : line?.t === 'ok' ? 'text-cyan-400' : line?.t === 'err' ? 'text-red-400' : 'text-white/30'}`}>
                      {line?.t === 'inp' ? `❯ ${line?.v}` : line?.v}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 items-center border-t border-white/[0.06] pt-3">
                  <span className="text-cyan-400">❯</span>
                  <input autoFocus value={cmdInput}
                    onChange={e => setCmdInput(e.target.value)}
                    onKeyDown={handleKeyInput}
                    className="bg-transparent outline-none w-full text-[11px] text-white/80 font-mono placeholder-white/20 caret-cyan-400"
                    placeholder="type 'help'..." />
                </div>
              </div>

              {/* STATS */}
              <div className="col-span-6 md:col-span-4 row-span-2 bento-card flex flex-col justify-center items-center gap-2" style={{ '--glow': '#7c3aed' }}>
                <Activity size={24} className="text-fuchsia-500 animate-pulse" style={{ filter: 'drop-shadow(0 0 8px #ff2d78)' }}/>
                <div className="text-3xl font-black text-white">144<span className="text-sm text-white/30">fps</span></div>
                <div className="text-[9px] text-white/25 tracking-widest">RENDER PULSE</div>
                <div className="w-full mt-2 flex gap-1 items-end h-8">
                  {Array(20).fill(0).map((_, i) => (
                    <div key={i} className="flex-1 bg-fuchsia-500/30 rounded-sm wave-bar" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.08}s` }} />
                  ))}
                </div>
              </div>

              {/* SOCIALS */}
              <div className="col-span-6 md:col-span-3 row-span-2 bento-card flex flex-col gap-3 justify-center" style={{ '--glow': '#00ffcc' }}>
                <div className="text-[9px] text-white/20 tracking-widest mb-1">CONNECT.LINKS</div>
                {[{ icon: Github, label: 'GITHUB', sub: '@cristian' }, { icon: Linkedin, label: 'LINKEDIN', sub: 'connect' }, { icon: Mail, label: 'EMAIL', sub: 'get in touch' }].map(({ icon: Icon, label, sub }) => (
                  <button key={label} onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}
                    className="flex items-center gap-3 text-left group/link hover:text-cyan-400 transition-colors">
                    <Icon size={16} className="text-white/30 group-hover/link:text-cyan-400 transition-colors" />
                    <div>
                      <div className="text-[10px] font-bold text-white/60 group-hover/link:text-cyan-400">{label}</div>
                      <div className="text-[9px] text-white/20">{sub}</div>
                    </div>
                    <ChevronRight size={12} className="ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity text-cyan-400" />
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* PROJECTS */}
          {view === 'projects' && (
            <div className="h-full flex flex-col">
              <div className="flex items-baseline gap-4 mb-6">
                <GlitchText text="PROJECTS" className="text-4xl font-black text-white" />
                <span className="text-white/20 text-sm font-mono">// {PROJECTS.length} SELECTED_WORKS</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PROJECTS.map(p => <ProjectCard key={p.id} project={p} onSound={playSound} />)}
                </div>
              </div>
            </div>
          )}

          {/* ABOUT */}
          {view === 'about' && (
            <div className="h-full overflow-y-auto custom-scrollbar">
              <div className="max-w-4xl mx-auto space-y-8 pb-8">
                <div className="flex items-baseline gap-4">
                  <GlitchText text="ABOUT.ME" className="text-4xl font-black text-white" />
                  <span className="text-white/20 text-sm font-mono">// OPERATOR_PROFILE</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bento-card space-y-4" style={{ '--glow': '#00ffcc' }}>
                    <div className="text-[9px] text-cyan-400/50 tracking-widest">SYSTEM.BIO</div>
                    <p className="text-sm text-white/60 leading-relaxed font-mono">
                      Fullstack Engineer con pasión por los sistemas de baja latencia, la criptografía y las interfaces que desafían lo convencional. Construyo desde el kernel hasta el píxel.
                    </p>
                    <p className="text-sm text-white/40 leading-relaxed font-mono">
                      5+ años transformando ideas en realidades digitales. Especializado en arquitecturas distribuidas, Web3, e interfaces de alta performance.
                    </p>
                  </div>
                  <div className="bento-card" style={{ '--glow': '#ff2d78' }}>
                    <div className="text-[9px] text-fuchsia-500/50 tracking-widest mb-4">SKILL.MATRIX</div>
                    {SKILLS.map((s, i) => <SkillBar key={s.name} name={s.name} value={s.value} delay={i * 150} />)}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[{ label: 'PROJECTS', val: '30+' }, { label: 'CLIENTS', val: '12' }, { label: 'YEARS_EXP', val: '5+' }, { label: 'COMMITS', val: '4.2K' }].map(s => (
                    <div key={s.label} className="bento-card text-center" style={{ '--glow': '#7c3aed' }}>
                      <div className="text-3xl font-black text-white mb-1" style={{ textShadow: '0 0 20px #7c3aed66' }}>{s.val}</div>
                      <div className="text-[9px] text-white/25 tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>

        {/* FOOTER HUD */}
        <div className="absolute bottom-3 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
          <div className="text-[9px] text-white/15 font-mono">SYS_BUILD: 2025.PROD // {view.toUpperCase()}</div>
          <div className="flex gap-3 text-[9px] text-white/15 font-mono">
            <span>©CRISTIAN_OS</span><span>|</span>
            <span className={soundEnabled ? 'text-cyan-400/30' : ''}>
              SFX: {soundEnabled ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>

      <div
        className="custom-cursor"
        style={{
          left: cursor.x,
          top: cursor.y
        }}
      />

      <style>{`
        /* ── OCULTAR CURSOR NATIVO ── */
        * { cursor: none; }

        /* ── GLITCH ── */
        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-wrap::before, .glitch-wrap::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          background: transparent;
        }
        .glitch-wrap::before {
          color: #ff2d78; clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
          animation: glitch1 4s infinite linear;
        }
        .glitch-wrap::after {
          color: #00ffcc; clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          animation: glitch2 4s infinite linear;
        }
        @keyframes glitch1 {
          0%,90%,100% { transform: translate(0); opacity: 0; }
          92% { transform: translate(-3px, 1px); opacity: 0.8; }
          94% { transform: translate(3px, -1px); opacity: 0.8; }
          96% { transform: translate(0); opacity: 0; }
        }
        @keyframes glitch2 {
          0%,88%,100% { transform: translate(0); opacity: 0; }
          90% { transform: translate(3px, 2px); opacity: 0.6; }
          93% { transform: translate(-3px, -2px); opacity: 0.6; }
          95% { transform: translate(0); opacity: 0; }
        }

        /* ── BENTO CARDS ── */
        .bento-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.5rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(8px);
        }
        .bento-card:hover {
          border-color: var(--glow, #00ffcc33);
          box-shadow: 0 0 30px -10px var(--glow, #00ffcc), inset 0 0 30px -20px var(--glow, #00ffcc);
          transform: translateY(-2px) scale(1.01);
        }

        /* Corner decorators */
        .corner-tl,.corner-tr,.corner-bl,.corner-br {
          position: absolute; width: 12px; height: 12px;
          border-color: var(--glow, #00ffcc44);
          border-style: solid; opacity: 0.5;
        }
        .corner-tl { top: 10px; left: 10px; border-width: 1px 0 0 1px; }
        .corner-tr { top: 10px; right: 10px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: 10px; left: 10px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: 10px; right: 10px; border-width: 0 1px 1px 0; }

        /* ── PROJECT CARDS ── */
        .project-card-container {
          height: 220px; perspective: 1000px;
          cursor: pointer; transition: transform 0.1s ease-out;
        }
        .project-card-inner {
          position: relative; width: 100%; height: 100%;
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
          transform-style: preserve-3d;
        }

        .custom-cursor {
          position: fixed;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #00ffcc;
          box-shadow: 
            0 0 8px #00ffcc,
            0 0 20px #00ffcc;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
        }

        .project-card-inner.flipped { transform: rotateY(180deg); }
        .project-card-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.5rem; padding: 1.25rem;
          display: flex; flex-direction: column;
          background: rgba(255,255,255,0.02);
          overflow: hidden;
        }
        .project-card-face:hover {
          border-color: var(--accent, #00ffcc)33;
          box-shadow: 0 0 25px -8px var(--accent, #00ffcc);
        }
        .project-card-back { transform: rotateY(180deg); background: rgba(5,5,5,0.95); }

        /* ── SCANLINES ── */
        .scanlines-overlay {
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px);
          animation: scanMove 8s linear infinite;
        }
        @keyframes scanMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }

        /* ── HOLO GRID ── */
        .holo-grid {
          background-image: linear-gradient(rgba(0,255,204,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,204,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove 20s linear infinite;
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }

        /* ── WAVE BARS ── */
        .wave-bar { animation: wavePulse 1.2s ease-in-out infinite alternate; }
        @keyframes wavePulse {
          from { opacity: 0.3; transform: scaleY(0.5); }
          to { opacity: 1; transform: scaleY(1); }
        }

        /* ── SKILL GLOW ── */
        .skill-glow { box-shadow: 0 0 8px #00ffcc66; }

        /* ── SCROLLBAR ── */
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffffff11; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00ffcc44; }
      `}</style>
    </>
  );
}