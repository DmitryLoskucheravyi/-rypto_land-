export const content = {
  brand: 'CRYPTO SPHEERE',
  hero: {
    navCta: 'Join',
    eyebrow: 'Crypto education',
    h1: 'Ready to finally get trading?',
    sub: 'Make your first thousand within a month!',
    cta: 'Choose a course',
  },
  bento: {
    title: "What's inside the program",
    sub: 'Built around practice, not theory for its own sake.',
    badge: 'Hands-on from week one',
    more: 'Learn more',
    cells: [
      {
        icon: 'materials' as const,
        title: 'Structured materials',
        body: 'Lessons are split into short modules — from core terminology to real trading scenarios.',
        image: '/bento-1.jpg',
      },
      {
        icon: 'refresh' as const,
        title: 'Weekly updates',
        body: 'Course content is reviewed every week to match what the market is doing right now.',
        image: '/bento-2.jpg',
      },
      {
        icon: 'community' as const,
        title: 'Student community',
        body: 'Discuss strategies and ask questions — you are never left alone with the materials.',
        image: '/bento-3.jpg',
      },
      {
        icon: 'support' as const,
        title: 'Support after you join',
        body: 'A manager in Telegram helps with access and answers questions about the materials.',
        image: '/bento-4.jpg',
      },
      {
        icon: 'chart' as const,
        title: 'Practice on real cases',
        body: 'Breakdowns of real market situations instead of abstract textbook examples.',
        image: '/bento-5.jpg',
      },
    ],
  },
  howItWorks: {
    title: 'How it works',
    steps: [
      {
        icon: 'select' as const,
        title: 'Join the channel',
        body: 'Open our Telegram channel — everything about the courses lives there.',
      },
      {
        icon: 'price' as const,
        title: 'Pick your level',
        body: 'Compare the basic, intermediate and advanced courses and see the price — no hidden terms.',
      },
      {
        icon: 'access' as const,
        title: 'Get access',
        body: 'Pay in USDT (TRC20) and receive the course materials right in Telegram.',
      },
    ],
  },
  calculator: {
    eyebrow: 'Estimate',
    title: 'See what the outcome could look like',
    sub: 'Move the amount and pick a level — this is an illustrative model, not a forecast.',
    amountLabel: 'How much you plan to invest',
    tierLabel: 'Course level',
    resultLabel: 'Estimated range after',
    monthsLabel: 'mo.',
    cta: 'See the levels',
  },
  comparison: {
    eyebrow: 'Comparison',
    title: 'Learning from random videos vs. following a program',
  },
  counters: {
    studentsLabel: 'students enrolled',
    seatsLabel: 'seats open',
    updatedPrefix: 'updated',
  },
  roadmap: {
    eyebrow: 'Course path',
    title: 'From your first chart to your own trading system',
    sub: 'Each stage closes one gap. The order and content of the stages are fixed — together they are the whole course program.',
    stageLabel: 'Stage',
    testChip: 'Quiz',
    structureCta: 'Module outline',
  },
  marketChart: {
    eyebrow: "The market won't wait",
    title: 'Volatility is normal. The real question is whether you understand what you see.',
    sub: 'An illustrative visualisation of market movement — the course teaches you to read moves like these, not guess them.',
    // Labels the readout beside the headline as a simulation, so the ticking
    // number is never mistaken for a quote.
    tickerLabel: 'demo feed',
  },
  courses: {
    title: 'Course levels',
    sub: 'Level contents are below. Pricing and enrollment are handled in our Telegram channel.',
    popular: 'Most popular',
    cta: 'Open Telegram',
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'How do I pay?',
        a: 'Payment is made in USDT on the TRC20 network. Join our Telegram channel, pick a level, and you will get the wallet address and the exact amount to send. Access is granted as soon as the payment arrives.',
      },
      {
        q: 'What if the material is not right for me?',
        a: 'The description and contents of every level are available in Telegram before you pay, and the full program is laid out on this page in the “Course path” section.',
      },
      {
        q: 'How long do I keep access to the materials?',
        a: 'The materials are delivered right after payment and stay with you — access never expires and there is nothing to re-download.',
      },
      {
        q: 'Do I need trading experience to start?',
        a: 'No — the basic level starts with terminology and fundamentals and does not assume you have ever traded.',
      },
    ],
  },
  finalCta: {
    title: 'Ready to start?',
    sub: 'Choosing a level and paying takes just a few minutes in Telegram.',
    cta: 'Join the channel',
  },
  footer: {
    note: 'Crypto trading education: a structured program, practice on real market situations and instant access to the materials after payment.',
    navLabel: 'Sections',
    links: {
      program: "What's inside",
      howItWorks: 'How it works',
      roadmap: 'Course path',
      courses: 'Course levels',
      faq: 'FAQ',
    },
    contactLabel: 'Contact',
    contactHandle: 'Telegram channel',
    // An icon with no text inside is a link without a name: a screen reader
    // would just say "link", and a crawler would not know where it leads.
    social: {
      label: 'Find us on',
      channel: 'Telegram channel',
    },
    contactNote: 'Courses are sold exclusively through our official Telegram channel.',
    risk: 'Course materials are educational and are not personal investment advice. Trading on the crypto market carries a risk of losing the money you invest — make your own decisions and never use money you cannot afford to lose.',
  },
};
