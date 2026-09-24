'use client'

import SearchModal from '@/components/SearchModal'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'

/** Header search trigger in the Ncmaz style, opening the site's search overlay. */
export default function SiteSearchButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 rounded-full px-2.5 py-2 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        <HugeiconsIcon icon={Search01Icon} size={22} color="currentColor" strokeWidth={1.5} />
        <span className="hidden whitespace-nowrap 2xl:inline">Search</span>
      </button>
      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
