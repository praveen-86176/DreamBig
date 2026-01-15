import React, { useRef, useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'; // Updated icons

const ImageUpload = ({ onImageSelected, isLoading }) => {
    const [preview, setPreview] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) processFile(file);
    };

    const processFile = (file) => {
        // Basic validation
        if (!file.type.startsWith('image/')) return;

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            onImageSelected(file); // Parent handles the upload and loading state
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    return (
        <div className="w-full animate-fade-in">
            <div
                className={`
          glass-card
          relative overflow-hidden
          border-2 border-dashed
          transition-all duration-300 ease-out
          cursor-pointer
          p-6 md:p-12
          text-center
          group
          ${isDragOver
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-[1.02]'
                        : 'border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }
        `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {preview ? (
                    <div className="relative rounded-xl overflow-hidden shadow-2xl mx-auto max-w-sm">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />

                        {isLoading && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm z-10">
                                <div className="relative w-16 h-16">
                                    <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-500/30 rounded-full"></div>
                                    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary-500 rounded-full animate-spin"></div>
                                </div>
                                <p className="text-white font-medium mt-4 animate-pulse">Analyzing your meal...</p>
                            </div>
                        )}

                        {!isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 duration-300">
                                <p className="text-white font-semibold bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                                    Click to change
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 py-6">
                        <div className={`
              w-20 h-20 rounded-full flex items-center justify-center
              transition-colors duration-300
              ${isDragOver ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:text-primary-500 dark:group-hover:text-primary-400'}
            `}>
                            <CloudArrowUpIcon className="w-10 h-10" strokeWidth={1.5} />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                Upload Food Image
                            </h3>
                            <div className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                                <p>Drag & drop your file here, or click to browse.</p>
                                <p className="mt-1 text-xs opacity-70">Supports JPG, PNG, WEBP</p>
                            </div>
                        </div>

                        <button className="btn-primary py-2 px-6 rounded-lg text-sm shadow-none">
                            Choose File
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
