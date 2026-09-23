import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Courses } from '../app/components/sections/courses';
import { TELEGRAM_URL } from '../app/lib/config';
import { courses } from '../app/lib/site-data';
import { content } from '../app/lib/content';

describe('"Course levels" section', () => {
  it('renders a card for every level', () => {
    render(<Courses />);

    for (const course of courses) {
      expect(screen.getByText(course.title)).toBeInTheDocument();
      expect(screen.getByText(course.description)).toBeInTheDocument();
    }
  });

  it('shows no price: pricing lives in Telegram', () => {
    const { container } = render(<Courses />);
    const text = container.textContent ?? '';

    expect(text).not.toMatch(/USDT/i);
    expect(text).not.toMatch(/\$/);
    // No money amounts at all: not "10", "25 USD" or "from 40".
    expect(text).not.toMatch(/\d+\s*(USD|USDT|\$|€)/i);
  });

  it('each card has one button, and it opens the Telegram channel', () => {
    render(<Courses />);

    const ctas = screen.getAllByRole('link', { name: new RegExp(content.courses.cta, 'i') });

    expect(ctas).toHaveLength(courses.length);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute('href', TELEGRAM_URL);
      expect(cta).toHaveAttribute('target', '_blank');
      expect(cta).toHaveAttribute('rel', expect.stringContaining('noopener'));
    }
  });
});
