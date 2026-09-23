import { content } from '../../lib/content';
import { TELEGRAM_URL, asset } from '../../lib/config';
import { TelegramMark } from '../icons';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a
      href={href}
      className="text-sm text-ink-muted transition-colors duration-quick ease-premium hover:text-accent"
    >
      {children}
    </a>
  </li>
);

// A square key drawn like the FAQ toggle. The label goes into sr-only text
// rather than aria-label: both screen readers and crawlers see it, so the link
// is never an anonymous image without anchor text.
const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-ink/15 text-ink-muted transition-colors duration-standard ease-premium hover:border-accent/40 hover:text-accent"
  >
    {children}
    <span className="sr-only">{label}</span>
  </a>
);

export const Footer = () => (
  <footer className="border-t border-ink/10">
    <div className="mx-auto max-w-container px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="group flex items-center gap-2.5">
            <img
              src={asset('/logo-mark.png')}
              alt=""
              width={24}
              height={24}
              className="transition-transform duration-standard ease-premium group-hover:rotate-12"
            />
            <span className="font-mono text-sm tracking-wide text-ink-muted">{content.brand}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            {content.footer.note}
          </p>
        </div>

        <nav aria-label={content.footer.navLabel}>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
            {content.footer.navLabel}
          </span>
          <ul className="mt-4 space-y-2.5">
            <NavLink href="#program">{content.footer.links.program}</NavLink>
            <NavLink href="#how-it-works">{content.footer.links.howItWorks}</NavLink>
            <NavLink href="#roadmap">{content.footer.links.roadmap}</NavLink>
            <NavLink href="#courses">{content.footer.links.courses}</NavLink>
            <NavLink href="#faq">{content.footer.links.faq}</NavLink>
          </ul>
        </nav>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
            {content.footer.contactLabel}
          </span>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-ink transition-colors duration-quick ease-premium hover:text-accent"
          >
            {content.footer.contactHandle}
            <span aria-hidden="true">↗</span>
          </a>

          <ul aria-label={content.footer.social.label} className="mt-4 flex items-center gap-2">
            <li>
              <SocialLink href={TELEGRAM_URL} label={content.footer.social.channel}>
                <TelegramMark size={18} />
              </SocialLink>
            </li>
          </ul>

          <p className="mt-3 text-xs leading-relaxed text-ink-muted">
            {content.footer.contactNote}
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-ink/10 pt-6">
        <p className="max-w-3xl text-xs leading-relaxed text-ink-muted/80">{content.footer.risk}</p>
        <p className="mt-4 font-mono text-xs text-ink-muted">
          © {new Date().getFullYear()} {content.brand}
        </p>
      </div>
    </div>
  </footer>
);
