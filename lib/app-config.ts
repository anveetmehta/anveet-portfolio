export type FeatureFlagKey =
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
  enableAbout: true,
  enableProjects: true,
  enableCaseStudies: true,
  enableExpertise: true,
  enableBuildStack: true,
  enableNow: true,
  showWritingSection: true,
  enableAiChat: false,
  enableContact: true,
  enableAiDraftAssistant: true,
  enableChecklist: true,
  enableDomainExpertise: true,
  enableRegtechSection: false,
};

export const featureFlagLabels: Record<FeatureFlagKey, string> = {
  enableAbout: 'Show about section',
  enableProjects: 'Show projects section',
  enableCaseStudies: 'Show case studies section',
  enableExpertise: 'Show "How I Think" section',
  enableBuildStack: 'Show "What I Build With" section',
  enableNow: 'Show "Now" section',
  showWritingSection: 'Show insights section',
  enableAiChat: 'Enable AI persona chat',
  enableContact: 'Show contact section',
  enableAiDraftAssistant: 'Enable AI drafting assistant',
  enableChecklist: 'Enable prerequisite checklist gate',
  enableDomainExpertise: 'Show Domain Expertise section',
  enableRegtechSection: 'Show RegTech Commentary section',
};

export const featureFlagsStorageKey = 'anveet-feature-flags';
export const adminPostsStorageKey = 'anveet-admin-posts';
