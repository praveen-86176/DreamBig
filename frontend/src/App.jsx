import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import {
  Camera, Upload, History as HistoryIcon, Moon, Sun, Leaf,
  Flame, Dna, Wheat, Droplets, Share2, X, ChevronLeft,
  ScanLine, CheckCircle2, AlertCircle, ChefHat, AlertTriangle,
  Tag, Sparkles, Scale
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

/* --- Configuration --- */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/* --- Visual Assets --- */

const BackgroundBlobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-40 dark:opacity-20 transition-opacity duration-1000">
    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-primary/20 rounded-full blur-[100px] mix-blend-multiply filter animate-pulse-slow"></div>
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-multiply filter animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
  </div>
);

const StepCard = ({ icon: Icon, title, desc, delay }) => (
  <div
    className="n-card p-4 flex flex-col items-center text-center animate-slide-up hover:border-brand-primary/50 transition-all duration-300"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="w-10 h-10 bg-[var(--bg-card-hover)] rounded-full flex items-center justify-center mb-3 text-brand-primary">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="font-bold text-[var(--text-main)] mb-1 text-sm">{title}</h3>
    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
  </div>
);

const Navbar = ({ toggleTheme, isDark, onOpenHistory }) => (
  <nav className="w-full h-14 border-b border-[var(--border-light)] flex items-center justify-between px-4 md:px-8 bg-[var(--bg-page)]/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.reload()}>
      <div className="relative">
        <Leaf className="w-5 h-5 text-brand-primary group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
        <div className="absolute inset-0 bg-brand-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <span className="text-lg font-bold tracking-tight text-[var(--text-main)]">Nutri<span className="text-brand-primary">Veda</span></span>
    </div>
    <div className="flex items-center gap-2">
      <button onClick={toggleTheme} className="n-btn-ghost p-1.5 hover:bg-[var(--bg-card-hover)] rounded-full transition-all">
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
      <button onClick={onOpenHistory} className="n-btn-ghost p-1.5 hover:bg-[var(--bg-card-hover)] rounded-full transition-all">
        <HistoryIcon className="w-4 h-4" />
      </button>
    </div>
  </nav>
);

