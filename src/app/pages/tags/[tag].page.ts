import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, DatePipe } from '@angular/common';
import { injectContentFiles } from '@analogjs/content';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';
import { map } from 'rxjs';

export const routeMeta: RouteMeta = {
  title: 'Теги | Мистическая Цитадель',
};

interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
}

@Component({
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink, DatePipe],
  template: `
  <div class="min-h-screen w-full bg-[#0f011a] text-stone-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden p-8 md:p-20">

  <nav class="mb-16">
  <a routerLink="/" class="text-cyan-500 hover:text-cyan-300 transition-all font-mono text-xs uppercase tracking-[0.3em] focus:outline-none">
  ← На главную Цитадели
  </a>
  </nav>

  <header class="mb-20 mt-10">
  <div class="flex items-center gap-4 mb-6">
  <span class="h-1 w-12 bg-fuchsia-500 shadow-[0_0_10px_#d946ef]"></span>
  <span class="text-fuchsia-400 font-mono text-xs uppercase tracking-widest">Тематический архив</span>
  </div>
  <h1 class="text-5xl md:text-7xl font-black italic animate-gradient-text-mystic tracking-tighter font-serif">
  #{{ tag$ | async }}
  </h1>
  </header>

  <div class="grid gap-16 max-w-5xl">
  <ng-container *ngIf="(posts$ | async) as posts">
  @for (post of posts; track post.attributes.slug) {
    <article class="group relative pb-12 border-b border-violet-900/40 last:border-0 transition-all hover:border-cyan-500/50">
    <time class="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em] mb-4 block">
    {{ post.attributes.date | date: 'longDate' }}
    </time>

    <h2 class="text-3xl md:text-5xl font-bold group-hover:text-cyan-400 transition-colors font-serif leading-tight">
    <a [routerLink]="['/blog', post.attributes.slug]">{{ post.attributes.title }}</a>
    </h2>

    <p class="text-stone-400 mt-6 text-lg leading-relaxed max-w-3xl line-clamp-2 font-light">
    {{ post.attributes.description }}
    </p>

    <div class="mt-8 flex gap-3">
    @for (t of post.attributes.tags; track t) {
      <a [routerLink]="['/tags', t]"
      class="text-[10px] font-mono text-violet-400 border border-violet-800 px-3 py-1 rounded-full bg-violet-950/30 hover:border-cyan-500 transition-colors">
      #{{ t }}
      </a>
    }
    </div>
    </article>
  } @empty {
    <div class="py-20 text-center border-2 border-dashed border-violet-900 rounded-[3rem]">
    <p class="text-stone-500 italic font-serif text-xl">В свитках Цитадели пока нет записей с этим ключом...</p>
    </div>
  }
  </ng-container>
  </div>

  <footer class="mt-32 pt-12 border-t-2 border-violet-950 flex flex-col md:flex-row justify-between items-center gap-8">
  <div class="text-cyan-900/50 font-mono text-[10px] uppercase tracking-[0.6em]">
  Citadel AI | 2026
  </div>
  <div class="text-fuchsia-500 font-mono text-[9px] uppercase tracking-[0.4em] animate-pulse">
  Soli Deo Gloria
  </div>
  </footer>
  </div>
  `,
  styles: `
  :host { display: block; }
  .animate-gradient-text-mystic {
    background: linear-gradient(90deg, #22d3ee, #a855f7, #ec4899, #22d3ee);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-animation 8s linear infinite;
  }
  @keyframes gradient-animation { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  `
})
export default class TagPage {
  private readonly route = inject(ActivatedRoute);

  readonly tag$ = this.route.paramMap.pipe(
    map(params => params.get('tag'))
  );

  private readonly allPosts = injectContentFiles<PostAttributes>();

  readonly posts$ = this.tag$.pipe(
    map(tag => {
      const lowerTag = tag?.trim().toLowerCase();
      if (!lowerTag) return [];
      return this.allPosts.filter(post =>
      post.attributes.tags?.some(t => t.trim().toLowerCase() === lowerTag)
      );
    })
  );
}
