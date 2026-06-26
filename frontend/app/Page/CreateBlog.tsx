"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          tags,
          image
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Blog published successfully!');
        router.push('/blogs');
      } else {
        alert(data.message || 'Failed to publish blog.');
      }
    } catch (error) {
      console.error('Publish error:', error);
      alert('An error occurred while connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-slate-900 mb-3">Write a new post</h2>
        <p className="text-slate-500 text-lg">Share your knowledge, tutorials, and ideas with the community.</p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Cover Image Upload */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Cover Image</span>
            <input type="file" id="cover-image" accept="image/*" onChange={handleImageChange} className="hidden" />
            <label htmlFor="cover-image" className="w-full h-56 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 mb-4 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <span className="text-base font-medium text-slate-700">
                {image ? 'Image Selected (Click to change)' : 'Click to upload cover image'}
              </span>
              <span className="text-sm mt-1 text-slate-400">PNG, JPG, GIF up to 5MB</span>
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="text-sm font-bold text-slate-800 uppercase tracking-wider">Blog Title</label>
            <input 
              type="text" 
              id="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="E.g., How to build a REST API in 2026" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400 text-lg font-medium"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="content" className="text-sm font-bold text-slate-800 uppercase tracking-wider">Content</label>
            <textarea 
              id="content" 
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write your amazing content here... Markdown is supported." 
              className="w-full px-6 py-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400 resize-y leading-relaxed"
            ></textarea>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="tags" className="text-sm font-bold text-slate-800 uppercase tracking-wider">Tags</label>
            <input 
              type="text" 
              id="tags" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, API, Tutorial (comma separated)" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="pt-8 mt-4 border-t border-slate-100 flex justify-end gap-4 items-center">
            <button type="button" className="px-8 py-4 rounded-2xl text-slate-600 font-semibold hover:bg-slate-100 transition-colors">
              Save as Draft
            </button>
            <button type="submit" disabled={loading} className="px-10 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30 transition-all hover:-translate-y-1 disabled:opacity-50">
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
