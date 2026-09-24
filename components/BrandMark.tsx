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
 * NXT Smart Home Creative Brand Mark (Concept 3):
 *
 * An architectural smart home monogram combining:
 * 1. The pitched roof and pillars of a modern home
 * 2. The dynamic angular diagonal slash creating the letter "N" (NXT)
 * 3. A central smart IoT connectivity beacon radiating dual pulse waves
 *
 * Designed with precision vectors, seamless light & dark mode palettes.
 */
export default function BrandMark({
  className = 'size-9',
  theme = 'auto',
}: BrandMarkProps) {
  const showLight = theme === 'light' || theme === 'auto'
  const showDark = theme === 'dark' || theme === 'auto'

  return (
    <svg
      viewBox="0 0 44 44"
      className={clsx('shrink-0', className)}
      role="img"
      aria-label="NXT Smart Home mark"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Light Mode Gradients */}
        <linearGradient
          id="nxt-mark-grad-light"
          x1="6"
          y1="6"
          x2="38"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Dark Mode Gradients */}
        <linearGradient
          id="nxt-mark-grad-dark"
          x1="6"
          y1="6"
          x2="38"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>

        <linearGradient
          id="nxt-mark-diag-dark"
          x1="11"
          y1="19"
          x2="33"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>

      {/* ================= LIGHT MODE LAYER ================= */}
      {showLight && (
        <g className={clsx(theme === 'auto' && 'block dark:hidden')}>
          {/* Architectural House Outline + N Legs */}
          <path
            d="M8 36V18L22 7L36 18V36"
            stroke="url(#nxt-mark-grad-light)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dynamic N Diagonal Stroke */}
          <path
            d="M11 19L33 34"
            stroke="#4F46E5"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Central Smart Connectivity Node */}
          <circle cx="22" cy="22" r="2.5" fill="#0EA5E9" />

          {/* Smart Signal Pulse Wave 1 */}
          <path
            d="M17 17.5C18.5 16 25.5 16 27 17.5"
            stroke="#0EA5E9"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Smart Signal Pulse Wave 2 */}
          <path
            d="M14.5 14.5C17 12.5 27 12.5 29.5 14.5"
            stroke="#0EA5E9"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
        </g>
      )}

      {/* ================= DARK MODE LAYER ================= */}
      {showDark && (
        <g className={clsx(theme === 'auto' && 'hidden dark:block')}>
          {/* Architectural House Outline + N Legs */}
          <path
            d="M8 36V18L22 7L36 18V36"
            stroke="url(#nxt-mark-grad-dark)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dynamic Radiant N Diagonal Stroke */}
          <path
            d="M11 19L33 34"
            stroke="url(#nxt-mark-diag-dark)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Central Smart Connectivity Node */}
          <circle cx="22" cy="22" r="2.5" fill="#38BDF8" />

          {/* Smart Signal Pulse Wave 1 */}
          <path
            d="M17 17.5C18.5 16 25.5 16 27 17.5"
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Smart Signal Pulse Wave 2 */}
          <path
            d="M14.5 14.5C17 12.5 27 12.5 29.5 14.5"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        </g>
      )}
    </svg>
  )
}
