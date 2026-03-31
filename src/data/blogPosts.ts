export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  linkedinUrl?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-opensre",
    title: "Introducing OpenSRE — AI-Powered Incident Investigation",
    date: "2026-03-31",
    content: `
      <p>I'm excited to announce <strong>OpenSRE</strong> — an open-source AI SRE platform that automatically investigates production incidents using episodic memory and knowledge graphs.</p>
      <p>After years of being on-call and manually investigating incidents, I built OpenSRE to automate the repetitive parts of incident response. The platform combines LLM agents with a Neo4j knowledge graph to understand service topology and an episodic memory system that learns from every investigation.</p>
      <h3>Key Features</h3>
      <ul>
        <li><strong>Episodic Memory</strong> — learns from every investigation, surfaces past solutions for similar incidents</li>
        <li><strong>Knowledge Graph</strong> — Neo4j-powered service topology awareness and blast radius analysis</li>
        <li><strong>46 Production Skills</strong> — integrations with Elasticsearch, Datadog, Grafana, PagerDuty, Kubernetes, AWS, and more</li>
        <li><strong>Multi-provider LLM</strong> — works with Claude, OpenAI, Gemini, DeepSeek, and 14+ more providers</li>
      </ul>
      <p>Check it out at <a href="https://opensre.in">opensre.in</a> or on <a href="https://github.com/swapnildahiphale/OpenSRE">GitHub</a>.</p>
    `,
    linkedinUrl: undefined,
    tags: ["OpenSRE", "AI", "SRE", "incident response", "open source"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
