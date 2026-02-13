'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import {
    Printer,
    Mail,
    Briefcase,
    GraduationCap,
    Wrench,
    User,
    Globe,
    ExternalLink,
    MapPin,
    Phone,
    LinkIcon,
    Terminal,
    Cpu,
    Network,
    Server,
    Shield,
    Code,
    Cloud,
} from 'lucide-react';

interface CVRendererProps {
    markdown: string;
}

// Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
    }),
};

// Animated section wrapper
function AnimatedSection({ children, index = 0, className = '' }: { children: React.ReactNode; index?: number; className?: string }) {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Tech skill icons mapping
const techIcons: Record<string, React.ReactNode> = {
    'linux': <Terminal className="w-4 h-4" />,
    'windows': <Cpu className="w-4 h-4" />,
    'aws': <Cloud className="w-4 h-4" />,
    'docker': <Server className="w-4 h-4" />,
    'vpn': <Shield className="w-4 h-4" />,
    'networking': <Network className="w-4 h-4" />,
    'jira': <Code className="w-4 h-4" />,
};

export default function CVRenderer({ markdown }: CVRendererProps) {
    const handlePrint = () => {
        window.print();
    };

    const getSectionIcon = (text: any) => {
        const lower = String(text).toLowerCase();
        if (lower.includes('experience')) return <Briefcase className="w-5 h-5 text-gold-500" />;
        if (lower.includes('education')) return <GraduationCap className="w-5 h-5 text-gold-500" />;
        if (lower.includes('skills')) return <Wrench className="w-5 h-5 text-gold-500" />;
        if (lower.includes('summary') || lower.includes('profile')) return <User className="w-5 h-5 text-gold-500" />;
        if (lower.includes('contact')) return <Mail className="w-5 h-5 text-gold-500" />;
        return <Globe className="w-5 h-5 text-gold-500" />;
    };

    // Pick a relevant icon for contact lines
    const getContactIcon = (text: string) => {
        if (text.includes('📍')) return <MapPin className="w-4 h-4 text-gold-400" />;
        if (text.includes('📞')) return <Phone className="w-4 h-4 text-gold-400" />;
        if (text.includes('✉️')) return <Mail className="w-4 h-4 text-gold-400" />;
        if (text.includes('🔗')) return <LinkIcon className="w-4 h-4 text-gold-400" />;
        return null;
    };

    let sectionIndex = 0;

    return (
        <div className="relative min-h-screen pb-20">
            {/* Hero Gradient Background */}
            <div className="absolute top-0 left-0 right-0 h-[8rem] mesh-gradient -z-10 print:hidden">
                <div className="absolute inset-0 z-[2]" />
            </div>

            {/* Floating Print Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="fixed top-6 right-6 z-50 print:hidden"
            >
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full shadow-lg hover:shadow-gold-glow transform transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-gold-500/30 cursor-pointer"
                >
                    <Printer className="w-4 h-4" />
                    <span className="font-medium text-sm font-heading">Save as PDF</span>
                </button>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div
                    id="cv-content"
                    className="glass-card rounded-3xl shadow-2xl p-6 sm:p-8 md:p-14 cv-container animate-glow-pulse"
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // ─── Name / Title ───
                            h1: ({ children }) => (
                                <AnimatedSection index={0}>
                                    <div className="text-center mb-10 relative">
                                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-500 to-purple-400 pb-4 tracking-tight glow-text">
                                            {children}
                                        </h1>
                                        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-gold-500 to-purple-500 rounded-full mt-2" />
                                    </div>
                                </AnimatedSection>
                            ),

                            // ─── Section Headers ───
                            h2: ({ children }) => {
                                const idx = sectionIndex++;
                                return (
                                    <AnimatedSection index={idx}>
                                        <div className="flex items-center gap-3 mt-14 mb-6 group">
                                            <div className="p-2.5 bg-gold-glow rounded-xl border border-gold-500/20 group-hover:border-gold-500/40 group-hover:shadow-lg group-hover:shadow-gold-glow transition-all duration-300 print:border-none">
                                                {getSectionIcon(children)}
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-100 uppercase tracking-widest">
                                                {children}
                                            </h2>
                                            <div className="flex-grow tech-divider !m-0 ml-4 print:hidden" />
                                        </div>
                                    </AnimatedSection>
                                );
                            },

                            // ─── Job Title / Company ───
                            h3: ({ children }) => (
                                <AnimatedSection index={1}>
                                    <h3 className="text-lg md:text-xl font-bold font-heading text-slate-200 mt-8 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-gold-500 to-purple-500 inline-block print:hidden" />
                                        {children}
                                    </h3>
                                </AnimatedSection>
                            ),

                            // ─── Paragraphs ───
                            p: ({ children }) => {
                                // Extract plain text from children recursively
                                const getPlainText = (node: React.ReactNode): string => {
                                    if (typeof node === 'string') return node;
                                    if (typeof node === 'number') return String(node);
                                    if (Array.isArray(node)) return node.map(getPlainText).join('');
                                    if (React.isValidElement(node) && node.props?.children) return getPlainText(node.props.children);
                                    return '';
                                };
                                const text = getPlainText(children);

                                // Contact info — email
                                if (text.includes('✉️')) {
                                    const email = text.replace(/✉️/g, '').trim();
                                    return (
                                        <AnimatedSection index={0} className="inline-block">
                                            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium text-sm mr-4 mb-2 transition-colors cursor-pointer">
                                                <Mail className="w-4 h-4 text-gold-400" />
                                                <span>{email}</span>
                                            </a>
                                        </AnimatedSection>
                                    );
                                }

                                // Contact info — LinkedIn (contains markdown link, render children to preserve <a>)
                                if (text.includes('🔗')) {
                                    return (
                                        <AnimatedSection index={0} className="inline-block">
                                            <div className="inline-flex items-center gap-2 text-slate-400 font-medium text-sm mr-4 mb-2">
                                                <LinkIcon className="w-4 h-4 text-gold-400" />
                                                {React.Children.map(children, child => {
                                                    if (typeof child === 'string' && /^🔗\s*$/.test(child)) return null;
                                                    return child;
                                                })}
                                            </div>
                                        </AnimatedSection>
                                    );
                                }

                                // Contact info — location, phone
                                if (text.includes('📍') || text.includes('📞')) {
                                    const icon = getContactIcon(text);
                                    const cleanText = text.replace(/📍|📞/g, '').trim();
                                    return (
                                        <AnimatedSection index={0} className="inline-block">
                                            <div className="inline-flex items-center gap-2 text-slate-400 font-medium text-sm mr-4 mb-2">
                                                {icon}
                                                <span>{cleanText}</span>
                                            </div>
                                        </AnimatedSection>
                                    );
                                }

                                return (
                                    <AnimatedSection index={1}>
                                        <p className="text-slate-400 leading-relaxed max-w-3xl mb-4 text-base">
                                            {children}
                                        </p>
                                    </AnimatedSection>
                                );
                            },

                            // ─── Bold text ───
                            strong: ({ children }) => {
                                const text = String(children);
                                // Date/location lines — check BEFORE the pipe check since these also contain pipes
                                if (text.includes('Ukraine') || text.includes('Germany') || text.includes('Poland') || text.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/)) {
                                    return (
                                        <span className="block text-sm font-sans italic text-slate-500 mb-3 pl-4">
                                            {children}
                                        </span>
                                    );
                                }
                                // Sub-title (role line)
                                if (text.includes('|')) {
                                    return (
                                        <strong className="block text-center font-medium text-sm text-slate-400 tracking-wider uppercase mb-6">
                                            {children}
                                        </strong>
                                    );
                                }
                                return (
                                    <strong className="font-semibold text-slate-200">
                                        {children}
                                    </strong>
                                );
                            },

                            // ─── Links ───
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-gold-400 hover:text-gold-300 font-medium transition-colors duration-200 group cursor-pointer"
                                >
                                    {children}
                                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5" />
                                </a>
                            ),

                            // ─── Lists ───
                            ul: ({ children }) => (
                                <ul className="grid grid-cols-1 gap-2.5 ml-0 md:ml-4 mb-6">
                                    {children}
                                </ul>
                            ),

                            // ─── List Items ───
                            li: ({ children }) => (
                                <AnimatedSection index={0}>
                                    <li className="flex items-start text-slate-400 group/li">
                                        <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-gold-500/60 group-hover/li:bg-gold-400 flex-shrink-0 transition-colors duration-200 print:bg-black" />
                                        <span className="leading-relaxed text-sm md:text-base">{children}</span>
                                    </li>
                                </AnimatedSection>
                            ),

                            // ─── Horizontal Rule ───
                            hr: () => (
                                <div className="tech-divider print:hidden" />
                            ),

                            // ─── Emphasis ───
                            em: ({ children }) => (
                                <em className="not-italic text-xs font-semibold text-purple-400 bg-purple-glow px-3 py-1 rounded-full border border-purple-500/20">
                                    {children}
                                </em>
                            ),
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>

                {/* Footer */}
                <AnimatedSection index={2}>
                    <div className="text-center mt-10 mb-8 text-slate-600 text-sm print:hidden font-heading">
                        <p>© {new Date().getFullYear()} CV · Built with <span className="text-gold-500">Next.js</span> & <span className="text-purple-400">Tailwind</span></p>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
