import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
            const body = isLogin ? { email, password } : { name, email, password };

            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            // Success - pass user data to parent
            // If API didn't return user on signup (it should), fallback to local name
            const userData = data.user || { name: name, email: email };
            onLogin(userData);

        } catch (err) {
            console.error('Auth Error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Blobs (matching App.jsx) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30 dark:opacity-20">
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-primary/20 rounded-full blur-[100px] mix-blend-multiply filter animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-multiply filter animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-md relative z-10 animate-slide-up">
                {/* Header Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-primary to-emerald-300 shadow-lg shadow-emerald-500/20 mb-4 transform rotate-3">
                        <Leaf className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-[var(--text-main)] mb-2">
                        Nutri<span className="text-brand-primary">Veda</span>
                    </h1>
                    <p className="text-[var(--text-muted)] font-medium">
                        {isLogin ? 'Welcome back! Ready to track?' : 'Start your healthy journey today.'}
                    </p>
                </div>

                {/* Auth Card */}
                <div className="n-card p-8 backdrop-blur-xl bg-[var(--bg-card)]/80 border border-[var(--border-light)] transform transition-all duration-500 hover:shadow-2xl">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-center gap-2 animate-slide-up">
                            <span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            {error}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex p-1 bg-[var(--bg-card-hover)] rounded-xl mb-6 border border-[var(--border-light)]">
                        <button
                            onClick={() => { setIsLogin(true); setError(null); }}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${isLogin
                                ? 'bg-[var(--bg-card)] text-brand-primary shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); setError(null); }}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${!isLogin
                                ? 'bg-[var(--bg-card)] text-brand-primary shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-1 animate-fade-in">
                                <label className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-brand-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full bg-[var(--bg-card-hover)] text-[var(--text-main)] border-2 border-transparent focus:border-brand-primary/50 outline-none rounded-xl py-3 pl-12 pr-4 transition-all duration-300 placeholder:text-[var(--text-muted)]/50 focus:bg-[var(--bg-card)]"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-brand-primary transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="hello@example.com"
                                    className="w-full bg-[var(--bg-card-hover)] text-[var(--text-main)] border-2 border-transparent focus:border-brand-primary/50 outline-none rounded-xl py-3 pl-12 pr-4 transition-all duration-300 placeholder:text-[var(--text-muted)]/50 focus:bg-[var(--bg-card)]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-brand-primary transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[var(--bg-card-hover)] text-[var(--text-main)] border-2 border-transparent focus:border-brand-primary/50 outline-none rounded-xl py-3 pl-12 pr-4 transition-all duration-300 placeholder:text-[var(--text-muted)]/50 focus:bg-[var(--bg-card)]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-primary hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 transform transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                </div>

                <p className="text-center mt-8 text-sm text-[var(--text-muted)]">
                    By continuing, you agree to our{' '}
                    <a href="#" className="font-bold text-brand-primary hover:underline">Terms</a>
                    {' '}and{' '}
                    <a href="#" className="font-bold text-brand-primary hover:underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default Auth;
