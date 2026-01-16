import React from 'react';
import { Paintbrush } from 'lucide-react';
import { AppStep } from '../../types';
import { useQuote } from '../../hooks/useQuote';
import { Stepper } from '../../components/Stepper';

// Adım Bileşenleri
import { StepProjectType } from './StepProjectType';
import { StepHomeDetails } from './StepHomeDetails';
import { StepScope } from './StepScope';
import { StepPaintSelection } from './StepPaintSelection';
import { StepQuote } from './StepQuote';

export const QuoteWizard: React.FC = () => {
    // Hook'u artık burada çağırıyoruz
    const { state, updateState, nextStep, prevStep, goToStep, calculatePrice } = useQuote();

    const commonCardClass = `bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white dark:border-slate-800 transition-all duration-500 shadow-xl`;

    const renderContent = () => {
        switch (state.step) {
            case AppStep.PROJECT_TYPE:
                return (
                    <StepProjectType
                        selectedType={state.projectType}
                        onSelect={(val) => updateState('projectType', val)}
                        onNext={nextStep}
                    />
                );
            case AppStep.HOME_DETAILS:
                return (
                    <StepHomeDetails
                        state={state}
                        updateState={updateState}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case AppStep.SCOPE:
                return (
                    <StepScope
                        state={state}
                        updateState={updateState}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case AppStep.PAINT_SELECTION:
                return (
                    <StepPaintSelection
                        selectedQuality={state.paintQuality}
                        onSelect={(val) => updateState('paintQuality', val)}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case AppStep.QUOTE:
                return (
                    <StepQuote
                        state={state}
                        totalPrice={calculatePrice()}
                        onEdit={() => goToStep(AppStep.PROJECT_TYPE)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
            {/* Header */}
            <header className="flex flex-col items-center mb-12">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Paintbrush size={18} />
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">ProTeklif</h1>
                </div>
                <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Boya Teklif Sistemi</p>
            </header>

            {/* Navigation Stepper */}
            <Stepper currentStep={state.step} onStepClick={goToStep} />

            {/* Main Content Area */}
            <main className={`${commonCardClass} rounded-[2rem] p-6 md:p-8 mt-4 relative overflow-hidden`}>
                {/* Arka plan efektleri */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/5 dark:bg-blue-400/10 blur-[80px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-400/5 dark:bg-indigo-400/10 blur-[80px] rounded-full" />

                <div className="relative z-10">
                    {renderContent()}
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-12 text-center text-[10px] text-gray-400 dark:text-slate-600 font-bold uppercase tracking-[0.2em] pb-8 flex flex-col items-center gap-3">
                <div className="flex items-center gap-6 opacity-60">
                    <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Koşullar</button>
                    <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Gizlilik</button>
                    <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Destek</button>
                </div>
                <p>© 2026 ProTeklif platformu</p>
            </footer>
        </div>
    );
};