import React, { useState } from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import { WellbeingScore } from '../../types';
import { HeartPulse, X, Check, Activity, AlertTriangle } from 'lucide-react';

interface WellbeingTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WellbeingTrackerModal: React.FC<WellbeingTrackerModalProps> = ({ isOpen, onClose }) => {
  const { t, wellbeingScores, addWellbeingScore } = useCareBridge();

  const [energy, setEnergy] = useState<number>(3);
  const [pain, setPain] = useState<number>(2);
  const [nausea, setNausea] = useState<number>(1);
  const [appetite, setAppetite] = useState<number>(3);
  const [sleep, setSleep] = useState<number>(4);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    addWellbeingScore({
      date: todayStr,
      energy,
      pain,
      nausea,
      appetite,
      sleep,
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  // Sparkline generator helper
  const width = 320;
  const height = 90;
  const pad = 14;
  const history = wellbeingScores.slice(-7);

  const getPoints = (key: keyof Omit<WellbeingScore, 'date' | 'notes'>) => {
    if (history.length === 0) return '';
    const step = (width - 2 * pad) / (Math.max(history.length - 1, 1));
    return history
      .map((item, idx) => {
        const val = item[key];
        const x = pad + idx * step;
        const y = height - pad - ((val - 1) / 4) * (height - 2 * pad);
        return `${idx === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-modal overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {t.wellbeing?.title || 'Symptom & Wellbeing Check-in'}
              </h3>
              <p className="text-xs text-stone-500">
                {t.wellbeing?.subtitle || 'Daily tracking to assist your oncology care team.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7-Day Trend Chart Preview */}
        <div className="bg-[#FAF8F5] rounded-2xl p-3.5 border border-stone-200/90 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-700">
              {t.wellbeing?.sevenDayTrend || '7-Day Symptom Trajectory'}
            </span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-700 inline-block" /> Energy
              </span>
              <span className="flex items-center gap-1 text-rose-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" /> Pain
              </span>
              <span className="flex items-center gap-1 text-amber-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Nausea
              </span>
            </div>
          </div>

          <div className="relative pt-1">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20 overflow-visible">
              {/* Energy Line */}
              <path
                d={getPoints('energy')}
                fill="none"
                stroke="#2C6E5F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Pain Line */}
              <path
                d={getPoints('pain')}
                fill="none"
                stroke="#B34A3B"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Nausea Line */}
              <path
                d={getPoints('nausea')}
                fill="none"
                stroke="#B9812E"
                strokeWidth="2"
                strokeDasharray="4 2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Date labels */}
              {history.map((h, i) => {
                const step = (width - 2 * pad) / (Math.max(history.length - 1, 1));
                const x = pad + i * step;
                return (
                  <text key={i} x={x} y={height - 2} fontSize="9" fill="#8C8270" textAnchor="middle">
                    {h.date}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Rating Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {[
            { label: t.wellbeing?.energy || 'Energy Level', value: energy, setter: setEnergy, min: 'Fatigued', max: 'Active' },
            { label: t.wellbeing?.pain || 'Pain Severity', value: pain, setter: setPain, min: 'None', max: 'Severe' },
            { label: t.wellbeing?.nausea || 'Nausea', value: nausea, setter: setNausea, min: 'None', max: 'High' },
            { label: t.wellbeing?.appetite || 'Appetite', value: appetite, setter: setAppetite, min: 'Poor', max: 'Good' },
            { label: t.wellbeing?.sleep || 'Sleep Quality', value: sleep, setter: setSleep, min: 'Restless', max: 'Restful' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 text-xs">
              <span className="w-28 font-medium text-stone-800 flex-shrink-0">{item.label}</span>
              <div className="flex-1 flex items-center justify-between gap-1.5">
                <span className="text-[10px] text-stone-400 w-12 text-right">{item.min}</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => item.setter(score)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        item.value === score
                          ? 'bg-emerald-800 text-white shadow-sm scale-105'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-stone-400 w-12">{item.max}</span>
              </div>
            </div>
          ))}

          {/* Elevated Pain Warning */}
          {pain >= 4 && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>
                <strong>Pain reported as severe.</strong> We recommend reaching out to your oncology nurse coordinator if symptoms persist.
              </span>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-soft transition flex items-center justify-center gap-2"
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                  <span>{t.wellbeing?.submittedNotice || 'Check-in Recorded!'}</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>{t.wellbeing?.submitCheckin || "Record Today's Check-in"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
