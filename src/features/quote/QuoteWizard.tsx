import React from 'react';
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
    const { state, updateState, nextStep, prevStep, goToStep, calculatePrice } = useQuote();

    const commonCardClass = `bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl`;

    const renderContent = () => {
        switch (state.step) {
            case AppStep.PROJECT_TYPE:
                return <StepProjectType selectedType={state.projectType} onSelect={(val) => updateState('projectType', val)} onNext={nextStep} />;
            case AppStep.HOME_DETAILS:
                return <StepHomeDetails state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />;
            case AppStep.SCOPE:
                return <StepScope state={state} updateState={updateState} onNext={nextStep} onPrev={prevStep} />;
            case AppStep.PAINT_SELECTION:
                return (
                    <StepPaintSelection
                        selectedPaintIds={state.selectedPaintIds}
                        onSelect={(val) => updateState('selectedPaintIds', val)}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case AppStep.QUOTE:
                return <StepQuote state={state} totalPrice={calculatePrice()} onEdit={() => goToStep(AppStep.PROJECT_TYPE)} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">

            {/* Sayfa Başlığı (Admin Paneli Standardı) */}
            <div className="mb-10">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Yeni Teklif Oluştur</h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Müşteri için adım adım fiyat hesaplama sihirbazı.</p>
            </div>

            {/* Stepper */}
            <Stepper currentStep={state.step} onStepClick={goToStep} />

            {/* İçerik Alanı */}
            <div className={`${commonCardClass} rounded-2xl p-6 md:p-8 relative overflow-hidden`}>
                {/* Dekoratif Arka Plan Efektleri */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/5 dark:bg-blue-400/10 blur-[80px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-400/5 dark:bg-indigo-400/10 blur-[80px] rounded-full" />

                <div className="relative z-10">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};