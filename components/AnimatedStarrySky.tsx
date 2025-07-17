// components/AnimatedStarrySky.tsx
"use client";

import { useRef, useEffect } from 'react';

export function AnimatedStarrySky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let animationFrameId: number;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // --- CORREÇÃO APLICADA AQUI ---
    // Agora, os métodos recebem 'ctx' como um argumento.

    class Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      twinkleDirection: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.twinkleSpeed = Math.random() * 0.015;
        this.twinkleDirection = 1;
      }

      draw(context: CanvasRenderingContext2D) { // Recebe o contexto
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        context.fill();
      }

      update() {
        this.alpha += this.twinkleSpeed * this.twinkleDirection;
        if (this.alpha > 1 || this.alpha < 0.5) {
          this.twinkleDirection *= -1;
        }
      }
    }

    class ShootingStar {
      x: number;
      y: number;
      len: number;
      angle: number;
      speed: number;
      life: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.len = Math.random() * 80 + 10;
        this.angle = Math.PI / 4;
        this.speed = Math.random() * 10 + 5;
        this.life = this.len * 2;
      }

      draw(context: CanvasRenderingContext2D) { // Recebe o contexto
        const x2 = this.x - this.len * Math.cos(this.angle);
        const y2 = this.y - this.len * Math.sin(this.angle);
        
        const gradient = context.createLinearGradient(this.x, this.y, x2, y2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.life / (this.len * 2)})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(x2, y2);
        context.strokeStyle = gradient;
        context.lineWidth = 2;
        context.stroke();
      }

      update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.life--;
      }
    }

    const init = () => {
      stars = [];
      shootingStars = [];
      for (let i = 0; i < 200; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
      gradient.addColorStop(0, '#1a202c');
      gradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- CORREÇÃO APLICADA AQUI ---
      // Passamos 'ctx' para os métodos de desenho.
      stars.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      if (Math.random() > 0.995) {
        shootingStars.push(new ShootingStar());
      }

      shootingStars.forEach((star, index) => {
        star.update();
        star.draw(ctx);
        if (star.life <= 0) {
          shootingStars.splice(index, 1);
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    setCanvasDimensions();
    init();
    animate();

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      setCanvasDimensions();
      init();
      animate();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
