import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import "../../styles/pages/landing.css"; // Ensure global styles are loaded

export const metadata = {
  title: "Blog & Insights | Krishora Technologies",
  description: "Read the latest insights on AI, LLM development, and software engineering from the best software agency.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--background-color)", paddingTop: "120px", paddingBottom: "80px", color: "var(--text-primary)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <style dangerouslySetInnerHTML={{__html: `
          .blog-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 24px;
            height: 100%;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .blog-card:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: var(--accent-1);
          }
        `}} />
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, marginBottom: "32px", color: "var(--accent-1)" }}>
          Insights & Updates
        </h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginBottom: "48px", maxWidth: "800px", lineHeight: 1.6 }}>
          Discover the latest trends in Artificial Intelligence, business automation, and custom software development.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "32px" }}>
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: "none" }}>
              <div className="blog-card">
                <div style={{ fontSize: "0.875rem", color: "var(--accent-1)", marginBottom: "12px" }}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", lineHeight: 1.3 }}>
                  {post.title}
                </h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {post.excerpt}
                </p>
                <div style={{ marginTop: "24px", display: "flex", alignItems: "center", fontSize: "0.875rem", color: "var(--accent-1)", fontWeight: 500 }}>
                  Read Article <span style={{ marginLeft: "8px" }}>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
