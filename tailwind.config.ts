import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                slate: {
                    850: '#151e2c',
                    900: '#0f172a',
                    950: '#020617',
                },
                gold: {
                    DEFAULT: '#F59E0B',
                    50: '#FFF8E1',
                    100: '#FFECB3',
                    200: '#FFD54F',
                    300: '#FFC107',
                    400: '#FFB300',
                    500: '#F59E0B',
                    600: '#F59E0B',
                    700: '#D97706',
                    glow: 'rgba(245, 158, 11, 0.2)',
                },
                purple: {
                    DEFAULT: '#8B5CF6',
                    50: '#F5F3FF',
                    100: '#EDE9FE',
                    200: '#DDD6FE',
                    300: '#C4B5FD',
                    400: '#A78BFA',
                    500: '#8B5CF6',
                    600: '#7C3AED',
                    700: '#6D28D9',
                    glow: 'rgba(139, 92, 246, 0.2)',
                },
                primary: {
                    50: '#FFF8E1',
                    100: '#FFECB3',
                    400: '#FFB300',
                    500: '#F59E0B',
                    600: '#D97706',
                    700: '#B45309',
                    900: '#78350F',
                },
            },
            fontFamily: {
                heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
                sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'grid-flow': 'gridFlow 20s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.15), 0 0 40px rgba(139, 92, 246, 0.1)' },
                    '50%': { boxShadow: '0 0 30px rgba(245, 158, 11, 0.25), 0 0 60px rgba(139, 92, 246, 0.2)' },
                },
                gridFlow: {
                    '0%': { backgroundPosition: '0 0' },
                    '100%': { backgroundPosition: '60px 60px' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'tech-grid': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23F59E0B' stroke-opacity='0.06' stroke-width='0.5'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            },
        },
    },
    plugins: [],
} satisfies Config;
