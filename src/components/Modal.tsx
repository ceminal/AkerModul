import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Arka Plan (Backdrop) - Blur Efekti */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal İçeriği */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body (Form Alanı) */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {children}
                </div>

            </div>
        </div>,
        document.body // Portal Hedefi
    );
};