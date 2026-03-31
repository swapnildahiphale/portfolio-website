import { useEffect } from "react";
import { getBlogPostBySlug } from "../../data/blogPosts";
import "../styles/Blog.css";

interface BlogPostProps {
  slug: string;
}

const BlogPostPage = ({ slug }: BlogPostProps) => {
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Swapnil Dahiphale`;

      const existingLd = document.getElementById("blog-jsonld");
      if (existingLd) existingLd.remove();

      const script = document.createElement("script");
      script.id = "blog-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: "Swapnil Dahiphale",
          url: "https://swapnil.one",
        },
        publisher: {
          "@type": "Person",
          name: "Swapnil Dahiphale",
        },
        mainEntityOfPage: `https://swapnil.one/#/blog/${post.slug}`,
      });
      document.head.appendChild(script);

      return () => {
        document.title = "Swapnil Dahiphale — SRE & AI Engineer";
        const el = document.getElementById("blog-jsonld");
        if (el) el.remove();
      };
    }
  }, [post, slug]);

  if (!post) {
    return (
      <div className="blog-container">
        <a href="#/blog" className="blog-back-link">
          &larr; Back to Blog
        </a>
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <a href="#/blog" className="blog-back-link">
        &larr; Back to Blog
      </a>
      <article className="blog-post-full">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          <div className="blog-post-tags" style={{ marginTop: "12px" }}>
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.linkedinUrl && (
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-linkedin-link"
          >
            Originally posted on LinkedIn &rarr;
          </a>
        )}
      </article>
    </div>
  );
};

export default BlogPostPage;
