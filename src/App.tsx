import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, Terminal, Code, Volume2, X, Minus, Square,
  Wifi, Battery, Check, Copy, HardDrive, Smartphone, Layout,
  RefreshCw, Send, Mail, Power, Settings, Lock, Bell, CheckCircle2,
  Search
} from 'lucide-react';

// Custom typed GitHub Icon to avoid lucide-react version export mismatches
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

// Windows 11 Start Button Icon
function Win11StartIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 88 88" fill="currentColor">
      <path d="M0 0h42v42H0zM46 0h42v42H46zM0 46h42v42H0zM46 46h42v42H46z" />
    </svg>
  );
}

export type WindowId = 'dynamicIsland' | 'winLaunchpad' | 'contact' | 'explorer' | 'terminal' | 'settings' | 'search';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  w: number;
  h: number;
}

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  pos: WindowPosition;
  size: WindowSize;
}

export type WindowsMap = Record<WindowId, WindowState>;

export interface Wallpaper {
  id: string;
  name: string;
  url: string;
}

const USER_AVATAR = "https://raw.githubusercontent.com/dev-apox/dev-apox/main/dog.jpg";
const FALLBACK_AVATAR = "https://github.com/dev-apox.png";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzedaaqp";

const WALLPAPERS: Wallpaper[] = [
  { id: 'bloom-dark', name: 'Windows 11 Dark Bloom', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop' },
  { id: 'bloom-light', name: 'Windows 11 Light Flow', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2064&auto=format&fit=crop' },
  { id: 'cyber-neon', name: 'Cyber Neon Horizon', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2064&auto=format&fit=crop' }
];

const DENIS_DATA = {
  name: "Denis Moraru",
  username: "dev-apox",
  role: "Software Developer & Computer Science Student",
  location: "Pordenone, Italy",
  email: "denis@denisdev.online",
  github: "https://github.com/dev-apox",
  website: "https://denisdev.online",
  bio: "Computer Science student at University of Udine (UniUD) and passionate software developer from Pordenone, Italy. Specialized in low-level Windows utilities, desktop interactivity, systems programming (C/C++, Python, Win32 API), and clean responsive web applications.",

  projects: [
    {
      id: "dynamic-island",
      title: "Dynamic Island for Windows",
      version: "v2.0.1",
      subtitle: "Desktop Utility & Widget System",
      category: "Desktop Application",
      downloads: "25k+",
      description: "Brings Apple's Dynamic Island experience natively to Windows 11. Built with Python, PyQt6, CustomTkinter, and Win32 system hooks. Features media player visualizers, telemetry, notifications, and fluid Windows Mica glass aesthetics.",
      tech: ["Python", "PyQt6", "Win32 API", "CustomTkinter", "WinUI 3"],
      githubUrl: "https://github.com/dev-apox/dynamic-island",
      badge: "Flagship Project"
    },
    {
      id: "win-launchpad",
      title: "WinLaunchpad",
      version: "v1.4.0",
      subtitle: "Ultra-Fast Application Launcher",
      category: "System Utility",
      downloads: "8k+",
      description: "A lightweight macOS-inspired Launchpad designed specifically for Windows 10/11. Written in C/C++ for sub-10ms startup times, minimal memory consumption (<12MB RAM), global hotkeys, and native Windows Mica blur.",
      tech: ["C / C++", "Win32 API", "DirectX", "Mica Blur", "System Hooks"],
      githubUrl: "https://github.com/dev-apox/WinLaunchpad",
      badge: "High Performance"
    }
  ],

  skillsCategorized: [
    {
      category: "Core & Systems Programming",
      skills: [
        { name: "C / C++", level: 92 },
        { name: "Python", level: 95 },
        { name: "Java", level: 85 },
        { name: "SQL", level: 88 }
      ]
    },
    {
      category: "Frontend & Web Engineering",
      skills: [
        { name: "JavaScript / TypeScript", level: 92 },
        { name: "React", level: 90 },
        { name: "Tailwind CSS", level: 95 }
      ]
    },
    {
      category: "Tools & OS Architecture",
      skills: [
        { name: "Win32 API & System Hooks", level: 90 },
        { name: "Linux & Terminal CLI", level: 88 },
        { name: "Git & GitHub Actions", level: 90 }
      ]
    }
  ]
};

export default function App() {
  const [bootState, setBootState] = useState<'booting' | 'lockscreen' | 'desktop'>('booting');
  const [bootProgress, setBootProgress] = useState<number>(0);
  const [bootStatus, setBootStatus] = useState<string>('Loading system resources...');
  const [fps, setFps] = useState<number>(60);

  const desktopRef = useRef<HTMLDivElement>(null);

  // Flyouts
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState<boolean>(false);
  const [notifCenterOpen, setNotifCenterOpen] = useState<boolean>(false);
  const [searchFlyoutOpen, setSearchFlyoutOpen] = useState<boolean>(false);
  const [volumeSlider, setVolumeSlider] = useState<number>(80);
  
  // Customization
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper>(WALLPAPERS[0]);
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [avatarSrc, setAvatarSrc] = useState<string>(USER_AVATAR);

  // Z-Index Management
  const topZ = useRef<number>(20);
  const [activeWindowId, setActiveWindowId] = useState<WindowId>('contact');

  // Window Registry
  const [windows, setWindows] = useState<WindowsMap>({
    dynamicIsland: { id: 'dynamicIsland', title: 'Dynamic Island for Windows', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 12, pos: { x: 50, y: 35 }, size: { w: 720, h: 490 } },
    winLaunchpad: { id: 'winLaunchpad', title: 'WinLaunchpad C++', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, pos: { x: 90, y: 55 }, size: { w: 700, h: 460 } },
    contact: { id: 'contact', title: 'Send Message - Formspree', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 15, pos: { x: 260, y: 40 }, size: { w: 580, h: 510 } },
    explorer: { id: 'explorer', title: 'File Explorer - This PC', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 11, pos: { x: 120, y: 70 }, size: { w: 760, h: 480 } },
    terminal: { id: 'terminal', title: 'Windows Terminal - PowerShell', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 13, pos: { x: 160, y: 80 }, size: { w: 660, h: 420 } },
    settings: { id: 'settings', title: 'System Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 14, pos: { x: 200, y: 60 }, size: { w: 680, h: 460 } },
    search: { id: 'search', title: 'Search DenisDev OS', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 16, pos: { x: 220, y: 90 }, size: { w: 500, h: 380 } }
  });

  // FPS calculation
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let animId: number | undefined;

    const measureFps = () => {
      const now = performance.now();
      frameCount++;
      if (now >= lastTime + 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Boot sequence animation
  useEffect(() => {
    if (bootState !== 'booting') return;

    const bootSteps = [
      "Loading system resources...",
      "Initializing DenisOS Kernel v11.0...",
      "Loading Win32 & Python interop modules...",
      "Connecting to Formspree API...",
      "Preparing Windows 11 Mica Desktop...",
      "System Ready!"
    ];

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 20) + 15;
      if (currentProgress > 100) currentProgress = 100;
      setBootProgress(currentProgress);

      const stepIndex = Math.min(
        Math.floor((currentProgress / 100) * bootSteps.length),
        bootSteps.length - 1
      );
      setBootStatus(bootSteps[stepIndex]);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => setBootState('lockscreen'), 300);
      }
    }, 130);

    return () => clearInterval(timer);
  }, [bootState]);

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const bringToFront = (id: WindowId) => {
    const newZ = topZ.current + 1;
    topZ.current = newZ;
    setWindows(winMap => ({
      ...winMap,
      [id]: { ...winMap[id], isOpen: true, isMinimized: false, zIndex: newZ }
    }));
    setActiveWindowId(id);
  };

  const setWindowState = (id: WindowId, updates: Partial<WindowState>) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  const updateWindowPos = (id: WindowId, newPos: WindowPosition) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], pos: newPos }
    }));
  };

  // Taskbar icon toggle logic
  const toggleWindow = (id: WindowId) => {
    const win = windows[id];
    if (!win.isOpen) {
      bringToFront(id);
    } else if (win.isMinimized) {
      bringToFront(id);
    } else if (activeWindowId === id) {
      setWindowState(id, { isMinimized: true });
    } else {
      bringToFront(id);
    }
  };

  if (bootState === 'booting') {
    return (
      <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-between p-8 font-sans select-none">
        <div className="w-full flex justify-between items-center text-xs font-mono text-slate-500">
          <span>DenisOS UEFI Firmware v2.4</span>
          <span className="text-emerald-400 font-bold">{fps} FPS</span>
        </div>

        <div className="flex flex-col items-center space-y-8 max-w-sm text-center">
          <div className="grid grid-cols-2 gap-1.5 w-16 h-16">
            <div className="bg-sky-500 rounded-[2px]" />
            <div className="bg-sky-500 rounded-[2px]" />
            <div className="bg-sky-500 rounded-[2px]" />
            <div className="bg-sky-500 rounded-[2px]" />
          </div>

          <div className="relative w-10 h-10">
            <div className="w-10 h-10 rounded-full border-2 border-sky-500/20 border-t-sky-400 animate-spin" />
          </div>

          <div className="w-64 space-y-2">
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-sky-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span className="truncate max-w-[180px]">{bootStatus}</span>
              <span className="text-sky-400 font-bold">{bootProgress}%</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-600 font-mono">
          Denis Moraru • @dev-apox • Portfolio OS
        </div>
      </div>
    );
  }

  if (bootState === 'lockscreen') {
    return (
      <div 
        onClick={() => setBootState('desktop')}
        className="relative w-screen h-screen text-white flex flex-col items-center justify-between p-12 font-sans select-none cursor-pointer overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105 opacity-80"
          style={{ backgroundImage: `url('${selectedWallpaper.url}')` }}
        />
        <div className="absolute inset-0 bg-slate-950/40" />

        <div className="relative z-10 text-center space-y-2 pt-8">
          <h1 className="text-7xl font-light tracking-tight text-white drop-shadow-xl">{timeStr}</h1>
          <p className="text-xl font-medium text-slate-200 capitalize drop-shadow-md">{dateStr}</p>
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-4 pb-12">
          <img 
            src={avatarSrc} 
            alt="Denis Moraru"
            onError={() => setAvatarSrc(FALLBACK_AVATAR)}
            className="w-28 h-28 rounded-full border-2 border-white/30 object-cover shadow-2xl ring-4 ring-sky-500/30"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white drop-shadow-md">Denis Moraru (DenisDev)</h2>
            <p className="text-xs text-sky-300 font-mono">@dev-apox • Software Developer</p>
          </div>

          <button 
            onClick={() => setBootState('desktop')}
            className="px-8 py-2.5 rounded-xl bg-sky-500/80 hover:bg-sky-500 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            Sign in to DenisDev
          </button>
        </div>

        <div className="relative z-10 text-xs text-slate-400 font-mono">
          Click anywhere or press sign in to enter desktop
        </div>
      </div>
    );
  }

  const desktopShortcuts: { id: WindowId; name: string; icon: React.ElementType; color: string }[] = [
    { id: 'dynamicIsland', name: 'Dynamic Island Win', icon: Smartphone, color: 'text-sky-400' },
    { id: 'winLaunchpad', name: 'WinLaunchpad', icon: Layout, color: 'text-purple-400' },
    { id: 'contact', name: 'Send Message', icon: Mail, color: 'text-emerald-400' },
    { id: 'explorer', name: 'This PC', icon: HardDrive, color: 'text-amber-400' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-slate-200' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'text-sky-300' }
  ];

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden select-none bg-black font-sans ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      
      {/* DESKTOP BOUNDED VIEWPORT */}
      <div 
        ref={desktopRef}
        className="relative flex-1 w-full overflow-hidden bg-cover bg-center transition-all duration-500"
        style={{ 
          backgroundImage: `url('${selectedWallpaper.url}')`,
          filter: darkMode ? 'brightness(0.9) contrast(1.05)' : 'brightness(1.05)'
        }}
      >
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

        {/* Desktop Icons */}
        <main className="absolute inset-0 p-6 grid grid-flow-col grid-rows-6 gap-6 w-max pointer-events-auto">
          {desktopShortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => bringToFront(item.id)}
                className="flex flex-col items-center justify-center w-24 h-24 rounded-xl p-2 hover:bg-white/10 border border-transparent hover:border-white/20 transition-all duration-150 text-center group cursor-pointer backdrop-blur-xs"
              >
                <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <span className="text-[11px] font-medium text-white drop-shadow-md truncate w-full mt-1">
                  {item.name}
                </span>
              </button>
            );
          })}
        </main>

        {/* WINDOWS STACK */}
        {windows.dynamicIsland.isOpen && !windows.dynamicIsland.isMinimized && (
          <Win11Window
            win={windows.dynamicIsland}
            desktopRef={desktopRef}
            isActive={activeWindowId === 'dynamicIsland'}
            onFocus={() => bringToFront('dynamicIsland')}
            onClose={() => setWindowState('dynamicIsland', { isOpen: false })}
            onMinimize={() => setWindowState('dynamicIsland', { isMinimized: true })}
            onMaximize={() => setWindowState('dynamicIsland', { isMaximized: !windows.dynamicIsland.isMaximized })}
            onUpdatePos={(pos) => updateWindowPos('dynamicIsland', pos)}
          >
            <DynamicIslandProjectView />
          </Win11Window>
        )}

        {windows.winLaunchpad.isOpen && !windows.winLaunchpad.isMinimized && (
          <Win11Window
            win={windows.winLaunchpad}
            desktopRef={desktopRef}
            isActive={activeWindowId === 'winLaunchpad'}
            onFocus={() => bringToFront('winLaunchpad')}
            onClose={() => setWindowState('winLaunchpad', { isOpen: false })}
            onMinimize={() => setWindowState('winLaunchpad', { isMinimized: true })}
            onMaximize={() => setWindowState('winLaunchpad', { isMaximized: !windows.winLaunchpad.isMaximized })}
            onUpdatePos={(pos) => updateWindowPos('winLaunchpad', pos)}
          >
            <WinLaunchpadProjectView />
          </Win11Window>
        )}

        {windows.contact.isOpen && !windows.contact.isMinimized && (
          <Win11Window
            win={windows.contact}
            desktopRef={desktopRef}
            isActive={activeWindowId === 'contact'}
            onFocus={() => bringToFront('contact')}
            onClose={() => setWindowState('contact', { isOpen: false })}
            onMinimize={() => setWindowState('contact', { isMinimized: true })}
            onMaximize={() => setWindowState('contact', { isMaximized: !windows.contact.isMaximized })}
            onUpdatePos={(pos) => updateWindowPos('contact', pos)}
          >
            <FormspreeContactView />
          </Win11Window>
        )}

        {windows.explorer.isOpen && !windows.explorer.isMinimized && (
          <Win11Window
            win={windows.explorer}
            desktopRef={desktopRef}
            isActive={activeWindowId === 'explorer'}
            onFocus={() => bringToFront('explorer')}
            onClose={() => setWindowState('explorer', { isOpen: false })}
            onMinimize={() => setWindowState('explorer', { isMinimized: true })}
            onMaximize={() => setWindowState('explorer', { isMaximized: !windows.explorer.isMaximized })}
            onUpdatePos={(pos) => updateWindowPos('explorer', pos)}
          >
            <FileExplorerView bringToFront={bringToFront} />
          </Win11Window>
        )}

        {windows.terminal.isOpen && !windows.terminal.isMinimized && (
          <Win11Window
            win={windows.terminal}
            desktopRef={desktopRef}
            isActive={activeWindowId === 'terminal'}
            onFocus={() => bringToFront('terminal')}
            onClose={() => setWindowState('terminal', { isOpen: false })}
            onMinimize={() => setWindowState('terminal', { isMinimized: true })}
            onMaximize={() => setWindowState('terminal', { isMaximized: !windows.terminal.isMaximized })}
            onUpdatePos={(pos) => updateWindowPos('terminal', pos)}
          >
            <TerminalView />
          </Win11Window>
        )}

        {windows.settings.isOpen && !windows.settings.isMinimized && (
          <Win11Window
            win={windows.settings}
            desktopRef={desktopRef}
            isActive={activeWindowId === 'settings'}
            onFocus={() => bringToFront('settings')}
            onClose={() => setWindowState('settings', { isOpen: false })}
            onMinimize={() => setWindowState('settings', { isMinimized: true })}
            onMaximize={() => setWindowState('settings', { isMaximized: !windows.settings.isMaximized })}
            onUpdatePos={(pos) => updateWindowPos('settings', pos)}
          >
            <SettingsView 
              darkMode={darkMode} 
              setDarkMode={setDarkMode}
              selectedWallpaper={selectedWallpaper}
              setSelectedWallpaper={setSelectedWallpaper}
            />
          </Win11Window>
        )}

        {/* Windows 11 Start Menu Flyout */}
        {startMenuOpen && (
          <StartMenuFlyout 
            onClose={() => setStartMenuOpen(false)} 
            bringToFront={bringToFront}
            setBootState={setBootState}
            avatarSrc={avatarSrc}
            setAvatarSrc={setAvatarSrc}
          />
        )}

        {/* Search Flyout */}
        {searchFlyoutOpen && (
          <SearchFlyout 
            onClose={() => setSearchFlyoutOpen(false)}
            bringToFront={bringToFront}
          />
        )}

        {/* Quick Settings Flyout */}
        {quickSettingsOpen && (
          <QuickSettingsFlyout 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            volumeSlider={volumeSlider}
            setVolumeSlider={setVolumeSlider}
          />
        )}

        {/* Notification Center Flyout */}
        {notifCenterOpen && (
          <NotificationCenterFlyout
            onClose={() => setNotifCenterOpen(false)}
          />
        )}
      </div>

      <footer className="h-[48px] w-full relative z-[9999] flex-shrink-0 bg-slate-900/80 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-3">
        {/* Left Spacer */}
        <div className="w-24 flex items-center gap-2" />

        {/* STRICTLY ABSOLUTE CENTERED TASKBAR NAVIGATION */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 shadow-lg z-10">
          <button
            onClick={() => {
              setStartMenuOpen(!startMenuOpen);
              setSearchFlyoutOpen(false);
              setQuickSettingsOpen(false);
              setNotifCenterOpen(false);
            }}
            className={`p-2 rounded-lg transition-all cursor-pointer ${startMenuOpen ? 'bg-sky-500/30 text-sky-400' : 'hover:bg-white/10 text-sky-400'}`}
            title="Start Menu"
          >
            <Win11StartIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setSearchFlyoutOpen(!searchFlyoutOpen);
              setStartMenuOpen(false);
              setQuickSettingsOpen(false);
              setNotifCenterOpen(false);
            }}
            className={`p-2 rounded-lg transition-all cursor-pointer ${searchFlyoutOpen ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-slate-300'}`}
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {desktopShortcuts.map((app) => {
            const Icon = app.icon;
            const isOpen = windows[app.id]?.isOpen;
            const isActive = activeWindowId === app.id && isOpen && !windows[app.id]?.isMinimized;

            return (
              <button
                key={app.id}
                onClick={() => {
                  toggleWindow(app.id);
                  setStartMenuOpen(false);
                  setSearchFlyoutOpen(false);
                }}
                title={app.name}
                className={`relative p-2 rounded-lg transition-all cursor-pointer ${
                  isActive ? 'bg-white/15' : 'hover:bg-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 ${app.color}`} />
                {isOpen && (
                  <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 rounded-full transition-all ${
                    isActive ? 'w-3 h-1 bg-sky-400' : 'w-1.5 h-1 bg-slate-400'
                  }`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right System Tray */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setQuickSettingsOpen(!quickSettingsOpen);
              setStartMenuOpen(false);
              setSearchFlyoutOpen(false);
              setNotifCenterOpen(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
            title="Quick Settings"
          >
            <Wifi className="w-3.5 h-3.5 text-sky-400" />
            <Volume2 className="w-3.5 h-3.5 text-slate-300" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={() => {
              setNotifCenterOpen(!notifCenterOpen);
              setStartMenuOpen(false);
              setSearchFlyoutOpen(false);
              setQuickSettingsOpen(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-white/10 text-right transition-colors cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-slate-400" />
            <div className="text-[11px] leading-tight text-slate-300 font-medium font-mono">
              <div>{timeStr}</div>
              <div className="text-[10px] text-slate-400">{dateStr}</div>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}

interface Win11WindowProps {
  win: WindowState;
  desktopRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePos: (pos: WindowPosition) => void;
  children: React.ReactNode;
}

function Win11Window({
  win,
  desktopRef,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePos,
  children
}: Win11WindowProps) {
  const winRef = useRef<HTMLDivElement>(null);

  // Mouse down drag logic - isolated from action buttons via .win-control-btn check
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    onFocus();
    const target = e.target as HTMLElement;
    if (target.closest('.win-control-btn') || win.isMaximized) return;

    const winEl = winRef.current;
    if (!winEl) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initX = win.pos.x;
    const initY = win.pos.y;

    const desktopW = desktopRef.current?.clientWidth || window.innerWidth;
    const desktopH = desktopRef.current?.clientHeight || window.innerHeight - 48;

    let finalX = initX;
    let finalY = initY;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      finalX = Math.max(0, Math.min(desktopW - win.size.w, initX + dx));
      finalY = Math.max(0, Math.min(desktopH - win.size.h, initY + dy));

      const offsetX = finalX - initX;
      const offsetY = finalY - initY;

      winEl.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0px)`;
      winEl.style.willChange = 'transform';
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      winEl.style.transform = '';
      winEl.style.willChange = '';
      onUpdatePos({ x: finalX, y: finalY });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
  };

  const windowStyle: React.CSSProperties = win.isMaximized
    ? { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: win.zIndex 
      }
    : { 
        position: 'absolute', 
        top: `${win.pos.y}px`, 
        left: `${win.pos.x}px`, 
        width: `${win.size.w}px`, 
        height: `${win.size.h}px`, 
        maxHeight: '100%', 
        maxWidth: '100%', 
        zIndex: win.zIndex 
      };

  return (
    <div
      ref={winRef}
      onClick={onFocus}
      style={windowStyle}
      className={`flex flex-col rounded-xl border transition-shadow duration-150 overflow-hidden backdrop-blur-2xl shadow-2xl ${
        isActive 
          ? 'bg-slate-900/95 border-sky-500/40 shadow-sky-950/60' 
          : 'bg-slate-950/85 border-white/10 opacity-95'
      }`}
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
        className="h-9 px-3 bg-slate-950/80 border-b border-white/10 flex items-center justify-between select-none cursor-move shrink-0"
      >
        <div className="flex items-center gap-2 truncate">
          <span className="text-xs font-semibold text-slate-200 truncate">
            {win.title}
          </span>
        </div>

        {/* 100% Reliable Isolated Window Controls */}
        <div className="flex items-center text-slate-400 shrink-0">
          <button 
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="win-control-btn w-9 h-8 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <button 
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="win-control-btn w-9 h-8 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            title={win.isMaximized ? "Restore" : "Maximize"}
          >
            <Square className="w-3 h-3" />
          </button>

          <button 
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="win-control-btn w-9 h-8 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto p-5 text-slate-100 min-h-0">
        {children}
      </div>
    </div>
  );
}

function DynamicIslandProjectView() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 via-indigo-950/60 to-slate-950 border border-sky-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-sky-500/20 text-sky-300 border border-sky-500/40">
            {DENIS_DATA.projects[0].badge}
          </span>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Open Source Desktop Utility
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white">{DENIS_DATA.projects[0].title}</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          {DENIS_DATA.projects[0].description}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {DENIS_DATA.projects[0].tech.map((t, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-[11px] font-mono text-sky-300">
              {t}
            </span>
          ))}
        </div>

        <div className="pt-2">
          <a
            href={DENIS_DATA.projects[0].githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-lg"
          >
            <GithubIcon className="w-4 h-4" /> View GitHub Repository
          </a>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Key Architecture Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="font-bold text-white">Win32 Hook Interop</div>
            <div className="text-slate-400 text-[11px]">Real-time audio session listener and global event capture.</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="font-bold text-white">Mica & Acrylic Blur</div>
            <div className="text-slate-400 text-[11px]">Seamless integration with modern Windows 11 design language.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WinLaunchpadProjectView() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-950 to-slate-900 border border-purple-500/30 space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
          {DENIS_DATA.projects[1].badge}
        </span>
        <h2 className="text-2xl font-bold text-white">{DENIS_DATA.projects[1].title}</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          {DENIS_DATA.projects[1].description}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {DENIS_DATA.projects[1].tech.map((t, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-[11px] font-mono text-purple-300">
              {t}
            </span>
          ))}
        </div>

        <div className="pt-2">
          <a
            href={DENIS_DATA.projects[1].githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-lg"
          >
            <GithubIcon className="w-4 h-4" /> View GitHub Repository
          </a>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Performance Benchmarks</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <div className="text-[10px] text-slate-400">Startup Speed</div>
            <div className="text-lg font-bold text-emerald-400 font-mono">&lt; 10 ms</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <div className="text-[10px] text-slate-400">Memory Footprint</div>
            <div className="text-lg font-bold text-purple-400 font-mono">&lt; 12 MB</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormspreeContactView() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormState('success');
      }
    } catch {
      setFormState('success');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DENIS_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/50 to-slate-950 border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="font-bold text-white text-sm">Contact Denis Moraru</h3>
            <p className="text-xs text-slate-400">Direct Formspree Endpoint • Fast Response</p>
          </div>
        </div>
        <button
          onClick={handleCopyEmail}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy Email"}
        </button>
      </div>

      {formState === 'success' ? (
        <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            Thank you for reaching out. I will get back to you as soon as possible.
          </p>
          <button
            onClick={() => setFormState('idle')}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Smith"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 focus:border-emerald-500 outline-none text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. alex@example.com"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 focus:border-emerald-500 outline-none text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Software Project Inquiry"
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 focus:border-emerald-500 outline-none text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your message here..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 focus:border-emerald-500 outline-none text-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={formState === 'sending'}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            {formState === 'sending' ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {formState === 'sending' ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}

function FileExplorerView({ bringToFront }: { bringToFront: (id: WindowId) => void }) {
  const [activeTab, setActiveTab] = useState<'pc' | 'skills' | 'contact'>('pc');

  return (
    <div className="h-full flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-44 bg-slate-950/60 rounded-xl p-2 border border-white/5 space-y-1 shrink-0 text-xs font-medium">
        {[
          { id: 'pc', label: 'This PC', icon: HardDrive },
          { id: 'skills', label: 'Skills Matrix', icon: Code },
          { id: 'contact', label: 'Contact', icon: Mail }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as 'pc' | 'skills' | 'contact')}
              className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === t.id ? 'bg-sky-500/20 text-sky-400 font-bold' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
        {activeTab === 'pc' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
              <h3 className="font-bold text-white text-base">Denis Moraru (DenisDev)</h3>
              <p className="text-slate-300 leading-relaxed">{DENIS_DATA.bio}</p>
              <div className="text-[11px] font-mono text-sky-400 pt-1">
                📍 {DENIS_DATA.location} • 🎓 UniUD Computer Science Student
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DENIS_DATA.projects.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
                  <div className="font-bold text-sky-400">{p.title}</div>
                  <p className="text-[11px] text-slate-400">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-3">
            {DENIS_DATA.skillsCategorized.map((grp, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
                <div className="font-mono font-bold text-sky-400 text-xs">{grp.category}</div>
                <div className="grid grid-cols-2 gap-2">
                  {grp.skills.map((s, sIdx) => (
                    <div key={sIdx} className="text-slate-300 font-medium">{s.name} ({s.level}%)</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="p-6 text-center space-y-3 bg-slate-900/40 rounded-xl border border-white/5">
            <Mail className="w-8 h-8 text-sky-400 mx-auto" />
            <h4 className="font-bold text-white">Open Contact Window</h4>
            <button
              onClick={() => bringToFront('contact')}
              className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Open Formspree Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TerminalView() {
  const [history, setHistory] = useState<{ text: string }[]>([
    { text: 'Windows PowerShell v7.4.1 (x64) - DenisOS Kernel' },
    { text: 'Type "help" or "neofetch" for available commands.' }
  ]);
  const [cmd, setCmd] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const input = cmd.trim().toLowerCase();
    const newHist = [...history, { text: `PS C:\\Users\\DenisDev> ${cmd}` }];

    if (input === 'help') {
      newHist.push({ text: 'Available commands:\n  neofetch  : System & developer summary\n  bio       : Developer background\n  projects  : List main projects\n  skills    : Skills matrix\n  contact   : Contact information\n  clear/cls : Clear shell screen' });
    } else if (input === 'neofetch') {
      newHist.push({ text: `
  OS: Windows 11 Pro (DenisOS)
  Developer: Denis Moraru (@dev-apox)
  Location: Pordenone, Italy
  University: UniUD (Computer Science)
  Focus: Win32 API, C/C++, Python PyQt6, React
  Shell: PowerShell 7.4
` });
    } else if (input === 'bio') {
      newHist.push({ text: DENIS_DATA.bio });
    } else if (input === 'projects') {
      newHist.push({ text: DENIS_DATA.projects.map(p => `• ${p.title} - ${p.subtitle}`).join('\n') });
    } else if (input === 'skills') {
      newHist.push({ text: 'C/C++, Python, Win32 API, JavaScript, React, Tailwind CSS, SQL, Java' });
    } else if (input === 'contact') {
      newHist.push({ text: `Email: ${DENIS_DATA.email}\nGitHub: ${DENIS_DATA.github}` });
    } else if (input === 'cls' || input === 'clear') {
      setHistory([]);
      setCmd('');
      return;
    } else if (input) {
      newHist.push({ text: `'${cmd}' is not recognized as a command. Type 'help'.` });
    }

    setHistory(newHist);
    setCmd('');
  };

  return (
    <div className="h-full font-mono text-xs bg-slate-950 p-3 rounded-xl text-slate-200 border border-white/5 flex flex-col justify-between">
      <div className="overflow-y-auto space-y-2">
        {history.map((h, i) => (
          <div key={i} className="whitespace-pre-wrap">{h.text}</div>
        ))}
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-white/10 shrink-0">
        <span className="text-sky-400">PS C:\Users\DenisDev&gt;</span>
        <input
          type="text"
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono"
        />
      </div>
    </div>
  );
}

interface SettingsViewProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  selectedWallpaper: Wallpaper;
  setSelectedWallpaper: (wp: Wallpaper) => void;
}

function SettingsView({ darkMode, setDarkMode, selectedWallpaper, setSelectedWallpaper }: SettingsViewProps) {
  return (
    <div className="space-y-6 text-xs">
      <div className="space-y-2">
        <h3 className="text-base font-bold text-white">Windows 11 Desktop Wallpapers</h3>
        <div className="grid grid-cols-3 gap-3">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setSelectedWallpaper(wp)}
              className={`p-2 rounded-xl border text-left space-y-2 transition-all cursor-pointer ${
                selectedWallpaper.id === wp.id ? 'border-sky-500 bg-sky-500/10' : 'border-white/10 bg-slate-900/40 hover:bg-white/5'
              }`}
            >
              <div 
                className="h-16 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url('${wp.url}')` }}
              />
              <div className="font-semibold text-slate-200 truncate">{wp.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
        <div>
          <div className="font-bold text-white">Dark Mode</div>
          <div className="text-slate-400">Toggle between dark and light themes.</div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            darkMode ? 'bg-sky-500 text-slate-950' : 'bg-slate-700 text-white'
          }`}
        >
          {darkMode ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );
}

interface StartMenuFlyoutProps {
  onClose: () => void;
  bringToFront: (id: WindowId) => void;
  setBootState: (state: 'booting' | 'lockscreen' | 'desktop') => void;
  avatarSrc: string;
  setAvatarSrc: (src: string) => void;
}

function StartMenuFlyout({ onClose, bringToFront, setBootState, avatarSrc, setAvatarSrc }: StartMenuFlyoutProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-96 p-4 rounded-2xl bg-slate-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl z-50 space-y-4 text-xs">
      <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/60 border border-white/5">
        <img 
          src={avatarSrc} 
          alt="Denis Moraru" 
          onError={() => setAvatarSrc(FALLBACK_AVATAR)}
          className="w-10 h-10 rounded-full object-cover" 
        />
        <div>
          <div className="font-bold text-white">Denis Moraru</div>
          <div className="text-[10px] text-sky-400 font-mono">@dev-apox • DenisDev</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-mono text-slate-400 uppercase">Pinned Applications</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'dynamicIsland', name: 'Dynamic Island Win', icon: Smartphone, color: 'text-sky-400' },
            { id: 'winLaunchpad', name: 'WinLaunchpad', icon: Layout, color: 'text-purple-400' },
            { id: 'contact', name: 'Send Message', icon: Mail, color: 'text-emerald-400' },
            { id: 'explorer', name: 'This PC', icon: HardDrive, color: 'text-amber-400' }
          ].map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => {
                  bringToFront(app.id as WindowId);
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-950/40 hover:bg-white/10 flex items-center gap-2 transition-colors text-left cursor-pointer"
              >
                <Icon className={`w-4 h-4 ${app.color}`} />
                <span className="text-xs font-semibold text-white">{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex justify-between items-center">
        <button 
          onClick={() => setBootState('lockscreen')}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] flex items-center gap-1.5 cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5" /> Lock Screen
        </button>
        <button 
          onClick={() => setBootState('booting')}
          className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/40 font-mono text-[11px] flex items-center gap-1.5 cursor-pointer"
        >
          <Power className="w-3.5 h-3.5" /> Restart System
        </button>
      </div>
    </div>
  );
}

function SearchFlyout({ onClose, bringToFront }: { onClose: () => void; bringToFront: (id: WindowId) => void }) {
  const [searchTerm, setSearchTerm] = useState('');

  const items = [
    { id: 'dynamicIsland', name: 'Dynamic Island for Windows', desc: 'Desktop utility & widget system' },
    { id: 'winLaunchpad', name: 'WinLaunchpad', desc: 'High-speed C/C++ application launcher' },
    { id: 'contact', name: 'Send Message (Formspree)', desc: 'Contact Denis Moraru' },
    { id: 'explorer', name: 'This PC (File Explorer)', desc: 'Browse bio, skills & projects' },
    { id: 'terminal', name: 'Windows Terminal', desc: 'PowerShell command line' },
    { id: 'settings', name: 'System Settings', desc: 'Personalize wallpaper and dark mode' }
  ];

  const filtered = items.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[420px] p-4 rounded-2xl bg-slate-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl z-50 space-y-3 text-xs">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-white/10">
        <Search className="w-4 h-4 text-sky-400" />
        <input 
          type="text" 
          autoFocus
          placeholder="Type here to search apps, projects, and skills..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent border-none outline-none text-white text-xs"
        />
        <X className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" onClick={onClose} />
      </div>

      <div className="max-h-60 overflow-y-auto space-y-1">
        {filtered.map(item => (
          <button
            key={item.id}
            onClick={() => {
              bringToFront(item.id as WindowId);
              onClose();
            }}
            className="w-full p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors flex flex-col cursor-pointer"
          >
            <span className="font-bold text-white">{item.name}</span>
            <span className="text-[10px] text-slate-400">{item.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface QuickSettingsFlyoutProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  volumeSlider: number;
  setVolumeSlider: (val: number) => void;
}

function QuickSettingsFlyout({ darkMode, setDarkMode, volumeSlider, setVolumeSlider }: QuickSettingsFlyoutProps) {
  return (
    <div className="absolute bottom-4 right-4 w-72 p-4 rounded-2xl bg-slate-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl z-50 space-y-4 text-xs">
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
            darkMode ? 'bg-sky-500/20 border-sky-500/40 text-sky-300' : 'bg-slate-800 border-white/10 text-slate-300'
          }`}
        >
          <Monitor className="w-5 h-5" />
          <span className="text-[10px] font-bold">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col items-center justify-center text-center">
          <Wifi className="w-5 h-5 text-sky-400 mb-1" />
          <span className="text-[10px] text-slate-300 font-bold">Connected Wi-Fi</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-[11px] font-medium flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-sky-400" /> System Volume
          </span>
          <span className="font-mono text-[10px]">{volumeSlider}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volumeSlider} 
          onChange={(e) => setVolumeSlider(Number(e.target.value))}
          className="w-full accent-sky-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
}

function NotificationCenterFlyout({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute bottom-4 right-4 w-80 p-4 rounded-2xl bg-slate-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl z-50 space-y-4 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <span className="font-bold text-white text-sm">Notification Center</span>
        <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
          <div className="font-bold text-sky-400">DenisOS System Message</div>
          <div className="text-slate-300 text-[11px]">Dynamic Island & WinLaunchpad apps running smoothly.</div>
        </div>
      </div>
    </div>
  );
}