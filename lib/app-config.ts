export type FeatureFlagKey =
  | 'enableAbout'
  | 'enableProjects'
  | 'enableCaseStudies'
  | 'enableExpertise'
  | 'enableNow'
  | 'showWritingSection'
  | 'enableAiChat'
  | 'enableContact'
  | 'enableAiDraftAssistant'
  | 'enableChecklist';

export type FeatureFlags = Record<FeatureFlagKey, boolean>;

export const defaultFeatureFlags: FeatureFlags = {
  enableAbout: true,
  enableProjects: true,
  enableCaseStudies: true,
  enableExpertise: true,
  enableNow: true,
  showWritingSection: true,
  enableAiChat: false,
  enableContact: true,
  enableAiDraftAssistant: true,
  enableChecklist: true
};

export const featureFlagLabels: Record<FeatureFlagKey, string> = {
  enableAbout: 'Show about section',
  enableProjects: 'Show projects section',
  enableCaseStudies: 'Show case studies section',
  enableExpertise: 'Show "How I Think" section',
  enableNow: 'Show "Now" section',
  showWritingSection: 'Show writing section',
  enableAiChat: 'Enable AI persona chat',
  enableContact: 'Show contact section',
  enableAiDraftAssistant: 'Enable AI drafting assistant',
  enableChecklist: 'Enable prerequisite checklist gate'
};

export const featureFlagsStorageKey = 'anveet-feature-flags';
export const adminPostsStorageKey = 'anveet-admin-posts';
