import Link from 'next/link';
import { BackendPhaseCard } from '@/components/BackendPhaseCard';
import { DataModelCard } from '@/components/DataModelCard';
import { NotificationTemplateCard } from '@/components/NotificationTemplateCard';
import { OperationsSection } from '@/components/OperationsSection';
import { PageShell } from '@/components/PageShell';
import { SecurityChecklist } from '@/components/SecurityChecklist';
import { WorkflowStepCard } from '@/components/WorkflowStepCard';
import {
  backendPhases,
  dataModels,
  documentCategories,
  futureIntegrations,
  roles,
  securityChecklist,
  workflowSteps
} from '@/lib/backend-plan';
import { generateMatterCode } from '@/lib/matter-code';
import { notificationTemplates } from '@/lib/notifications';
import { statusLabels } from '@/lib/status-labels';

const schemaPreview = `model User {
  id        String   @id @default(cuid())
  name      String
  email     String?  @unique
  phone     String?
  role      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model IntakeSubmission {
  id                                  String   @id @default(cuid())
  referenceNumber                     String   @unique
  fullName                            String
  phone                               String
  email                               String?
  location                            String?
  matterType                          String
  narration                           String
  urgency                             String
  preferredContactMethod              String?
  status                              String
  consentAccepted                     Boolean  @default(false)
  aiNoticeAccepted                    Boolean  @default(false)
  privacyNoticeAccepted               Boolean  @default(false)
  noClientRelationshipAccepted        Boolean  @default(false)
  submittedAt                         DateTime @default(now())
  updatedAt                           DateTime @updatedAt
}

model Matter {
  id                  String   @id @default(cuid())
  matterCode          String   @unique
  clientId            String
  intakeSubmissionId  String?
  title               String
  matterType          String
  status              String
  assignedLawyerId    String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  closedAt            DateTime?
}`;

const operatingPrinciples = [
  'No public submission becomes a full matter until conflict review and office acceptance.',
  'Matter codes are issued only after engagement or express written office confirmation.',
  'Matter-code access must eventually require OTP or secure account login, not a code alone.',
  'Filing expenses are separate from professional fees and arise only after engagement and specific filing instruction.',
  'AI-assisted material is an internal aid. Lawyer judgment controls advice, filings, letters, and strategy.'
];

const paymentRules = [
  'Create an invoice record before accepting any payment.',
  'Classify the invoice as intake review, consultation, professional fee, filing expense, disbursement, or other expense.',
  'Do not describe preliminary payment as filing fee.',
  'Payment of a consultation or intake review fee does not by itself create full representation.',
  'Reconcile every payment provider reference to an invoice and matter record.'
];

const authPhases = [
  ['Phase 1', 'Mock login only for prototype demonstration.'],
  ['Phase 2', 'Email or phone OTP tied to intake reference and registered contact.'],
  ['Phase 3', 'Full client account with secure sessions and matter-code verification.'],
  ['Phase 4', 'Role-based office dashboard for lawyer, staff, and super admin users.'],
  ['Phase 5', 'Audit trail, device/session logs, access revocation, and sensitive-action confirmation.']
];

