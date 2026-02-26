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
  h1: string;
  subhead: string;
  trustLine: string;
}

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
  highlights: string[];
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
  title: 'Anveet Mehta | Product Builder — Systems, Risk, Compliance',
  description:
    'I build systems that make complex products feel simple — and safe at scale. Product builder focused on onboarding, payments, risk, and compliance.',
  email: 'anveet.07@gmail.com',
  location: 'Bengaluru, India',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anveetmehta' },
    { label: 'GitHub', href: 'https://github.com/anveetmehta' }
  ]
};

// ── Hero ───────────────────────────────────────────────────────────────────

export const heroContent: HeroContent = {
  h1: 'I build systems that make complex products feel simple — and safe at scale.',
  subhead:
    "I'm Anveet Mehta — a product builder focused on onboarding, payments, risk, and compliance. I like hard constraints, clean abstractions, and shipping experiments that compound into platforms.",
  trustLine:
    'Built across regulated fintech ecosystems (banks/NBFCs/fintech) · Systems-first PM · Builder outside work'
};

// ── About ──────────────────────────────────────────────────────────────────

export const aboutContent: AboutContent = {
  intro:
    "I'm systems-first. I don't start with screens — I start with the underlying machine: actors, incentives, constraints, failure modes, and decisions.",
  body:
    "Professionally, I build in domains where mistakes cost money and trust. Personally, I'm always tinkering — multi-agent AI, compliance intelligence, decision engines, and even a café — because building is how I learn.",
  knownFor: [
    'Turning ambiguity into a system people can run',
    'Designing modular layers (plugins, decisioning, workflows)',
    'Balancing growth + risk without "checkbox compliance"'
  ]
};

// ── Projects ───────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    title: 'Council of Elites',
    description:
      'A multi-agent AI system where users interact with simulated personalities to explore decisions from multiple perspectives.',
    tags: ['AI', 'Multi-Agent', 'Decision-Making'],
    status: 'building'
  },
  {
    title: 'AI Compliance Assistant',
    description:
      'Tracks regulatory updates and converts them into structured, actionable insights for compliance teams.',
    tags: ['AI', 'Compliance', 'Fintech'],
    status: 'building'
  },
  {
    title: 'Digital Twin',
    description:
      'A personal system that retains memory, builds context over time, and provides personalized decision support.',
    tags: ['AI', 'Personal Systems'],
    status: 'building'
  },
  {
    title: 'Pincode Intelligence API',
    description:
      'Structured classification of Indian pincodes with metadata for urban/rural, state mapping, and risk signals.',
    tags: ['Data', 'API', 'Fintech'],
    status: 'building'
  },
  {
    title: 'Bread Coffee & Company',
    description:
      'A vegetarian café built around bread-based food, coffee, and shared experiences — an experiment in customer behavior and real-world operations.',
    tags: ['Business', 'Operations', 'Experience Design'],
    status: 'live'
  }
];

// ── Expertise (reframed as "How I Think") ──────────────────────────────────

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Systems over Journeys',
    summary:
      'Most people design journeys. I design systems. A journey can be optimized. A system can be scaled.',
    highlights: [
      'Core components and interactions',
      'Sources of complexity',
      'Abstraction layers',
      'System-level optimization'
    ]
  },
  {
    title: 'Curiosity over Outcomes',
    summary:
      'Why do onboarding systems fail at scale? Why does compliance feel reactive? How can AI move from answering questions to shaping decisions? These questions usually turn into projects.',
    highlights: [
      'Asking better questions',
      'Learning through building',
      'Following curiosity into domains'
    ]
  },
  {
    title: 'Simplicity over Complexity',
    summary:
      'Simplicity is usually hiding behind complexity. Good systems reduce effort for both users and operators. If something feels complicated, it\'s usually poorly designed.',
    highlights: [
      'Reducing complexity',
      'Design-led thinking',
      'Clear ownership boundaries'
    ]
  }
];

// ── Now (current explorations) ─────────────────────────────────────────────

export const nowItems: string[] = [
  'Multi-agent AI that helps people reason, not just answer',
  'Compliance as a continuous intelligence system (diff → impact → action)',
  'Vendor-agnostic risk layers with plugin architecture',
  'Decisioning systems that stay explainable under edge cases',
  'Real-world experimentation through Bread Coffee & Company'
];

