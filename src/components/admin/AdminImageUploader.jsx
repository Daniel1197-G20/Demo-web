import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, RefreshCw, Check, Sparkles, AlertCircle } from 'lucide-react';

const SAMPLE_BAKERY_IMAGES = [
  { name: 'Celebration Cake', url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&auto=format&fit=crop&q=80' },
  { name: 'Luxury Tiered Cake', url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=1000&auto=format&fit=crop&q=80' },
  { name: 'Dark Chocolate Cake', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&auto=format&fit=crop&q=80' },
  { name: 'Gourmet Cupcakes', url: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=1000&auto=format&fit=crop&q=80' },
  { name: 'Butter Croissants', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&auto=format&fit=crop&q=80' },
  { name: 'Dessert Parfait', url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1000&auto=format&fit=crop&q=80' },
  { name: 'Luxury Hamper', url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=1000&auto=format&fit=crop&q=80' },
];

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export default function AdminImageUploader({
  image,
  onChange,
  label = 'Product Image',
  helperText = 'Upload a clear, high-resolution photo of your treat (PNG, JPG, WebP up to 5MB).',
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const processFile = (file) => {
    setErrorMessage('');
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage('Image size exceeds 5MB. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result);
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file. Please try another.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleRemove = () => {
    onChange('');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#2B2024] flex items-center gap-1">
          <span>{label}</span>
          <span className="text-[#E82C7C]">*</span>
        </label>
        <button
          type="button"
          onClick={() => {
            setShowSamples(!showSamples);
            setErrorMessage('');
          }}
          className="text-xs font-bold text-[#E82C7C] hover:underline flex items-center gap-1 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{showSamples ? 'Close Samples' : 'Select Bakery Preset'}</span>
        </button>
      </div>

      {/* Sample Image Picker Drawer */}
      {showSamples && (
        <div className="p-3.5 bg-[#FFF5F8] rounded-2xl border border-[#FCE4EC] mb-2 space-y-2 animate-fadeIn">
          <span className="text-[11px] font-bold text-[#7A6B70] uppercase tracking-wider block">
            Click a sample treat photo to use as preview:
          </span>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 custom-scrollbar">
            {SAMPLE_BAKERY_IMAGES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(sample.url);
                  setErrorMessage('');
                  setShowSamples(false);
                }}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-transform hover:scale-105 ${
                  image === sample.url ? 'border-[#E82C7C] ring-2 ring-[#FCE4EC]' : 'border-white'
                }`}
                title={sample.name}
              >
                <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
                {image === sample.url && (
                  <div className="absolute inset-0 bg-[#E82C7C]/70 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error message banner */}
      {errorMessage && (
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        className="hidden"
        id="admin-image-file-input"
      />

      {/* Image Preview or Drop Zone */}
      {image ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#F7DCE5] bg-white p-2.5 shadow-xs">
          <div className="aspect-[16/10] sm:aspect-[2/1] rounded-xl overflow-hidden bg-[#FFF5F8] relative group">
            <img src={image} alt="Product Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-full bg-white text-xs font-bold text-[#2B2024] hover:bg-[#FFF5F8] flex items-center gap-1.5 shadow-md transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#E82C7C]" />
                <span>Replace Photo</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 rounded-full bg-white text-[#E82C7C] hover:bg-rose-50 shadow-md transition-colors"
                aria-label="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 pt-2.5 text-xs">
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Image ready for publication</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[#E82C7C] font-bold hover:underline text-xs flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Replace</span>
              </button>
              <span className="text-stone-300">•</span>
              <button
                type="button"
                onClick={handleRemove}
                className="text-rose-600 font-bold hover:underline text-xs flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all duration-200 flex flex-col items-center justify-center ${
            isDragging
              ? 'border-[#E82C7C] bg-[#FFF5F8] scale-[1.01]'
              : 'border-[#F7DCE5] bg-[#FFF5F8]/40 hover:bg-[#FFF5F8] hover:border-[#E82C7C]'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C] shadow-xs mb-3">
            <UploadCloud className="w-6 h-6 stroke-[2.2px]" />
          </div>

          <h4 className="font-display font-bold text-sm text-[#2B2024]">
            Upload product image
          </h4>
          <p className="text-xs text-[#7A6B70] mt-1 max-w-xs leading-relaxed">
            Drag and drop your photo here, or <span className="text-[#E82C7C] font-bold underline">browse files</span>
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FCE4EC] text-[10px] font-bold text-[#7A6B70]">
            <ImageIcon className="w-3 h-3 text-[#E82C7C]" />
            <span>PNG, JPG or WebP up to 5MB</span>
          </span>
        </div>
      )}

      {helperText && <p className="text-[11px] text-[#7A6B70] leading-normal">{helperText}</p>}
    </div>
  );
}
