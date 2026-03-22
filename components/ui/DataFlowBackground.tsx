"use client";

import { useEffect, useRef } from "react";

interface DataStream {
    x: number;
    y: number;
    speed: number;
    length: number;
    opacity: number;
    delay: number;
}

export default function DataFlowBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        const CELL_SIZE = 40;
        const STREAM_COUNT = 18;
        const COLOR = { r: 0, g: 255, b: 136 }; // #00FF88

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Create data streams that flow down through grid columns
        const streams: DataStream[] = Array.from({ length: STREAM_COUNT }, () => {
            const col = Math.floor(Math.random() * (canvas.width / CELL_SIZE));
            return {
                x: col * CELL_SIZE + CELL_SIZE / 2,
                y: -Math.random() * canvas.height,
                speed: 0.3 + Math.random() * 0.5,
                length: 3 + Math.floor(Math.random() * 6),
                opacity: 0.08 + Math.random() * 0.12,
                delay: Math.random() * 200,
            };
        });

        let frame = 0;

        const draw = () => {
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            streams.forEach((stream) => {
                if (frame < stream.delay) return;

                // Draw each "data packet" in the stream
                for (let i = 0; i < stream.length; i++) {
                    const cellY = stream.y - i * CELL_SIZE;
                    if (cellY < -CELL_SIZE || cellY > canvas.height + CELL_SIZE) continue;

                    // Fade based on position in stream (head is brightest)
                    const fade = 1 - i / stream.length;
                    const alpha = stream.opacity * fade;

                    // Data packet (small filled rectangle)
                    ctx.fillStyle = `rgba(${COLOR.r}, ${COLOR.g}, ${COLOR.b}, ${alpha})`;
                    ctx.fillRect(stream.x - 3, cellY - 3, 6, 6);

                    // Connecting line segment to next packet
                    if (i < stream.length - 1) {
                        const nextY = stream.y - (i + 1) * CELL_SIZE;
                        const nextFade = 1 - (i + 1) / stream.length;
                        const lineAlpha = stream.opacity * (fade + nextFade) * 0.3;
                        ctx.strokeStyle = `rgba(${COLOR.r}, ${COLOR.g}, ${COLOR.b}, ${lineAlpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(stream.x, cellY);
                        ctx.lineTo(stream.x, nextY);
                        ctx.stroke();
                    }

                    // Occasional horizontal branch (data routing)
                    if (i === 1 && frame % 120 < 60) {
                        const branchLen = CELL_SIZE * (1 + Math.floor(Math.random() * 2));
                        const dir = stream.x > canvas.width / 2 ? -1 : 1;
                        ctx.strokeStyle = `rgba(${COLOR.r}, ${COLOR.g}, ${COLOR.b}, ${alpha * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(stream.x, cellY);
                        ctx.lineTo(stream.x + branchLen * dir, cellY);
                        ctx.stroke();

                        // Junction dot
                        ctx.fillStyle = `rgba(${COLOR.r}, ${COLOR.g}, ${COLOR.b}, ${alpha * 0.6})`;
                        ctx.beginPath();
                        ctx.arc(stream.x + branchLen * dir, cellY, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // Move stream downward
                stream.y += stream.speed;

                // Reset when fully off screen
                if (stream.y - stream.length * CELL_SIZE > canvas.height) {
                    const col = Math.floor(Math.random() * (canvas.width / CELL_SIZE));
                    stream.x = col * CELL_SIZE + CELL_SIZE / 2;
                    stream.y = -Math.random() * canvas.height * 0.5;
                    stream.speed = 0.3 + Math.random() * 0.7;
                    stream.length = 3 + Math.floor(Math.random() * 6);
                    stream.opacity = 0.03 + Math.random() * 0.06;
                }
            });

            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{ opacity: 0.7 }}
        />
    );
}
