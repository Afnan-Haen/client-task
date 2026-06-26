"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteBlogButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    // Prevent the click from triggering the parent <Link>
    e.preventDefault(); 
    
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        alert('Blog deleted!');
        router.refresh(); // Refresh the current route so the server component re-fetches the list
      } else {
        alert('Failed to delete blog.');
      }
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-sm font-medium z-10 relative"
    >
      Delete
    </button>
  );
}
