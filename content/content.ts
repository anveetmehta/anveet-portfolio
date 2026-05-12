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
  focusAreas: string[];
  tags: string[];
}

export interface Exploration {
  title: string;
  description: string;
  transforms?: string[];
  cta?: { label: string; href: string };
  status: string;
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
  title: 'Anveet Mehta — Builder of Intelligent Operational Systems',
  description:
    'Designing systems for how modern digital trust operates. AI, onboarding, payments, compliance, and workflow design for high-trust digital businesses.',
  email: 'anveet.07@gmail.com',
  location: 'Bengaluru, India',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anveetmehta' },
    { label: 'GitHub', href: 'https://github.com/anveetmehta' }
  ]
};

// ── Hero (Entry Point) ─────────────────────────────────────────────────────

export const heroContent: HeroContent = {
  eyebrow: 'AI • Systems • Trust Infrastructure',
  h1: 'Designing systems for how modern digital trust operates.',
  supporting: [
    'Most products focus on interfaces. I\'m more interested in the systems underneath — the operational layers where trust, decisions, workflows, and scale actually emerge.',
    'Previously built across banking, fintech, and regulated ecosystems powering millions of onboarding and risk workflows.'
  ],
  ctas: [
    { label: 'Enter the System', variant: 'primary', href: '#systems' },
    { label: 'Read the Notes', variant: 'ghost', href: '#notes' },
    { label: 'See What I\'m Building', variant: 'link', href: '#explorations' },
  ]
};

// ── Signals ────────────────────────────────────────────────────────────────

export const signals: Signal[] = [
  { value: '5M+', label: 'onboarding workflows' },
  { value: '20+', label: 'regulated institutions' },
  { value: '80%', label: 'reduction in turnaround' },
  { value: 'AI-assisted', label: 'operational systems' },
  { value: 'Human-AI', label: 'workflows' },
];

// ── The Systems Layer ──────────────────────────────────────────────────────

export const systemsLayerContent: SystemsLayerContent = {
  label: 'The Systems Layer',
  headline: 'Operational intelligence is the next interface.',
  body: [
    'Digital systems increasingly depend on invisible operational layers. The code that runs a product is only a fraction of what makes it work.',
    'The real complexity lives in the decisions, workflows, risk models, and trust mechanisms underneath — the operational infrastructure most teams never fully design.',
    'Modern organizations are realizing that their competitive advantage isn\'t the interface. It\'s the operational intelligence powering it.',
    'The next generation of software will not merely optimize interfaces. It will redesign operational intelligence itself.',
  ],
  systemTypes: [
    'onboarding workflows',
    'risk systems',
    'trust infrastructure',
    'operational orchestration',
    'machine-assisted decisions',
    'adaptive operational cognition',
  ],
  closing: 'This is the layer I\'m most interested in.',
};

// ── Systems I've Helped Shape ──────────────────────────────────────────────

export const shapedSystems: ShapedSystem[] = [
  {
    title: 'Omnichannel Onboarding Infrastructure',
    description:
      'A multi-channel onboarding ecosystem spanning RM-assisted workflows, DIY onboarding, API-led onboarding, and partner-driven operational systems — built for regulated financial ecosystems at scale.',
    focusAreas: [
      'Millions of onboarding workflows processed monthly',
      'Reduced onboarding turnaround time by 80%',
      'Supported complex constitution handling and compliance flows',
      'Enabled operational scale across banking and fintech ecosystems',
    ],
    tags: ['Onboarding', 'Fintech Infrastructure', 'Workflow Systems', 'Compliance'],
  },
  {
    title: 'AI-Assisted Risk Operations',
    description:
      'Operational intelligence systems designed around AML screening, onboarding risk, transaction monitoring, and continuous due diligence — with a focus on explainability and analyst efficiency.',
    focusAreas: [
      'Reduced false positive rates through intelligent signal weighting',
      'Improved analyst efficiency via explainable operational reasoning',
      'Human-AI collaboration layers for complex risk decisions',
      'Continuous due diligence without operational overhead',
    ],
    tags: ['AI Systems', 'AML', 'Risk', 'Compliance'],
  },
  {
    title: 'Intelligent Workflow Systems',
    description:
      'Explorations around AI-native operational workflows that augment decision-making across onboarding, compliance, and operational intelligence — combining real-time context with adaptive logic.',
    focusAreas: [
      'AI copilots embedded into operational decision flows',
      'Real-time operational context for analyst workflows',
      'Adaptive decision systems that evolve with the business',
      'Workflow intelligence that reduces cognitive load',
    ],
    tags: ['AI', 'Operational Intelligence', 'Workflow Design'],
  },
];

