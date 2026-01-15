import React from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const AnalysisResult = ({ data }) => {
    if (!data) return null;

    const { foodItems, healthiness, explanation, recommendation } = data.analysis;

    // Determine styles based on healthiness
    const getHealthMeta = (status) => {
        switch (status?.toLowerCase()) {
            case 'healthy':
                return {
                    color: 'text-green-500 dark:text-green-400',
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    border: 'border-green-200 dark:border-green-800',
                    icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />
                };
            case 'moderately healthy':
                return {
                    color: 'text-yellow-600 dark:text-yellow-400',
                    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                    border: 'border-yellow-200 dark:border-yellow-800',
                    icon: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
                };
            case 'unhealthy':
                return {
                    color: 'text-red-500 dark:text-red-400',
                    bg: 'bg-red-50 dark:bg-red-900/20',
                    border: 'border-red-200 dark:border-red-800',
                    icon: <XCircleIcon className="w-6 h-6 text-red-500" />
                };
            default:
                return {
                    color: 'text-slate-500',
                    bg: 'bg-slate-50',
                    border: 'border-slate-200',
                    icon: null
                };
        }
    };

    const meta = getHealthMeta(healthiness);

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 animate-slide-up">

            {/* Header Summary Card */}
            <div className={`glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 ${meta.border.replace('border', 'border-l')}`}>
                <div className="flex-1 space-y-2">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                        Result
                    </h2>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
                        {foodItems.map((item, idx) => (
                            <span key={idx} className="bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl ${meta.bg} ${meta.border} border`}>
                    {meta.icon}
                    <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-wider opacity-60 text-slate-600 dark:text-slate-300">Verdict</p>
                        <p className={`text-xl font-bold ${meta.color}`}>{healthiness}</p>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Why this Result? */}
                <div className="glass-card p-6 md:p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-24 h-24 text-primary-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        📊 Nutritional Insight
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                        {explanation}
                    </p>
                </div>

                {/* Recommendation */}
                <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-white to-primary-50 dark:from-slate-800 dark:to-primary-900/10 relative">
                    <h3 className="text-lg font-bold text-primary-700 dark:text-primary-300 mb-4 flex items-center gap-2">
                        💡 Smart Suggestion
                    </h3>
                    <blockquote className="border-l-4 border-primary-400 pl-4 py-1">
                        <p className="text-slate-700 dark:text-slate-200 italic font-medium text-lg leading-relaxed">
                            "{recommendation}"
                        </p>
                    </blockquote>
                    <div className="mt-6 flex gap-2">
                        <button className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full font-semibold hover:bg-primary-200 transition-colors">
                            Save to Journal
                        </button>
                        <button className="text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full font-semibold hover:bg-slate-50 transition-colors">
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResult;
