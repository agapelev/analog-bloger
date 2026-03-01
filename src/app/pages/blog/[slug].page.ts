import { Component } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common'; // Добавил NgIf
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouterLink } from '@angular/router'; // Добавил RouterLink

interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  date: string;
  coverImage?: string;
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, DatePipe, NgIf, RouterLink], // Обновил imports
  template: `
  @if (post$ | async; as post) {
    <article class="min-h-screen bg-[#0f011a] text-stone-200 selection:bg-cyan-500/30">

    <header class="relative h-[50vh] flex items-end p-8 md:p-16 border-b border-violet-900 overflow-hidden">
    @if (post.attributes.coverImage) {
      <img [src]="post.attributes.coverImage" class="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 z-0">
    }
    <div class="absolute inset-0 bg-gradient-to-t from-[#0f011a] via-transparent to-transparent z-1"></div>

    <div class="relative z-10 max-w-5xl text-left">
    <a routerLink="/blog" class="text-cyan-500 uppercase tracking-[0.4em] text-[10px] font-mono no-underline mb-8 inline-block hover:text-cyan-300 transition-colors">
    ← Назад в Архив
    </a>
    <h1 class="text-5xl md:text-7xl font-black italic text-white uppercase font-serif tracking-tighter leading-tight drop-shadow-2xl">
    {{ post.attributes.title }}
    </h1>
    <p class="text-cyan-400 font-mono mt-6 uppercase tracking-[0.5em] text-xs font-bold">
    {{ post.attributes.date | date: 'longDate' }}
    </p>
    </div>
    </header>

    <main class="max-w-4xl mx-auto py-24 px-6 text-left">
    <div class="prose prose-invert prose-cyan max-w-none
    prose-p:text-stone-300 prose-p:leading-relaxed prose-p:text-xl font-serif
    prose-headings:italic prose-headings:font-bold prose-headings:tracking-tight
    prose-img:rounded-3xl prose-img:border prose-img:border-violet-900">
    <analog-markdown [content]="post.content" />
    </div>
    </main>

    <footer class="py-20 border-t border-violet-900/30 text-center">
    <div class="text-cyan-900/30 font-mono text-[10px] uppercase tracking-[0.8em]">
    End of Transmission | 2026
    </div>
    </footer>
    </article>
  }
  `,
  styles: `
  :host { display: block; width: 100%; }
  `
})
export default class BlogPostPage {
  readonly post$ = injectContent<PostAttributes>('slug');
}
