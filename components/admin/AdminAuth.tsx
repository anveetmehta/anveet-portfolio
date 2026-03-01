'use client';

import { useState, useEffect, type ReactNode, type FormEvent } from 'react';

type AdminAuthProps = { children: ReactNode };

const SESSION_KEY = 'anveet-admin-authenticated';
const PASSWORD_KEY = 'anveet-admin-password';

export function AdminAuth({ children }: AdminAuthProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (
      sessionStorage.getItem(SESSION_KEY) === 'true' &&
      sessionStorage.getItem(PASSWORD_KEY)
    ) {
      setAuthenticated(true);
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate password server-side via API
      const res = await fetch('/api/articles?all=true', {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem(PASSWORD_KEY, password);
        setAuthenticated(true);
      } else {
        setError('Incorrect password.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;
  if (authenticated) return <>{children}</>;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <h2 className="text-lg font-semibold">Authentication Required</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Enter the admin password to continue.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="Password"
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
