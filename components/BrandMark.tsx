import clsx from 'clsx'
import React from 'react'

export interface BrandMarkProps {
  /** Sizing plus optional utility classes */
  className?: string
  /**
   * Theme mode:
   * - 'auto': responds automatically to Tailwind dark mode class on html/body
   * - 'light': forces light theme rendering
   * - 'dark': forces dark theme rendering
   */
  theme?: 'auto' | 'light' | 'dark'
}

/**
 * NXT Smart Home Icon (smart-home.svg):
 * Styled with precision linear gradients matching the site color scheme
 * (#4F46E5 -> #6366F1 -> #0EA5E9 for light mode, #818CF8 -> #A855F7 -> #38BDF8 for dark mode).
 */
export default function BrandMark({
  className = 'size-9',
  theme = 'auto',
}: BrandMarkProps) {
  const showLight = theme === 'light' || theme === 'auto'
  const showDark = theme === 'dark' || theme === 'auto'

  const pathD =
    "M38 86H12a2 2 0 0 0 0 4h52a2 2 0 0 0 0-4H42V69.923c0-.608.276-1.183.751-1.562l6-4.8a1.997 1.997 0 0 1 2.498 0l6 4.8c.475.379.751.954.751 1.562V80a2 2 0 0 0 4 0V69.923a6.003 6.003 0 0 0-2.252-4.686 20972.4 20972.4 0 0 1-6-4.8 6 6 0 0 0-7.496 0 20972.4 20972.4 0 0 1-6 4.8A6.003 6.003 0 0 0 38 69.923V86Zm44 0v-6a2 2 0 0 0-4 0v6h-6a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4h-6Zm-5.059-41.365c2.349 1.253 4.684-2.035 1.883-3.529l-26-13.867a6.003 6.003 0 0 0-5.648 0l-26 13.867A6 6 0 0 0 18 46.4V80a2 2 0 0 0 4 0V46.4a2 2 0 0 1 1.059-1.765l26-13.866a1.998 1.998 0 0 1 1.882 0l26 13.866ZM80 62c-3.311 0-6 2.689-6 6s2.689 6 6 6 6-2.689 6-6-2.689-6-6-6Zm0 4a2 2 0 1 1-.001 4.001A2 2 0 0 1 80 66Zm-5.208-4.166A8.038 8.038 0 0 1 80 59.927c1.984 0 3.803.718 5.208 1.907a2.001 2.001 0 0 0 2.584-3.053A12.022 12.022 0 0 0 80 55.927a12.022 12.022 0 0 0-7.792 2.854 2 2 0 1 0 2.584 3.053Zm-3.825-4.526A13.938 13.938 0 0 1 80 54c3.442 0 6.595 1.245 9.033 3.308a2.001 2.001 0 0 0 2.584-3.054A17.926 17.926 0 0 0 80 50a17.926 17.926 0 0 0-11.617 4.254 2.001 2.001 0 0 0 2.584 3.054ZM10 33.872v.003a5.698 5.698 0 0 0 8.352 5.042L49.068 22.75a2 2 0 0 1 1.863 0l30.717 16.167A5.699 5.699 0 0 0 90 33.875v-.003a5.1 5.1 0 0 0-2.725-4.514L52.794 11.211a5.996 5.996 0 0 0-5.588 0L12.725 29.358A5.1 5.1 0 0 0 10 33.872Zm4 .003v-.003a1.1 1.1 0 0 1 .588-.974l34.48-18.148a2 2 0 0 1 1.863 0l34.481 18.148a1.1 1.1 0 0 1 .588.974v.003a1.696 1.696 0 0 1-2.489 1.502L52.794 19.211a5.996 5.996 0 0 0-5.588 0L16.489 35.377A1.698 1.698 0 0 1 14 33.875Z"

  return (
    <svg
      viewBox="0 0 100 100"
      className={clsx('shrink-0', className)}
      role="img"
      aria-label="NXT Smart Home logo mark"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Light mode gradient matching site primary theme */}
        <linearGradient
          id="sh-logo-grad-light"
          x1="10"
          y1="10"
          x2="90"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>

        {/* Dark mode gradient matching site primary theme */}
        <linearGradient
          id="sh-logo-grad-dark"
          x1="10"
          y1="10"
          x2="90"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>

      {/* ================= LIGHT MODE LAYER ================= */}
      {showLight && (
        <g className={clsx(theme === 'auto' && 'block dark:hidden')}>
          <path d={pathD} fill="url(#sh-logo-grad-light)" />
        </g>
      )}

      {/* ================= DARK MODE LAYER ================= */}
      {showDark && (
        <g className={clsx(theme === 'auto' && 'hidden dark:block')}>
          <path d={pathD} fill="url(#sh-logo-grad-dark)" />
        </g>
      )}
    </svg>
  )
}
