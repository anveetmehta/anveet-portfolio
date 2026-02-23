export type FeatureFlagKey =
  | 'showWritingSection'
  | 'enableAiDraftAssistant'
  | 'enableChecklist'
  | 'enableAiChat'
  | 'enableCaseStudies'
  | 'enableExpertise';

export type FeatureFlags = Record<FeatureFlagKey, boolean>;

export const defaultFeatureFlags: FeatureFlags = {
  showWritingSection: true,
  enableAiDraftAssistant: true,
  enableChecklist: true,
  enableAiChat: true,
  enableCaseStudies: true,
  enableExpertise: true
};

export const featureFlagLabels: Record<FeatureFlagKey, string> = {
  showWritingSection: 'Show writing section',
  enableAiDraftAssistant: 'Enable AI drafting assistant (Phase 1)',
  enableChecklist: 'Enable prerequisite checklist gate (Phase 1)',
  enableAiChat: 'Enable AI persona chat (Phase 3)',
  enableCaseStudies: 'Show case studies section',
  enableExpertise: 'Show expertise section'
};

export const featureFlagsStorageKey = 'anveet-feature-flags';
export const adminPostsStorageKey = 'anveet-admin-posts';
