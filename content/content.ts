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
  tags: string[];
}

export const siteMeta: SiteMeta = {
  name: 'Anveet Mehta',
  title: 'Anveet Mehta | Product, Systems, and Execution',
  description:
    'Portfolio foundation for Anveet Mehta with scalable architecture for case studies, writing, and future experiments.',
  email: 'anveet@example.com',
  location: 'Bengaluru, India',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' }
  ]
};

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Product Strategy',
    summary: 'Structuring ambiguous spaces into clear priorities and decision frameworks.',
    highlights: ['Opportunity framing', 'North-star definition', 'Execution roadmaps']
  },
  {
    title: 'Systems Thinking',
    summary: 'Designing end-to-end workflows that balance user value and business outcomes.',
    highlights: ['Journey mapping', 'Service blueprints', 'Cross-functional alignment']
  },
  {
    title: 'Delivery Excellence',
    summary: 'Shipping resilient solutions with measurable impact and iterative learning loops.',
    highlights: ['Planning rituals', 'Quality gates', 'Post-launch instrumentation']
  }
];

export const writingEntries: WritingEntry[] = [
  {
    title: 'Designing for operational clarity',
    summary: 'A practical model for reducing noise in cross-functional product teams.',
    status: 'planned',
    href: '/writing/designing-for-operational-clarity'
  },
  {
    title: 'From feature backlog to system roadmap',
    summary: 'How to transition from task delivery to system-level product thinking.',
    status: 'planned',
    href: '/writing/from-feature-backlog-to-system-roadmap'
  }
];

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
    tags: ['Onboarding', 'User Experience', 'Growth']
  }
];
