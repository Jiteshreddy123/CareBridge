import React from 'react';
import { Wifi, BatteryMedium, Signal, ChevronLeft } from 'lucide-react';
import { useCareBridge } from '../../context/CareBridgeContext';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({ children }) => {
  const { deviceMode, setDeviceMode } = useCareBridge();

  if (deviceMode === 'desktop') {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="py-6 px-2 flex flex-col items-center justify-center min-h-[calc(100vh-110px)] bg-slate-200/80">
      {/* Device frame header controls */}
      <div className="mb-3 flex items-center justify-between w-full max-w-[390px] px-2 text-xs text-slate-600">
        <span className="font-semibold text-slate-700">Android 14 Viewport (390 × 844px)</span>
        <button
          onClick={() => setDeviceMode('desktop')}
          className="text-teal-700 hover:text-teal-900 font-medium underline"
        >
          Switch to Full View
        </button>
      </div>

      {/* Realistic Android Phone Mockup Frame */}
      <div className="phone-mockup-frame bg-white relative">
        {/* Status Bar */}
        <div className="bg-slate-900 text-white text-[11px] px-6 py-2 flex items-center justify-between select-none z-30">
          <span className="font-semibold tracking-tight">10:42</span>
          {/* Notch / Camera cutout */}
          <div className="w-3.5 h-3.5 rounded-full bg-slate-950 border border-slate-700 shadow-inner"></div>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable screen viewport */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative bg-slate-50">
          {children}
        </div>

        {/* Android Virtual Bottom Home Bar */}
        <div className="bg-white/95 border-t border-slate-100 py-1 flex items-center justify-center">
          <div className="w-32 h-1 bg-slate-300 rounded-full my-1"></div>
        </div>
      </div>
    </div>
  );
};