// ── Active Explorations ────────────────────────────────────────────────────

export const explorations: Exploration[] = [
  {
    title: 'RegRadar',
    description:
      'Real-time regulatory intelligence designed for operational teams navigating evolving compliance ecosystems. Transforms regulatory circulars and updates into actionable operational insight.',
    transforms: [
      'Regulatory circulars → operational impact assessments',
      'Policy updates → implementation checklists',
      'Compliance changes → workflow triggers',
    ],
    cta: { label: 'Join Early Access', href: 'mailto:anveet.07@gmail.com?subject=RegRadar Early Access' },
    status: 'Early stage',
  },
  {
    title: 'Council of Elites',
    description:
      'A multi-agent reasoning environment exploring strategic cognition, simulated perspectives, and AI-assisted thought exploration — where different AI personas debate, challenge, and refine ideas.',
    status: 'Exploring',
  },
  {
    title: 'Workflow Intelligence Systems',
    description:
      'Experiments around operational copilots, AI-assisted workflows, onboarding intelligence, and adaptive operational systems — building toward AI that augments human operational judgment.',
    status: 'Exploring',
  },
];

// ── Mental Models ──────────────────────────────────────────────────────────

export const mentalModels: MentalModel[] = [
  {
    title: 'Simplicity scales.',
    description:
      'Operational complexity compounds silently before systems begin to fail. The best operational designs eliminate unnecessary decisions, not just unnecessary features.',
  },
  {
    title: 'Trust is infrastructure.',
    description:
      'Payments, onboarding, and compliance are fundamentally systems of coordinated trust. Design them like infrastructure — because that\'s what they are.',
  },
  {
    title: 'AI should reduce cognitive burden.',
    description:
      'Good operational AI reduces ambiguity rather than creating more dashboards. If the AI output requires the same cognitive effort to interpret, it hasn\'t helped.',
  },
  {
    title: 'Systems shape behavior.',
    description:
      'Operational design influences organizational outcomes more than surface interfaces. The system you build determines the decisions people make inside it.',
  },
];

// ── Notes From The System ──────────────────────────────────────────────────

export const notesFromSystem: NoteEntry[] = [
  {
    title: 'Why operational complexity compounds invisibly',
    teaser: 'The failure mode no one designs for — until it\'s too late.',
    status: 'planned',
  },
  {
    title: 'False positives are an operational design problem',
    teaser: 'AML teams don\'t have a model problem. They have a workflow problem.',
    status: 'planned',
  },
  {
    title: 'AI copilots for operational systems',
    teaser: 'What it actually means to augment a compliance analyst with AI.',
    status: 'planned',
  },
  {
    title: 'The future of trust infrastructure',
    teaser: 'Why onboarding, payments, and risk are converging into a single layer.',
    status: 'planned',
  },
  {
    title: 'Why onboarding systems fail under scale',
    teaser: 'The architectural decisions that look fine at 10K users and collapse at 1M.',
    status: 'planned',
  },
  {
    title: 'Machine-assisted operations and human cognition',
    teaser: 'The interface between human judgment and machine suggestion is the hardest design problem.',
    status: 'planned',
  },
];

// ── Open Threads ───────────────────────────────────────────────────────────

export const openThreadsContent: OpenThreadsContent = {
  label: 'Open Threads',
  body: 'I occasionally engage with founders, operators, and teams thinking deeply about the operational layers of their business.',
  areas: [
    'operational intelligence',
    'onboarding systems',
    'AI-native workflows',
    'trust infrastructure',
    'adaptive operational design',
  ],
  cta: { label: 'Start a conversation', href: 'mailto:anveet.07@gmail.com' },
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
