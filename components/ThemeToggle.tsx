'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('cv-theme');
        if (saved === 'light') {
            setIsDark(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggle = () => {
        const next = !isDark;
        setIsDark(next);
        if (next) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('cv-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('cv-theme', 'light');
        }
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-10 h-10 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full shadow-lg backdrop-blur-md border border-white/10 hover:border-gold-500/30 transition-all duration-300 cursor-pointer"
        >
            {isDark ? (
                <Sun className="w-4 h-4 text-gold-400" />
            ) : (
                <Moon className="w-4 h-4 text-purple-400" />
            )}
        </button>
    );
}
