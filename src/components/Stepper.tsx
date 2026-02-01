import React from 'react';
import { Check } from 'lucide-react';
import { AppStep } from '../types';
import { STEPS } from '../constants'; // /index demene gerek yok

interface StepperProps {
  currentStep: AppStep;
  onStepClick: (step: AppStep) => void;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick }) => {
  const totalSteps = STEPS.length;
  // Progress bar genişliği hesabı
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-4">
      <div className="relative flex items-center justify-between">
        {/* Arka Plan Çizgisi */}
        <div className="absolute top-[16px] left-0 w-full h-0.5 bg-gray-200/60 dark:bg-slate-700/50 rounded-full z-0 transition-colors duration-500" />
        
        {/* Aktif İlerleme Çizgisi */}
        <div 
          className="absolute top-[16px] left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 rounded-full z-0 transition-all duration-700 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />

        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isPending = currentStep < step.id;
          
          // DÜZELTME BURADA: İkonu render edilebilir bir değişkene alıyoruz
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center flex-1">
              <button
                onClick={() => !isPending && onStepClick(step.id)}
                disabled={isPending}
                className={`
                  group relative flex items-center justify-center w-8 h-8 rounded-xl border transition-all duration-500
                  ${isCompleted 
                    ? 'bg-green-500 border-green-500 text-white shadow shadow-green-100 dark:shadow-green-900/20 hover:scale-110 active:scale-95' 
                    : isActive 
                      ? 'bg-white dark:bg-slate-800 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 shadow shadow-blue-100 dark:shadow-blue-900/40 scale-110 ring-2 ring-blue-50 dark:ring-blue-900/20' 
                      : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-300 dark:text-slate-600 cursor-not-allowed'}
                `}
              >
                {/* Step Content (Numara veya Check İkonu) */}
                <div className="flex items-center justify-center transition-transform duration-300">
                  {isCompleted ? (
                    <Check size={16} strokeWidth={4} className="animate-in zoom-in duration-300" />
                  ) : (
                    <span className={`text-[11px] font-black ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-300 dark:text-slate-600'}`}>
                      {step.id + 1}
                    </span>
                  )}
                </div>

                {isActive && (
                  <div className="absolute -top-8 bg-blue-600 dark:bg-blue-500 text-white p-1 rounded-md shadow animate-bounce">
                    <StepIcon size={12} />
                    
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-500 rotate-45" />
                  </div>
                )}
              </button>

              {/* Label */}
              <div className="absolute top-10 text-center w-24">
                <span className={`
                  text-[9px] font-bold uppercase tracking-widest transition-all duration-500
                  ${isActive ? 'text-blue-700 dark:text-blue-400' : isCompleted ? 'text-green-600 dark:text-green-500' : 'text-gray-400 dark:text-slate-600'}
                `}>
                  {step.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};