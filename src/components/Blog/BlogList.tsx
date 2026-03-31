import { getAllBlogPosts } from "../../data/blogPosts";
import "../styles/Blog.css";

function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
}

const BlogList = () => {
  const posts = getAllBlogPosts();

  return (
    <div className="blog-container">
      <a href="#/" className="blog-back-link">
        &larr; Back to Portfolio
      </a>
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Thoughts on SRE, AI engineering, and building OpenSRE.</p>
      </div>
      {posts.map((post) => (
        <a
          key={post.slug}
          href={`#/blog/${post.slug}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="blog-post-card">
            <h2>{post.title}</h2>
            <p className="blog-post-date">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="blog-post-excerpt">
              {stripHtml(post.content).slice(0, 150)}...
            </p>
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-post-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default BlogList;
