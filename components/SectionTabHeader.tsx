'use client'

import { Button } from '@/shared/Button'
import Heading, { HeadingWithSubProps } from '@/shared/Heading'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode, useState } from 'react'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  tabActive: string
  tabs: string[]
  heading: ReactNode
  onChangeTab?: (item: string) => void
  rightButtonHref?: string
}

const SectionTabHeader: FC<Props> = ({
  tabActive,
  tabs,
  subHeading,
  dimHeading,
  heading,
  onChangeTab,
  rightButtonHref = '/search',
}) => {
  const [currentTab, setCurrentTab] = useState(tabActive)

  const handleClickTab = (tab: string) => {
    setCurrentTab(tab)
    onChangeTab && onChangeTab(tab)
  }

  // No tabs: title and description on the left, View all on the same row at the right.
  if (!tabs.length) {
    return (
      <div className="section-tab-header relative mb-9 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <Heading className="mb-0! min-w-0 flex-1" subHeading={subHeading} dimHeading={dimHeading}>
          {heading}
        </Heading>
        <Button outline className="shrink-0" href={rightButtonHref}>
          <span>View all</span>
          <ArrowRightIcon className="size-5 rtl:rotate-180" />
        </Button>
      </div>
    )
  }

  return (
    <div className="section-tab-header relative mb-9 flex flex-col">
      <Heading subHeading={subHeading} dimHeading={dimHeading}>
        {heading}
      </Heading>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex grow flex-wrap gap-2">
          {tabs.map((tab) =>
            currentTab === tab ? (
              <Button key={tab} color="dark/white" onClick={() => handleClickTab(tab)}>
                {tab}
              </Button>
            ) : (
              <Button key={tab} onClick={() => handleClickTab(tab)} outline>
                {tab}
              </Button>
            )
          )}
        </div>
        <Button outline className="ms-auto shrink-0" href={rightButtonHref}>
          <span>View all</span>
          <ArrowRightIcon className="size-5 rtl:rotate-180" />
        </Button>
      </div>
    </div>
  )
}

export default SectionTabHeader
