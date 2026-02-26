export type FeatureFlagKey =
  | 'showWritingSection'
  | 'enableAiDraftAssistant'
  | 'enableChecklist'
  | 'enableAiChat'
  | 'enableCaseStudies'
  | 'enableExpertise'
  | 'enableProjects'
  | 'enableNow';

export type FeatureFlags = Record<FeatureFlagKey, boolean>;

export const defaultFeatureFlags: FeatureFlags = {
  showWritingSection: true,
  enableAiDraftAssistant: true,
  enableChecklist: true,
  enableAiChat: true,
  enableCaseStudies: true,
  enableExpertise: true,
  enableProjects: true,
  enableNow: true
};

export const featureFlagLabels: Record<FeatureFlagKey, string> = {
  showWritingSection: 'Show writing section',
  enableAiDraftAssistant: 'Enable AI drafting assistant',
  enableChecklist: 'Enable prerequisite checklist gate',
  enableAiChat: 'Enable AI persona chat',
  enableCaseStudies: 'Show case studies section',
  enableExpertise: 'Show "How I Think" section',
  enableProjects: 'Show projects section',
  enableNow: 'Show "Now" section'
};

export const featureFlagsStorageKey = 'anveet-feature-flags';
export const adminPostsStorageKey = 'anveet-admin-posts';
