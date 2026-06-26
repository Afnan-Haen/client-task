import Link from 'next/link';
import DeleteBlogButton from '../components/DeleteBlogButton';

export default function Blogs({ user, blogs = [] }: { user?: any, blogs?: any[] } ) {
  return (
    <div className="py-12 px-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">
      {/* Blog List Section */}
      <div className="flex-1 w-full">
        <div className='flex justify-between'>
          <h2 className="text-4xl font-bold text-slate-900 mb-10">Latest Blog Posts</h2>
        </div>
        <div className="flex flex-col gap-6">
          {blogs.length === 0 ? (
            <p className="text-slate-500">No blogs published yet. Be the first!</p>
          ) : (
            blogs.map((blog: any, index: number) => (
              <Link href={`/blogs/${blog.id}`} key={blog.id} className="block p-6 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white group">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-normal text-slate-500">{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{blog.title}</h3>
                    <p className="text-slate-500 m-0 line-clamp-2">{blog.content}</p>
                    <span className="inline-block mt-4 text-indigo-600 font-semibold group-hover:text-indigo-800 transition-colors">Read More &rarr;</span>
                  </div>
                  <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
                    <img src={blog.image || `https://picsum.photos/seed/${blog.id + 10}/300/300`} alt={blog.title} className="w-full h-full object-cover rounded-xl border border-slate-100" />
                  </div>
                </div>
                <div className='flex mt-3'>
                  <DeleteBlogButton id={blog.id} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="w-full md:w-80 sticky top-12 flex flex-col gap-6">
        <div className="p-6 border border-slate-200 rounded-2xl shadow-sm bg-white">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Write a Blog</h3>
          <p className="text-sm text-slate-500 mb-6">Have something to share? Write your own blog post and share it with the community.</p>
          <a href="/write" className="block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-center rounded-xl transition-colors">
            Write a Post
          </a>
        </div>

        <div className="p-6 border border-slate-200 rounded-2xl shadow-sm bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'API', 'Backend'].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
