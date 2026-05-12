'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { notesFromSystem } from '@/content/content';

type DisplayNote = {
  title: string;
  teaser?: string;
  href?: string;
};

export function NotesFromSystemSection() {
  const [dbNotes, setDbNotes] = useState<DisplayNote[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => (res.ok ? res.json() : []))
      .then((articles: { title: string; summary: string; slug: string }[]) => {
        setDbNotes(
          articles.slice(0, 6).map((a) => ({
            title: a.title,
            teaser: a.summary,
            href: `/writing/${a.slug}`,
          }))
        );
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // DB articles if available, otherwise static fallbacks — never both
  const notes: DisplayNote[] = loaded && dbNotes.length > 0
    ? dbNotes
    : notesFromSystem.map((n) => ({ title: n.title, teaser: n.teaser }));

  return (
    <section id="notes" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-medium tracking-widest text-foreground/35 uppercase"
          >
            Notes From The System
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              href="/writing"
              className="text-xs text-foreground/35 transition-colors hover:text-foreground/65"
            >
              All notes →
            </Link>
          </motion.div>
        </div>

        <ul className="divide-y divide-border/20">
          {notes.map((note, i) => (
            <motion.li
              key={note.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              {note.href ? (
                <Link href={note.href} className="group flex items-start justify-between gap-6 py-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-foreground/75 transition-colors group-hover:text-foreground">
                      {note.title}
                    </span>
                    {note.teaser && (
                      <span className="line-clamp-1 text-xs leading-relaxed text-foreground/35">
                        {note.teaser}
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 shrink-0 text-xs text-foreground/20 transition-colors group-hover:text-foreground/50">
                    →
                  </span>
                </Link>
              ) : (
                <div className="flex flex-col gap-1.5 py-5">
                  <span className="text-sm font-medium text-foreground/35">{note.title}</span>
                  {note.teaser && (
                    <span className="text-xs text-foreground/25">{note.teaser}</span>
                  )}
                  <span className="text-xs text-foreground/20">Coming soon</span>
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
