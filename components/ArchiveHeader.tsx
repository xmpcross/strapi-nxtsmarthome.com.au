import Avatar from '@/shared/Avatar'
import { Badge } from '@/shared/Badge'
import clsx from 'clsx'
import type { ReactNode } from 'react'

type BadgeColor = React.ComponentProps<typeof Badge>['color']

/**
 * Archive page header in the Ncmaz style (category / author / listing pages):
 * a tinted band with an overlapping card holding the image, title and intro.
 * Server-rendered, without the template's placeholder follow/report actions.
 */
export default function ArchiveHeader({
  eyebrow,
  eyebrowColor = 'indigo',
  title,
  intro,
  meta,
  image,
  imageAlt,
  initials,
  round = false,
  banner,
  className,
  fullWidth = false,
  introClassName = 'text-sm/6',
  titleClassName = 'text-2xl lg:text-3xl',
}: {
  /** Badge above the title; omitted when empty (e.g. an author with no role). */
  eyebrow?: string
  eyebrowColor?: BadgeColor
  title: string
  intro?: ReactNode
  meta?: ReactNode
  image?: string
  imageAlt?: string
  initials?: string
  round?: boolean
  banner?: string | null
  className?: string
  /** Let the title, intro and meta use the card's full width instead of a readable measure. */
  fullWidth?: boolean
  /** Size of the intro text. Defaults to the shared archive scale. */
  introClassName?: string
  /** Size of the h1. Defaults to the shared archive scale. */
  titleClassName?: string
}) {
  return (
    <div className={clsx('w-full', className)}>
      <div className="relative h-32 w-full overflow-hidden bg-neutral-100 md:h-48 dark:bg-white/10">
        {banner && <img src={banner} alt="" className="absolute inset-0 size-full object-cover opacity-90" />}
      </div>
      <div className="container -mt-16">
        <div className="relative flex flex-col items-start gap-6 rounded-3xl border border-transparent bg-white p-5 shadow-xl md:flex-row md:rounded-4xl lg:p-8 lg:px-9 dark:border-neutral-700 dark:bg-neutral-900">
          {(image || initials) && (
            <Avatar
              alt={imageAlt ?? title}
              src={image || undefined}
              initials={image ? undefined : initials}
              square={!round}
              width={144}
              height={144}
              className={clsx(
                'size-24 shrink-0 shadow-2xl ring-4 ring-white lg:size-36 dark:ring-neutral-800',
                !round && 'rotate-6'
              )}
              sizes="144px"
            />
          )}
          <div className="flex-1 lg:ps-4">
            <div className={clsx('space-y-3.5', !fullWidth && 'max-w-(--breakpoint-md)')}>
              <div>
                {eyebrow ? <Badge color={eyebrowColor}>{eyebrow}</Badge> : null}
                <h1 className={clsx(eyebrow && 'mt-2', 'font-semibold', titleClassName)}>{title}</h1>
              </div>
              {intro && <div className={clsx('text-neutral-600 dark:text-neutral-300', introClassName)}>{intro}</div>}
              {meta && <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{meta}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
