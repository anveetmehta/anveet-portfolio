// ── Types ──────────────────────────────────────────────────────────────────

export interface SiteMeta {
  name: string;
  title: string;
  description: string;
  email: string;
  location: string;
  socialLinks: {
    label: string;
    href: string;
  }[];
}

export interface HeroContent {
  eyebrow: string;
  h1: string;
  supporting: string[];
  ctas: { label: string; variant: 'primary' | 'ghost' | 'link'; href: string }[];
}

export interface Signal {
  value: string;
  label: string;
  description?: string;
}

export interface SystemsLayerContent {
  label: string;
  headline: string;
  body: string[];
  systemTypes: string[];
  closing: string;
}

export interface ShapedSystem {
  title: string;
  description: string;
  operationalFragment?: string;
  focusAreas: string[];
  tags: string[];
}

export interface Exploration {
  title: string;
  description: string;
  transforms?: string[];
  cta?: { label: string; href: string };
  status: string;
  currentQuestions?: string[];
}

export interface MentalModel {
  title: string;
  description: string;
}

export interface NoteEntry {
  title: string;
  teaser?: string;
  href?: string;
  status: 'published' | 'draft' | 'planned';
}

export interface OpenThreadsContent {
  label: string;
  heading?: string;
  body: string;
  areas: string[];
  cta: { label: string; href: string };
}

// Legacy types — kept for backward compat with existing pages/APIs
export interface BuildStackItem {
  icon: string;
  name: string;
  proofLine: string;
  link?: string;
}

export interface WritingEntry {
  title: string;
  summary: string;
  status: 'published' | 'draft' | 'planned';
  href: string;
}

export interface WorkflowStep {
  title: string;
  details: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  contribution: string;
  outcome: string;
  context: string;
  problem: string;
  role: string;
  approach: string;
  architecture: WorkflowStep[];
  impact: string[];
  learnings: string[];
  obsessions: string[];
  artifacts: string[];
  tags: string[];
}

// ── Site Meta ──────────────────────────────────────────────────────────────

export const siteMeta: SiteMeta = {
  name: 'Anveet Mehta',
  title: 'Anveet Mehta — Operational Intelligence, AI Systems & Trust Infrastructure',
  description:
    'A living system of thought exploring operational intelligence, AI-native workflows, onboarding systems, trust infrastructure, fintech operations, and machine-assisted decision systems.',
  email: 'anveet.07@gmail.com',
  location: 'Bengaluru, India',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anveetmehta' },
    { label: 'GitHub', href: 'https://github.com/anveetmehta' }
  ]
};

// ── Hero (Entry Point) ─────────────────────────────────────────────────────

export const heroContent: HeroContent = {
  eyebrow: 'Operational Intelligence • AI Systems • Trust Infrastructure',
  h1: 'Modern digital trust runs on invisible systems.',
  supporting: [
    'Most digital systems quietly depend on operational layers few teams fully understand: trust orchestration, workflow cognition, risk infrastructure, machine-assisted decisions, and adaptive operational intelligence.',
    'That\'s the layer I\'m most interested in.',
  ],
  ctas: [
    { label: 'Enter the System', variant: 'primary', href: '#systems' },
    { label: 'Read the Notes', variant: 'ghost', href: '#notes' },
  ]
};

// ── Signals ────────────────────────────────────────────────────────────────

export const signals: Signal[] = [
  {
    value: '5M+',
    label: 'onboarding workflows',
    description: 'Operational systems built across regulated digital ecosystems.',
  },
  {
    value: 'Human-AI',
    label: 'review architectures',
    description: 'Designing operational layers where machine suggestion and human judgment coexist without increasing cognitive overhead.',
  },
  {
    value: 'Adaptive',
    label: 'operational systems',
    description: 'Workflow infrastructures designed to evolve under operational pressure and scale.',
  },
  {
    value: 'Trust',
    label: 'orchestration systems',
    description: 'Building operational layers underneath onboarding, compliance, and financial workflows.',
  },
  {
    value: 'Workflow',
    label: 'cognition systems',
    description: 'Exploring how workflows evolve from static process chains into adaptive operational systems.',
  },
];

