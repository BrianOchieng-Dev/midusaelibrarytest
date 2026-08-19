import { Book, CategoryInfo, Testimonial } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'self-dev',
    name: 'Self Development',
    slug: 'self-development',
    iconName: 'Sparkles',
    count: 2450,
    description: 'High-leverage habits, peak mental clarity, dopamine recalibration, and lifelong discipline.',
    accentColor: '#8B5CF6',
    gradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
  },
  {
    id: 'biz',
    name: 'Business',
    slug: 'business',
    iconName: 'Briefcase',
    count: 1890,
    description: 'Strategic leadership, product-market fit, operating systems, and corporate execution frameworks.',
    accentColor: '#1E90FF',
    gradient: 'from-blue-500/10 via-sky-500/5 to-transparent',
  },
  {
    id: 'psych',
    name: 'Psychology',
    slug: 'psychology',
    iconName: 'Brain',
    count: 1620,
    description: 'Behavioral economics, persuasion dynamics, emotional resilience, and cognitive biases.',
    accentColor: '#EC4899',
    gradient: 'from-pink-500/10 via-rose-500/5 to-transparent',
  },
  {
    id: 'fin',
    name: 'Finance',
    slug: 'finance',
    iconName: 'TrendingUp',
    count: 1740,
    description: 'Wealth compounding, asymmetric investing, macro liquidity cycles, and personal asset allocation.',
    accentColor: '#10B981',
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
  },
  {
    id: 'entrep',
    name: 'Entrepreneurship',
    slug: 'entrepreneurship',
    iconName: 'Rocket',
    count: 1530,
    description: 'Zero-to-one startup building, venture bootstrapping, monetization models, and scaling playbooks.',
    accentColor: '#F59E0B',
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
  },
];