// ── Writing ────────────────────────────────────────────────────────────────

export const writingEntries: WritingEntry[] = [
  {
    title: 'Designing for operational clarity',
    summary: 'A practical model for reducing noise in cross-functional product teams.',
    status: 'draft',
    href: '/writing/designing-for-operational-clarity'
  },
  {
    title: 'From feature backlog to system roadmap',
    summary: 'How to transition from task delivery to system-level product thinking.',
    status: 'draft',
    href: '/writing/from-feature-backlog-to-system-roadmap'
  }
];

// ── Case Studies ───────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    slug: 'workflow-visibility-platform',
    title: 'Workflow Visibility Platform',
    excerpt: 'Unified fragmented internal operations into a single actionable control plane.',
    context:
      'Operational teams managed status updates across disconnected tools, creating slow handoffs and misaligned reporting.',
    problem:
      'Leaders lacked real-time visibility into blocker states, while operators spent significant effort manually reconciling updates.',
    role:
      'Led product strategy and execution across design, data, and engineering with ownership from discovery through adoption.',
    approach:
      'Built a phased plan: diagnose root causes, define a normalized data model, release shared dashboards, and iteratively automate alerts.',
    architecture: [
      {
        title: 'Data Ingestion Layer',
        details: 'Consolidated updates from planning tools, ticketing systems, and communication channels.'
      },
      {
        title: 'Normalization Engine',
        details: 'Mapped activity streams into a common workflow state machine.'
      },
      {
        title: 'Decision Surfaces',
        details: 'Delivered role-based dashboards and proactive exception notifications.'
      }
    ],
    impact: [
      'Reduced manual status reconciliation effort by 38%.',
      'Cut escalation response times from days to hours.',
      'Improved leadership confidence through a shared source of truth.'
    ],
    learnings: [
      'Standardized definitions are a prerequisite for scalable analytics.',
      'Alert fatigue is avoidable when ownership boundaries are explicit.'
    ],
    obsessions: [
      'The smallest abstraction that would scale across teams',
      'Clear ownership boundaries to prevent alert fatigue',
      'Instrumentation designed with the workflow, not after'
    ],
    artifacts: [
      'Workflow state machine (diagram)',
      'Dashboard information architecture',
      'KPI tree (activation / TAT / exceptions)'
    ],
    tags: ['Operations', 'Product Strategy', 'Systems Design']
  },
  {
    slug: 'guided-onboarding-system',
    title: 'Guided Onboarding System',
    excerpt: 'Created a modular onboarding architecture for faster activation and better retention.',
    context:
      'New users entered a high-complexity product with little role-specific guidance and dropped before activation.',
    problem:
      'A single static onboarding flow could not adapt to varied use cases, resulting in weak engagement and high support load.',
    role:
      'Defined segmentation strategy, prioritized user pathways, and coordinated launch readiness across teams.',
    approach:
      'Introduced persona-aware journeys, reusable guidance blocks, and in-product checkpoints tied to key value moments.',
    architecture: [
      {
        title: 'Segmentation Service',
        details: 'Assigned users to onboarding tracks using intent and account signals.'
      },
      {
        title: 'Journey Composer',
        details: 'Assembled dynamic onboarding sequences from reusable instruction modules.'
      },
      {
        title: 'Measurement Layer',
        details: 'Tracked progression, completion quality, and downstream retention cohorts.'
      }
    ],
    impact: [
      'Improved activation rate by 24% in target segments.',
      'Reduced time-to-value for first key action by 31%.',
      'Lowered onboarding-related support tickets by 19%.'
    ],
    learnings: [
      'Adaptive onboarding performs best when success milestones are explicit.',
      'Instrumentation must be designed alongside user flows, not after launch.'
    ],
    obsessions: [
      'Making success milestones explicit, not assumed',
      'Adaptive sequencing without adding operational burden',
      'Measurement as a first-class design concern'
    ],
    artifacts: [
      'Segmentation decision tree',
      'Journey sequence architecture',
      'Retention cohort dashboard'
    ],
    tags: ['Onboarding', 'User Experience', 'Growth']
  }
];
