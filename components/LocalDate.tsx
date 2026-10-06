'use client'

import { FC } from 'react'

interface Props {
  date: string
  className?: string
  options?: Intl.DateTimeFormatOptions
}

// en-AU to match the site's locale, and a fixed time zone so the server render
// and the browser agree on the day (as formatDate in lib/content.ts does).
const LocalDate: FC<Props> = ({ date, className, options = { month: 'short', day: 'numeric', year: 'numeric' } }) => {
  return (
    <time dateTime={date} className={className}>
      {new Date(date).toLocaleDateString('en-AU', { timeZone: 'UTC', ...options })}
    </time>
  )
}

export default LocalDate
