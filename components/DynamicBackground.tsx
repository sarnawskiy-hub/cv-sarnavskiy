'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    color: string;
}

export default function DynamicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const colors = ['#F59E0B', '#8B5CF6', '#D946EF', '#FBBF24', '#A78BFA'];
        const PARTICLE_COUNT = 60;
        const CONNECTION_DIST = 150;
        const MOUSE_DIST = 200;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        const particles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        particlesRef.current = particles;

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouse);

        let time = 0;

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.002;

            // Floating aurora waves
            for (let w = 0; w < 3; w++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);
                for (let x = 0; x <= canvas.width; x += 4) {
                    const y =
                        canvas.height * 0.3 +
                        Math.sin(x * 0.003 + time * 2 + w * 1.5) * 60 +
                        Math.cos(x * 0.005 + time * 1.5 + w) * 40 +
                        w * 80;
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.closePath();
                const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
                if (w === 0) {
                    grad.addColorStop(0, 'rgba(245, 158, 11, 0.04)');
                    grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.06)');
                    grad.addColorStop(1, 'rgba(245, 158, 11, 0.04)');
                } else if (w === 1) {
                    grad.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
                    grad.addColorStop(0.5, 'rgba(217, 70, 239, 0.05)');
                    grad.addColorStop(1, 'rgba(139, 92, 246, 0.03)');
                } else {
                    grad.addColorStop(0, 'rgba(217, 70, 239, 0.02)');
                    grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.04)');
                    grad.addColorStop(1, 'rgba(217, 70, 239, 0.02)');
                }
                ctx.fillStyle = grad;
                ctx.fill();
            }

            // Update & draw particles
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse repulsion
                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_DIST) {
                    const force = (MOUSE_DIST - dist) / MOUSE_DIST;
                    p.vx += (dx / dist) * force * 0.3;
                    p.vy += (dy / dist) * force * 0.3;
                }

                // Dampen velocity
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 print:hidden"
            style={{ pointerEvents: 'none' }}
        />
    );
}
