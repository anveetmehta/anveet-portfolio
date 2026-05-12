/**
 * Seeds the 6 foundational essays into the articles table.
 * Run: POSTGRES_URL=... npx tsx scripts/seed-essays.ts
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

function id() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const essays = [
  {
    title: 'Why Operational Complexity Compounds Invisibly',
    summary: 'The failure mode no one designs for — until it\'s too late. A look at how operational debt silently accumulates until systems stop working.',
    tags: ['operations', 'systems-thinking', 'fintech'],
    content: `Most systems don't fail loudly. They fail quietly — through a thousand small decisions that each made sense at the time.

Operational complexity is unlike technical debt. Technical debt is visible. You can see it in the codebase, measure it in build times, feel it in deployment cycles. Someone eventually says "we need to pay this down" and a sprint gets allocated.

Operational complexity is different. It lives in the spaces between systems — in the handoffs, the edge cases, the unwritten rules that only three people know, the exceptions that became the norm.

**The compounding mechanism**

Here's how it happens. A team launches a product. Early on, operational volume is low, so manual processes fill the gaps. An analyst runs a report every morning. A support agent handles a special case type by following an informal checklist. A compliance officer reviews a category of applications that the system can't handle automatically.

These processes work. The team ships. The product grows.

But as volume scales, each manual process becomes a constraint. The analyst's morning report now takes four hours. The support agent's checklist has seventeen steps because the edge cases accumulated. The compliance review queue is six days deep.

The team notices. They build workarounds — a second tool, an escalation path, a "fast lane" for urgent cases. Each workaround works, but it adds surface area. Now there are two systems to maintain, two sets of edge cases, two error modes.

This is the compounding. Each solution introduces new operational surface area. The surface area creates new edge cases. The edge cases require new processes. The processes create new dependencies.

**Why it's invisible**

Operational complexity is invisible because it doesn't surface in the product metrics that teams track. User retention looks fine. NPS is positive. The product is growing.

What's invisible is the operational burn rate underneath. The growing headcount needed to service edge cases. The increasing error rate in manual processes as volume outpaces human capacity. The fragility of systems that were never designed for the scale they're now running at.

By the time operational complexity becomes visible — through a missed SLA, a compliance failure, a customer escalation that can't be resolved — it has usually been compounding for years.

**What good operational design looks like**

The antidote isn't automation. Automation of a poorly designed process just produces errors faster.

The antidote is designing operational systems the same way you design software systems: with explicit interfaces, clear state machines, defined failure modes, and observable metrics.

A well-designed operational system has:
- A clear definition of every state a case can be in
- Explicit rules for every transition between states
- Observable metrics at every handoff point
- Defined escalation paths with time-bounded SLAs
- Edge case handling that doesn't require institutional knowledge

Most operational systems have none of these. They were grown, not designed. And they compound.

The question isn't whether your operational complexity is compounding. It is. The question is whether you'll design your way out before it compounds into failure.`,
  },
  {
    title: 'False Positives Are an Operational Design Problem',
    summary: 'AML teams don\'t have a model problem. They have a workflow problem. The hidden cost of alert fatigue and how operational design determines compliance effectiveness.',
    tags: ['compliance', 'AML', 'risk', 'operational-intelligence'],
    content: `The standard narrative about false positives in AML goes like this: better models, better data, better accuracy. Tune the thresholds. Train on more labels. Improve the feature set.

This narrative is wrong — or at least, incomplete.

False positives aren't primarily a model problem. They're an operational design problem.

**What's actually happening**

A large bank's transaction monitoring system generates 500 alerts per day. Analysts can meaningfully review 50. The other 450 get processed through a triage workflow that, in practice, amounts to rubber-stamping — a quick scan, a checkbox, a disposition.

The model might be generating alerts with 90% precision. But if analysts are reviewing 10% of them meaningfully, the effective false positive rate in the investigation process is much higher.

The model is blamed. Thresholds are adjusted. Fewer alerts are generated. But now some genuine suspicious activity isn't being caught either.

This is the false positive trap: the feedback loop between alert volume, analyst capacity, and investigation quality is broken, and tuning the model can't fix it because the problem isn't the model.

**The operational design failure**

The real problem is that the alert-to-investigation workflow was designed for a world where analyst capacity scales linearly with alert volume. It doesn't.

Good operational design for a compliance workflow would look different:

It would separate triage from investigation. Triage is pattern recognition at speed — does this alert look like the known typologies of concern? Investigation is analysis — given that it might be suspicious, what's the evidence?

These require different skills, different tools, and different time allocations. Combining them into a single "review the alert" workflow optimizes for neither.

It would instrument the workflow, not just the model. How long does each alert type take to resolve? What's the escalation rate by alert category? What's the re-open rate — alerts that were closed as false positive but later identified as suspicious?

These metrics exist in the workflow, not the model. Without them, you're flying blind on operational performance.

It would design for analyst cognitive load. Alert fatigue is real. An analyst reviewing their 200th alert of the day is not the same as one reviewing their 20th. Good operational design acknowledges this and structures workflows accordingly.

**What AI actually fixes**

AI can help — but not by generating better alerts. The most impactful AI applications in compliance operations work at the workflow level:

- Prioritization: which of the 500 alerts should the 50 available analyst hours be applied to first?
- Pre-population: before the analyst opens an alert, what context can be surfaced automatically?
- Pattern matching: does this alert look structurally similar to previous alerts that resolved as suspicious?

These are operational intelligence applications, not model accuracy applications. They make analysts more effective within the constraints of their capacity, rather than trying to reduce the volume of work arriving at the front door.

**The reframe**

If your compliance team is struggling with false positives, ask a different set of questions.

Not "how do we improve model precision?" but "how do we make our analysts more effective at the precision level we have?"

Not "how do we reduce alert volume?" but "how do we make triage faster and more accurate?"

Not "can we automate the review?" but "what's the minimum human judgment we need to apply, and how do we focus it where it matters most?"

These are operational design questions. The answers don't live in the model. They live in the workflow.`,
  },
  {
    title: 'AI Copilots for Operational Systems',
    summary: 'What it actually means to augment a compliance analyst or operations team with AI. Not automation — augmentation. The design principles that make AI copilots effective.',
    tags: ['AI', 'operations', 'workflow-intelligence', 'human-AI'],
    content: `Everyone is building AI copilots. Most of them are wrong.

Not wrong in the sense of technically incorrect — they work, they generate outputs, they save some time. Wrong in the sense of misunderstanding what the human-AI collaboration is actually supposed to accomplish.

**The augmentation mistake**

The default design pattern for an AI copilot in an operational context goes something like this: the human does their work, the AI is available to answer questions or summarize information, the human makes decisions.

This is assistance, not augmentation. It's a better search engine sitting next to an existing workflow. It doesn't change what the human can do; it just makes some parts marginally faster.

Real augmentation changes the operational capacity of the human. It allows them to process more cases, make better decisions, catch things they would have missed, and spend their cognitive resources on genuinely difficult problems rather than routine pattern matching.

**What makes a copilot actually augment**

For AI to genuinely augment operational work, it needs to operate at the decision level, not the information level.

An information-level copilot summarizes documents and answers questions. A decision-level copilot surfaces relevant context before you ask for it, flags anomalies against the baseline of similar cases, pre-populates structured outputs with its best assessment, and explains its reasoning in terms the human can evaluate.

The difference is who is driving. In an information-level copilot, the human drives and the AI assists. In a decision-level copilot, the AI proposes and the human evaluates. These are fundamentally different interaction models, and they require fundamentally different design.

**Design principles for decision-level copilots**

*Start with the decision, not the information.* What decision does the human need to make? What information is actually required to make that decision well? Design the AI interface around surfacing exactly that — not everything that might be relevant.

*Make the AI's reasoning legible.* The human needs to be able to evaluate the AI's proposal, which means understanding why it was made. "I'm flagging this as high-risk because the transaction pattern matches three known typologies, the counterparty has two previous SAR filings, and the account age is below the threshold for this transaction size" is useful. "High-risk score: 0.87" is not.

*Design for disagreement.* The human will sometimes override the AI. Design the interface to make override easy and to capture the reason. This is how the system learns, and it's how you build the audit trail that regulators require.

*Instrument the feedback loop.* How often does the AI's proposal get accepted? How often is it overridden in which direction? Which case types have high acceptance rates? Which have low rates and why? Without this instrumentation, you cannot improve the system.

**The cognitive load question**

One proxy for whether an AI copilot is actually augmenting: does it reduce or increase cognitive load?

A poorly designed copilot increases cognitive load. Now the human has to evaluate the AI's output in addition to doing their own analysis. If the AI is wrong frequently enough, or if its reasoning is opaque enough, evaluating its output takes more mental effort than just doing the work.

A well-designed copilot reduces cognitive load. The routine pattern matching happens automatically. The information that would have taken ten minutes to gather is surfaced in ten seconds. The human's attention is freed for the genuinely difficult judgment calls.

If you're not measuring cognitive load — through analyst feedback, task completion time, error rates, escalation rates — you don't know whether your copilot is helping.

**The institutional knowledge problem**

The most valuable thing AI copilots can do in operational contexts is encode institutional knowledge.

Every experienced analyst knows things that aren't written down. Patterns that look normal in isolation but are suspicious in combination. Edge cases the system doesn't handle well. The context behind why certain rules were written the way they were.

This knowledge doesn't transfer. Senior analysts retire. Teams turn over. New analysts spend years developing pattern recognition that their predecessors had.

A well-designed AI copilot can partially solve this problem by surfacing historical context, flagging cases that match patterns from past investigations, and making the reasoning of past decisions available to current analysts.

This is where AI in operations has the most durable value — not in automating routine tasks, but in making institutional knowledge legible and transferable.`,
  },
  {
    title: 'The Future of Trust Infrastructure',
    summary: 'Why onboarding, payments, and compliance are converging into a single operational layer — and what that means for how we build financial products.',
    tags: ['trust-infrastructure', 'fintech', 'onboarding', 'payments', 'compliance'],
    content: `Trust is the invisible infrastructure of financial services.

Not brand trust. Not customer satisfaction trust. Operational trust — the machinery that determines whether a transaction clears, whether an account can be opened, whether a business can access the financial system.

This machinery has historically been siloed. Onboarding was a department. Compliance was a department. Payments processing was a vendor relationship. Risk management was a separate team with its own systems.

These silos are collapsing.

**Why convergence is happening**

The silos existed because they were built by different teams at different times with different tools. Onboarding systems were designed to collect information and create accounts. Compliance systems were designed to screen that information against watchlists and regulations. Payment systems were designed to move money. They talked to each other through batch processes and manual handoffs.

This architecture made sense when each function was largely manual and the systems were more about record-keeping than decision-making.

It stops making sense when trust decisions need to be made in real time.

A customer trying to open an account and make their first payment can't wait for overnight batch processing to complete KYC screening. A business banking customer whose risk profile changes based on new information needs that change reflected in their account controls immediately, not at the next monthly review cycle.

Real-time trust decisions require the onboarding, compliance, and payment layers to operate as a unified system — sharing state, sharing context, sharing decisions.

**What trust infrastructure actually is**

When you strip away the organizational silos, trust infrastructure is a decision system with four components:

*Identity*: who is this entity, and can we verify that claim?

*Risk*: given what we know about this entity, what's the probability that transacting with them creates regulatory, financial, or reputational risk?

*Controls*: given the risk assessment, what controls apply to this entity's access to financial services?

*Monitoring*: as new information arrives — transactions, behavioral patterns, external signals — how does the risk and control picture update?

These four components need to work together continuously, not sequentially at account opening. An entity's risk profile changes. Their control requirements change. The monitoring layer needs to feed back into the identity and risk layers.

This is what modern trust infrastructure looks like — not a series of checkboxes at onboarding, but a continuous loop.

**What this means for builders**

If you're building financial products, the question is no longer "how do we add compliance to our product?" The question is "how do we design our product so that trust infrastructure is native to the operational model?"

This means thinking about trust decisions as product decisions. Not "what does the compliance team require?" but "what does a trustworthy operational experience actually look like for our customers?"

It means designing for ongoing trust, not point-in-time verification. Onboarding is an initial calibration, not a one-time gate. The systems you build need to keep calibrating as you learn more about who your customers are and how they behave.

It means thinking about trust as a competitive advantage. Faster onboarding. Lower false-positive rates that block legitimate transactions. Better-calibrated risk controls that let good customers do more while stopping bad actors more effectively.

The companies that will win in financial services over the next decade are the ones that understand trust infrastructure as a product problem, not a compliance problem. The silos between onboarding, risk, compliance, and payments will continue to collapse. The question is whether you're building the unified layer that replaces them, or struggling to make the siloed systems talk to each other.`,
  },
  {
    title: 'Why Onboarding Systems Fail Under Scale',
    summary: 'The architectural decisions that look fine at 10,000 users and collapse at 1 million. A systems perspective on why most digital onboarding is one growth spike away from breaking.',
    tags: ['onboarding', 'systems-design', 'fintech', 'infrastructure'],
    content: `Most onboarding systems are not designed for the scale they'll eventually reach. They're designed for the scale they're at when they're built.

This sounds obvious. But the implication is important: most digital onboarding is one growth spike away from breaking.

Not breaking in the sense of going down. Breaking in the sense of becoming operationally unsustainable — too slow, too error-prone, too dependent on human intervention to function at the volume arriving at the front door.

**The architectural choices that don't scale**

*Monolithic flow design.* Most onboarding systems are built as a single flow. Step 1 → Step 2 → Step 3 → Account opened. This works when volume is low and use cases are uniform.

At scale, volume is high and use cases are anything but uniform. Some customers sail through in three minutes. Others require document verification. Others have names that match watchlists and require compliance review. Others are entities rather than individuals and need a different flow entirely.

A monolithic flow handles this through exception handling — special cases, manual queues, edge case processing. At low volume, these exceptions are manageable. At high volume, the exceptions are the volume.

The alternative is modular flow design — onboarding as a series of composable steps that can be assembled differently for different customer segments and use cases. This is harder to build initially but doesn't accumulate exceptions as a hidden operational debt.

*Synchronous verification.* When an application is submitted, most systems run verification checks synchronously — the customer waits while identity is verified, documents are checked, risk is assessed.

This works at low volume. At high volume, synchronous verification creates queues — in the third-party verification services, in the compliance review systems, in the document processing pipelines. Queue length is directly proportional to volume. Double the volume, double the wait time.

Asynchronous verification — where the application is accepted and verification happens in the background, with the account released when checks clear — breaks this relationship. Volume and wait time are decoupled.

*Human review as a scalability bottleneck.* Most onboarding systems include human review steps for cases the automated systems can't resolve. At low volume, these queues are manageable. At high volume, they become the constraint on onboarding capacity.

The failure mode is subtle. The automated system handles the easy cases. The human review queue fills with hard cases. But as volume grows, "hard cases" starts to include cases that aren't actually hard — they just arrived when the queue was long and the reviewers were behind.

The solution isn't to eliminate human review. Some cases genuinely require human judgment. The solution is to design the human review layer with explicit capacity planning, SLA management, and escalation paths — treating it like a system component rather than an overflow valve.

**The state management problem**

Under all of these architectural failures is a common root cause: most onboarding systems don't have a clean model of application state.

What are the states an application can be in? What transitions are valid between states? What triggers each transition? What happens if a transition fails?

Without answers to these questions, onboarding systems accumulate implicit state — applications that are "stuck" somewhere without an explicit status, edge cases handled through informal processes, errors that require manual intervention to resolve.

At low volume, implicit state is manageable because the humans who understand the informal processes have enough bandwidth to handle it. At high volume, implicit state is the operational complexity that compounds invisibly.

**What good looks like**

A well-designed onboarding system at scale has:

An explicit state machine for every application, with defined states and transitions.

Separate handling for customer-facing steps (what the customer experiences) and operational steps (what the system does behind the scenes).

Asynchronous verification where possible, with the customer informed of their application status rather than waiting for synchronous checks.

Human review queues with explicit capacity, SLAs, and escalation paths — monitored as system metrics, not managed informally.

Observability at every step — conversion rates, drop-off rates, processing times, error rates — so that operational degradation is visible before it becomes catastrophic.

Most onboarding systems have none of these. They were designed for the moment, not for scale. And they're one growth spike away from the operational complexity that compounds invisibly until it doesn't.`,
  },
  {
    title: 'Machine-Assisted Operations and Human Cognition',
    summary: 'The interface between human judgment and machine suggestion is the hardest design problem in operational AI. Why it matters more than model accuracy.',
    tags: ['AI', 'human-AI', 'operational-intelligence', 'workflow-design'],
    content: `The hard problem in operational AI isn't the model. It's the interface between the model's output and the human decision.

This sounds like a UX problem. It isn't — or rather, it's much more than a UX problem. It's a cognitive load problem, a trust calibration problem, an accountability problem, and an organizational design problem, all at once.

**Why the interface matters more than the model**

A model with 85% accuracy, combined with an interface that helps humans apply their judgment to the remaining 15%, will outperform a model with 95% accuracy combined with an interface that degrades human judgment.

This is counterintuitive. We optimize for model performance — precision, recall, F1 scores — because these are measurable and because improving them seems obviously good. But the marginal value of model performance decreases as you approach the performance ceiling for a given task. The marginal value of human-AI interface design doesn't have a clear ceiling.

Put differently: you can probably improve model accuracy by a few percentage points with significant investment. You can probably improve operational outcomes by a much larger amount by improving how humans interact with the model's outputs.

**The trust calibration problem**

When a model presents a recommendation, humans need to decide how much to trust it. This calibration is surprisingly difficult and poorly understood.

Under-trust leads to ignoring the model and losing the efficiency gains. Over-trust leads to accepting the model's output without evaluation and losing the judgment that the human was supposed to contribute.

The calibration problem is complicated by the fact that human trust in AI systems is not well-calibrated by experience. Research consistently shows that humans over-trust AI systems after seeing them perform well on easy cases (which is most cases, since that's what the model is optimized for), and then lose trust dramatically when the model fails on hard cases (which is exactly where you want humans paying attention).

The interface design response to this: make the model's uncertainty legible. Not just "here's my recommendation" but "here's my recommendation, here's my confidence level, here's what factors are driving the recommendation, and here's what would make me change it."

When uncertainty is legible, humans can calibrate their trust appropriately — applying more scrutiny to low-confidence recommendations and less to high-confidence ones.

**The accountability structure**

Operational decisions in regulated industries carry accountability. When an AML analyst clears a suspicious activity alert, their name is on it. When a compliance officer approves a high-risk onboarding, there's an audit trail.

AI recommendations don't carry accountability in the same way. The model isn't personally responsible for its outputs.

This creates an accountability gap that interface design has to bridge. The human needs to remain genuinely accountable for decisions made with AI assistance — not just formally (their name is on the form) but substantively (they actually evaluated the recommendation).

This means interfaces that require the human to engage with the recommendation, not just accept or reject it. What does the recommendation say? Why? Do you agree with the reasoning? If you're overriding it, why?

These friction points feel like friction, but they're doing important work. They maintain the human's genuine engagement with the decision rather than turning them into a rubber stamp for the model's output.

**The cognitive load question**

Every interface design choice either increases or decreases cognitive load. Good machine-assisted operational systems reduce cognitive load; bad ones increase it.

The most common cognitive load failure: information overload. The model surfaces everything that might be relevant. The human now has to process all of it plus do their own analysis. Total cognitive load has increased.

The fix is curation, not comprehensiveness. What are the three most important pieces of context for this decision? Surface those. Make everything else available but not primary.

The second most common failure: explanation complexity. The model explains its reasoning in terms that require the human to understand how the model works. This is the wrong level of explanation for most operational contexts. Explain in terms of the decision, not in terms of the model.

**What good looks like in practice**

A compliance analyst reviewing a flagged transaction. The interface shows:

The transaction details. Concise.

The model's assessment: this pattern matches two known typologies. The counterparty has a prior filing. Recommended disposition: escalate for investigation.

The key evidence. Three items, not thirty.

The model's confidence level. High.

What would change the recommendation: if the analyst confirms the business relationship between the parties is legitimate, the recommendation would change to monitor.

The analyst evaluates this in sixty seconds and either accepts the recommendation (with a one-click confirmation that records their agreement with the reasoning) or overrides it (with a required note explaining why).

This is fast. It's accountable. It maintains human judgment where it matters. And it produces data that improves the model over time.

The model does the pattern matching. The human does the judgment. The interface makes the handoff clean.

That's what machine-assisted operations actually looks like when it's designed well.`,
  },
];

async function main() {
  console.log('Seeding essays...');
  const now = new Date();

  for (const essay of essays) {
    const slug = slugify(essay.title);
    const publicId = id();

    await db
      .insert(schema.articles)
      .values({
        publicId,
        title: essay.title,
        slug,
        summary: essay.summary,
        content: essay.content,
        tags: essay.tags,
        prerequisites: [],
        checks: [],
        status: 'published',
        platform: 'blog',
        contentPillar: 'systems-thinking',
        metaDescription: essay.summary,
        keywords: essay.tags,
        readingTimeMinutes: Math.ceil(essay.content.split(' ').length / 200),
        linkedinVersion: '',
        articleType: 'insight',
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing();

    console.log(`  ✓ ${essay.title}`);
  }

  console.log('Done.');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
