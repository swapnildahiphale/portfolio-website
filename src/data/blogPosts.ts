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
    date: "2026-04-07",
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
  {
    slug: "cloudflare-is-down-again",
    title: "Cloudflare is Down, Again!",
    date: "2025-11-25",
    content: `<p>Cloudflare is down, Again!</p>`,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7396525944288727040/",
    tags: ["SRE", "reliability", "outage", "Cloudflare"],
  },
  {
    slug: "toon-token-oriented-object-notation-llm-costs",
    title: "TOON: Cutting LLM Token Costs by 40–60%",
    date: "2025-11-24",
    content: `
      <p>Token costs are the quiet tax of the AI era. Every time we send JSON to an LLM, we're paying for the same field names again and again. A 100-row dataset? You've basically paid for <code>customer_id</code> 100 times.</p>
      <p>I stumbled upon <strong>TOON (Token-Oriented Object Notation)</strong> this week, and it's such a clever idea. Instead of repeating keys, you define the schema once, then stream your data like CSV:</p>
      <pre>orders[100]{id,customer,total}:
 1,John,499.00
 2,Ana,129.00</pre>
      <p>The benchmarks show <strong>40–60% fewer tokens</strong> on real datasets — one analytics dump went from 10,977 → 4,507 tokens. Even better, models actually parse TOON more accurately than JSON, because the structure helps them "see" the data clearly.</p>
      <p>If you're running anything that pushes structured data into LLMs, this is worth a look.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7396426945636339712/",
    tags: ["AI", "LLM", "token optimization", "TOON", "cost"],
  },
  {
    slug: "ai-2027-scenario-moving-too-fast",
    title: "The AI 2027 Scenario: Are We Moving Too Fast?",
    date: "2025-09-15",
    content: `
      <p>Just read this AI 2027 scenario and it's kind of unsettling.</p>
      <p>Basically two paths — we either rush AI development and things go badly, or we slow down but a small group gets way too much power. Neither sounds great.</p>
      <p>I keep wondering if we're moving too fast or not fast enough with AI. Feels like we're all just winging it. Anyone else feeling this tension?</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7373612383023312896/",
    tags: ["AI", "future", "AI safety", "opinion"],
  },
  {
    slug: "serverless-portfolio-website-production",
    title: "My Serverless Portfolio Website is Live",
    date: "2019-04-01",
    content: `
      <p>Some weekends are just more memorable than others. Put my <strong>Serverless portfolio website</strong> into production!</p>
      <p>Serverless is being examined as a new abstraction for making business applications more scalable and cost-efficient. The model shifts infrastructure management entirely to the cloud provider, letting you focus purely on code.</p>
      <p>Built on <strong>AWS</strong>, this portfolio demonstrates how Serverless can power even personal projects with minimal ops overhead.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6404280004703805440/",
    tags: ["serverless", "AWS", "portfolio", "cloud"],
  },
  {
    slug: "redhat-delivery-specialist-cloud-automation",
    title: "Earned RedHat Delivery Specialist – Cloud Automation",
    date: "2018-03-01",
    content: `
      <p>One more certification added to the bucket!</p>
      <p>Earned the <strong>RedHat Delivery Specialist – Cloud Automation</strong> certification. This validates expertise in automating cloud infrastructure delivery using RedHat's toolset and methodologies.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6357181862254874624/",
    tags: ["RedHat", "certification", "cloud", "automation", "DevOps"],
  },
  {
    slug: "redhat-delivery-specialist-paas-certifications",
    title: "Earned RedHat Delivery Specialist – PaaS Certifications",
    date: "2018-02-01",
    content: `
      <p>Happy and proud to have achieved and hold the:</p>
      <ul>
        <li><strong>RedHat Delivery Specialist – Platform-as-a-Service (PaaS)</strong></li>
        <li><strong>RedHat Delivery Specialist – Platform-as-a-Service (PaaS) Development</strong></li>
      </ul>
      <p>These certifications validate deep expertise in deploying and developing on OpenShift and RedHat's PaaS stack — a milestone in my cloud-native journey.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6303890160392208384/",
    tags: ["RedHat", "certification", "PaaS", "OpenShift", "cloud"],
  },
  {
    slug: "speaking-at-devops-global-summit-2017",
    title: "Speaking at DevOps++ Global Summit 2017",
    date: "2017-09-09",
    content: `
      <p>Presented at the <strong>DevOps++ Global Summit 2017</strong> on 9th September 2017.</p>
      <p>It was a privilege to share knowledge and connect with the global DevOps community at one of the premier DevOps conferences. The audience engagement and quality of discussions made it a truly memorable event.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6316834021577986048/",
    tags: ["DevOps", "speaking", "conference", "DevOps++ 2017"],
  },
  {
    slug: "devops-global-summit-2017-experience",
    title: "Speaking at DevOps++ Global Summit 2017: A Recap",
    date: "2017-09-12",
    content: `
      <p>It was a great experience speaking in <strong>DevOps++ Global Summit 2017</strong>.</p>
      <p>A huge thank you to <strong>Lokesh Jawane</strong> for being an awesome co-presenter. The collaboration made the talk even stronger and the conversation richer. Events like these remind me why the DevOps community is so special — the shared passion for continuous improvement and knowledge exchange.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6312973810626887680/",
    tags: ["DevOps", "speaking", "conference", "DevOps++ 2017", "Ansible"],
  },
  {
    slug: "windows-automation-ansible-devops-summit-2017",
    title: "Join Me at DevOps++ Global Summit 2017 — Windows Automation with Ansible",
    date: "2017-09-05",
    content: `
      <p>Excited to be speaking at <strong>DevOps++ Global Summit 2017</strong>! I'll be talking on <em>"Windows Automation using Ansible"</em>.</p>
      <p>If you're working on infrastructure automation or exploring Ansible for Windows environments, come join the session. Let's meet at the conference!</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6311852631258173440/",
    tags: ["DevOps", "Ansible", "Windows", "automation", "conference"],
  },
  {
    slug: "devops-assessment-quiz-free-conference-pass",
    title: "Take Our DevOps Assessment Quiz for a Free Conference Pass",
    date: "2017-08-25",
    content: `
      <p>Want a free ticket to the <strong>#doppa17</strong> DevOps conference in Pune?</p>
      <p>Take our DevOps assessment quiz — the lucky winner gets a free conference pass! It's a great way to test your DevOps knowledge and potentially score access to one of the best DevOps events in India.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6308972822966390784/",
    tags: ["DevOps", "conference", "Pune", "DevOps++ 2017"],
  },
  {
    slug: "continuous-integration-for-salesforce",
    title: "Continuous Integration for Salesforce",
    date: "2017-05-01",
    content: `
      <p>Continuous Integration for Salesforce — bringing CI/CD discipline to CRM development.</p>
      <p>Applying DevOps practices like automated testing, version control, and CI pipelines to Salesforce development workflows can dramatically improve release quality and developer velocity. This is an often-overlooked area where DevOps principles deliver huge value.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6289058830408130560/",
    tags: ["Salesforce", "CI/CD", "DevOps", "automation"],
  },
  {
    slug: "calculate-your-devops-readiness-score",
    title: "Calculate Your DevOps Readiness Score",
    date: "2017-01-01",
    content: `
      <p>How mature is your DevOps practice? Calculate your <strong>DevOps readiness score</strong>!</p>
      <p>DevOps maturity models help teams identify gaps across culture, automation, measurement, and sharing. Benchmarking against these models is the first step to building a roadmap toward truly high-performing engineering organizations.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6248106071844581376/",
    tags: ["DevOps", "maturity", "assessment", "culture"],
  },
  {
    slug: "certified-jenkins-engineer",
    title: "I'm Now a Certified Jenkins Engineer",
    date: "2016-04-01",
    content: `
      <p>I did it! I'm pretty excited to be in the first group of people to be recognized as a <strong>Certified Jenkins Engineer</strong>.</p>
      <p>After working with this great product for some time, it was great to finally have recognition for what I've learned. Jenkins has been a big help in applying Continuous Integration and Continuous Delivery principles across every project I've worked on.</p>
      <p>The certification validates hands-on expertise with Jenkins pipelines, plugins, and CI/CD best practices — skills that form the backbone of modern DevOps workflows.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6146155464750137344/",
    tags: ["Jenkins", "certification", "CI/CD", "DevOps"],
  },
  {
    slug: "passed-aws-solutions-architect-associate",
    title: "Passed the AWS Solutions Architect Associate Exam",
    date: "2016-02-01",
    content: `
      <p>Happy to share that I have passed the <strong>AWS Solutions Architect Associate</strong> exam!</p>
      <p>This certification validates the ability to design distributed systems on AWS — covering core services like EC2, S3, VPC, RDS, and architectural best practices around availability, performance, security, and cost optimization.</p>
      <p>A significant step in my cloud journey and a foundation for everything I've built on AWS since.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6130618476034805760/",
    tags: ["AWS", "certification", "cloud", "architecture"],
  },
  {
    slug: "devops-talk-bangalore-conference",
    title: "DevOps Talk at Bangalore Conference",
    date: "2015-12-15",
    content: `
      <p>Presented at a DevOps conference in <strong>Bangalore</strong> — sharing insights on DevOps practices, tooling, and culture with the engineering community there.</p>
      <p>Bangalore's tech community is one of the most vibrant in the world, and events like these reinforce the importance of knowledge sharing and community building in the DevOps ecosystem.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6108913374249111553/",
    tags: ["DevOps", "speaking", "Bangalore", "conference"],
  },
  {
    slug: "devops-meetup-bangalore-presentation",
    title: "DevOps Meetup Presentation in Bangalore",
    date: "2015-12-01",
    content: `
      <p>Shared my presentation at the <strong>DevOps Meetup in Bangalore</strong>.</p>
      <p>Meetups are where real learning happens — the informal setting encourages open discussion, honest questions, and candid exchanges about what actually works in production. Always a rewarding experience to present to and learn from fellow practitioners.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6105277094932000768/",
    tags: ["DevOps", "speaking", "Bangalore", "meetup"],
  },
  {
    slug: "are-unikernels-unfit-for-production",
    title: "Are Unikernels Unfit for Production?",
    date: "2015-11-01",
    content: `
      <p>Are unikernels unfit for production? <strong>Joyent CTO Bryan Cantrill</strong> thinks so — and makes a compelling case.</p>
      <p>Unikernels promise radical simplification: compile your app directly to a minimal OS image with only the kernel components it needs. No shell, no package manager, tiny attack surface.</p>
      <p>But Cantrill's critique centers on operability: when something goes wrong in production, you lose all the standard debugging tools — no strace, no ptrace, no standard signals. The trade-off between attack surface and debuggability is a fundamental tension that any team evaluating unikernels needs to confront head-on.</p>
      <p>A question as relevant today as it was then, as the container ecosystem continues to push toward minimal, immutable runtimes.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6098455172197928960/",
    tags: ["unikernels", "production", "SRE", "containers", "ops"],
  },
  {
    slug: "aws-ecs-jenkins-build-pipeline-pune-devops",
    title: "AWS ECS and Jenkins Build Pipeline at Pune DevOps Meet",
    date: "2015-09-01",
    content: `
      <p>Delivered a talk and live demo on <strong>AWS ECS</strong> and setting up a <strong>Build pipeline with EC2 and Jenkins</strong> at the Pune DevOps Meet, hosted by WhiteHedge Technologies.</p>
      <p>Container orchestration with ECS was still nascent at the time, and showing a real CI/CD pipeline from code commit to ECS deployment resonated well with the audience. The Pune DevOps community has always been enthusiastic about hands-on, practical content.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6082157907745460224/",
    tags: ["AWS", "ECS", "Jenkins", "CI/CD", "DevOps", "Pune"],
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
