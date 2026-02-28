import { Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

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
  imports: [AsyncPipe, MarkdownComponent, DatePipe],
  template: `
  @if (post$ | async; as post) {
    <article class="min-h-screen bg-[#0f011a] text-stone-200">
    <header class="relative h-[40vh] flex items-end p-8 md:p-16 border-b border-violet-900">
    @if (post.attributes.coverImage) {
      <img [src]="post.attributes.coverImage" class="absolute inset-0 w-full h-full object-cover opacity-30">
    }
    <div class="relative z-10">
    <h1 class="text-5xl md:text-7xl font-black italic text-white uppercase font-serif">
    {{ post.attributes.title }}
    </h1>
    <p class="text-cyan-400 font-mono mt-4 uppercase tracking-[0.3em]">
    {{ post.attributes.date | date }}
    </p>
    </div>
    </header>

    <main class="max-w-4xl mx-auto py-16 px-6">
    <div class="prose prose-invert prose-cyan max-w-none">
    <analog-markdown [content]="post.content" />
    </div>
    </main>
    </article>
  }
  `
})
export default class BlogPostPage {
  readonly post$ = injectContent<PostAttributes>('slug');
}
