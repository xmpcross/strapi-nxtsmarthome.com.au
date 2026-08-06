import Link from 'next/link';
import type { Author } from '@/lib/authors';

/**
 * The byline avatar: a photograph where the author has one, initials where they
 * do not.
 *
 * Initials rather than a stock portrait on purpose. A generic face beside a name
 * implies a specific person wrote the article, which is the one thing a byline
 * must not get wrong.
 */
export function AuthorAvatar({ author, size = 32 }: { author: Author; size?: number }) {
  if (author.avatar) {
    return (
      <img
        src={author.avatar}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-full bg-brand-600 font-extrabold text-white"
      style={{ width: size, height: size, fontSize: Math.max(9, Math.round(size * 0.32)) }}
    >
      {author.initials}
    </span>
  );
}

/** Avatar, name (linked to the author's page) and an optional role. */
export default function AuthorByline({
  author,
  size = 32,
  showRole = false,
  className = '',
}: {
  author: Author;
  size?: number;
  showRole?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <AuthorAvatar author={author} size={size} />
      <Link
        href={`/authors/${author.slug}/`}
        className="font-semibold text-slate-800 hover:text-brand-700 dark:text-slate-200 dark:hover:text-brand-400"
      >
        {author.name}
      </Link>
      {showRole && author.role ? (
        <span className="text-slate-500 dark:text-slate-400">· {author.role}</span>
      ) : null}
    </span>
  );
}
