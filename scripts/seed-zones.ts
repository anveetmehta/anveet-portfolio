/**
 * Seed homepage_zones table with current content.ts values.
 * Run once: npx tsx scripts/seed-zones.ts
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
        "Most software focuses on interfaces. I'm more interested in the operational layers underneath: where onboarding, risk, workflows, AI, and trust infrastructure begin to converge into intelligent systems.",
        'Previously built across banking, fintech, and regulated ecosystems powering millions of onboarding and risk workflows.',
      ],
      ctas: [
        { label: 'Enter the System', variant: 'primary', href: '#systems' },
        { label: 'Read the Notes', variant: 'ghost', href: '#notes' },
        { label: "See What I'm Building", variant: 'link', href: '#explorations' },
      ],
    },
  },
  {
    key: 'signals',
    data: [
      { value: '5M+', label: 'onboarding workflows' },
      { value: '20+', label: 'regulated institutions' },
      { value: '80%', label: 'reduction in turnaround' },
      { value: 'AI-assisted', label: 'operational systems' },
      { value: 'Human-AI', label: 'workflows' },
    ],
  },
  {
    key: 'systems_layer',
    data: {
      label: 'The System',
      headline: 'The systems underneath modern products.',
      body: [
        'Digital systems increasingly depend on invisible operational layers. The code that runs a product is only a fraction of what makes it work.',
        'The real complexity lives in the decisions, workflows, risk models, and trust mechanisms underneath — the operational infrastructure most teams never fully design.',
        'Modern organizations are realizing that their competitive advantage isn\'t the interface. It\'s the operational intelligence powering it.',
        'The next generation of software will not merely optimize interfaces. It will redesign operational intelligence itself.',
      ],
      systemTypes: [
        'onboarding workflows',
        'trust systems',
        'risk infrastructure',
        'operational orchestration',
        'machine-assisted decisions',
        'adaptive operational cognition',
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
    ],
  },
  {
    key: 'explorations',
    data: [
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
        status: 'Exploring',
      },
      {
        title: 'Council of Elites',
        description:
          'A multi-agent reasoning environment exploring strategic cognition, simulated perspectives, and AI-assisted thought exploration — where different AI personas debate, challenge, and refine ideas.',
        status: 'Building',
      },
      {
        title: 'Workflow Intelligence Systems',
        description:
          'Experiments around operational copilots, AI-assisted workflows, onboarding intelligence, and adaptive operational systems — building toward AI that augments human operational judgment.',
        status: 'Prototype',
      },
    ],
  },
  {
    key: 'mental_models',
    data: [
      {
        title: 'Simplicity scales.',
        description:
          "Operational complexity compounds silently before systems begin to fail. The best operational designs eliminate unnecessary decisions, not just unnecessary features.",
      },
      {
        title: 'Trust is infrastructure.',
        description:
          "Payments, onboarding, and compliance are fundamentally systems of coordinated trust. Design them like infrastructure — because that's what they are.",
      },
      {
        title: 'AI should reduce ambiguity.',
        description:
          "Good operational AI reduces cognitive burden rather than creating more dashboards. If the AI output requires the same effort to interpret, it hasn't helped.",
      },
      {
        title: 'Systems shape behavior.',
        description:
          'Operational design influences organizational outcomes more than surface interfaces. The system you build determines the decisions people make inside it.',
      },
    ],
  },
  {
    key: 'open_threads',
    data: {
      label: 'Open Threads',
      body: 'I occasionally engage with founders, operators, and builders exploring the operational layers of their business.',
      areas: [
        'operational intelligence',
        'onboarding systems',
        'AI-native workflows',
        'trust infrastructure',
        'adaptive operational design',
      ],
      cta: { label: 'Start a conversation', href: 'mailto:anveet.07@gmail.com' },
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
