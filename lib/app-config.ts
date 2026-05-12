export type FeatureFlagKey =
  // New revamp zones
  | 'enableSignalsStrip'
  | 'enableSystemsLayer'
  | 'enableShapedSystems'
  | 'enableExplorations'
  | 'enableMentalModels'
  | 'enableSignalsEngine'
  | 'enableNotesFromSystem'
  | 'enableOpenThreads'
  // Legacy (kept for backward compat — all disabled)
  | 'enableAbout'
  | 'enableProjects'
  | 'enableCaseStudies'
  | 'enableExpertise'
  | 'enableBuildStack'
  | 'enableNow'
  | 'showWritingSection'
  | 'enableAiChat'
  | 'enableContact'
  | 'enableAiDraftAssistant'
  | 'enableChecklist'
  | 'enableDomainExpertise'
  | 'enableRegtechSection';

export type FeatureFlags = Record<FeatureFlagKey, boolean>;

export const defaultFeatureFlags: FeatureFlags = {
  // New revamp zones
  enableSignalsStrip: true,
  enableSystemsLayer: true,
  enableShapedSystems: true,
  enableExplorations: true,
  enableMentalModels: true,
  enableSignalsEngine: true,
  enableNotesFromSystem: true,
  enableOpenThreads: true,
  // Legacy — disabled
  enableAbout: false,
  enableProjects: false,
  enableCaseStudies: false,
  enableExpertise: false,
  enableBuildStack: false,
  enableNow: false,
  showWritingSection: false,
  enableAiChat: false,
  enableContact: false,
  enableAiDraftAssistant: true,
  enableChecklist: true,
  enableDomainExpertise: false,
  enableRegtechSection: false,
};

export const featureFlagLabels: Record<FeatureFlagKey, string> = {
  // New zones
  enableSignalsStrip: 'Show Signals strip',
  enableSystemsLayer: 'Show "The Systems Layer" zone',
  enableShapedSystems: 'Show "Systems I\'ve Helped Shape" zone',
  enableExplorations: 'Show "Active Explorations" zone',
  enableMentalModels: 'Show "Mental Models" zone',
  enableSignalsEngine: 'Show "Signals Engine" live zone',
  enableNotesFromSystem: 'Show "Notes From The System" zone',
  enableOpenThreads: 'Show "Open Threads" zone',
  // Legacy
  enableAbout: 'Show about section (legacy)',
  enableProjects: 'Show projects section (legacy)',
  enableCaseStudies: 'Show case studies section (legacy)',
  enableExpertise: 'Show "How I Think" section (legacy)',
  enableBuildStack: 'Show "What I Build With" section (legacy)',
  enableNow: 'Show "Now" section (legacy)',
  showWritingSection: 'Show insights section (legacy)',
  enableAiChat: 'Enable AI persona chat',
  enableContact: 'Show contact section (legacy)',
  enableAiDraftAssistant: 'Enable AI drafting assistant',
  enableChecklist: 'Enable prerequisite checklist gate',
  enableDomainExpertise: 'Show Domain Expertise section (legacy)',
  enableRegtechSection: 'Show RegTech Commentary section',
};

export const featureFlagsStorageKey = 'anveet-feature-flags';
export const adminPostsStorageKey = 'anveet-admin-posts';
