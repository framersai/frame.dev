export type BlogPostMeta = {
  slug: string
  title: string
  excerpt: string
  description: string
  date: string
  readTime: string
  author: string
  featured?: boolean
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'introducing-frame',
    title: 'Introducing Frame: The OS for Your Life',
    excerpt:
      "Today we're thrilled to announce Frame—a revolutionary suite of operating systems designed to organize, simplify, and enhance every aspect of your digital existence.",
    description:
      'Discover how Frame unifies AgentOS, WebOS, HomeOS, SafeOS, WorkOS, and MyOS on the OpenStrand architecture to bring order to every aspect of your digital life.',
    date: '2025-01-09',
    readTime: '5 min read',
    author: 'Frame Team',
    featured: true,
  },
  {
    slug: 'agentos-launch',
    title: 'AgentOS is Now Live',
    excerpt:
      'Our production-ready runtime for AI agents is now available. Deploy, manage, and orchestrate AI agents at scale with TypeScript-native tooling.',
    description:
      'Learn how AgentOS helps teams ship production AI agents faster with TypeScript APIs, progressive rollout workflows, and real-time observability.',
    date: '2025-01-08',
    readTime: '3 min read',
    author: 'Engineering Team',
  },
  {
    slug: 'openstrand-architecture',
    title: 'Understanding OpenStrand Architecture',
    excerpt:
      'Deep dive into the distributed architecture powering all Frame operating systems and enabling seamless interoperability.',
    description:
      'OpenStrand is the event-driven, zero-trust substrate that keeps every Frame OS in sync. Explore the core concepts and how developers can extend it.',
    date: '2025-01-07',
    readTime: '8 min read',
    author: 'Technical Team',
  },
]

export function getBlogPost(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string, count = 2): BlogPostMeta[] {
  return blogPosts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

