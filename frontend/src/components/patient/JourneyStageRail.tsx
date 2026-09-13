import React, { useState } from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import { JourneyStage, JourneyStageStatus } from '../../types';
import { Check, AlertCircle, Info, Sparkles, ChevronRight } from 'lucide-react';

interface JourneyStageRailProps {
  onOpenSummary?: () => void;
}

export const JourneyStageRail: React.FC<JourneyStageRailProps> = ({ onOpenSummary }) => {
  const { selectedPatient, t, tasks } = useCareBridge();
  const [selectedStageId, setSelectedStageId] = useState<string>('treatment');

  // Check if patient has any urgent attention items in tasks
  const hasAttentionTask = tasks.some(
    t => t.patient_id === selectedPatient.id && (t.is_urgent || t.requires_staff_attention) && t.status !== 'Completed'
  );

  const stages: JourneyStage[] = [
    {
      id: 'diagnosis',
      label: t.journey?.stages.diagnosis || 'Diagnosis',
      sublabel: 'Confirmed May 2026',
      status: 'done',
      order: 1
    },
    {
      id: 'investigations',
      label: t.journey?.stages.investigations || 'Investigations',
      sublabel: 'Labs & Scans Done',
      status: 'done',
      order: 2
    },
    {
      id: 'staging',
      label: t.journey?.stages.staging || 'Staging',
      sublabel: selectedPatient.diagnosis.includes('Stage') ? selectedPatient.diagnosis.split('(')[0].trim() : 'Stage II',
      status: 'done',
      order: 3
    },
    {
      id: 'planning',
      label: t.journey?.stages.planning || 'Planning',
      sublabel: 'Protocol Approved',
      status: 'done',
      order: 4
    },
    {
      id: 'treatment',
      label: t.journey?.stages.treatment || 'Treatment',
      sublabel: `${t.journey?.cycleLabel || 'Cycle'} 3 of 6`,
      status: hasAttentionTask ? 'attn' : 'current',
      order: 5
    },
    {
      id: 'monitoring',
      label: t.journey?.stages.monitoring || 'Monitoring',
      sublabel: 'Post-Cycle 3 Scan',
      status: 'pending',
      order: 6
    },
    {
      id: 'followup',
      label: t.journey?.stages.followup || 'Follow-up',
      sublabel: 'Survivorship Plan',
      status: 'pending',
      order: 7
    },
  ];

  const currentStage = stages.find(s => s.id === selectedStageId) || stages[4];
  const activeIndex = stages.findIndex(s => s.status === 'current' || s.status === 'attn');
  const fillPercentage = Math.max(0, Math.min(100, (activeIndex / (stages.length - 1)) * 100));

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 p-5 shadow-card space-y-4">
      {/* Header with Title & Summary Action */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
            {t.journey?.title || 'Cancer Care Journey'}
          </span>
          <h3 className="text-base font-serif font-bold text-stone-900 mt-1">
            {stages[activeIndex]?.label} — {stages[activeIndex]?.sublabel}
          </h3>
        </div>

        {onOpenSummary && (
          <button
            type="button"
            onClick={onOpenSummary}
            className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 bg-stone-50 hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
          >
            <span>{t.patientHome.journeySummaryButton}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Visual Journey Rail Track */}
      <div className="relative pt-3 pb-1 px-1">
        {/* Background track line */}
        <div className="absolute top-6 left-4 right-4 h-0.5 bg-stone-200 z-0" />
        {/* Active progress fill line */}
        <div
          className="absolute top-6 left-4 h-0.5 bg-emerald-700 z-0 transition-all duration-300"
          style={{ width: `calc(${fillPercentage}% - 8px)` }}
        />

        {/* Milestone Nodes */}
        <div className="relative z-10 flex justify-between items-start">
          {stages.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            let nodeClasses = "border-stone-300 bg-white text-stone-400";
            let icon = <span className="text-[10px] font-bold">{stage.order}</span>;

            if (stage.status === 'done') {
              nodeClasses = "border-emerald-700 bg-emerald-700 text-white shadow-sm";
              icon = <Check className="w-3 h-3 stroke-[3]" />;
            } else if (stage.status === 'current') {
              nodeClasses = "border-amber-600 bg-amber-500 text-white ring-4 ring-amber-100 shadow-sm animate-pulse";
              icon = <span className="w-2 h-2 rounded-full bg-white" />;
            } else if (stage.status === 'attn') {
              nodeClasses = "border-rose-600 bg-rose-600 text-white ring-4 ring-rose-100 shadow-sm";
              icon = <AlertCircle className="w-3 h-3 stroke-[2.5]" />;
            }

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStageId(stage.id)}
                className="flex flex-col items-center group focus:outline-none transition"
                title={`${stage.label} (${stage.sublabel})`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-transform ${nodeClasses} ${
                    isSelected ? 'scale-110 ring-2 ring-emerald-800/40' : 'group-hover:scale-105'
                  }`}
                >
                  {icon}
                </div>
                <span
                  className={`text-[10px] mt-1.5 text-center max-w-[48px] truncate leading-tight font-medium ${
                    stage.status === 'current' || isSelected
                      ? 'text-stone-900 font-bold'
                      : stage.status === 'done'
                      ? 'text-emerald-900'
                      : 'text-stone-400'
                  }`}
                >
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Strip */}
      <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-3 flex items-center justify-between text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-800 flex-shrink-0" />
          <span>
            <strong className="text-stone-900 font-semibold">{currentStage.label}:</strong>{' '}
            {currentStage.status === 'done'
              ? 'Completed and verified by your oncology care team.'
              : currentStage.status === 'current'
              ? 'Currently active. Complete your pending actions below before your next review.'
              : currentStage.status === 'attn'
              ? 'Safety attention item: pre-chemo lab test pending confirmation.'
              : 'Upcoming milestone following completion of current therapy phase.'}
          </span>
        </div>
      </div>
    </div>
  );
};
