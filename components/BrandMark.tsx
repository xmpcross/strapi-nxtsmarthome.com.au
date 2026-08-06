/**
 * The NXT Smart Home symbol.
 *
 * A solid house with a signal glyph knocked out of it — "home" and "connected"
 * in one shape, with no lettering, so it stays legible at favicon size and in a
 * footer where the wordmark already carries the name.
 *
 * The knock-out is drawn in the surface colour rather than cut with a mask:
 * masks render inconsistently in email clients and feed readers, and an
 * overdraw looks identical. That does mean `cutClassName` has to match whatever
 * the mark sits on, in both themes — hence a class rather than a fixed colour.
 */
export default function BrandMark({
  className = 'h-9 w-9',
  cutClassName = 'fill-white stroke-white',
}: {
  /** Sizing plus a text- colour, which the house body inherits. */
  className?: string;
  /** Fill and stroke classes matching the surface behind the mark. */
  cutClassName?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="NXT Smart Home"
      fill="none"
    >
      {/* House: pitched roof over a body with softened base corners. */}
      <path
        d="M16 4.2 28.4 14.1V26a2.2 2.2 0 0 1-2.2 2.2H5.8A2.2 2.2 0 0 1 3.6 26V14.1L16 4.2Z"
        fill="currentColor"
      />
      {/* Signal radiating from a node at the hearth. */}
      <g className={cutClassName}>
        <circle cx="16" cy="23.4" r="1.9" />
        <path
          d="M12.9 20.4a4.4 4.4 0 0 1 6.2 0"
          fill="none"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M10.2 17.5a8.2 8.2 0 0 1 11.6 0"
          fill="none"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