// ── The Systems Layer ──────────────────────────────────────────────────────

export const systemsLayerContent: SystemsLayerContent = {
  label: 'The System',
  headline: 'The systems underneath modern products.',
  body: [
    'Operational complexity rarely arrives dramatically. It accumulates slowly — through edge cases, manual reviews, exceptions, handoffs, risk escalations, decision fatigue, and fragmented workflows.',
    'Most organizations experience operational failure long before they understand operational architecture.',
    'Digital systems increasingly depend on invisible operational layers: workflows, trust systems, onboarding infrastructure, machine-assisted decisions, operational orchestration, adaptive intelligence.',
    'The next generation of software will not merely optimize interfaces. It will redesign operational systems themselves.',
  ],
  systemTypes: [
    'workflows',
    'trust systems',
    'onboarding infrastructure',
    'machine-assisted decisions',
    'operational orchestration',
    'adaptive intelligence',
  ],
  closing: 'This is the layer I\'m most interested in.',
};

// ── Systems I've Helped Shape ──────────────────────────────────────────────

export const shapedSystems: ShapedSystem[] = [
  {
    title: 'Omnichannel Onboarding Infrastructure',
    description:
      'A multi-channel onboarding ecosystem spanning RM-assisted workflows, DIY onboarding, API-led onboarding, and partner-driven operational systems — built for regulated financial ecosystems at scale. Focused on trust orchestration, workflow simplification, operational scale, and compliance alignment.',
    operationalFragment: 'Most onboarding friction doesn\'t come from forms. It comes from ambiguity between systems — the gap where one workflow ends and another begins without clear operational ownership.',
    focusAreas: [
      'trust orchestration across onboarding channels',
      'workflow simplification under compliance constraints',
      'operational scale across regulated ecosystems',
      'edge case handling without manual override escalation',
    ],
    tags: ['Onboarding', 'Trust Infrastructure', 'Workflow Systems', 'Compliance'],
  },
  {
    title: 'AI-Assisted Risk Operations',
    description:
      'Operational intelligence systems designed around AML workflows, onboarding risk systems, false-positive reduction, and human-AI review architectures — with a focus on explainable operational reasoning and cognitive load reduction.',
    operationalFragment: 'False positives become organizational bottlenecks before they become model problems. Human review systems quietly become cognitive load systems under scale.',
    focusAreas: [
      'false-positive reduction through operational signal weighting',
      'human-AI review architectures for complex risk decisions',
      'explainable operational reasoning for analyst workflows',
      'continuous due diligence without operational overhead',
    ],
    tags: ['AI Systems', 'AML', 'Risk Operations', 'Compliance Intelligence'],
  },
  {
    title: 'Intelligent Workflow Systems',
    description:
      'Exploring how workflows evolve from rigid process chains into adaptive operational systems — combining workflow cognition, operational orchestration, AI-native workflows, and machine-assisted judgment.',
    operationalFragment: 'Workflow rigidity becomes visible only under operational pressure. Most scaling problems are workflow design problems first.',
    focusAreas: [
      'workflow cognition and adaptive operational logic',
      'AI copilots embedded into decision flows',
      'machine-assisted judgment with human override integrity',
      'operational orchestration across dynamic workflow environments',
    ],
    tags: ['AI', 'Workflow Cognition', 'Operational Intelligence', 'Adaptive Systems'],
  },
];

// ── Active Explorations ────────────────────────────────────────────────────

