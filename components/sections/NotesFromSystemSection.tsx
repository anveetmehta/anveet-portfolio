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
  status: string;
};

export function NotesFromSystemSection() {
  const [dbNotes, setDbNotes] = useState<DisplayNote[]>([]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => (res.ok ? res.json() : []))
      .then((articles: { title: string; summary: string; slug: string }[]) => {
        setDbNotes(
          articles.map((a) => ({
            title: a.title,
            teaser: a.summary,
            status: 'published',
            href: `/writing/${a.slug}`,
          }))
        );
      })
      .catch(() => {});
  }, []);

  const allNotes: DisplayNote[] = [
    ...dbNotes,
    ...notesFromSystem.map((n) => ({ ...n })),
  ];

  return (
    <section id="notes" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-xs font-medium tracking-widest text-foreground/35 uppercase"
        >
          Notes From The System
        </motion.p>

        <ul className="divide-y divide-border/30">
          {allNotes.map((note, i) => (
            <motion.li
              key={note.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="py-6"
            >
              {note.href ? (
                <Link href={note.href} className="group flex flex-col gap-1.5">
                  <span className="text-base font-medium text-foreground transition-colors group-hover:text-foreground/70">
                    {note.title}
                  </span>
                  {note.teaser && (
                    <span className="text-sm text-foreground/40">{note.teaser}</span>
                  )}
                </Link>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span className="text-base font-medium text-foreground/50">{note.title}</span>
                  {note.teaser && (
                    <span className="text-sm text-foreground/35">{note.teaser}</span>
                  )}
                  <span className="text-xs text-foreground/25">Coming soon</span>
                </div>
              )}
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8"
        >
          <Link
            href="/writing"
            className="text-sm text-foreground/40 transition-colors hover:text-foreground/70"
          >
            Read all notes →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
