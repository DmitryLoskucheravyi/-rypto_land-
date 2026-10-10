'use client';

import { motion } from 'framer-motion';
import { content } from '../../lib/content';
import { comparison } from '../../lib/site-data';
import { fadeUp } from '../../lib/motion';

// Terminal diff, but without red: --bear is reserved for chart visuals, so the
// weaker side is simply muted and the course side carries the accent.
export const Comparison = () => {
  return (
    <section
      id="comparison"
      aria-labelledby="comparison-title"
      className="scroll-mt-24 py-20 md:py-32"
    >
      <div className="mx-auto max-w-container px-5 sm:px-6 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {content.comparison.eyebrow}
          </span>
          <h2
            id="comparison-title"
            className="mt-4 max-w-2xl text-[1.6rem] font-semibold leading-tight sm:text-2xl md:text-[2rem] md:leading-[1.15]"
          >
            {content.comparison.title}
          </h2>
        </motion.div>

        {/* A real table, so the two columns stay attributable outside the
            browser too; every part is re-displayed as block/grid to keep the
            stacked mobile layout. */}
        <table className="mt-10 block w-full overflow-hidden rounded-2xl border border-ink/10 md:mt-12">
          <thead className="hidden md:block">
            <tr className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] border-b border-ink/10 bg-surface/95">
              <td className="block px-6 py-4" />
              <th
                scope="col"
                className="block px-6 py-4 text-left font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-muted"
              >
                {comparison.leftTitle}
              </th>
              <th
                scope="col"
                className="block px-6 py-4 text-left font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-accent"
              >
                {comparison.rightTitle}
              </th>
            </tr>
          </thead>

          <tbody className="block">
            {comparison.rows.map((row, i) => (
              <motion.tr
                key={row.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: i * 0.04 }}
                className="grid grid-cols-1 gap-2 border-b border-ink/10 px-5 py-5 last:border-b-0 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] md:items-baseline md:gap-0 md:px-0 md:py-0"
              >
                <th
                  scope="row"
                  className="block text-left font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-ink-muted md:px-6 md:py-5"
                >
                  {row.label}
                </th>
                <td className="flex gap-2 font-mono text-sm text-ink-muted md:px-6 md:py-5">
                  <span aria-hidden="true" className="select-none opacity-50">
                    -
                  </span>
                  {row.left}
                </td>
                <td className="flex gap-2 font-mono text-sm text-ink md:px-6 md:py-5">
                  <span aria-hidden="true" className="select-none text-accent">
                    +
                  </span>
                  {row.right}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