/* Drawer for Activity */
const HistoryDrawer = ({ isOpen, onClose, history, onSelect }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-sm h-full bg-[var(--bg-page)] border-l border-[var(--border-light)] shadow-2xl p-4 overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-[var(--bg-page)] py-2 z-20 border-b border-[var(--border-light)]">
          <h2 className="text-xl font-bold text-[var(--text-main)]">Your Activity</h2>
          <button onClick={onClose} className="n-btn-ghost hover:rotate-90 transition-transform duration-300"><X className="w-5 h-5" /></button>
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-[var(--text-muted)] animate-fade-in">
            <div className="w-12 h-12 bg-[var(--bg-card-hover)] rounded-full flex items-center justify-center mb-4">
              <HistoryIcon className="w-6 h-6 opacity-40" />
            </div>
            <p className="text-sm">No meals scanned yet.</p>
          </div>
        ) : (
          <div className="space-y-3 pb-8">
            {history.map((meal, idx) => (
              <div
                key={meal._id}
                onClick={() => { onSelect(meal); onClose(); }}
                className="n-card p-0 overflow-hidden cursor-pointer hover:border-brand-primary hover:scale-[1.01] active:scale-[0.99] animate-slide-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Food Image */}
                {meal.imageUrl && (
                  <div className="w-full h-32 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 relative overflow-hidden">
                    <img
                      src={`${API_URL}${meal.imageUrl}`}
                      alt={meal.analysis.foodName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl">${meal.analysis.emoji || '🍽️'}</div>`;
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">{meal.analysis.category || 'Food'}</span>
                    </div>
                  </div>
                )}

                {/* Meal Info */}
                <div className="p-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--text-main)] truncate text-sm">{meal.analysis.foodName}</h3>
                    <p className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                      {new Date(meal.createdAt).toLocaleDateString()} • {new Date(meal.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-brand-primary text-sm">{meal.analysis.calories}</span>
                    <span className="text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-wider">kcal</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* Camera Modal */
const CameraModal = ({ isOpen, onClose, onCapture }) => {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(null);

  const triggerCapture = useCallback(() => {
    setCountdown(3);
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
      setCountdown(null);
    }
  }, [countdown, onCapture]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in">
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors p-2 bg-zinc-900 rounded-full z-10">
        <X className="w-5 h-5" />
      </button>

      <div className="w-full max-w-md p-4 flex flex-col items-center gap-4 relative">
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-800 bg-black">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }}
            className="w-full h-full object-cover"
          />

          {/* Crosshair Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-white/30 rounded-xl flex items-center justify-center relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-primary -mt-0.5 -ml-0.5"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-primary -mt-0.5 -mr-0.5"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-primary -mb-0.5 -ml-0.5"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-primary -mb-0.5 -mr-0.5"></div>

              {countdown !== null && countdown > 0 && (
                <div className="text-6xl font-black text-white drop-shadow-lg animate-ping">
                  {countdown}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={triggerCapture}
            className="group w-16 h-16 rounded-full bg-white border-2 border-zinc-900 ring-2 ring-brand-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20"
          >
            <div className="w-12 h-12 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-black" />
            </div>
          </button>
        </div>

        <p className="text-zinc-500 text-xs font-medium">Tap button to capture</p>
      </div>
    </div>
  );
};


/* --- Dashboard Components --- */

const IngredientPill = ({ name }) => (
  <span className="px-2 py-1 rounded-md bg-[var(--bg-card-hover)] border border-[var(--border-light)] text-xs text-[var(--text-main)] font-medium hover:border-brand-primary hover:text-brand-primary transition-colors cursor-default select-none animate-slide-up">
    {name}
  </span>
);

const MacroBar = ({ label, value, max, color, unit }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{label}</span>
        <span className="text-xs font-bold text-[var(--text-main)]">{value}{unit} <span className="text-[9px] text-[var(--text-muted)] font-normal hidden xl:inline">/ {max}{unit}</span></span>
      </div>
      <div className="h-2 w-full bg-[var(--bg-card-hover)] rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-white/20 sheen-effect"></div>
        </div>
      </div>
    </div>
  );
};

const AnalysisDashboard = ({ data, imagePreview, onBack }) => {
  if (!data) return null;
  const { foodName, servingSize, calories, macros, micros, ingredients, category, score, emoji, shortDescription } = data.analysis;

  // Chart Data
  const chartData = [
    { name: 'Carbs', value: macros.carbs, color: '#fbbf24' },
    { name: 'Protein', value: macros.protein, color: '#3b82f6' },
    { name: 'Fat', value: macros.fat, color: '#ef4444' },
  ];

  return (
    <div className="animate-slide-up w-full pb-10 pt-4 relative z-10 max-w-6xl mx-auto">

      {/* Top Navigation */}
      <button onClick={onBack} className="mb-4 flex items-center gap-2 group text-[var(--text-muted)] hover:text-brand-primary transition-colors font-medium text-sm">
        <div className="p-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-light)] group-hover:border-brand-primary transition-colors"><ChevronLeft className="w-3 h-3" /></div>
        <span className="group-hover:translate-x-1 transition-transform">Back to Scanner</span>
      </button>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

        {/* Left Col: Image & Key Stats (4 cols) */}
        <div className="md:col-span-5 lg:col-span-4 space-y-5">
          {/* Image Card */}
          <div className="n-card p-2 overflow-hidden bg-[var(--bg-card)] shadow-lg">
            <div className="relative group overflow-hidden rounded-lg">
              {imagePreview ? (
                <img src={imagePreview} alt={foodName} className="w-full h-48 sm:h-56 object-cover transform group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-48 sm:h-56 bg-[var(--bg-card-hover)] flex items-center justify-center text-6xl animate-pulse-slow">
                  {emoji}
                </div>
              )}
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-bold border border-white/10 shadow-lg">
                {servingSize}
              </div>
            </div>

            <div className="p-3 pt-4">
              <h1 className="text-2xl font-black text-[var(--text-main)] leading-tight mb-1 tracking-tight">{foodName}</h1>
              <p className="text-base text-brand-primary font-bold mb-3 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-brand-primary" /> {calories} <span className="text-xs font-medium text-[var(--text-muted)]">kcal</span>
              </p>
              <div className="bg-[var(--bg-card-hover)] p-3 rounded-lg border-l-2 border-brand-primary shadow-sm">
                <p className="text-xs text-[var(--text-main)] italic leading-relaxed">
                  "{shortDescription || 'A delicious and nutritious meal analyzed by NutriVeda.'}"
                </p>
              </div>
            </div>
          </div>

          {/* Health Score Card */}
          <div className="n-card p-4 flex flex-col items-center text-center relative overflow-hidden group">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2 bg-[var(--bg-card-hover)] px-2 py-1 rounded">Health Score</span>

            <div className="relative w-24 h-24 flex items-center justify-center mb-3">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="42" stroke="var(--bg-card-hover)" strokeWidth="6" fill="transparent" />
                <circle cx="48" cy="48" r="42" stroke={score > 70 ? '#10b981' : score > 40 ? '#f59e0b' : '#ef4444'} strokeWidth="6" fill="transparent" strokeDasharray="264" strokeDashoffset={264 - (264 * score) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-[var(--text-main)]">{score}</span>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${category === 'Healthy' ? 'border-green-500 text-green-500 bg-green-500/10' :
              category === 'Balanced' ? 'border-blue-500 text-blue-500 bg-blue-500/10' :
                category === 'Moderate' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' :
                  'border-red-500 text-red-500 bg-red-500/10'
              }`}>
              {category}
            </div>
          </div>
        </div>

        {/* Right Col: Bools, Macros, Ingredients (8 cols) */}
        <div className="md:col-span-7 lg:col-span-8 space-y-5">

          {/* Macro Breakdown Section */}
          <div className="n-card p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl"></div>

            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2 mb-6">
              <ScanLine className="w-5 h-5 text-brand-primary" /> Nutritional Breakdown
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              {/* Chart */}
              <div className="h-40 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={6}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-light)', borderRadius: '8px', padding: '6px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }}
                      formatter={(value) => [`${value}g`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider mb-0.5">Calories</span>
                  <span className="text-2xl font-black text-[var(--text-main)]">{calories}</span>
                </div>
              </div>

              {/* Detailed Bars */}
              <div className="space-y-4">
                <MacroBar label="Protein" value={macros.protein} max={50} color="#3b82f6" unit="g" />
                <MacroBar label="Carbs" value={macros.carbs} max={100} color="#fbbf24" unit="g" />
                <MacroBar label="Fats" value={macros.fat} max={40} color="#ef4444" unit="g" />

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border-light)] mt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-0.5">Fiber</span>
                    <span className="text-sm font-bold text-[var(--text-main)]">{macros.fiber || '0'}g</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-0.5">Sugar</span>
                    <span className="text-sm font-bold text-[var(--text-main)]">{macros.sugar || '0'}g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients & Micros Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Ingredients */}
            <div className="n-card p-5 h-full">
              <h3 className="text-base font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                <Wheat className="w-4 h-4 text-amber-500" /> Ingredients
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {ingredients && ingredients.length > 0 ? (
                  ingredients.map((ing, idx) => (
                    <IngredientPill key={idx} name={ing} />
                  ))
                ) : (
                  <span className="text-[var(--text-muted)] italic text-xs">No specific ingredients detected.</span>
                )}
              </div>
            </div>

            {/* Micros */}
            <div className="n-card p-5 h-full">
              <h3 className="text-base font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-400" /> Key Nutrients
              </h3>
              <div className="space-y-3">
                {micros && Object.entries(micros).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center bg-[var(--bg-card-hover)] px-3 py-2 rounded-lg">
                    <span className="text-xs font-bold text-[var(--text-muted)] uppercase">{key}</span>
                    <span className="text-xs font-black text-[var(--text-main)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Enhanced Features Row */}
          {(data.analysis.healthWarnings?.length > 0 || data.analysis.dietaryTags?.length > 0 || data.analysis.benefits?.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">

              {/* Health Warnings */}
              {data.analysis.healthWarnings && data.analysis.healthWarnings.length > 0 && (
                <div className="n-card p-4 border-l-4 border-red-500">
                  <h3 className="text-sm font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" /> Warnings
                  </h3>
                  <div className="space-y-2">
                    {data.analysis.healthWarnings.map((warning, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{warning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Tags */}
              {data.analysis.dietaryTags && data.analysis.dietaryTags.length > 0 && (
                <div className="n-card p-4 border-l-4 border-blue-500">
                  <h3 className="text-sm font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-500" /> Dietary Info
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {data.analysis.dietaryTags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-full border border-blue-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {data.analysis.benefits && data.analysis.benefits.length > 0 && (
                <div className="n-card p-4 border-l-4 border-green-500">
                  <h3 className="text-sm font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-500" /> Benefits
                  </h3>
                  <div className="space-y-2">
                    {data.analysis.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cooking Method & Portion Advice */}
          {(data.analysis.cookingMethod || data.analysis.portionAdvice) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
              {data.analysis.cookingMethod && (
                <div className="n-card p-4">
                  <h3 className="text-sm font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" /> Cooking Method
                  </h3>
                  <p className="text-base font-bold text-brand-primary">{data.analysis.cookingMethod}</p>
                </div>
              )}

              {data.analysis.portionAdvice && (
                <div className="n-card p-4">
                  <h3 className="text-sm font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-purple-500" /> Portion Size
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">{data.analysis.portionAdvice}</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/* --- Main App --- */

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [cameraOpen, setCameraOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDark]);

  useEffect(() => {
    if (loading) {
      const timer1 = setTimeout(() => setLoadingStep(1), 500);
      const timer2 = setTimeout(() => setLoadingStep(2), 2500);
      const timer3 = setTimeout(() => setLoadingStep(3), 6000);
      return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
    } else {
      setLoadingStep(0);
    }
  }, [loading]);

  const toggleTheme = () => setIsDark(!isDark);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/analyze/history`);
      if (!res.ok) throw new Error("Connection failed");
      const json = await res.json();
      if (json.success) setHistoryData(json.data);
    } catch (e) { console.warn("Offline or backend unavailable"); }
  };

  const uploadFile = async (file) => {
    if (!file) return;

    setError(null);
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${API_URL}/api/analyze`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error("Server error");

      const result = await res.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error("Analysis failed to return data");
      }
    } catch (e) {
      console.error(e);
      setError("We couldn't analyze that image. Please check your connection and try again.");
      setImagePreview(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileInput = (event) => uploadFile(event.target.files[0]);

  const handleCameraCapture = (imageSrc) => {
    setCameraOpen(false);
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
          uploadFile(file);
        });
    }
  };

  const handleBack = () => {
    setData(null);
    setImagePreview(null);
    setError(null);
  };

  return (
    <div className="min-h-screen text-[var(--text-main)] transition-colors duration-500 relative bg-[var(--bg-page)] scroll-smooth overflow-x-hidden">
      <BackgroundBlobs />
      <Navbar toggleTheme={toggleTheme} isDark={isDark} onOpenHistory={() => { fetchHistory(); setHistoryOpen(true); }} />

      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={historyData}
        onSelect={(meal) => { setData(meal); setImagePreview(null); setError(null); }}
      />

      <CameraModal
        isOpen={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Error Toast */}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white px-5 py-2.5 rounded-full shadow-xl z-[60] flex items-center gap-2 animate-slide-up backdrop-blur-md">
          <AlertCircle className="w-4 h-4" />
          <span className="font-medium text-xs sm:text-sm">{error}</span>
          <button onClick={() => setError(null)} className="ml-1 hover:bg-white/20 rounded-full p-0.5"><X className="w-4 h-4" /></button>
        </div>
      )}

      <main className="p-4 sm:p-6 lg:p-8 w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative z-10">

        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-10 animate-fade-in text-center py-10 scale-90 sm:scale-100">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-[var(--border-light)] rounded-full opacity-30"></div>
              <div className="absolute inset-0 border-4 border-t-brand-primary rounded-full animate-spin"></div>
              <div className="absolute inset-3 border-4 border-t-blue-500 rounded-full animate-spin-reverse opacity-70"></div>

              <div className="absolute inset-0 flex items-center justify-center transition-all duration-500">
                {loadingStep === 0 && <Upload className="w-10 h-10 text-[var(--text-muted)] animate-bounce" />}
                {loadingStep === 1 && <ScanLine className="w-10 h-10 text-brand-primary animate-pulse" />}
                {loadingStep >= 2 && <ChefHat className="w-10 h-10 text-orange-500 animate-bounce" />}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-light text-[var(--text-main)]">
                {loadingStep === 0 && "Uploading..."}
                {loadingStep === 1 && "Scanning Food..."}
                {loadingStep === 2 && "Calculating Macros..."}
                {loadingStep === 3 && "Finalizing..."}
              </h2>
              <div className="flex gap-2 justify-center">
                <span className={`h-2 rounded-full transition-all duration-500 ${loadingStep >= 0 ? 'w-6 bg-brand-primary' : 'w-1.5 bg-[var(--border-light)]'}`}></span>
                <span className={`h-2 rounded-full transition-all duration-500 ${loadingStep >= 1 ? 'w-6 bg-brand-primary' : 'w-1.5 bg-[var(--border-light)]'}`}></span>
                <span className={`h-2 rounded-full transition-all duration-500 ${loadingStep >= 2 ? 'w-6 bg-brand-primary' : 'w-1.5 bg-[var(--border-light)]'}`}></span>
                <span className={`h-2 rounded-full transition-all duration-500 ${loadingStep >= 3 ? 'w-6 bg-brand-primary' : 'w-1.5 bg-[var(--border-light)]'}`}></span>
              </div>
            </div>
          </div>
        ) : !data ? (
          <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
            {/* Hero Section with Image */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-6 px-4">
              {/* Left: Text Content - 3 cols */}
              <div className="text-center lg:text-left space-y-6 animate-fade-in order-2 lg:order-1 lg:col-span-3">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider animate-slide-up">
                    <CheckCircle2 className="w-3 h-3" /> AI-Powered Nutrition
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[var(--text-main)] leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Know Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-500">Food.</span>
                  </h1>
                  <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto lg:mx-0 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Instant nutritional analysis. Detailed macro breakdown.
                    <br className="hidden sm:block" />Just snap a photo and let our AI do the rest.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileInput} />

                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="group w-full sm:w-48 h-14 n-card hover:border-brand-primary flex items-center justify-center gap-3 hover:bg-[var(--bg-card-hover)] transition-all shadow-lg hover:shadow-brand-primary/10"
                  >
                    <div className="w-7 h-7 bg-[var(--bg-page)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Upload className="w-4 h-4 text-brand-primary" />
                    </div>
                    <span className="font-bold text-sm text-[var(--text-main)]">Upload Image</span>
                  </button>

                  <button
                    onClick={() => setCameraOpen(true)}
                    className="group w-full sm:w-48 h-14 bg-brand-primary text-black rounded-3xl flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/30 transform hover:scale-[1.02]"
                  >
                    <div className="w-7 h-7 bg-black/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-bold text-sm">Open Camera</span>
                  </button>
                </div>
              </div>

              {/* Right: Hero Image - 2 cols, SMALL */}
              <div className="relative animate-slide-up order-1 lg:order-2 lg:col-span-2" style={{ animationDelay: '0.2s' }}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[var(--border-light)] max-w-[280px] mx-auto">
                  <img
                    src="/hero-food.png"
                    alt="Healthy food"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 bg-brand-primary text-black px-3 py-1 rounded-full font-bold text-xs shadow-lg animate-bounce">
                  🥗 Healthy
                </div>
                <div className="absolute -bottom-2 -left-2 bg-blue-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
                  🍛 Balanced
                </div>
              </div>
            </div>

            {/* Awareness + Features - Two Rows */}
            <div className="w-full max-w-6xl px-4 space-y-4">
              {/* Awareness Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="n-card p-5 text-center hover:border-brand-primary transition-all">
                  <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">💪</span>
                  </div>
                  <h3 className="font-bold text-base text-[var(--text-main)] mb-2">Better Health</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">Make informed choices and improve wellness</p>
                </div>

                <div className="n-card p-5 text-center hover:border-brand-primary transition-all">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="font-bold text-base text-[var(--text-main)] mb-2">Reach Goals</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">Track macros for fitness goals</p>
                </div>

                <div className="n-card p-5 text-center hover:border-brand-primary transition-all">
                  <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">🧠</span>
                  </div>
                  <h3 className="font-bold text-base text-[var(--text-main)] mb-2">Learn & Grow</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">Develop healthier eating habits</p>
                </div>
              </div>

              {/* Features Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StepCard
                  icon={Camera}
                  title="1. Snap"
                  desc="Take a photo of your meal or upload from your gallery."
                  delay={0.4}
                />
                <StepCard
                  icon={ScanLine}
                  title="2. Analyze"
                  desc="Our AI identifies ingredients and calculates nutritional values."
                  delay={0.5}
                />
                <StepCard
                  icon={CheckCircle2}
                  title="3. Track"
                  desc="Get instant macros, calories, and health insights."
                  delay={0.6}
                />
              </div>
            </div>
          </div>
        ) : (
          <AnalysisDashboard data={data} imagePreview={imagePreview} onBack={handleBack} />
        )}

      </main>
    </div>
  );
}

export default App;
