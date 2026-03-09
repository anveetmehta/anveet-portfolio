/**
 * seed-domains.ts
 * One-shot script to populate the 5 core domain expertise areas in the DB.
 *
 * Usage:
 *   ADMIN_PASSWORD=<your-password> BASE_URL=https://anveet-portfolio.vercel.app npx tsx scripts/seed-domains.ts
 *
 * Or against local dev:
 *   ADMIN_PASSWORD=<your-password> npx tsx scripts/seed-domains.ts
 */

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';

if (!ADMIN_PASSWORD) {
  console.error('❌  ADMIN_PASSWORD env var is required.');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ADMIN_PASSWORD}`,
};

async function post(path: string, body: unknown) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${path} → ${res.status}: ${text}`);
  }
  return res.json() as Promise<{ publicId: string; [k: string]: unknown }>;
}

// ── Domain definitions ───────────────────────────────────────────────────────

const domains = [
  {
    title: 'Fintech & Risk',
    slug: 'fintech-risk',
    icon: '🏦',
    summary:
      'Designing systems for regulated lending, payments, and compliance environments — where product decisions carry legal and financial consequence.',
    displayOrder: 1,
    chapters: [
      {
        title: 'KYC / KYB System Design',
        summary:
          'Building modular identity verification pipelines that support multiple provider integrations, risk-tiered checks, and seamless re-verification flows across customer lifecycle.',
        displayOrder: 1,
      },
      {
        title: 'Transaction Monitoring & AML',
        summary:
          'Designing rule engines and ML-assisted screening systems for transaction anomaly detection, alert triage workflows, and SAR filing pipelines.',
        displayOrder: 2,
      },
      {
        title: 'Risk Scoring & Decisioning',
        summary:
          'Architecting explainable scoring models and decisioning layers that balance credit risk, fraud risk, and regulatory exposure across products.',
        displayOrder: 3,
      },
      {
        title: 'Regulatory Reporting',
        summary:
          'Structuring data pipelines and audit trails to meet RBI, SEBI, and FIU reporting obligations — automated, auditable, and reproducible.',
        displayOrder: 4,
      },
    ],
  },
  {
    title: 'RegTech Intelligence',
    slug: 'regtech-intelligence',
    icon: '📋',
    summary:
      'Making regulatory intelligence actionable — converting circular PDFs and policy diffs into structured insights that product and compliance teams can act on.',
    displayOrder: 2,
    chapters: [
      {
        title: 'RBI & SEBI Regulatory Frameworks',
        summary:
          'Tracking and interpreting master directions, circulars, and guidelines across lending, payments, and investment products in the Indian regulatory ecosystem.',
        displayOrder: 1,
      },
      {
        title: 'Basel III/IV Implementation',
        summary:
          'Translating global capital adequacy and liquidity standards into product and data requirements for banks and NBFCs operating under Basel frameworks.',
        displayOrder: 2,
      },
      {
        title: 'Cross-border Compliance Design',
        summary:
          'Designing compliance architectures that handle multi-jurisdictional regulatory requirements — FATF, OFAC, EU AML directives — without duplicating effort.',
        displayOrder: 3,
      },
    ],
  },
  {
    title: 'Product Operations',
    slug: 'product-operations',
    icon: '⚙️',
    summary:
      'Designing the systems behind the product — workflows, metrics, and operational layers that let teams move fast without creating chaos at scale.',
    displayOrder: 3,
    chapters: [
      {
        title: 'Omnichannel Onboarding Architecture',
        summary:
          'Building modular onboarding systems that support RM-assisted, self-serve, and API-driven flows from a single configurable pipeline — not three separate implementations.',
        displayOrder: 1,
      },
      {
        title: 'Workflow Visibility & State Machines',
        summary:
          'Designing state machine-backed workflow systems that give every team real-time visibility into where work is, what is blocked, and who owns the next step.',
        displayOrder: 2,
      },
      {
        title: 'Metrics Systems & KPI Trees',
        summary:
          'Building layered measurement frameworks — from input metrics to outcome KPIs — so teams know what to move and why it matters.',
        displayOrder: 3,
      },
    ],
  },
  {
    title: 'AI Building',
    slug: 'ai-building',
    icon: '🤖',
    summary:
      'Shipping AI systems that solve real problems — multi-agent orchestration, intelligent pipelines, and AI-native product experiences built for production.',
    displayOrder: 4,
    chapters: [
      {
        title: 'Multi-agent Reasoning Systems',
        summary:
          'Designing orchestration layers where multiple AI agents collaborate, debate, and synthesise output — applied to decision support and knowledge systems.',
        displayOrder: 1,
      },
      {
        title: 'RAG & Retrieval Pipelines',
        summary:
          'Building retrieval-augmented generation systems that ground AI output in specific knowledge bases — regulatory documents, internal wikis, structured data.',
        displayOrder: 2,
      },
      {
        title: 'AI-Assisted Compliance Layer',
        summary:
          'Using LLMs to convert regulatory circular diffs into structured, actionable compliance alerts — with source citations and impact assessments.',
        displayOrder: 3,
      },
    ],
  },
  {
    title: 'Systems Thinking',
    slug: 'systems-thinking',
    icon: '🧠',
    summary:
      'A mental model for designing products and organisations — starting with actors, constraints, and failure modes rather than features and screens.',
    displayOrder: 5,
    chapters: [
      {
        title: 'Modular Architecture Principles',
        summary:
          'Designing products as composable systems with clean interfaces — so adding a market, channel, or capability does not require rebuilding the core.',
        displayOrder: 1,
      },
      {
        title: 'Mental Models for Product Design',
        summary:
          'Applying systems concepts — feedback loops, constraints, leverage points — to product decisions, prioritisation, and architectural choices.',
        displayOrder: 2,
      },
      {
        title: 'Decision Framework Design',
        summary:
          'Building durable decision frameworks for ambiguous product problems — explicit assumptions, decision logs, and reversibility as design criteria.',
        displayOrder: 3,
      },
    ],
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`🌱  Seeding domains → ${BASE_URL}\n`);

  for (const domain of domains) {
    const { chapters, ...domainBody } = domain;

    // Create domain
    let domainData: { publicId: string };
    try {
      domainData = await post('/api/domains', { ...domainBody, status: 'published' });
      console.log(`✅  Domain: ${domain.title} (${domainData.publicId})`);
    } catch (err) {
      console.error(`❌  Domain failed: ${domain.title} —`, err);
      continue;
    }

    // Create chapters
    for (const chapter of chapters) {
      try {
        const ch = await post(`/api/domains/${domainData.publicId}/chapters`, chapter);
        console.log(`   ↳ Chapter: ${chapter.title}`);
      } catch (err) {
        console.error(`   ❌ Chapter failed: ${chapter.title} —`, err);
      }
    }
  }

  console.log('\n🎉  Done. Visit /admin → Domains to review, or reload the homepage.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
