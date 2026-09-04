import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all font-mono"
        title="Install Web App (PWA)"
      >
        <Download className="w-3.5 h-3.5 animate-pulse" />
        <span>INSTALL APP</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all font-mono"
          title="Install on iOS Home Screen"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>INSTALL PWA</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <h3 className="text-sm font-bold text-slate-800 font-mono tracking-wider flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-500" />
                  INSTALL ON IOS
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                1. Tap the <strong className="text-indigo-600">Share</strong> button in Safari toolbar (the square icon with an arrow pointing up).<br /><br />
                2. Scroll down and select <strong className="text-indigo-600">Add to Home Screen</strong>.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-lg bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition font-mono"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback default installer button to prompt user or show status if they click
  return (
    <button
      onClick={() => {
        alert("To install, tap your browser's menu (⋮ or share icon) and select 'Install app' or 'Add to Home Screen'.");
      }}
      className="flex items-center gap-2 rounded-lg border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-all font-mono"
      title="How to install"
    >
      <Smartphone className="w-3.5 h-3.5 text-slate-400" />
      <span>INSTALL INFO</span>
    </button>
  );
};
