import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import {
  calculator,
  comparison,
  counters,
  courses,
  roadmapStages,
  ticker,
} from '../app/lib/site-data';

const APP_DIR = join(__dirname, '..', 'app');

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /[.]tsx?$/.test(entry.name) ? [full] : [];
  });
}

describe('static landing content', () => {
  it('describes exactly three levels, none with a price', () => {
    expect(courses.map((c) => c.tier)).toEqual(['basic', 'medium', 'advanced']);

    for (const course of courses) {
      expect(course.title.trim()).not.toHaveLength(0);
      expect(course.description.trim()).not.toHaveLength(0);
      // Pricing lives in Telegram — a landing course has no such field at all.
      expect(course).not.toHaveProperty('price');
      expect(course).not.toHaveProperty('priceUsdt');
      expect(course).not.toHaveProperty('currency');
    }
  });

  it('roadmap stages are ordered and have unique ids', () => {
    expect(roadmapStages.length).toBeGreaterThan(0);
    expect(roadmapStages.map((s) => s.order)).toEqual(roadmapStages.map((_, i) => i + 1));
    expect(new Set(roadmapStages.map((s) => s.id)).size).toBe(roadmapStages.length);

    for (const stage of roadmapStages) {
      expect(stage.lessonsCount).toBeGreaterThan(0);
      expect(stage.modules.length).toBeGreaterThan(0);
      expect(stage.imageUrl).toMatch(/^\//);
    }
  });

  it('the calculator only references existing levels', () => {
    expect(calculator.amountMax).toBeGreaterThan(calculator.amountMin);
    expect(calculator.disclaimer.trim()).not.toHaveLength(0);

    for (const tier of calculator.tiers) {
      expect(courses.some((c) => c.tier === tier.tier)).toBe(true);
      expect(tier.highPct).toBeGreaterThan(tier.lowPct);
    }
  });

  it('counters and comparison are filled in', () => {
    expect(counters.studentsTotal).toBeGreaterThan(0);
    expect(counters.updatedAt).not.toBeNull();
    expect(Number.isNaN(Date.parse(counters.updatedAt as string))).toBe(false);

    expect(comparison.rows.length).toBeGreaterThan(0);
    expect(ticker.length).toBeGreaterThan(0);
  });
});

describe('the landing stays static', () => {
  const sources = walk(APP_DIR);

  it('makes no network requests while rendering', () => {
    const offenders = sources.filter((file) => {
      const code = readFileSync(file, 'utf8');
      return /\bfetch\s*\(/.test(code) || /process\.env\.API_/.test(code);
    });

    expect(offenders).toEqual([]);
  });

  it('does not depend on the removed admin', () => {
    const offenders = sources.filter((file) =>
      /lib\/api['"]|NEXT_PUBLIC_API_URL|apps\/admin/.test(readFileSync(file, 'utf8')),
    );

    expect(offenders).toEqual([]);
  });
});
