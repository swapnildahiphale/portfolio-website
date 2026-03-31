import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import BlogPostPage from "./BlogPost";

function parseHash(): { route: string; slug?: string } {
  const hash = window.location.hash;
  if (hash === "#/blog" || hash === "#/blog/") {
    return { route: "blog-list" };
  }
  const match = hash.match(/^#\/blog\/(.+)$/);
  if (match) {
    return { route: "blog-post", slug: match[1] };
  }
  return { route: "portfolio" };
}

interface BlogRouterProps {
  children: React.ReactNode;
}

const BlogRouter = ({ children }: BlogRouterProps) => {
  const [routeState, setRouteState] = useState(parseHash);

  useEffect(() => {
    const onHashChange = () => setRouteState(parseHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (routeState.route === "blog-list") {
    return <BlogList />;
  }

  if (routeState.route === "blog-post" && routeState.slug) {
    return <BlogPostPage slug={routeState.slug} />;
  }

  return <>{children}</>;
};

export default BlogRouter;
