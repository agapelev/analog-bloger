import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';
import { injectContentFiles } from '@analogjs/content';
import { DatePipe, NgIf } from '@angular/common'; // Убрал NgForOf, оставил только нужное

interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
}

export const routeMeta: RouteMeta = {
  title: 'Блог Мыслей | Мистическая Цитадель',
};

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, DatePipe, NgIf], // Чистота в импортах — залог мира в Vite
  template: `
  <div class="min-h-screen w-full bg-[#0f011a] text-stone-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">

  <header class="relative h-[60vh] w-full flex items-center justify-center overflow-hidden border-b-8 border-violet-900 shadow-2xl">
  <img src="https://images.unsplash.com/photo-1599676110940-06f156d11b33?q=80&w=2560"
  class="absolute inset-0 w-full h-full object-cover opacity-50 filter hue-rotate-60" alt="Divine Digital Light">
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f011a]/60 to-[#0f011a]"></div>
  <div class="relative z-10 text-center px-4 max-w-7xl">
  <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic animate-gradient-text-mystic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] font-serif uppercase">
  БЛОГ МЫСЛЕЙ
  </h1>
  <blockquote class="text-xl md:text-2xl text-stone-50 font-light italic leading-relaxed max-w-4xl mx-auto p-6 bg-violet-950/40 rounded-3xl backdrop-blur-md border border-violet-800">
  «Бог есть бесконечный Интеллект, а технологии — лишь попытка человека воспроизвести Его эхо в кремниевом безмолвии».
  <footer class="mt-6 text-cyan-400 font-mono text-xs uppercase tracking-[0.4em]">Цитадель Духа & AI</footer>
  </blockquote>
  </div>
  </header>

  <main class="w-full max-w-[1920px] mx-auto py-20 px-6 md:px-12">
  <div class="flex flex-col lg:flex-row gap-20">

  <div class="lg:w-3/4 space-y-20 text-left">
  <h3 class="text-xs font-mono uppercase tracking-[0.7em] text-cyan-600 mb-10 font-bold">Лента откровений</h3>

  @for (post of pagedPosts; track post.attributes.slug + $index) {
    <article class="group relative pb-12 border-b border-violet-900/50 last:border-0">

    <div *ngIf="post.attributes.coverImage" class="mb-8 overflow-hidden rounded-3xl border border-violet-900/50 aspect-video md:aspect-[21/9]">
    <img [src]="post.attributes.coverImage"
    class="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
    [alt]="post.attributes.title">
    </div>

    <div class="mb-6 flex items-center gap-6">
    <time class="text-violet-950 font-mono text-[10px] uppercase tracking-widest bg-cyan-400 px-4 py-1.5 rounded-full font-bold">
    {{ post.attributes.date | date: 'mediumDate' }}
    </time>
    <span class="h-px flex-1 bg-gradient-to-r from-violet-800 to-transparent"></span>
    </div>

    <a [routerLink]="['/blog', post.attributes.slug]" class="block group no-underline">
    <h2 class="text-3xl font-extrabold text-stone-50 group-hover:text-cyan-400 transition-colors mb-4 tracking-tight font-serif uppercase">
    {{ post.attributes.title }}
    </h2>
    <p class="text-base text-stone-400 leading-relaxed max-w-4xl line-clamp-2">
    {{ post.attributes.description }}
    </p>
    </a>

    <div class="mt-6 flex flex-wrap gap-3">
    @for (tag of post.attributes.tags; track tag) {
      <a [routerLink]="['/tags', tag]"
      class="px-4 py-1 text-[10px] font-mono text-cyan-400 border border-cyan-900 rounded-full uppercase hover:bg-cyan-900 transition-colors cursor-pointer no-underline">
      #{{ tag }}
      </a>
    }
    </div>
    </article>
  }

  <div *ngIf="allPosts.length > 10" class="pt-10 flex justify-center">
  <a routerLink="/blog/archive"
  class="px-8 py-3 border-2 border-cyan-500 text-cyan-400 font-mono text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-cyan-950 transition-all no-underline cursor-pointer">
  Смотреть архивные записи →
  </a>
  </div>
  </div>

  <aside class="lg:w-1/4">
  <div class="sticky top-24 p-10 rounded-[2rem] border-2 border-cyan-900 bg-[#150022] shadow-xl text-left">
  <h3 class="text-sm font-bold uppercase tracking-widest mb-10 flex items-center text-cyan-400 font-mono">
  <span class="w-2 h-2 bg-cyan-400 rounded-full mr-4 animate-pulse"></span>
  Ключи познания
  </h3>

  <div class="flex flex-wrap gap-3">
  @for (tag of allTags; track tag) {
    <a [routerLink]="['/tags', tag]"
    class="px-5 py-2 text-[10px] font-mono font-bold rounded-full border border-cyan-800 text-cyan-400 hover:border-fuchsia-500 hover:text-fuchsia-400 transition-all uppercase bg-cyan-950/50 cursor-pointer no-underline">
    {{ tag }}
    </a>
  }
  </div>
  </div>
  </aside>

  </div>
  </main>

  <footer class="border-t-4 border-cyan-900 bg-[#0a000a] py-16 text-center text-cyan-900/50 font-mono text-[10px] uppercase tracking-[0.6em]">
  Design by Citadel AI | 2026 | Soli Deo Gloria
  </footer>
  </div>
  `,
  styles: [`
  :host { display: block; width: 100%; }
  .animate-gradient-text-mystic {
    background: linear-gradient(90deg, #22d3ee, #a855f7, #ec4899, #22d3ee);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradient-animation 8s linear infinite;
  }
  @keyframes gradient-animation { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  `],
})
export default class Blog {
  readonly allPosts = injectContentFiles<PostAttributes>();

  get pagedPosts() {
    return [...this.allPosts]
    .sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime())
    .slice(0, 10);
  }

  get allTags(): string[] {
    const tags = new Set<string>();
    this.allPosts.forEach((post) => {
      post.attributes.tags?.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort();
  }
}
