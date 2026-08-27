import React, { useEffect } from 'react';
import { X, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export default function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  confirmVariant = 'primary', // 'primary' | 'danger'
  confirmLoading = false,
  maxWidth = 'max-w-lg',
  icon: Icon,
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2B2024]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${maxWidth} rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_20px_60px_rgba(232,44,124,0.15)] z-10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[#F7DCE5] bg-[#FFF5F8]/40">
          <div className="flex items-center gap-3">
            {Icon ? (
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C] shrink-0 shadow-xs">
                <Icon className="w-5 h-5" />
              </div>
            ) : null}
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#2B2024]">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-[#7A6B70] mt-0.5 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7A6B70] hover:text-[#2B2024] hover:bg-[#FFF5F8] transition-colors -mr-1"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 text-xs sm:text-sm text-[#2B2024]">
          {children}
        </div>

        {/* Footer Actions */}
        {(onConfirm || cancelText) && (
          <div className="p-4 sm:p-6 border-t border-[#F7DCE5] bg-[#FFF5F8]/60 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
            {cancelText && (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#F7DCE5] bg-white text-xs font-bold text-[#7A6B70] hover:text-[#2B2024] hover:bg-stone-50 transition-colors"
              >
                {cancelText}
              </button>
            )}

            {onConfirm && (
              <button
                type="button"
                disabled={confirmLoading}
                onClick={onConfirm}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                  confirmVariant === 'danger'
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-[#E82C7C] hover:bg-[#D31665] text-white shadow-[0_4px_12px_rgba(232,44,124,0.3)]'
                }`}
              >
                {confirmLoading ? 'Processing...' : confirmText || 'Confirm'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
