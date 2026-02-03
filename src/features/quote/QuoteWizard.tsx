// src/features/quote/QuoteWizard.tsx

import React from 'react';
import { AppStep } from '../../types';
import { useQuote } from '../../hooks/useQuote';
import { Stepper } from '../../components/Stepper';
import { STEPS } from '../../constants';
// DÜZELTME: RotateCcw importu eklendi
import { RotateCcw } from 'lucide-react';

// Adım Bileşenleri
import { StepServiceCategory } from './StepServiceCategory';
import { StepProjectType } from './StepProjectType';
import { StepHomeDetails } from './StepHomeDetails';
import { StepScope } from './StepScope';
import { StepPaintSelection } from './StepPaintSelection';
import { StepQuote } from './StepQuote';
import { StepCustomerInfo } from './StepCustomerInfo';

export const QuoteWizard: React.FC = () => {
    // DÜZELTME: resetState eklendi
    const { state, updateState, nextStep, prevStep, goToStep, calculatePrice, resetState } = useQuote();

    const commonCardClass = `bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl`;

    // --- 1. ADIMLARI FİLTRELEME MANTIĞI ---
    const getVisibleSteps = () => {
        if (state.mainCategory === 'Malzeme') {
            return STEPS.filter(step =>
                step.id === AppStep.PAINT_SELECTION ||
                step.id === AppStep.QUOTE
            );
        }
        return STEPS;
    };

    const visibleSteps = getVisibleSteps();

    // --- YARDIMCI FONKSİYONLAR ---
    const toggleProjectDetail = (detail: string) => {
        const currentDetails = state.projectDetails || [];
        if (currentDetails.includes(detail)) {
            updateState('projectDetails', currentDetails.filter(d => d !== detail));
        } else {
            updateState('projectDetails', [...currentDetails, detail]);
        }
    };

    const handleProjectTypeChange = (val: any) => {
        updateState('projectType', val);
        updateState('projectDetails', []);
    };

    // --- 2. İÇERİK RENDER FONKSİYONU ---
    const renderContent = () => {
        switch (state.step) {
            case AppStep.CUSTOMER_INFO:
                return (
                    <StepCustomerInfo
                        customer={state.customer}
                        onChange={(key, val) => {
                            updateState('customer', {
                                ...(state.customer || {}),
                                [key]: val
                            });
                        }}
                        onNext={nextStep}
                    />
                );

            case AppStep.CATEGORY:
                return (
                    <StepServiceCategory
                        selectedMain={state.mainCategory}
                        selectedSubs={state.subCategory || []}
                        onSelectMain={(val) => updateState('mainCategory', val)}
                        onSelectSub={(val) => updateState('subCategory', val)}
                        onNext={() => {
                            // NAVİGASYON MANTIĞI:
                            if (state.mainCategory === 'Malzeme') {
                                // Malzeme ise direkt Boya/Ürün Seçimine atla (Aradakileri geç)
                                goToStep(AppStep.PAINT_SELECTION);
                            } else {
                                // Taahhüt ise sıradaki adıma git
                                nextStep();
                            }
                        }}
                    />
                );

            case AppStep.PROJECT_TYPE:
                return (
                    <StepProjectType
                        selectedType={state.projectType}
                        selectedDetails={state.projectDetails || []}
                        onSelectType={handleProjectTypeChange}
                        onToggleDetail={toggleProjectDetail}
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
                        // PROPS EKLENDİ
                        selectedPaints={state.selectedPaints}
                        onSelect={(val) => updateState('selectedPaints', val)}
                        onNext={nextStep}
                        onPrev={() => {
                            // GERİ GİTME MANTIĞI:
                            if (state.mainCategory === 'Malzeme') {
                                // Malzeme ise direkt Kategoriye geri dön
                                goToStep(AppStep.CATEGORY);
                            } else {
                                // Değilse bir önceki adıma git
                                prevStep();
                            }
                        }}
                    />
                );

            case AppStep.QUOTE:
                return (
                    <StepQuote
                        state={state}
                        totalPrice={calculatePrice()}
                        onEdit={() => {
                            // DÜZENLEME MANTIĞI:
                            if (state.mainCategory === 'Malzeme') {
                                goToStep(AppStep.CATEGORY);
                            } else {
                                goToStep(AppStep.PROJECT_TYPE);
                            }
                        }}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">

            {/* Başlık Alanı */}
            <div className="mb-10 flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Yeni Teklif Oluştur</h1>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Müşteri için adım adım fiyat hesaplama sihirbazı.</p>
                </div>

                {state.step > AppStep.CUSTOMER_INFO && (
                    <button
                        onClick={() => {
                            if (confirm('Tüm ilerlemeniz silinecek ve başa döneceksiniz using. Emin misiniz?')) {
                                resetState();
                            }
                        }}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-3 py-1.5 rounded-lg transition-all"
                        title="Baştan Başla"
                    >
                        <RotateCcw size={14} />
                        Sıfırla
                    </button>
                )}
            </div>

            {/* Stepper Alanı */}
            {/* Müşteri bilgisi ve Kategori seçimi girildikten sonra göster */}
            {state.step > AppStep.CATEGORY && (
                <Stepper
                    currentStep={state.step}
                    onStepClick={goToStep}
                    steps={visibleSteps} // Filtrelenmiş adımları gönderiyoruz
                />
            )}

            {/* İçerik Kartı */}
            <div className={`${commonCardClass} rounded-2xl p-6 md:p-8 relative overflow-hidden`}>
                {/* Dekoratif Arka Plan */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/5 dark:bg-blue-400/10 blur-[80px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-400/5 dark:bg-indigo-400/10 blur-[80px] rounded-full" />

                <div className="relative z-10">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};