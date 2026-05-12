/**
 * Seed homepage_zones table with current content.ts values.
 * Run: npx tsx scripts/seed-zones.ts
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../lib/db/schema';

const url =
  process.env.POSTGRES_URL ||
  process.env.anveetportfolio_POSTGRES_URL ||
  process.env.DATABASE_URL ||
  '';

const sql = neon(url);
const db = drizzle(sql, { schema });

const zones: { key: string; data: unknown }[] = [
  {
    key: 'hero',
    data: {
      eyebrow: 'Operational Intelligence • AI Systems • Trust Infrastructure',
      h1: 'Modern digital trust runs on invisible systems.',
      supporting: [
        "Most digital systems quietly depend on operational layers few teams fully understand: trust orchestration, workflow cognition, risk infrastructure, machine-assisted decisions, and adaptive operational intelligence.",
        "That's the layer I'm most interested in.",
      ],
      ctas: [
        { label: 'Enter the System', variant: 'primary', href: '#systems' },
        { label: 'Read the Notes', variant: 'ghost', href: '#notes' },
      ],
    },
  },
  {
    key: 'signals',
    data: [
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
    ],
  },
  {
    key: 'systems_layer',
    data: {
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
      closing: "This is the layer I'm most interested in.",
    },
  },
  {
    key: 'shaped_systems',
    data: [
      {
        title: 'Omnichannel Onboarding Infrastructure',
        description:
          'A multi-channel onboarding ecosystem spanning RM-assisted workflows, DIY onboarding, API-led onboarding, and partner-driven operational systems — built for regulated financial ecosystems at scale. Focused on trust orchestration, workflow simplification, operational scale, and compliance alignment.',
        operationalFragment:
          "Most onboarding friction doesn't come from forms. It comes from ambiguity between systems — the gap where one workflow ends and another begins without clear operational ownership.",
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
        operationalFragment:
          'False positives become organizational bottlenecks before they become model problems. Human review systems quietly become cognitive load systems under scale.',
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
        operationalFragment:
          'Workflow rigidity becomes visible only under operational pressure. Most scaling problems are workflow design problems first.',
        focusAreas: [
          'workflow cognition and adaptive operational logic',
          'AI copilots embedded into decision flows',
          'machine-assisted judgment with human override integrity',
          'operational orchestration across dynamic workflow environments',
        ],
        tags: ['AI', 'Workflow Cognition', 'Operational Intelligence', 'Adaptive Systems'],
      },
    ],
  },
  {
    key: 'explorations',
    data: [
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
    ],
  },
  {
    key: 'mental_models',
    data: [
      {
        title: 'Complexity compounds quietly.',
        description:
          "Organizations often mistake operational exhaustion for growth long before systems visibly fail. The accumulation is invisible until it isn't.",
      },
      {
        title: 'Trust is infrastructure.',
        description:
          'Payments, onboarding, compliance, and workflows are fundamentally systems of coordinated trust. They should be designed accordingly.',
      },
      {
        title: 'AI should reduce ambiguity.',
        description:
          "Operational AI should reduce cognitive burden rather than increase dashboards and workflow complexity. If interpretation requires the same effort, the system hasn't helped.",
      },
      {
        title: 'Systems shape decisions.',
        description:
          'Operational systems silently determine which decisions organizations are capable of making. The system you build determines the choices available inside it.',
      },
    ],
  },
  {
    key: 'open_threads',
    data: {
      label: 'Open Threads',
      heading: 'Exploring intelligent operational systems.',
      body: "I occasionally engage with founders, operators, and builders exploring the operational layers of their systems — whether that's onboarding infrastructure, AI-native workflows, trust systems, or machine-assisted operational design.",
      areas: [
        'operational intelligence',
        'onboarding systems',
        'AI-native workflows',
        'trust infrastructure',
        'adaptive operational systems',
        'machine-assisted operations',
      ],
      cta: { label: 'Start a Conversation', href: 'mailto:anveet.07@gmail.com' },
    },
  },
];

async function main() {
  console.log('Seeding homepage_zones...');
  for (const zone of zones) {
    await db
      .insert(schema.homepageZones)
      .values({ key: zone.key, data: zone.data as never, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: schema.homepageZones.key,
        set: { data: zone.data as never, updatedAt: new Date() },
      });
    console.log(`  ✓ ${zone.key}`);
  }
  console.log('Done.');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
