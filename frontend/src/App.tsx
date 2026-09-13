import React from 'react';
import { CareBridgeProvider, useCareBridge } from './context/CareBridgeContext';
import { Header } from './components/common/Header';
import { HeroDemoBanner } from './components/common/HeroDemoBanner';
import { MobileDeviceFrame } from './components/common/MobileDeviceFrame';
import { LandingPage } from './views/LandingPage';
import { ClinicianDashboardView } from './views/ClinicianDashboardView';
import { PatientListView } from './views/PatientListView';
import { FollowupQueueView } from './views/FollowupQueueView';
import { HelpRequestsView } from './views/HelpRequestsView';
import { ImpactDashboardView } from './views/ImpactDashboardView';
import { AuditTrailView } from './views/AuditTrailView';
import { PatientMobileHome } from './components/patient/PatientMobileHome';
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';
import { PrivacyView } from './views/PrivacyView';

const AppContent: React.FC = () => {
  const { currentView, currentRole, deviceMode, setCurrentView } = useCareBridge();

  const renderMainView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <ClinicianDashboardView />;
      case 'patients':
        return <PatientListView />;
      case 'queue':
        return <FollowupQueueView />;
      case 'help-requests':
        return <HelpRequestsView />;
      case 'impact':
      case 'pilot':
        return <ImpactDashboardView />;
      case 'audit':
        return <AuditTrailView />;
      case 'patient-home':
        return (
          <MobileDeviceFrame>
            <PatientMobileHome />
          </MobileDeviceFrame>
        );
      case 'caregiver':
        return <CaregiverDashboard />;
      case 'privacy':
        return <PrivacyView />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Header />
      <HeroDemoBanner />

      <main className="flex-1">
        {renderMainView()}
      </main>

      {/* Footer */}
      {currentView !== 'patient-home' && (
        <footer className="bg-white border-t border-slate-200 py-6 px-4 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">CareBridge NCG</span>
              <span>•</span>
              <span>Multilingual Cancer Care Follow-Up Closure Platform</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('privacy')}
                className="hover:text-teal-700 underline"
              >
                Privacy & Clinical Safeguards
              </button>
              <button
                onClick={() => setCurrentView('impact')}
                className="hover:text-teal-700 underline"
              >
                Pilot Outcomes (72% → 82%)
              </button>
              <span className="text-slate-400">
                National Cancer Grid Pilot Protocol
              </span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export function App() {
  return (
    <CareBridgeProvider>
      <AppContent />
    </CareBridgeProvider>
  );
}

export default App;