export const explorations: Exploration[] = [
  {
    title: 'RegRadar',
    description:
      'Real-time regulatory intelligence for operational teams navigating evolving compliance ecosystems. Transforms regulatory updates, circulars, and operational shifts into actionable operational insight.',
    transforms: [
      'Regulatory updates → operational impact assessments',
      'Compliance shifts → workflow triggers',
      'Policy changes → implementation intelligence',
    ],
    cta: { label: 'Join Early Access', href: 'mailto:anveet.07@gmail.com?subject=RegRadar Early Access' },
    status: 'Exploring',
    currentQuestions: [
      'Can operational intelligence become real-time?',
      'What happens when compliance evolves into adaptive systems?',
      'How should machine-assisted interpretation work in regulated environments?',
    ],
  },
  {
    title: 'Workflow Intelligence Systems',
    description:
      'Exploring adaptive workflows and operational cognition systems — building toward AI that augments human operational judgment without increasing cognitive overhead.',
    status: 'Building',
    currentQuestions: [
      'What happens when workflows become context-aware?',
      'Can operational cognition become infrastructure?',
      'How should AI expose uncertainty inside operational systems?',
    ],
  },
  {
    title: 'Council of Elites',
    description:
      'Multi-agent reasoning environments exploring strategic cognition and machine-assisted thought systems — where distinct AI perspectives surface, debate, and refine operational reasoning.',
    status: 'Experimenting',
    currentQuestions: [
      'Can systems think collaboratively without converging prematurely?',
      'How should conflicting operational reasoning surface without amplifying noise?',
      'What does machine-assisted strategic exploration actually look like?',
    ],
  },
];

// ── Mental Models ──────────────────────────────────────────────────────────

export const mentalModels: MentalModel[] = [
  {
    title: 'Complexity compounds quietly.',
    description:
      'Organizations often mistake operational exhaustion for growth long before systems visibly fail. The accumulation is invisible until it isn\'t.',
  },
  {
    title: 'Trust is infrastructure.',
    description:
      'Payments, onboarding, compliance, and workflows are fundamentally systems of coordinated trust. They should be designed accordingly.',
  },
  {
    title: 'AI should reduce ambiguity.',
    description:
      'Operational AI should reduce cognitive burden rather than increase dashboards and workflow complexity. If interpretation requires the same effort, the system hasn\'t helped.',
  },
  {
    title: 'Systems shape decisions.',
    description:
      'Operational systems silently determine which decisions organizations are capable of making. The system you build determines the choices available inside it.',
  },
];

// ── Notes From The System ──────────────────────────────────────────────────

export const notesFromSystem: NoteEntry[] = [
  {
    title: 'Scale reveals the operational architecture you ignored',
    teaser: 'The systems that hold at 10K users quietly collapse at 1M.',
    status: 'planned',
  },
  {
    title: 'Operational copilots and the future of machine-assisted judgment',
    teaser: 'What it actually means to augment a compliance analyst with AI.',
    status: 'planned',
  },
  {
    title: 'Trust infrastructure is becoming software',
    teaser: 'Why onboarding, payments, and risk are converging into a single operational layer.',
    status: 'planned',
  },
  {
    title: 'Workflow rigidity is becoming a competitive disadvantage',
    teaser: 'Static process chains cannot absorb the operational pressure modern systems produce.',
    status: 'planned',
  },
  {
    title: 'Compliance is evolving into operational intelligence',
    teaser: 'Documentation-based compliance is giving way to machine-assisted interpretation systems.',
    status: 'planned',
  },
  {
    title: 'Operational systems fail long before organizations notice',
    teaser: 'Systems rarely fail dramatically. They fail through accumulated exceptions.',
    status: 'planned',
  },
];

// ── Open Threads ───────────────────────────────────────────────────────────

