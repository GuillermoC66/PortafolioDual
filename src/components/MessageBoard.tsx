import { useEffect, useState, type FormEvent } from 'react';
import type { Theme } from '../context/ThemeContext';
import { supabase, type GuestbookMessage } from '../utils/supabase';

const MAX_MESSAGES = 50;

interface MessageBoardProps {
  mode: Theme;
}

export function MessageBoard({ mode }: MessageBoardProps) {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(supabase !== null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const isEngineer = mode === 'engineer';

  useEffect(() => {
    if (!supabase) return;

    let isCurrent = true;

    void (async () => {
      try {
        const { data, error: queryError } = await supabase
          .from('guestbook_messages')
          .select('id, name, message, created_at')
          .order('created_at', { ascending: false })
          .limit(MAX_MESSAGES);

        if (!isCurrent) return;

        if (queryError) {
          console.error('Unable to load guestbook messages.', queryError);
          setError('The guestbook could not load. Please try again later.');
        } else {
          setMessages(data ?? []);
        }
      } catch (loadError) {
        if (!isCurrent) return;
        console.error('Unexpected error while loading guestbook messages.', loadError);
        setError('The guestbook could not load. Please try again later.');
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    })();

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setNotice('');

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError('Add your name and a message before posting.');
      return;
    }

    if (trimmedName.length > 80 || trimmedMessage.length > 1000) {
      setError('Names must be 80 characters or fewer and messages 1,000 or fewer.');
      return;
    }

    if (!supabase) {
      setError('The guestbook is not configured yet.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error: insertError } = await supabase
        .from('guestbook_messages')
        .insert({ name: trimmedName, message: trimmedMessage })
        .select('id, name, message, created_at')
        .single();

      if (insertError) {
        console.error('Unable to post guestbook message.', insertError);
        setError('Your message could not be posted. Please try again later.');
        return;
      }

      if (!data) {
        console.error('Guestbook insert returned no message and no error.');
        setError('Your message could not be confirmed. Please refresh and check the guestbook.');
        return;
      }

      setMessages((currentMessages) => [data, ...currentMessages].slice(0, MAX_MESSAGES));
      setName('');
      setMessage('');
      setNotice('Thanks for leaving a message!');
    } catch (submitError) {
      console.error('Unexpected error while posting guestbook message.', submitError);
      setError('Your message could not be posted. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="scroll-mt-24 py-16 sm:py-24" aria-labelledby="guestbook-title">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">Guestbook / 04</p>
          <h2 id="guestbook-title" className="text-3xl font-bold text-primary md:text-5xl">
            Leave a little note.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-text/70">
            Say hello, share a thought, or leave a note about something you found here.
          </p>

          {!supabase && (
            <p role="status" className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-4 text-sm text-text/70">
              The guestbook can’t connect because its Supabase URL or publishable key is missing from this build.
              Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY as GitHub Actions repository variables, then redeploy.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="guestbook-name" className="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <input
                id="guestbook-name"
                name="name"
                autoComplete="name"
                required
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={!supabase || isSubmitting}
                className="w-full rounded-lg border border-accent/25 bg-background px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
              />
            </div>
            <div>
              <label htmlFor="guestbook-message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="guestbook-message"
                name="message"
                required
                maxLength={1000}
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={!supabase || isSubmitting}
                className="w-full resize-y rounded-lg border border-accent/25 bg-background px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
              />
            </div>

            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            {notice && <p role="status" className="text-sm text-accent">{notice}</p>}

            <button
              type="submit"
              disabled={!supabase || isSubmitting}
              className={`rounded-full px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                isEngineer ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-rose-700 hover:bg-rose-600'
              }`}
            >
              {isSubmitting ? 'Posting…' : 'Sign the guestbook'}
            </button>
          </form>
        </div>

        <div aria-live="polite">
          <h3 className="mb-5 text-lg font-semibold text-primary">Recent notes</h3>
          {isLoading ? (
            <p className="text-sm text-text/60">Loading messages…</p>
          ) : error && messages.length === 0 ? (
            <p className="text-sm text-text/60">{error}</p>
          ) : messages.length === 0 ? (
            <p className="text-sm text-text/60">
              {supabase ? 'No messages yet. Be the first to sign!' : 'Messages will appear here once the guestbook is configured.'}
            </p>
          ) : (
            <ul className="space-y-3">
              {messages.map((entry) => (
                <li key={entry.id} className="rounded-xl border border-accent/15 bg-background/70 p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-semibold text-primary">{entry.name}</p>
                    <time className="text-xs text-text/50" dateTime={entry.created_at}>
                      {new Date(entry.created_at).toLocaleDateString(undefined, {
                        dateStyle: 'medium',
                      })}
                    </time>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-text/75">
                    {entry.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}