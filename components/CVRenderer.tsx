'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Printer } from 'lucide-react';

interface CVRendererProps {
    markdown: string;
}

export default function CVRenderer({ markdown }: CVRendererProps) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="relative">
            {/* Floating Print Button */}
            <div className="fixed top-6 right-6 z-50 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
                >
                    <Printer className="w-5 h-5" />
                    <span>Print to PDF</span>
                </button>
            </div>

            {/* CV Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div
                    id="cv-content"
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-12 space-y-6"
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4 pb-2 border-b-2 border-blue-500">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-2">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {children}
                                </p>
                            ),
                            strong: ({ children }) => (
                                <strong className="font-semibold text-slate-800 dark:text-slate-200">
                                    {children}
                                </strong>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors"
                                >
                                    {children}
                                </a>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600 dark:text-slate-400">
                                    {children}
                                </ul>
                            ),
                            li: ({ children }) => (
                                <li className="text-base md:text-lg leading-relaxed">
                                    {children}
                                </li>
                            ),
                            hr: () => (
                                <hr className="my-8 border-t-2 border-slate-200 dark:border-slate-700" />
                            ),
                            em: ({ children }) => (
                                <em className="italic text-slate-600 dark:text-slate-400">
                                    {children}
                                </em>
                            ),
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