export const openThreadsContent: OpenThreadsContent = {
  label: 'Open Threads',
  heading: 'Exploring intelligent operational systems.',
  body: 'I occasionally engage with founders, operators, and builders exploring the operational layers of their systems — whether that\'s onboarding infrastructure, AI-native workflows, trust systems, or machine-assisted operational design.',
  areas: [
    'operational intelligence',
    'onboarding systems',
    'AI-native workflows',
    'trust infrastructure',
    'adaptive operational systems',
    'machine-assisted operations',
  ],
  cta: { label: 'Start a Conversation', href: 'mailto:anveet.07@gmail.com' },
};

// ── Legacy Data (kept for backward compat — old section components still import these) ──

export interface AboutContent {
  intro: string;
  body: string;
  knownFor: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: 'live' | 'building' | 'idea';
  link?: string;
}

export interface ExpertiseArea {
  title: string;
  summary: string;
  example: string;
  highlights: string[];
}

export const aboutContent: AboutContent = {
  intro: 'I\'m systems-first. I don\'t start with screens — I start with the underlying machine: actors, incentives, constraints, failure modes, and decisions.',
  body: 'Professionally, I build in domains where mistakes cost money and trust. Personally, I\'m always tinkering — multi-agent AI, compliance intelligence, decision engines, and even a café — because building is how I learn.',
  knownFor: [
    'Turning ambiguity into a system people can run',
    'Designing modular layers (plugins, decisioning, workflows)',
    'Balancing growth + risk without "checkbox compliance"',
  ],
};

export const nowItems: string[] = [
  'Multi-agent AI that helps people reason, not just answer',
  'Compliance as a continuous intelligence system',
  'Vendor-agnostic risk layers with plugin architecture',
  'Decisioning systems that stay explainable under edge cases',
  'Real-world experimentation through Bread Coffee & Company',
];

export const projects: Project[] = [
  {
    title: 'Council of Elites',
    description: 'A multi-agent AI system where users interact with simulated personalities to explore decisions from multiple perspectives.',
    tags: ['AI', 'Multi-Agent', 'Decision-Making'],
    status: 'building',
  },
  {
    title: 'AI Compliance Assistant',
    description: 'Tracks regulatory updates and converts them into structured, actionable insights for compliance teams.',
    tags: ['AI', 'Compliance', 'Fintech'],
    status: 'building',
  },
  {
    title: 'Bread Coffee & Company',
    description: 'A vegetarian café built around bread-based food, coffee, and shared experiences.',
    tags: ['Business', 'Operations'],
    status: 'live',
  },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Systems over Journeys',
    summary: 'Most people design journeys. I design systems. A journey can be optimized. A system can be scaled.',
    example: 'Reframed onboarding from a linear flow into a modular system with pluggable verification layers.',
    highlights: ['Core components and interactions', 'Sources of complexity', 'Abstraction layers', 'System-level optimization'],
  },
  {
    title: 'Simplicity over Complexity',
    summary: 'Simplicity is usually hiding behind complexity. Good systems reduce effort for both users and operators.',
    example: 'Replaced 4 disconnected tracking tools with a single state machine — fewer dashboards, same truth.',
    highlights: ['Reducing complexity', 'Design-led thinking', 'Clear ownership boundaries'],
  },
];

export const buildStack: BuildStackItem[] = [
  { icon: '🤖', name: 'Claude API', proofLine: 'Multi-agent orchestration' },
  { icon: '⚡', name: 'Next.js 14', proofLine: 'This portfolio + admin CMS' },
  { icon: '🐘', name: 'PostgreSQL', proofLine: 'Full content pipeline on Neon Postgres' },
  { icon: '🎯', name: 'TypeScript', proofLine: 'Type-safe end-to-end' },
];

export const writingCallout = 'Operational systems are the real product.';

