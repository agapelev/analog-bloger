import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
  <a routerLink="/" class="group flex items-center gap-4 focus:outline-none" title="На главную Цитадели">

  <div class="relative w-16 h-16 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">

  <svg class="absolute inset-0 w-full h-full text-[#150022] filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
  viewBox="0 0 100 100" fill="currentColor">
  <path d="M50 0 L90 20 L90 70 C90 90, 50 100, 50 100 C50 100, 10 90, 10 70 L10 20 Z" />
  </svg>

  <div class="absolute inset-0 flex items-center justify-center opacity-30">
  <div class="w-1 h-12 bg-fuchsia-500 rounded-full"></div>
  <div class="absolute h-1 w-8 bg-fuchsia-500 rounded-full"></div>
  </div>

  <svg class="relative w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 filter drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2a10 10 0 0 1 10 10c0 1.5-.3 2.9-.9 4.2A10 10 0 1 1 2.9 6.2 10 10 0 0 1 12 2z"/>
  <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
  <path d="M16 12a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4z"/>
  <path d="M18 16c0 1.1-.9 2-2 2h-1c-.6 0-1 .4-1 1s.4 1 1 1h1c1.1 0 2 .9 2 2" />
  <path d="M8 18c0-1.1-.9-2-2-2" />
  </svg>

  <div class="absolute inset-0 bg-violet-600/10 rounded-full animate-pulse-slow"></div>
  </div>

  <div class="flex flex-col font-serif tracking-tighter leading-none">
  <span class="text-4xl font-black text-stone-50 animate-gradient-text-mystic italic">
  Shekinah
  </span>
  <div class="flex items-center gap-1.5 mt-1">
  <span class="h-px w-6 bg-cyan-600"></span>
  <span class="text-xs font-mono uppercase tracking-[0.5em] text-cyan-400">
  Cloud Mission
  </span>
  <span class="text-[9px] text-violet-600 font-bold ml-1">KZ</span>
  </div>
  </div>

  </a>
  `,
  styles: `
  :host { display: block; }

  /* Медленная пульсация для мистического эффекта */
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); opacity: 0.1; }
    50% { transform: scale(1.1); opacity: 0.2; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Анимация градиента для текста */
  .animate-gradient-text-mystic {
    background: linear-gradient(90deg, #e7e5e4, #a855f7, #22d3ee, #e7e5e4);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradient-animation 12s linear infinite;
  }
  @keyframes gradient-animation { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  `
})
export default class LogoComponent {}
