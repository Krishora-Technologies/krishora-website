import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../../../styles/pages/landing.css";

// Generate static params for all known posts at build time
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = getPostBySlug(resolvedParams.slug);
    return {
      title: `${post.title} | Krishora Technologies`,
      description: post.excerpt,
    };
  } catch (e) {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post;
  try {
    post = getPostBySlug(resolvedParams.slug);
  } catch (e) {
    notFound();
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-color)", paddingTop: "120px", paddingBottom: "80px", color: "var(--text-primary)" }}>
      <article style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
        <header style={{ marginBottom: "64px", textAlign: "center" }}>
          <div style={{ color: "var(--accent-1)", fontWeight: 500, marginBottom: "16px" }}>
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "24px", lineHeight: 1.2 }}>
            {post.title}
          </h1>
          <div style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            By {post.author}
          </div>
        </header>

        <div className="blog-content" style={{ fontSize: "1.125rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
          {/* We will inject custom styles via a scoped style block for markdown elements */}
          <style dangerouslySetInnerHTML={{__html: `
            .blog-content h1, .blog-content h2, .blog-content h3 {
              font-family: var(--font-display);
              color: var(--accent-1);
              margin-top: 2em;
              margin-bottom: 1em;
              line-height: 1.3;
            }
            .blog-content h2 { font-size: 2rem; }
            .blog-content h3 { font-size: 1.5rem; }
            .blog-content p { margin-bottom: 1.5em; }
            .blog-content a { color: var(--accent-1); text-decoration: underline; text-underline-offset: 4px; }
            .blog-content a:hover { color: var(--accent-2); }
            .blog-content ul { list-style-type: disc; padding-left: 2em; margin-bottom: 1.5em; }
            .blog-content ol { list-style-type: decimal; padding-left: 2em; margin-bottom: 1.5em; }
            .blog-content li { margin-bottom: 0.5em; }
            .blog-content strong { color: var(--text-primary); font-weight: 700; }
            .blog-content blockquote { border-left: 4px solid var(--accent-1); padding-left: 1em; font-style: italic; color: var(--text-muted); margin: 1.5em 0; }
          `}} />
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
