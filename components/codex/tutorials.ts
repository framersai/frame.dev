/**
 * Tutorial configurations for the Frame Codex walkthrough.
 * Defines steps, targets, and descriptive content for onboarding.
 * @module codex/tutorials
 */

export type TutorialId = 'intro' | 'navigation' | 'search' | 'editing'

export interface TutorialStep {
  target: string
  title: string
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  disableBeacon?: boolean
}

export interface TutorialConfig {
  id: TutorialId
  title: string
  steps: TutorialStep[]
}

export const TUTORIALS: Record<TutorialId, TutorialConfig> = {
  intro: {
    id: 'intro',
    title: 'Welcome to Codex',
    steps: [
      {
        target: 'body',
        title: 'Welcome to Frame Codex',
        content: 'This is your knowledge base viewer. Let\'s take a quick tour of the main features.',
        placement: 'bottom',
      },
      {
        target: '[data-testid="codex-sidebar"]',
        title: 'Navigation Sidebar',
        content: 'Browse your file tree here. Use the density toggle in settings to adjust the view.',
        placement: 'right',
      },
      {
        target: '[data-testid="codex-content"]',
        title: 'Content Viewer',
        content: 'Your selected files appear here. We support Markdown, code, images, and more.',
        placement: 'left',
      },
    ],
  },
  navigation: {
    id: 'navigation',
    title: 'Navigation & Organization',
    steps: [
      {
        target: '[data-testid="nav-breadcrumbs"]',
        title: 'Breadcrumbs',
        content: 'See exactly where you are in the hierarchy. Click any segment to jump up.',
        placement: 'bottom',
      },
      {
        target: '[data-testid="nav-bookmarks"]',
        title: 'Bookmarks',
        content: 'Pin important files for quick access later.',
        placement: 'bottom',
      },
    ],
  },
  search: {
    id: 'search',
    title: 'Powerful Search',
    steps: [
      {
        target: '[data-testid="search-trigger"]',
        title: 'Quick Search',
        content: 'Press "/" to start searching instantly. Find files by name or content.',
        placement: 'bottom',
      },
      {
        target: '[data-testid="search-filters"]',
        title: 'Search Filters',
        content: 'Narrow down results by file type, date, or path.',
        placement: 'bottom',
      },
    ],
  },
  editing: {
    id: 'editing',
    title: 'Editing & Contributing',
    steps: [
      {
        target: '[data-testid="edit-button"]',
        title: 'Edit Mode',
        content: 'Found a typo? Switch to edit mode to make changes.',
        placement: 'bottom',
      },
      {
        target: '[data-testid="contribute-button"]',
        title: 'Contribute',
        content: 'Submit your changes via a Pull Request directly from Codex.',
        placement: 'bottom',
      },
    ],
  },
}

