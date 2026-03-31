export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  linkedinUrl?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "introducing-opensre",
    title: "Introducing OpenSRE — AI-Powered Incident Investigation",
    date: "2026-04-07",
    description: "Open-source AI SRE platform that investigates production incidents using episodic memory and knowledge graphs.",
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
    description: "Another Cloudflare outage and what it means for teams relying on a single CDN provider for production traffic.",
    content: `
      <p>Cloudflare went down again. If you were on the internet that day, you probably noticed. Half the sites you tried to visit threw 500 errors, and the other half loaded like it was 2005.</p>
      <p>What gets me about these outages is the blast radius. Cloudflare sits in front of so many services that when it goes down, it takes a chunk of the internet with it. We're talking millions of domains behind one provider's control plane. That's a concentration risk most teams don't think about until it's too late.</p>
      <p>From an SRE perspective, this is the classic single-point-of-failure problem at internet scale. Your app can have five nines of uptime internally, but if your CDN/DNS provider has a bad day, none of that matters. Your users see a broken page.</p>
      <p>The uncomfortable question: should you run multi-CDN? It's expensive, operationally complex, and most teams decide the risk doesn't justify the cost. Until it does. There's no clean answer here, just trade-offs.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7396525944288727040/",
    tags: ["SRE", "reliability", "outage", "Cloudflare"],
  },
  {
    slug: "toon-token-oriented-object-notation-llm-costs",
    title: "TOON: Cutting LLM Token Costs by 40–60%",
    date: "2025-11-24",
    description: "TOON replaces redundant JSON keys with a schema-once format, cutting LLM token usage by 40-60% on structured data.",
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
    description: "Two paths for AI development both look bad. Are we moving too fast, too slow, or just making it up as we go?",
    content: `
      <p>Read this AI 2027 scenario piece and I keep coming back to it. The basic premise: there are two paths from here, and neither one is comfortable.</p>
      <p>Path one: we keep accelerating AI development at the current pace. Things go wrong in ways we didn't predict because we're building faster than we can evaluate. Path two: we slow down significantly, but the organizations that got there first end up with a dangerous concentration of capability and power.</p>
      <p>What bothers me is that both paths feel plausible. I work with AI systems daily and I see how quickly the capability bar is rising. Six months ago, things that required careful prompt engineering now work out of the box. That rate of change makes it hard to plan, hard to regulate, and hard to even form stable opinions about what's safe.</p>
      <p>I don't have a take beyond "this is worth thinking about more seriously than most people are." If you're building AI products, you owe it to yourself to think about where this is going, not just what ships next quarter.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7373612383023312896/",
    tags: ["AI", "future", "AI safety", "opinion"],
  },
  {
    slug: "serverless-portfolio-website-production",
    title: "My Serverless Portfolio Website is Live",
    date: "2019-04-01",
    description: "Building and shipping a personal portfolio website on AWS Lambda and API Gateway in a weekend.",
    content: `
      <p>Spent a weekend putting my portfolio website into production on a fully serverless stack. AWS Lambda, API Gateway, S3, CloudFront. No servers to manage, no EC2 instances to patch, no monthly bill surprises from idle compute.</p>
      <p>The whole thing costs almost nothing to run. Lambda charges per request, and a personal portfolio doesn't exactly get millions of hits. Most months the bill rounds down to zero. That was the appeal — build it once, deploy it, and forget about infrastructure.</p>
      <p>The trade-off is cold starts. First visit after a period of inactivity takes a noticeable beat longer. For a portfolio site that's fine. For a production API, you'd want to think harder about provisioned concurrency. But for this use case, serverless is close to the perfect fit.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6404280004703805440/",
    tags: ["serverless", "AWS", "portfolio", "cloud"],
  },
  {
    slug: "redhat-delivery-specialist-cloud-automation",
    title: "Earned RedHat Delivery Specialist – Cloud Automation",
    date: "2018-03-01",
    description: "Earning the RedHat Delivery Specialist certification for cloud infrastructure automation with Ansible and CloudForms.",
    content: `
      <p>Picked up the RedHat Delivery Specialist certification for Cloud Automation. The cert covers automating infrastructure provisioning and configuration using Ansible, CloudForms, and Satellite.</p>
      <p>The exam was hands-on, which I appreciated. No multiple choice trivia about obscure config flags. You get a broken environment and a set of requirements, and you fix it with Ansible playbooks and CloudForms policies. If it works, you pass. If it doesn't, you don't.</p>
      <p>At the time I was doing a lot of hybrid cloud work, managing deployments across on-prem VMware and AWS. The RedHat tooling gave us a single pane for provisioning VMs regardless of where they ran. Not perfect, but better than maintaining two completely separate automation stacks.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6357181862254874624/",
    tags: ["RedHat", "certification", "cloud", "automation", "DevOps"],
  },
  {
    slug: "redhat-delivery-specialist-paas-certifications",
    title: "Earned RedHat Delivery Specialist – PaaS Certifications",
    date: "2018-02-01",
    description: "Certified in RedHat PaaS and PaaS Development, covering OpenShift container platform operations and app deployment.",
    content: `
      <p>Earned both the RedHat PaaS and PaaS Development delivery specialist certifications around the same time.</p>
      <p>The PaaS cert focuses on OpenShift operations: installing clusters, managing projects and quotas, configuring persistent storage, setting up CI/CD pipelines within OpenShift. The Development cert goes deeper on building and deploying applications — source-to-image builds, custom builder images, application health checks, and rolling deployments.</p>
      <p>OpenShift in 2018 was a different beast than it is now. We were running version 3.x, and a lot of the operational tooling was still rough. Getting persistent storage right across an on-prem cluster involved more YAML and prayer than I'd like to admit. But the developer experience was already ahead of raw Kubernetes at the time — the opinionated defaults saved teams from reinventing the wheel on every project.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6303890160392208384/",
    tags: ["RedHat", "certification", "PaaS", "OpenShift", "cloud"],
  },
  {
    slug: "speaking-at-devops-global-summit-2017",
    title: "Speaking at DevOps++ Global Summit 2017",
    date: "2017-09-12",
    description: "Co-presenting Windows Automation with Ansible at DevOps++ Global Summit 2017 in Pune with Lokesh Jawane.",
    content: `
      <p>Gave my talk on Windows Automation using Ansible at DevOps++ Global Summit 2017 on September 9th. My co-presenter Lokesh Jawane and I had been prepping for weeks, and the actual session went better than either of us expected.</p>
      <p>The topic itself was a bit of an outlier at a conference where most talks assumed Linux. But that's exactly why it resonated. A lot of teams in India still run mixed Windows/Linux estates, and automating Windows with Ansible was a real pain point nobody was addressing. We showed how to manage IIS deployments, Windows services, and registry settings through Ansible playbooks, all without touching the GUI.</p>
      <p>What surprised me was the Q&A. People stuck around for 20 minutes after, asking about WinRM configuration, credential management, and how Ansible compares to DSC for Windows. Those hallway conversations are where conferences actually earn their value.</p>
      <p>Big thanks to Lokesh for being a solid co-presenter. Presenting alone is fine, but having someone to bounce off of makes the whole thing more natural.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6316834021577986048/",
    tags: ["DevOps", "Ansible", "Windows", "automation", "conference", "DevOps++ 2017"],
  },
  {
    slug: "windows-automation-ansible-devops-summit-2017",
    title: "Join Me at DevOps++ Global Summit 2017 — Windows Automation with Ansible",
    date: "2017-09-05",
    description: "Pre-conference post for my DevOps++ Global Summit 2017 talk on automating Windows infrastructure with Ansible.",
    content: `
      <p>Heading to DevOps++ Global Summit 2017 to talk about Windows Automation using Ansible. If you're managing Windows servers and haven't looked at Ansible for it yet, come by the session.</p>
      <p>Most Ansible content assumes Linux. Understandable, but it leaves a gap for the many teams running Windows Server in production. WinRM configuration, PowerShell module management, IIS deployment, Windows service control — Ansible handles all of it, but the setup is different enough from Linux that it trips people up.</p>
      <p>I'll be covering the practical bits: getting WinRM working reliably, writing playbooks for common Windows tasks, and the gotchas that the docs don't warn you about. See you at the conference.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6311852631258173440/",
    tags: ["DevOps", "Ansible", "Windows", "automation", "conference"],
  },
  {
    slug: "devops-assessment-quiz-free-conference-pass",
    title: "Take Our DevOps Assessment Quiz for a Free Conference Pass",
    date: "2017-08-25",
    description: "A DevOps maturity quiz we built to give away conference passes to the doppa17 DevOps event in Pune.",
    content: `
      <p>Leading up to the DevOps++ 2017 conference in Pune, we put together a DevOps assessment quiz and gave away a free conference pass to the top scorer.</p>
      <p>The quiz covered the basics: CI/CD concepts, configuration management, monitoring, infrastructure as code. We threw in a few curveball questions about incident response and blameless postmortems to see who was actually practicing DevOps culture vs. just tooling.</p>
      <p>The response surprised us. Over a hundred people took it in the first week. Some of the scores were impressively high, some were impressively creative (one person argued their wrong answer was actually a better practice, and they had a point). It was a fun way to build buzz for the conference and start conversations about where the Pune DevOps community stood on maturity.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6308972822966390784/",
    tags: ["DevOps", "conference", "Pune", "DevOps++ 2017"],
  },
  {
    slug: "continuous-integration-for-salesforce",
    title: "Continuous Integration for Salesforce",
    date: "2017-05-01",
    description: "Why CI/CD for Salesforce is harder than it looks: metadata-driven code, no native Git, and org-dependent state.",
    content: `
      <p>CI/CD for Salesforce is one of those things that sounds straightforward until you actually try it.</p>
      <p>The core problem: Salesforce development isn't file-based in the traditional sense. Your "code" lives as metadata in an org, not as files in a Git repo. Apex classes, triggers, page layouts, validation rules, workflow rules, custom objects — they all live server-side. Getting them into version control requires pulling metadata through the Salesforce CLI or Metadata API, and the results aren't always deterministic.</p>
      <p>Then there's the deployment model. You can't just push code to a branch and deploy. Salesforce deployments are essentially metadata diffs between orgs, and they depend on org state. A deployment that works in your sandbox might fail in staging because someone manually changed a field type through the UI. This happens more often than anyone admits.</p>
      <p>We set up a Jenkins pipeline that pulled metadata from a developer sandbox, ran Apex tests, and promoted to a staging org. It worked, but maintaining it was a constant fight against Salesforce's deployment quirks. Still worth it. Without CI, the alternative was developers deploying change sets manually and hoping nothing broke.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6289058830408130560/",
    tags: ["Salesforce", "CI/CD", "DevOps", "automation"],
  },
  {
    slug: "calculate-your-devops-readiness-score",
    title: "Calculate Your DevOps Readiness Score",
    date: "2017-01-01",
    description: "A simple framework for measuring DevOps maturity across culture, automation, measurement, and sharing.",
    content: `
      <p>We built a DevOps readiness assessment around this time. The idea was simple: answer some questions about your team's practices and get a score across a few dimensions. Culture, automation, measurement, sharing — the CAMS model that Damon Edwards and John Willis popularized.</p>
      <p>Most teams scored well on automation (everyone had some CI pipeline) and poorly on measurement (nobody was tracking deployment frequency, lead time, or change failure rate). Culture was the wildcard. Some teams said "we do DevOps" but meant "we gave the devs SSH access to production." That's not the same thing.</p>
      <p>The assessment wasn't scientific. It was a conversation starter. But it worked. Teams that scored themselves honestly could see the gaps, and that made it easier to prioritize what to fix first. Usually the answer was: start measuring. You can't improve what you aren't tracking.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6248106071844581376/",
    tags: ["DevOps", "maturity", "assessment", "culture"],
  },
  {
    slug: "certified-jenkins-engineer",
    title: "I'm Now a Certified Jenkins Engineer",
    date: "2016-04-01",
    description: "Becoming one of the first Certified Jenkins Engineers and what the exam actually tests about CI/CD pipelines.",
    content: `
      <p>Got my Certified Jenkins Engineer credential. I was in the first batch of people to take this exam, which felt like a milestone for the Jenkins community as much as for me personally.</p>
      <p>The exam covers pipeline design (scripted and declarative), plugin management, distributed builds with agents, security configuration, and backup strategies. It's hands-on knowledge, not theory. You need to know what happens when a Jenkins master runs out of disk space (everything stops), how to configure LDAP authentication, and how pipeline libraries work.</p>
      <p>Jenkins gets a lot of grief these days. People complain about the UI, the plugin compatibility issues, the Groovy scripting. Fair enough. But in 2016, Jenkins was the CI server. It was the tool that made continuous integration practical for most teams. I ran it for years across multiple organizations, and for all its quirks, it worked. The muscle memory from debugging Jenkins pipelines at 3am still kicks in when I'm troubleshooting CI systems today.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6146155464750137344/",
    tags: ["Jenkins", "certification", "CI/CD", "DevOps"],
  },
  {
    slug: "passed-aws-solutions-architect-associate",
    title: "Passed the AWS Solutions Architect Associate Exam",
    date: "2016-02-01",
    description: "Passing the AWS Solutions Architect Associate exam and what it covers: VPC, EC2, S3, RDS, and distributed systems.",
    content: `
      <p>Passed the AWS Solutions Architect Associate exam. This was back when the cert was still relatively new and the study materials were mostly whitepapers and re:Invent talk recordings.</p>
      <p>The exam tests your ability to design systems on AWS that are available, cost-effective, and fault tolerant. Lots of scenarios: "A company needs X, which architecture would you recommend?" You need to know VPC networking, EC2 instance families, S3 storage classes, RDS multi-AZ, and a dozen other services well enough to pick the right combination under constraints.</p>
      <p>What actually helped most wasn't studying — it was building things. I'd been running workloads on AWS for a couple of years before taking the exam, so a lot of the questions mapped to problems I'd already solved (or messed up) in production. The auto-scaling questions were easy because I'd already been paged at 2am when scaling policies weren't aggressive enough.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6130618476034805760/",
    tags: ["AWS", "certification", "cloud", "architecture"],
  },
  {
    slug: "devops-talk-bangalore-conference",
    title: "DevOps Talks in Bangalore",
    date: "2015-12-15",
    description: "Speaking about DevOps practices and container orchestration at meetups in Bangalore, India.",
    content: `
      <p>Did a couple of DevOps talks in Bangalore around this time. The scene there is something else. Packed rooms, people showing up after long commutes, and genuinely sharp questions from engineers running production systems at scale.</p>
      <p>My talks covered the usual ground: CI/CD pipelines, configuration management, container basics. But what made Bangalore different was the audience. These weren't people learning DevOps from blog posts. They were running it at Flipkart scale, dealing with deploy frequencies and failure modes that most teams never hit.</p>
      <p>The meetup format worked well for this. No slides-behind-a-podium formality. Just a projector, a terminal, and a room full of people who wanted to see things break and get fixed. Someone asked me to debug a Jenkins pipeline live, which I probably should have declined, but it turned into the best part of the evening.</p>
    `,
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:6108913374249111553/",
    tags: ["DevOps", "speaking", "Bangalore", "meetup"],
  },
  {
    slug: "are-unikernels-unfit-for-production",
    title: "Are Unikernels Unfit for Production?",
    date: "2015-11-01",
    description: "Bryan Cantrill's case against unikernels: you get a tiny attack surface but lose every debugging tool that matters.",
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
    description: "Live demo of a CI/CD pipeline from Git push to ECS deployment using Jenkins and EC2 at the Pune DevOps meetup.",
    content: `
      <p>Gave a talk and live demo at the Pune DevOps meetup on building a CI/CD pipeline with Jenkins, EC2, and AWS ECS. WhiteHedge Technologies hosted the event.</p>
      <p>ECS was brand new at the time. Most people in the room hadn't touched containers in production yet, let alone a managed orchestrator. The demo walked through the full flow: code push to GitHub, Jenkins picks it up, builds a Docker image, pushes to ECR, and triggers an ECS service update with a new task definition. When it works, it's smooth. When it doesn't — and live demos have a way of not working — you learn a lot about ECS error messages in front of an audience.</p>
      <p>The Pune DevOps community has always been good about showing up for hands-on content. Nobody wants to sit through 45 minutes of slides about "the future of DevOps." They want to see a terminal, a deploy, and ideally something going wrong so they can learn from the recovery. That's the kind of talk I enjoy giving.</p>
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
