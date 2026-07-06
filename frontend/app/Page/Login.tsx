"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        setMessage(data.message ?? `Backend error (${response.status}).`);
        setLoading(false);
        return;
      }

      setMessage('Login successful! Redirecting...');
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      router.push('/dashboard');
    } catch (error) {
      setMessage('Could not reach the backend or parse its response.');
      setLoading(false);
    }
  }

  return (
    <div className='py-25 bg-gradient-to-br from-[#f3f1f9] to-[#f3f1f9]'>
    <div className=" flex items-center justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-white/70 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Login starter</h1>
        <p className="text-slate-500 mb-6">This form sends data to your PHP `/login` endpoint.</p>

        <label className="block mb-4">
          <div className="mb-1.5 text-sm font-medium text-slate-700">Email</div>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </label>

        <label className="block mb-6">
          <div className="mb-1.5 text-sm font-medium text-slate-700">Password</div>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account? <Link href="/register" className="text-indigo-600 hover:underline font-medium">Register here</Link>
        </p>
      </form>
    </div>
    </div>
  );
}