export const writingEntries: WritingEntry[] = [
  {
    title: 'Why operational complexity compounds invisibly',
    summary: 'The failure mode no one designs for — until it\'s too late.',
    status: 'planned',
    href: '/writing/operational-complexity',
  },
  {
    title: 'False positives are an operational design problem',
    summary: 'AML teams don\'t have a model problem. They have a workflow problem.',
    status: 'planned',
    href: '/writing/false-positives',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'workflow-visibility-platform',
    title: 'Workflow Visibility Platform',
    excerpt: 'Unified fragmented internal operations into a single actionable control plane.',
    contribution: 'Designed the workflow state machine, data model, and role-based decision surfaces.',
    outcome: 'Reduced manual status reconciliation by 38% and cut escalation response from days to hours.',
    context: 'Operational teams managed status updates across disconnected tools, creating slow handoffs and misaligned reporting.',
    problem: 'Leaders lacked real-time visibility into blocker states, while operators spent significant effort manually reconciling updates.',
    role: 'Led product strategy and execution across design, data, and engineering with ownership from discovery through adoption.',
    approach: 'Built a phased plan: diagnose root causes, define a normalized data model, release shared dashboards, and iteratively automate alerts.',
    architecture: [
      { title: 'Data Ingestion Layer', details: 'Consolidated updates from planning tools, ticketing systems, and communication channels.' },
      { title: 'Normalization Engine', details: 'Mapped activity streams into a common workflow state machine.' },
      { title: 'Decision Surfaces', details: 'Delivered role-based dashboards and proactive exception notifications.' },
    ],
    impact: [
      'Reduced manual status reconciliation effort by 38%.',
      'Cut escalation response times from days to hours.',
      'Improved leadership confidence through a shared source of truth.',
    ],
    learnings: [
      'Standardized definitions are a prerequisite for scalable analytics.',
      'Alert fatigue is avoidable when ownership boundaries are explicit.',
    ],
    obsessions: [
      'The smallest abstraction that would scale across teams',
      'Clear ownership boundaries to prevent alert fatigue',
      'Instrumentation designed with the workflow, not after',
    ],
    artifacts: [
      'Workflow state machine (diagram)',
      'Dashboard information architecture',
      'KPI tree (activation / TAT / exceptions)',
    ],
    tags: ['Operations', 'Product Strategy', 'Systems Design'],
  },
  {
    slug: 'guided-onboarding-system',
    title: 'Guided Onboarding System',
    excerpt: 'Created a modular onboarding architecture for faster activation and better retention.',
    contribution: 'Defined segmentation strategy, designed journey composer, and coordinated launch readiness.',
    outcome: 'Improved activation rate by 24% and reduced time-to-value by 31% in target segments.',
    context: 'New users entered a high-complexity product with little role-specific guidance and dropped before activation.',
    problem: 'A single static onboarding flow could not adapt to varied use cases, resulting in weak engagement and high support load.',
    role: 'Defined segmentation strategy, prioritized user pathways, and coordinated launch readiness across teams.',
    approach: 'Introduced persona-aware journeys, reusable guidance blocks, and in-product checkpoints tied to key value moments.',
    architecture: [
      { title: 'Segmentation Service', details: 'Assigned users to onboarding tracks using intent and account signals.' },
      { title: 'Journey Composer', details: 'Assembled dynamic onboarding sequences from reusable instruction modules.' },
      { title: 'Measurement Layer', details: 'Tracked progression, completion quality, and downstream retention cohorts.' },
    ],
    impact: [
      'Improved activation rate by 24% in target segments.',
      'Reduced time-to-value for first key action by 31%.',
      'Lowered onboarding-related support tickets by 19%.',
    ],
    learnings: [
      'Adaptive onboarding performs best when success milestones are explicit.',
      'Instrumentation must be designed alongside user flows, not after launch.',
    ],
    obsessions: [
      'Making success milestones explicit, not assumed',
      'Adaptive sequencing without adding operational burden',
      'Measurement as a first-class design concern',
    ],
    artifacts: [
      'Segmentation decision tree',
      'Journey sequence architecture',
      'Retention cohort dashboard',
    ],
    tags: ['Onboarding', 'User Experience', 'Growth'],
  },
];
