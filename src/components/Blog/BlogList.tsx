import { Link } from "react-router-dom";
import { getAllBlogPosts } from "../../data/blogPosts";
import { BlogHeader, BlogFooter } from "./BlogChrome";
import "../styles/Blog.css";

const BlogList = () => {
  const posts = getAllBlogPosts();

  return (
    <div className="blog-container">
      <BlogHeader />
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Thoughts on SRE, AI engineering, and building OpenSRE.</p>
      </div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
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
              {post.description}
            </p>
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-post-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
      <BlogFooter />
    </div>
  );
};

export default BlogList;
