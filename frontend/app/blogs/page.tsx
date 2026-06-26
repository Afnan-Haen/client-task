import Blogs from "../Page/Blogs";

export default async function BlogsPage() {
  let blogs = [];
  try {
    const res = await fetch('http://localhost:8000/blogs', { cache: 'no-store' });
    if (res.ok) {
      blogs = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch blogs", error);
  }

  return <Blogs blogs={blogs} />;
}
