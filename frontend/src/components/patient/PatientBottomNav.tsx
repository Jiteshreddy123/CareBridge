import React from 'react';
import { Home, CheckSquare, Calendar, HelpCircle, Globe } from 'lucide-react';
import { useCareBridge } from '../../context/CareBridgeContext';

interface PatientBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenHelp: () => void;
}

export const PatientBottomNav: React.FC<PatientBottomNavProps> = ({ activeTab, setActiveTab, onOpenHelp }) => {
  const { currentLanguage, setCurrentLanguage, t } = useCareBridge();

  const toggleLanguage = () => {
    if (currentLanguage === 'en') setCurrentLanguage('te');
    else if (currentLanguage === 'te') setCurrentLanguage('hi');
    else setCurrentLanguage('en');
  };

  return (
    <nav aria-label="Patient Mobile Navigation" className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-200 py-1.5 px-3 flex items-center justify-around z-20 shadow-lg">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
          activeTab === 'home' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px]">{t.nav.home}</span>
      </button>

      <button
        onClick={() => setActiveTab('tasks')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
          activeTab === 'tasks' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <CheckSquare className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px]">{t.nav.myTasks}</span>
      </button>

      <button
        onClick={() => setActiveTab('appointments')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
          activeTab === 'appointments' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Calendar className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px]">{t.nav.appointments}</span>
      </button>

      <button
        onClick={onOpenHelp}
        className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-amber-700 hover:text-amber-800 transition"
      >
        <HelpCircle className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-semibold">{t.nav.help}</span>
      </button>

      <button
        onClick={toggleLanguage}
        className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-slate-600 hover:text-teal-700 transition"
        title="Change preferred language (English / తెలుగు / हिन्दी)"
      >
        <Globe className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-semibold uppercase">
          {currentLanguage === 'en' ? 'తెలుగు' : currentLanguage === 'te' ? 'हिन्दी' : 'ENG'}
        </span>
      </button>
    </nav>
  );
};
