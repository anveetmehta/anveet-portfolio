'use client';

import { useState, useEffect, type ReactNode, type FormEvent } from 'react';

type AdminAuthProps = { children: ReactNode };

const SESSION_KEY = 'anveet-admin-authenticated';

export function AdminAuth({ children }: AdminAuthProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setAuthenticated(true);
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password.');
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
          className="mt-4 w-full rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