export const BOOKS_DATA: Book[] = [
  {
    id: 'book-01',
    title: 'Atomic Discipline: The Science of High-Leverage Habits',
    subtitle: 'A neurobiological blueprint for unbroken daily focus, emotional stamina, and rapid skill acquisition.',
    author: 'Dr. Marcus Sterling',
    authorBio: 'Cognitive Neuroscientist and Executive Performance Advisor to top-tier technology founders and athletes.',
    authorRole: 'Behavioral Scientist & Performance Coach',
    priceUSD: 19.99,
    originalPriceUSD: 39.99,
    rating: 4.96,
    reviewsCount: 684,
    category: 'Self Development',
    formats: ['PDF'],
    pages: 340,
    readingTime: '7.5 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-1-95482-201-4',
    fileSizeBytes: '14.2 MB (High-Res PDF)',
    badge: 'BESTSELLER',
    hasFreeSample: true,
    coverGradient: {
      from: '#1e1b4b',
      via: '#312e81',
      to: '#4338ca',
      accent: '#818cf8',
    },
    coverPattern: 'waves',
    description: 'Master the neurological triggers that transform disciplined action from a battle of willpower into an automatic daily reflex. Learn dopamine baseline restoration, environment redesign, and identity-based habit compounding in high-resolution PDF format.',
    keyTakeaways: [
      'The 3-layer neurological loop of cue, craving, and automated reward response.',
      'How to engineer high-friction barriers around destructive digital distractions.',
      'Dopamine detox protocols that make challenging deep work naturally engaging.',
      'Stacking micro-habits to compound professional skill velocity by 300% annually.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'The Willpower Fallacy: Why Motivation Always Fails',
        pages: '1 - 38',
        excerpt: 'Motivation is a volatile neurochemical state that peaks early and evaporates under stress. Sustainable mastery is built on behavioral architecture and environment design, not fleeting emotional surges.'
      },
      {
        number: 2,
        title: 'Dopamine Baselines & The Modern Stimulation Trap',
        pages: '39 - 84',
        excerpt: 'When your brain is inundated with cheap, hyper-palatable digital stimuli, your baseline dopamine resets higher, rendering high-value cognitive work painfully tedious.'
      },
      {
        number: 3,
        title: 'Identity-Driven Friction: Becoming the Person Who Does Not Quit',
        pages: '85 - 140',
        excerpt: 'True behavioral change is not about what you want to achieve, but who you wish to become. Every action is a vote for the type of person you are forging.'
      },
      {
        number: 4,
        title: 'The Daily Protocol: The 90-Minute Unbroken Deep Work Sanctum',
        pages: '141 - 195',
        excerpt: 'Why 90 minutes of pure, uninterrupted focus consistently outperforms 10 hours of fragmented multitasking.'
      }
    ],
    sampleSnippet: `CHAPTER 1: The Systemic Nature of Human Discipline

Every year, millions of ambitious individuals set lofty resolutions with fierce emotional conviction. Within four weeks, over 80% have reverted to their baseline habits. 

The error lies in treating discipline as a moral virtue rather than a biological energy constraint:
1. Decision fatigue drains your prefrontal cortex with every micro-choice.
2. Unprotected environments constantly trigger subconscious reward-seeking loops.
3. Identity dissonance creates hidden internal resistance against new behaviors.

When you redesign your physical workspace, establish immutable start rituals, and measure lead indicators, discipline ceases to be a struggle—it becomes your default operating state.`
  },
  {
    id: 'book-02',
    title: 'The Execution Engine: Modern Strategy & Operating Systems',
    subtitle: 'How world-class executives turn high-level vision into scalable team operating cadences.',
    author: 'Victoria Vance & Thomas Reed',
    authorBio: 'Former Chief Operating Officers and Management Consultants at McKinsey & Bridgewater Associates.',
    authorRole: 'Operating Executives & Corporate Strategists',
    priceUSD: 24.99,
    originalPriceUSD: 49.99,
    rating: 4.93,
    reviewsCount: 472,
    category: 'Business',
    formats: ['PDF'],
    pages: 420,
    readingTime: '9.0 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-0-39958-821-2',
    fileSizeBytes: '18.6 MB (High-Res PDF)',
    badge: 'BESTSELLER',
    hasFreeSample: true,
    coverGradient: {
      from: '#0f172a',
      via: '#1e3a8a',
      to: '#1e90ff',
      accent: '#38bdf8',
    },
    coverPattern: 'geometric',
    description: 'Strategy without execution is a hallucination. Victoria Vance and Thomas Reed share battle-tested frameworks for OKR alignment, board reporting, cross-functional prioritization, and high-velocity organizational rhythm in printable PDF format.',
    keyTakeaways: [
      'Design clear decision rights using the RAPID and RACI frameworks.',
      'Eliminate organizational drag by replacing status meetings with asynchronous memos.',
      'Align capital allocation and team bandwidth with the single North Star metric.',
      'The 90-day operating sprint structure used by the fastest-scaling global enterprises.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'The Clarity Imperative: Defining the True North Star',
        pages: '1 - 44',
        excerpt: 'When an organization has ten priorities, it has zero priorities. Strategic leadership is the ruthless discipline of deciding what NOT to do.'
      },
      {
        number: 2,
        title: 'Asynchronous Operating Rhythms & 6-Page Narrative Memos',
        pages: '45 - 96',
        excerpt: 'Slide decks conceal shallow thinking. High-conviction operating teams require structured narrative memos read in silence before decisions are rendered.'
      },
      {
        number: 3,
        title: 'Cascading Accountability: From Board Room to Frontline Sprint',
        pages: '97 - 160',
        excerpt: 'Connecting weekly team deliverables directly to company EBITDA and customer retention metrics without micromanagement.'
      }
    ],
    sampleSnippet: `CHAPTER 1: The Anatomy of Operational Velocity

Speed in business is not about working longer hours; it is about reducing the time between identifying a problem and executing an irreversible decision.

The three primary friction points in modern corporate operations are:
1. Ambiguous Decision Ownership (too many vetoes, no single accountable owner)
2. Excessive Synchronous Status Meetings (fragmenting executive cognitive flow)
3. Vanity Metric Optimization (tracking activity instead of economic outcome)

By installing a clear decision matrix and quarterly execution cadences, organizations unlock unprecedented agility.`
  },
  {
    id: 'book-03',
    title: 'Cognitive Alchemy: Behavioral Economics & Human Decisions',
    subtitle: 'How unseen cognitive biases govern consumer behavior, product traction, and daily choices.',
    author: 'Elena Rostova, Ph.D.',
    authorBio: 'Cognitive Neuroscientist and Senior Behavioral Advisor to Fortune 50 FinTechs and consumer apps.',
    authorRole: 'Behavioral Scientist & Author',
    priceUSD: 21.99,
    originalPriceUSD: 44.99,
    rating: 4.95,
    reviewsCount: 820,
    category: 'Psychology',
    formats: ['PDF'],
    pages: 368,
    readingTime: '7.8 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-0-45229-881-2',
    fileSizeBytes: '15.1 MB (High-Res PDF)',
    badge: 'TRENDING',
    hasFreeSample: true,
    coverGradient: {
      from: '#2e1065',
      via: '#6b21a8',
      to: '#8b5cf6',
      accent: '#f43f5e',
    },
    coverPattern: 'neural',
    description: 'Discover how subconscious anchors, dopamine feedback loops, and default biases dictate human decisions in this comprehensive PDF guide.',
    keyTakeaways: [
      'Harness the Peak-End rule to design unforgettable user onboarding flows.',
      'Overcome loss aversion to accelerate sales conversations and reduce churn.',
      'The neurobiology of habit formation and friction removal in high-converting products.',
      'Ethical frameworks for behavioral nudges in modern digital interfaces.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'The Illusion of Rationality in Daily Choice',
        pages: '1 - 42',
        excerpt: 'We believe we are deliberate captains of our decisions, yet over 85% of cognitive processing occurs in subconscious heuristic fast paths.'
      },
      {
        number: 2,
        title: 'Hyperbolic Discounting & Immediate Gratification',
        pages: '43 - 88',
        excerpt: 'Why the human brain values $10 today over $20 next month, and how subscription models leverage temporal tension.'
      },
      {
        number: 3,
        title: 'Social Proof, Mimetic Desire, and Viral Loops',
        pages: '89 - 145',
        excerpt: 'Humans look to others not merely to observe what to buy, but to learn what to desire.'
      }
    ],
    sampleSnippet: `CHAPTER 1: The Heuristic Paradox

Consider the last software tool you subscribed to. Was it an exhaustive mathematical comparison of features against price? Or did a clean testimonial, a single seamless onboarding animation, and the endorsement of a respected peer tip the scales?

Our brains are energy-conservation engines. When faced with complexity, System 1 thinking substitutes a difficult question with an intuitive, effortless surrogate.`
  },
  {
    id: 'book-04',
    title: 'Algorithmic Wealth: Quantitative Finance & Asymmetric Bets',
    subtitle: 'A modern guide to index compounding, liquidity pools, volatility arbitrage, and real estate syndicates.',
    author: 'Arthur Pendelton & Claire Moreau',
    authorBio: 'Former Quantitative Portfolio Managers at Citadel and Two Sigma; Angel Investors in 40+ FinTechs.',
    authorRole: 'Hedge Fund Quantitative Strategists',
    priceUSD: 27.99,
    originalPriceUSD: 54.99,
    rating: 4.97,
    reviewsCount: 590,
    category: 'Finance',
    formats: ['PDF'],
    pages: 450,
    readingTime: '9.5 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-0-39324-110-8',
    fileSizeBytes: '19.8 MB (High-Res PDF)',
    badge: 'BESTSELLER',
    hasFreeSample: true,
    coverGradient: {
      from: '#064e3b',
      via: '#047857',
      to: '#10b981',
      accent: '#fbbf24',
    },
    coverPattern: 'grid',
    description: 'Demystifying institutional financial strategies for individual investors in clean, high-resolution PDF format with printable sheets and worked models.',
    keyTakeaways: [
      'Construct an all-weather portfolio immune to monetary inflation and currency volatility.',
      'Understand options greeks to hedge downside risk during macro market corrections.',
      'Tax-efficient cash flow compounding across international jurisdictions.',
      'Automating personal finances to create zero-stress wealth compounding loops.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'Expected Value & The Mathematics of Asymmetry',
        pages: '1 - 52',
        excerpt: 'Investing is not about being right often; it is about how much you win when you are right versus how little you lose when you are wrong.'
      },
      {
        number: 2,
        title: 'Macro Liquidity Cycles and Central Bank Mechanics',
        pages: '53 - 114',
        excerpt: 'All asset prices are a derivative of central bank balance sheets and global liquidity flows.'
      },
      {
        number: 3,
        title: 'Automating the Compounding Flywheel',
        pages: '115 - 170',
        excerpt: 'Removing emotional bias by creating rule-based rebalancing and algorithmic dividend reinvestment systems.'
      }
    ],
    sampleSnippet: `CHAPTER 1: The Asymmetric Advantage

In conventional financial advice, risk and reward are portrayed as rigidly linear: to gain more, you must accept catastrophic downside. Quantitative investors know this is a misconception. 

By finding mispriced optionality—where the downside is strictly capped at 1x while the upside potential is 10x or 50x—you decouple long-term returns from market speculation.`
  },
  {
    id: 'book-05',
    title: 'Zero to Hypergrowth: The Modern B2B SaaS Playbook',
    subtitle: 'From first $10K MRR to $50M ARR: Product-led growth, pricing power, and outbound mechanics.',
    author: 'Marcus Vance & Samantha Lee',
    authorBio: '3x SaaS Founders with over $120M in collective exits; Venture Partner at Horizon Capital.',
    authorRole: 'SaaS Founders & Investors',
    priceUSD: 29.99,
    originalPriceUSD: 59.99,
    rating: 4.98,
    reviewsCount: 745,
    category: 'Entrepreneurship',
    formats: ['PDF'],
    pages: 416,
    readingTime: '8.5 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-1-61729-940-1',
    fileSizeBytes: '22.4 MB (High-Res PDF)',
    badge: 'BESTSELLER',
    hasFreeSample: true,
    coverGradient: {
      from: '#78350f',
      via: '#b45309',
      to: '#f59e0b',
      accent: '#fde047',
    },
    coverPattern: 'funnel',
    description: 'The raw, unfiltered PDF blueprint for building high-margin software businesses, pricing strategy, and growth mechanics.',
    keyTakeaways: [
      'Construct a self-serve pricing matrix that scales automatically with customer value.',
      'Achieve sub-90 day CAC payback through developer advocate and content-led pipelines.',
      'Build a predictable outbound machine generating $500K pipeline monthly.',
      'Managing Net Revenue Retention (NRR) above 125% with zero extra churn.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'Validating Pain Points Before Writing a Single Line of Code',
        pages: '1 - 45',
        excerpt: 'If customers will not commit upfront deposits or sign letters of intent based on interactive Figma mockups, they will not pay for working software.'
      },
      {
        number: 2,
        title: 'Value-Metric Pricing: Why Seat-Based Models Are Dying',
        pages: '46 - 95',
        excerpt: 'Aligning price with units of delivered value—API calls, compute minutes, or generated revenue—prevents account cannibalization.'
      },
      {
        number: 3,
        title: 'The First 100 Enterprise Closes: Anatomy of a Demo',
        pages: '96 - 150',
        excerpt: 'Stop showing feature tours. Start showing customer problem resolutions in the first 4 minutes of any executive demo.'
      }
    ],
    sampleSnippet: `INTRODUCTION: The New Laws of Software Scale

The era of cheap capital and vanity metrics is over. Today, the winners in B2B software are built on three fundamental pillars:
1. Product-Led Onboarding with Time-to-Value under 3 minutes
2. Net Revenue Retention exceeding 120% through automated expansion
3. Hyper-focused positioning against legacy bloated incumbents`
  },
  {
    id: 'book-06',
    title: 'Deep Focus & Neuroplasticity: The High Performer’s Handbook',
    subtitle: 'Protocols for unbroken 4-hour cognitive flow, dopamine reset, and metabolic vitality.',
    author: 'Julian Thorne',
    authorBio: 'Performance Coach to Olympic Athletes, Chess Grandmasters, and Silicon Valley Executives.',
    authorRole: 'Human Performance Specialist',
    priceUSD: 16.99,
    originalPriceUSD: 34.99,
    rating: 4.90,
    reviewsCount: 430,
    category: 'Self Development',
    formats: ['PDF'],
    pages: 290,
    readingTime: '6.0 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-0-06245-771-4',
    fileSizeBytes: '11.5 MB (High-Res PDF)',
    badge: 'STAFF PICK',
    hasFreeSample: true,
    coverGradient: {
      from: '#1e293b',
      via: '#334155',
      to: '#475569',
      accent: '#38bdf8',
    },
    coverPattern: 'waves',
    description: 'Escape the shallow distraction trap. Learn scientifically proven circadian alignment and deep focus protocols in instant DRM-free PDF format.',
    keyTakeaways: [
      'Eliminate context switching to reclaim 3+ hours of high-output daily creative energy.',
      'The 90-minute ultradian rhythm protocol for deep technical or strategic problem-solving.',
      'Dopamine recalibration routines that make challenging work deeply rewarding.',
      'Evening wind-down architecture to maximize REM sleep and memory consolidation.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'The Biology of Distraction in an Attention Economy',
        pages: '1 - 32',
        excerpt: 'Every notification is a micro-seizure of your prefrontal cortex. Understanding the neurological cost of multitasking is the first step toward sovereignty.'
      },
      {
        number: 2,
        title: 'The 4-Hour Deep Work Sanctum',
        pages: '33 - 75',
        excerpt: 'Why 4 hours of pure, undistracted cognitive focus accomplishes more than 12 hours of fragmented multitasking.'
      }
    ],
    sampleSnippet: `CHAPTER 1: The Attention Threshold

When you switch tasks—even for a split-second glance at an incoming message—a residue of your attention remains stuck on the prior topic. This phenomenon, known as Attention Residue, drastically diminishes your problem-solving depth for up to 25 minutes.`
  },
  {
    id: 'book-07',
    title: 'The Laws of Influence: Persuasion, Power & Dark Psychology',
    subtitle: 'Unraveling psychological leverage, high-stakes negotiation, and interpersonal dynamics.',
    author: 'Dr. Julian Vance',
    authorBio: 'Former Federal Crisis Negotiator and Professor of Organizational Psychology at Columbia.',
    authorRole: 'Negotiation & Behavioral Strategist',
    priceUSD: 22.99,
    originalPriceUSD: 45.99,
    rating: 4.94,
    reviewsCount: 512,
    category: 'Psychology',
    formats: ['PDF'],
    pages: 380,
    readingTime: '8.2 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-0-14312-774-1',
    fileSizeBytes: '16.4 MB (High-Res PDF)',
    badge: 'TOP RATED',
    hasFreeSample: true,
    coverGradient: {
      from: '#4c0519',
      via: '#881337',
      to: '#be123c',
      accent: '#fda4af',
    },
    coverPattern: 'neural',
    description: 'Master the subtle psychological undercurrents that dictate boardroom negotiations and interpersonal dynamics in DRM-free PDF format.',
    keyTakeaways: [
      'Master tactical empathy and mirror labeling to defuse high-tension negotiations.',
      'Deconstruct covert gaslighting, guilt anchoring, and cognitive framing tricks.',
      'Establishing unshakeable personal boundaries and executive presence.',
      'The calibrated question framework that leads opponents to your desired conclusion.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'Tactical Empathy & The Mirroring Principle',
        pages: '1 - 40',
        excerpt: 'Empathy is not sympathy; it is the ruthless psychological reconnaissance of what the opposing party truly fears.'
      },
      {
        number: 2,
        title: 'Calibrated Questions: How to Say "No" by Asking "How"',
        pages: '41 - 92',
        excerpt: 'Forcing the counterparty to solve your implementation dilemma transforms a conflict into collaborative problem-solving.'
      }
    ],
    sampleSnippet: `CHAPTER 1: The Reconnaissance of Intent

In every high-stakes dialogue, the stated demand is rarely the underlying emotional driver. Beneath demands for higher compensation or faster delivery lies the fundamental human need for safety, respect, and autonomy.

By labeling the unexpressed emotion with calm precision—"It seems like you feel unvalued in this timeline"—you disarm hostility and open the gateway to mutual leverage.`
  },
  {
    id: 'book-08',
    title: 'The Sovereign Capitalist: Cash Flow, Real Assets & Generational Compounding',
    subtitle: 'Building anti-fragile wealth through cash-flowing assets, private equity, and tax sovereignty.',
    author: 'James Sterling & Sarah Al-Mansoor',
    authorBio: 'Managing Partners at Apex Family Office managing $450M in diversified real assets and private debt.',
    authorRole: 'Private Wealth Stewards',
    priceUSD: 25.99,
    originalPriceUSD: 52.00,
    rating: 4.95,
    reviewsCount: 390,
    category: 'Finance',
    formats: ['PDF'],
    pages: 430,
    readingTime: '9.1 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-0-59313-520-4',
    fileSizeBytes: '18.9 MB (High-Res PDF)',
    badge: 'NEW ARRIVAL',
    hasFreeSample: true,
    coverGradient: {
      from: '#022c22',
      via: '#065f46',
      to: '#059669',
      accent: '#6ee7b7',
    },
    coverPattern: 'grid',
    description: 'Move beyond basic index funds. Learn how family offices structure real estate syndications, cash-flowing small business acquisitions, and multi-generational trusts in PDF edition.',
    keyTakeaways: [
      'The Cash-Flow Quadrant 2.0: Transitioning from high-income earner to capital allocator.',
      'Analyzing commercial real estate and self-storage syndications for 15%+ IRR.',
      'Acquiring boring, recession-proof SMBs with seller financing and SBA leverage.',
      'Asset protection trusts and legal tax mitigation frameworks.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'The Capital Allocation Matrix: Velocity vs. Preservation',
        pages: '1 - 48',
        excerpt: 'High income does not equal high wealth. Without recurring passive cash flows independent of your labor, you remain financially vulnerable.'
      },
      {
        number: 2,
        title: 'Buying Cash-Flowing Small Businesses: The Micro-PE Playbook',
        pages: '49 - 105',
        excerpt: 'Why buying an existing plumbing or HVAC business with $500K EBITDA generates higher risk-adjusted returns than tech venture capital.'
      }
    ],
    sampleSnippet: `CHAPTER 1: The Wealth Velocity Equation

Most people spend 40 years trading time for dollars, only to park their savings in volatile speculative assets. Sovereign wealth creators invert this: they deploy capital into cash-flowing assets that purchase their time back immediately.

When your passive monthly distribution exceeds your living expenses, your career choices are guided purely by passion and purpose.`
  },
  {
    id: 'book-09',
    title: 'The Bootstrapped Empire: Zero-to-One Cash-Flow Machines',
    subtitle: 'How solo founders build 7-figure micro-enterprises with no venture capital and high profit margins.',
    author: 'Brian Ochieng & Derek Siverson',
    authorBio: 'Bootstrapped Founders of 4 profitable internet businesses generating $3M+ in annual recurring revenue.',
    authorRole: 'Indie Founders & Venture Bootstrappers',
    priceUSD: 23.99,
    originalPriceUSD: 48.00,
    rating: 4.96,
    reviewsCount: 610,
    category: 'Entrepreneurship',
    formats: ['PDF'],
    pages: 350,
    readingTime: '7.4 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-1-59184-902-4',
    fileSizeBytes: '15.7 MB (High-Res PDF)',
    badge: 'STAFF PICK',
    hasFreeSample: true,
    coverGradient: {
      from: '#451a03',
      via: '#9a3412',
      to: '#ea580c',
      accent: '#fdba74',
    },
    coverPattern: 'geometric',
    description: 'Discover how modern solo entrepreneurs leverage automation, high-ticket digital products, and niche software to build high-margin lifestyle empires in PDF format.',
    keyTakeaways: [
      'Finding micro-niche problems where customers gladly pay $100–$500/month.',
      'Building in public to generate an engaged audience of 10,000+ true fans.',
      'Automating customer support and billing using modern low-code & AI pipelines.',
      'Achieving 85%+ gross profit margins with zero full-time payroll overhead.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'The Solo Empire Philosophy: Revenue Per Employee Optimization',
        pages: '1 - 36',
        excerpt: 'A business with $1M in revenue and 90% profit margins run by 2 people is vastly superior to a $10M company burning $2M annually.'
      },
      {
        number: 2,
        title: 'Validating Micro-SaaS & Digital Assets in 48 Hours',
        pages: '37 - 82',
        excerpt: 'How to pre-sell your concept using landing pages and concierge onboarding before writing a single line of software.'
      }
    ],
    sampleSnippet: `CHAPTER 1: The Tyranny of Vanity Scale

For two decades, Silicon Valley celebrated headcounts and funding announcements. The modern founder celebrates net profit, automated distribution, and low stress.

When you target hyper-specific professional workflows with delightful, fast software, you bypass crowded red-ocean markets and establish durable, cash-flowing monopolies.`
  },
  {
    id: 'book-10',
    title: 'Unfair Advantage: Monopolies, Moats & Pricing Power',
    subtitle: 'Strategic positioning frameworks that turn commodity services into premium, high-margin category leaders.',
    author: 'Claire Moreau',
    authorBio: 'Professor of Strategic Management and Advisor to High-Growth Brands across Europe and the US.',
    authorRole: 'Brand & Corporate Strategist',
    priceUSD: 22.99,
    originalPriceUSD: 46.00,
    rating: 4.92,
    reviewsCount: 388,
    category: 'Business',
    formats: ['PDF'],
    pages: 330,
    readingTime: '7.0 hours',
    publicationYear: 2026,
    language: 'English',
    isbn: '978-0-52554-180-2',
    fileSizeBytes: '14.5 MB (High-Res PDF)',
    badge: 'TRENDING',
    hasFreeSample: true,
    coverGradient: {
      from: '#1e3a8a',
      via: '#2563eb',
      to: '#3b82f6',
      accent: '#93c5fd',
    },
    coverPattern: 'geometric',
    description: 'Competition is for losers. Claire Moreau unpacks economic moats and pricing power in this instant-download PDF edition.',
    keyTakeaways: [
      'How to establish switching costs that make customer churn practically impossible.',
      'Repositioning commodity offerings into category-defining luxury or mission-critical assets.',
      'Constructing two-sided network effects that self-compound with scale.',
      'Pricing psychology: How to double your rates without losing premium clients.',
    ],
    tableOfContents: [
      {
        number: 1,
        title: 'The 7 Economic Moats That Protect High-Margin Profits',
        pages: '1 - 40',
        excerpt: 'A business without an economic moat is merely renting its profits until competitors drive prices down to marginal cost.'
      },
      {
        number: 2,
        title: 'Pricing Power: The Ultimate Indicator of Business Quality',
        pages: '41 - 86',
        excerpt: 'If you need to hold a prayer meeting before raising prices by 10%, you have a terrible business. Here is how to engineer true pricing dominance.'
      }
    ],
    sampleSnippet: `CHAPTER 1: The Moat Archetypes

Warren Buffett famously said that what counts most in business is the width and durability of the castle moat. 

The 5 most durable moats in the knowledge economy are:
1. High Switching Costs (deep workflow integration)
2. Network Effects (each user adds value to every other user)
3. Brand Reputation & Trust Premium (insurance against failure)
4. Proprietary Knowledge or Process (tacit founder secrets)
5. Low-Cost Distribution Advantages (organic audience loops)

When you deliberately design these moats into your product from day one, longevity is assured.`
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Sarah Jenkins',
    role: 'Managing Partner',
    company: 'FinTech Growth Labs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'MidusaElibrary is hands down the best digital bookstore for ambitious professionals. The curation in Self Development, Psychology, and Finance is top tier. The instant PDF delivery and sample reader make reading on any device seamless.',
    bookTitle: 'Atomic Discipline',
    date: '2 days ago',
  },
  {
    id: 'test-02',
    name: 'Brian Ochieng',
    role: 'Founder & Investor',
    company: 'Nairobi Ventures',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'The direct WhatsApp ordering feature is brilliant! I ordered three business and entrepreneurship titles and received the high-resolution PDF download links directly on my phone. Clean layout, DRM-free files.',
    bookTitle: 'Zero to Hypergrowth',
    date: '1 week ago',
  },
  {
    id: 'test-03',
    name: 'Dr. Amara Thorne',
    role: 'Executive Coach & Lecturer',
    company: 'Institute of Behavioral Sciences',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Finding thoroughly vetted psychology and self-development PDF eBooks with lifetime access has completely transformed my reading routine. MidusaElibrary is phenomenal.',
    bookTitle: 'Cognitive Alchemy',
    date: '3 days ago',
  },
  {
    id: 'test-04',
    name: 'David Kim',
    role: 'Quantitative Portfolio Manager',
    company: 'Alpha Capital Partners',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Crisp diagrams, beautiful typography, and high-resolution PDF downloads in the Finance section. The level of polish in Midusa sets a brand new standard for digital marketplaces.',
    bookTitle: 'Algorithmic Wealth',
    date: '5 days ago',
  }
];

