import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { DatePipe, NgIf } from '@angular/common'; // Убрал NgForOf

interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
}

@Component({
  standalone: true,
  imports: [RouterLink, DatePipe, NgIf], // Чистые импорты
  template: `
  <div class="min-h-screen bg-[#0f011a] text-stone-200 py-24 px-6 font-sans">
  <div class="max-w-5xl mx-auto text-left">

  <nav class="mb-16">
  <a routerLink="/blog" class="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em] hover:text-cyan-300 transition-all no-underline bg-cyan-950/20 px-4 py-2 rounded-full border border-cyan-900/50 cursor-pointer">
  ← Вернуться к свежим откровениям
  </a>
  </nav>

  <header class="mb-20">
  <h1 class="text-6xl md:text-7xl font-serif italic mb-6 text-white uppercase tracking-tighter">
  Архив <span class="text-cyan-500">Цитадели</span>
  </h1>
  <p class="text-stone-400 font-mono text-sm uppercase tracking-widest uppercase">Полный реестр записанных мыслей</p>
  </header>

  <div class="grid gap-8">
  @for (post of allPostsSorted; track post.attributes.slug + $index) {
    <article class="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border border-violet-900/30 bg-violet-950/10 hover:bg-violet-900/20 transition-all">
    <div class="flex flex-col text-left">
    <time class="text-cyan-600 font-mono text-[10px] uppercase tracking-widest mb-2">
    {{ post.attributes.date | date: 'fullDate' }}
    </time>
    <a [routerLink]="['/blog', post.attributes.slug]"
    class="text-2xl font-bold text-stone-100 group-hover:text-cyan-400 transition-colors no-underline uppercase font-serif">
    {{ post.attributes.title }}
    </a>
    </div>

    <div class="mt-4 md:mt-0">
    <a [routerLink]="['/blog', post.attributes.slug]" class="text-stone-500 group-hover:text-cyan-500 transition-all">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
    </a>
    </div>
    </article>
  } @empty {
    <div class="text-center py-20 border-2 border-dashed border-violet-900 rounded-[3rem]">
    <p class="text-stone-500 font-mono italic">Свитки архива пока не найдены в чертогах памяти...</p>
    </div>
  }
  </div>
  </div>
  </div>
  `
})
// ВАЖНО: default должен быть здесь!
export default class BlogArchivePage {
  private readonly allFiles = injectContentFiles<PostAttributes>();

  get allPostsSorted() {
    return [...this.allFiles].sort((a, b) =>
    new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()
    );
  }
}