export default function OperationsPlanPage() {
  const sampleMatterCode = generateMatterCode('Land/property', 2026);
  const statusEntries = Object.entries(statusLabels).slice(0, 9);

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-navy text-vellum">
        <div className="absolute inset-0 opacity-60 vault-grid" />
        <div className="absolute -right-28 -top-44 h-[32rem] w-[32rem] rounded-full bg-brass/20 blur-3xl" />
        <div className="absolute -bottom-48 left-10 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-24">
          <div>
            <div className="mb-7 inline-flex rounded-full border border-brass/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brass">
              Stage 4 · Operational backend plan
            </div>
            <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
              Client Room Operational Backend Plan
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-vellum/70">
              Database, authentication, matter codes, document storage, payment flow, admin workflow, notifications, security, and audit-trail architecture for turning the prototype into a real office system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/client-room/legal" className="rounded-full bg-brass px-6 py-3 text-sm font-bold text-navy transition hover:bg-vellum">
                View Legal Pack
              </Link>
              <Link href="/client-room/admin" className="rounded-full border border-vellum/25 px-6 py-3 text-sm font-bold text-vellum transition hover:border-brass hover:text-brass">
                Office Review Desk
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-vellum/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-brass/25 bg-navy/74 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brass">Implementation warning</p>
              <h2 className="mt-4 font-display text-3xl text-vellum">Scaffold, not live backend.</h2>
              <p className="mt-4 text-sm leading-7 text-vellum/58">
                This page is an implementation plan and technical scaffold. Live database, authentication, file storage, payment, and notification services must be connected, secured, and tested before public use.
              </p>
              <div className="mt-6 rounded-2xl border border-brass/25 bg-black/15 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-vellum/45">Sample matter-code format</p>
                <p className="mt-2 font-mono text-lg font-bold text-brass">{sampleMatterCode}</p>
                <p className="mt-2 text-xs leading-5 text-vellum/45">Matter code alone must never become sufficient access control.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OperationsSection
        eyebrow="System overview"
        title="The operating principle is sequence control."
        description="The system must force the office journey to happen in the right order: intake, consent, conflict check, decision, engagement, matter code, matter room, filing instruction, closure."
      >
        <div className="grid gap-4 md:grid-cols-5">
          {operatingPrinciples.map((principle) => (
            <article key={principle} className="rounded-3xl border border-ink/10 bg-white/64 p-5 shadow-sm backdrop-blur">
              <div className="mb-4 h-1 w-12 rounded-full bg-brass" />
              <p className="text-sm font-semibold leading-7 text-ink/70">{principle}</p>
            </article>
          ))}
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="User roles"
        title="Access is defined by office status, not curiosity."
        description="A person’s rights inside the Client Room should change only when the office changes their status."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <article key={role.key} className="chamber-card rounded-3xl p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brass">{role.key}</p>
              <h3 className="mt-3 font-display text-2xl text-ink">{role.label}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/55">{role.description}</p>
            </article>
          ))}
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="Matter lifecycle"
        title="Statuses must mirror the legal office, not the website."
        description="These statuses create a shared language between intake, admin review, client room, invoicing, document management, and closing."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {statusEntries.map(([key, value]) => (
            <article key={key} className="rounded-3xl border border-ink/10 bg-white/70 p-5 shadow-sm backdrop-blur">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brass">{key}</p>
              <h3 className="mt-3 font-display text-xl text-ink">{value.label}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/55">{value.description}</p>
            </article>
          ))}
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="Data model"
        title="Every legal action needs a record."
        description="The real system should use PostgreSQL with Prisma ORM. Files belong in secure object storage; the database stores metadata, statuses, references, consents, invoices, and audit logs."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {dataModels.map((model) => (
            <DataModelCard key={model.name} {...model} />
          ))}
        </div>
        <div className="mt-8 rounded-[2rem] border border-ink/10 bg-ink p-5 shadow-institution md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brass">Prisma-style schema preview</p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/45 p-5 text-xs leading-6 text-vellum/80"><code>{schemaPreview}</code></pre>
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="Authentication and matter-code model"
        title="Matter-code access must be controlled, not guessed."
        description="The matter code should only be issued after acceptance and should be linked to the registered client phone, email, or account."
      >
        <div className="grid gap-4 md:grid-cols-5">
          {authPhases.map(([phase, note]) => (
            <article key={phase} className="rounded-3xl border border-brass/20 bg-navy p-5 text-vellum shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brass">{phase}</p>
              <p className="mt-3 text-sm leading-7 text-vellum/68">{note}</p>
            </article>
          ))}
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="File and evidence storage"
        title="Uploads become evidence records, not casual attachments."
        description="The prototype shows upload panels. The real system should protect files in object storage, link metadata to the intake or matter, and allow review status tracking."
      >
        <div className="grid gap-3 md:grid-cols-5">
          {documentCategories.map((category) => (
            <div key={category} className="rounded-2xl border border-ink/10 bg-white/70 p-4 text-sm font-semibold leading-6 text-ink/70 shadow-sm">
              {category}
            </div>
          ))}
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="Payment and invoice model"
        title="Invoices come before payments; engagement comes before filing expenses."
        description="The payment layer should support consultation and intake review fees, professional fee invoices, filing expenses, and disbursement tracking without confusing any of them."
      >
        <div className="grid gap-4 md:grid-cols-5">
          {paymentRules.map((rule) => (
            <article key={rule} className="rounded-3xl border border-ink/10 bg-white/70 p-5 shadow-sm backdrop-blur">
              <div className="mb-4 h-1 w-12 rounded-full bg-brass" />
              <p className="text-sm font-semibold leading-7 text-ink/70">{rule}</p>
            </article>
          ))}
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="Admin workflow"
        title="The lawyer’s command desk decides the fate of the intake."
        description="Admin review should not merely list submissions. It should structure decisions, next actions, risk flags, missing questions, and legal-office accountability."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {workflowSteps.map((step, index) => (
            <WorkflowStepCard key={step} number={index + 1}>{step}</WorkflowStepCard>
          ))}
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="Notifications"
        title="Every client message should be controlled, traceable, and status-aware."
        description="Notification templates should be connected to matter status changes and office actions, not random automated chat."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {notificationTemplates.slice(0, 6).map((template) => (
            <NotificationTemplateCard key={template.key} title={template.title} subject={template.subject} body={template.body} />
          ))}
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="Security and audit trail"
        title="Trust is designed through restrictions."
        description="A legal portal earns trust not by being open, but by being controlled, logged, and reviewable."
      >
        <SecurityChecklist items={securityChecklist} />
      </OperationsSection>

      <OperationsSection
        eyebrow="Backend roadmap"
        title="Build the real backend in disciplined phases."
        description="The recommended implementation order avoids mixing client access, payments, and file storage before the core records and office statuses are stable."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {backendPhases.map((phase) => (
            <BackendPhaseCard key={phase.title} {...phase} />
          ))}
        </div>
      </OperationsSection>

      <OperationsSection
        eyebrow="Future integrations"
        title="The scaffold is now ready to receive production services."
      >
        <div className="rounded-[2rem] border border-brass/25 bg-navy p-7 text-vellum shadow-institution md:p-9">
          <div className="grid gap-3 md:grid-cols-2">
            {futureIntegrations.map((integration) => (
              <div key={integration} className="rounded-2xl border border-vellum/10 bg-white/5 p-4 text-sm leading-6 text-vellum/70">
                {integration}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/client-room/legal" className="rounded-full bg-brass px-6 py-3 text-sm font-bold text-navy transition hover:bg-vellum">
              Legal Pack
            </Link>
            <Link href="/client-room" className="rounded-full border border-vellum/25 px-6 py-3 text-sm font-bold text-vellum transition hover:border-brass hover:text-brass">
              Back to Client Room
            </Link>
          </div>
        </div>
      </OperationsSection>
    </PageShell>
  );
}
