import rightImgDemo from '@/images/BecomeAnAuthorImg.webp'
import ButtonPrimary from '@/shared/ButtonPrimary'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { FC } from 'react'

interface Props {
  className?: string
  rightImg?: string | StaticImageData
  eyebrow?: string
  heading?: string
  text?: string
  buttonLabel?: string
  buttonHref?: string
}

/**
 * Ncmaz "become an author" call-to-action block. The template's copy
 * (recruiting paid authors) does not apply to this site, so the text and
 * link are props; the defaults invite readers to suggest a topic.
 */
const SectionBecomeAnAuthor: FC<Props> = ({
  className,
  rightImg = rightImgDemo,
  eyebrow = 'Tell us what to cover',
  heading = 'Stuck on a smart home problem?',
  text = 'Reader questions shape what we write next — especially Australia-specific ones no one else is answering. Send us the device, the platform or the problem, and we will look at it.',
  buttonLabel = 'Suggest a topic',
  buttonHref = '/contact/',
}) => {
  return (
    <div className={clsx('section-become-an-author relative flex flex-col items-center lg:flex-row', className)}>
      <div className="mb-14 shrink-0 lg:mr-10 lg:mb-0 lg:w-2/5">
        <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">{eyebrow}</span>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{heading}</h2>
        <span className="mt-8 block text-neutral-500 dark:text-neutral-400">{text}</span>
        <ButtonPrimary className="mt-8" href={buttonHref}>
          {buttonLabel}
        </ButtonPrimary>
      </div>
      <div className="grow">
        <Image alt="" sizes="(max-width: 768px) 100vw, 50vw" src={rightImg} />
      </div>
    </div>
  )
}

export default SectionBecomeAnAuthor
