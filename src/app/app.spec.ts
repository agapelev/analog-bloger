import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

// sanity check to catch race conditions like missing tag pages in prerender config
import type { UserConfig } from 'vite';
import { describe, it, expect } from 'vitest';
// dynamically import the vite config and execute it to inspect prerender options
import configFn from '../../vite.config';

describe('build configuration', () => {
  it('should prerender tag routes or enable discovery', async () => {
    const cfg = (await (configFn as any)({ mode: 'test' })) as UserConfig;
    const prerender = (cfg.plugins || [])
      .map((p: any) => p && p.options && p.options.prerender)
      .find(Boolean);
    expect(prerender).toBeDefined();
    const hasTagRoutes =
      prerender.routes &&
      Array.isArray(prerender.routes) &&
      prerender.routes.some((r: any) => typeof r === 'string' && r.startsWith('/tags'));
    expect(prerender.discover || hasTagRoutes).toBeTruthy();
  });
});