export const FAQS = [
  {
    question: 'What format are the eBooks delivered in?',
    answer: 'All eBooks on MidusaElibrary are delivered in universal, high-resolution DRM-free PDF format. This ensures crystal-clear typography, preserved diagrams, and seamless compatibility across laptops, tablets, iPads, Kindles, and mobile phones.'
  },
  {
    question: 'How do I access my PDF eBook after purchasing?',
    answer: 'Immediately upon completing your order (via Card, Mobile Money, PayPal, or WhatsApp), you receive an instant download link to your complete DRM-free PDF. You can also read it anytime directly in our built-in interactive browser reader.'
  },
  {
    question: 'Can I read the PDF on Kindle, iPad, and mobile devices?',
    answer: 'Yes! All files are standard high-resolution PDFs. You can open them in Apple Books, Adobe Acrobat, Google Drive, Send-to-Kindle, or any PDF reader app of your choice.'
  },
  {
    question: 'How does the WhatsApp Direct Order feature work?',
    answer: 'When you click the WhatsApp button on any book or your shopping cart, it generates a pre-formatted message with your selected eBook titles and order total. Our concierge team confirms your order and delivers the PDF download links directly to your WhatsApp.'
  },
  {
    question: 'Do I get lifetime access and future PDF updates?',
    answer: 'Absolutely. Every purchase includes lifetime access. Whenever an author releases revised editions or updated diagrams, you receive the updated PDF files free of charge.'
  },
  {
    question: 'What if I am not satisfied with my purchase?',
    answer: 'We offer a 30-day, 100% money-back guarantee. If a PDF eBook does not meet your expectations, simply message our support team or WhatsApp concierge for a prompt refund.'
  }
];
