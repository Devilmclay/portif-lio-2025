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

    // Classe para as estrelas fixas
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

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }

      update() {
        this.alpha += this.twinkleSpeed * this.twinkleDirection;
        if (this.alpha > 1 || this.alpha < 0.5) {
          this.twinkleDirection *= -1;
        }
      }
    }

    // Classe para as estrelas cadentes
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
        this.angle = Math.PI / 4; // Ângulo de 45 graus
        this.speed = Math.random() * 10 + 5;
        this.life = this.len * 2; // Vida da estrela cadente
      }

      draw() {
        if (!ctx) return;
        const x2 = this.x - this.len * Math.cos(this.angle);
        const y2 = this.y - this.len * Math.sin(this.angle);
        
        const gradient = ctx.createLinearGradient(this.x, this.y, x2, y2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.life / (this.len * 2)})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
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
      // Desenha o fundo
      const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
      gradient.addColorStop(0, '#1a202c'); // Cor mais clara no centro (pode ser o seu from-zinc-900)
      gradient.addColorStop(1, '#0a0a0a'); // Cor mais escura nas bordas (pode ser o seu to-zinc-950)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Desenha as estrelas
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Cria e desenha as estrelas cadentes
      if (Math.random() > 0.995) { // Probabilidade de criar uma nova estrela cadente
        shootingStars.push(new ShootingStar());
      }

      shootingStars.forEach((star, index) => {
        star.update();
        star.draw();
        if (star.life <= 0) {
          shootingStars.splice(index, 1);
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Configuração inicial
    setCanvasDimensions();
    init();
    animate();

    // Lida com o redimensionamento da janela
    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      setCanvasDimensions();
      init();
      animate();
    };

    window.addEventListener('resize', handleResize);

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10" // Posiciona o canvas atrás de todo o conteúdo
    />
  );
}
