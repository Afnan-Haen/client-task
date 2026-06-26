import React from 'react';
import Link from 'next/link';

export default async function BlogDetail({ id }: { id: string }) {
  // In a real app, you would fetch the blog data based on the ID here.
  // For now, we'll just show some dynamic content based on the ID.
  const res = await fetch(`http://localhost:8000/blogs/${id}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok){
    throw new Error('Failed to fetch blog');
  }
  return (
    <div className="py-12 px-8 max-w-4xl mx-auto">
      <Link href="/blogs" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 mb-8 transition-colors">
        &larr; Back to all blogs
      </Link>
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${parseInt(id) + 9}/1200/500`} 
          alt="Blog Cover" 
          className="w-full h-64 md:h-80 object-cover"
        />
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full">Technology</span>
            <span className="text-slate-500 text-sm font-medium">June 25, 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Understanding the magic behind Blog #{id}
          </h1>
          
          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-100">
            <img src="https://i.pravatar.cc/150?u=afnan" alt="Author" className="w-12 h-12 rounded-full border border-slate-200" />
            <div>
              <p className="font-semibold text-slate-900">Afnan</p>
              <p className="text-sm text-slate-500">Software Engineer</p>
            </div>
          </div>
          
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
            <p>
              Welcome to the detailed view of blog post <strong>#{id}</strong>. In a real-world scenario, you would fetch this content from your database or API using the ID that was passed in the URL.
            </p>
            <p>
              By using dynamic routing in Next.js <code>app/blogs/[id]/page.tsx</code>, we only had to create this single layout. Whether you click on blog #1 or blog #100, they all use this same component, but the data is populated dynamically!
            </p>
            <h3 className="text-2xl font-bold text-slate-900 pt-6">Why is this useful?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Maintainability:</strong> You only update code in one place.</li>
              <li><strong>Scalability:</strong> You can have thousands of blog posts without thousands of files.</li>
              <li><strong>Performance:</strong> Next.js can easily cache and statically generate these pages.</li>
            </ul>
            <p className="pt-6">
              Now that you have the basic shell, your next step will probably be to replace this static placeholder text with actual content fetched from your backend API whenever this page loads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
