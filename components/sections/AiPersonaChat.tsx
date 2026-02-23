'use client';

import { useMemo, useState } from 'react';
import { caseStudies, expertiseAreas, siteMeta, writingEntries } from '@/content/content';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

function answerFromKnowledgeBase(input: string): string {
  const q = input.toLowerCase();

  if (q.includes('contact') || q.includes('email')) {
    return `You can reach Anveet at ${siteMeta.email}.`;
  }

  if (q.includes('case') || q.includes('project')) {
    return `Featured case studies include ${caseStudies.map((item) => item.title).join(' and ')}.`;
  }

  if (q.includes('expertise') || q.includes('skills')) {
    return `Core expertise areas: ${expertiseAreas.map((item) => item.title).join(', ')}.`;
  }

  if (q.includes('write') || q.includes('article') || q.includes('blog')) {
    return `Current writing themes include ${writingEntries.map((item) => item.title).join(' and ')}.`;
  }

  return 'I can help with Anveet’s case studies, expertise, writing themes, and contact details. Ask me something specific and I will keep it concise.';
}

export function AiPersonaChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Hi, I am AI Anveet. Ask about work, case studies, writing, or collaboration.'
    }
  ]);
  const [value, setValue] = useState('');

  const conversation = useMemo(() => messages, [messages]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const prompt = value.trim();
    if (!prompt) {
      return;
    }

    const userMessage: Message = { role: 'user', text: prompt };
    const assistantMessage: Message = { role: 'assistant', text: answerFromKnowledgeBase(prompt) };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setValue('');
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold">AI Anveet (Phase 3)</h2>
      <p className="mt-1 text-sm text-foreground/70">
        Persona assistant grounded in portfolio content with safe, scoped answers.
      </p>
      <div className="mt-4 space-y-3 rounded-xl border border-border/70 bg-background/70 p-4">
        {conversation.map((message, index) => (
          <div key={`${message.role}-${index}`}>
            <p className="text-xs uppercase text-foreground/50">{message.role}</p>
            <p className="text-sm text-foreground/90">{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="Ask about case studies, expertise, or contact..."
        />
        <button type="submit" className="rounded-lg bg-foreground px-4 py-2 text-sm text-background">
          Send
        </button>
      </form>
    </section>
  );
}
