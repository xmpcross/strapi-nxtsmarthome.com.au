'use client'

import React, { useState } from 'react'

export default function AmazonSmartHomeBanner() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeNode, setActiveNode] = useState<number | null>(null)

  const AMAZON_SMART_HOME_URL =
    'https://www.amazon.com.au/s?k=smart+home+devices&i=electronics&crid=2M49AJS4U53'

  const smartNodes = [
    { id: 1, label: 'Lighting', icon: 'M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 7a5 5 0 100 10 5 5 0 000-10z' },
    { id: 2, label: 'Security', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { id: 3, label: 'Climate', icon: 'M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z' },
    { id: 4, label: 'Voice Hub', icon: 'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8' },
  ]

  return (
    <div className="flex justify-center w-full">
      <a
        href={AMAZON_SMART_HOME_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setActiveNode(null)
        }}
        aria-label="Shop Amazon AU Smart Home Category"
        className="group relative flex w-full max-w-5xl overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-900 p-4 sm:p-6 text-white transition-all duration-500 dark:border-neutral-800 hover:border-amber-500/60 hover:shadow-xl hover:shadow-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
      >
        {/* Deep Slate / Cyber Navy Background Grid Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950" />
        
        {/* Ambient Animated Radial Glow */}
        <div
          className={`absolute -right-20 -top-20 size-80 rounded-full bg-amber-500/15 blur-3xl transition-opacity duration-700 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-60 scale-100'
          }`}
        />
        <div
          className={`absolute -left-20 -bottom-20 size-80 rounded-full bg-cyan-500/15 blur-3xl transition-opacity duration-700 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-40 scale-100'
          }`}
        />

        {/* Minimal Grid SVG Background Pattern */}
        <svg
          className="absolute inset-0 size-full opacity-15 stroke-neutral-500/30"
          width="100%"
          height="100%"
        >
          <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M0 32V0h32" fill="none" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Top Right "Sponsored / Amazon AU" Badge */}
        <div className="absolute top-2.5 right-3 z-20 flex items-center gap-2">
          <span className="rounded bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-300 backdrop-blur-md border border-white/10">
            Sponsored
          </span>
        </div>

        {/* Main Content Layout */}
        <div className="relative z-10 flex size-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
          
          {/* Left Block: Amazon Branding & Category Info */}
          <div className="space-y-2 max-w-lg">
            {/* Amazon AU Minimal Logo Header */}
            <div className="flex items-center gap-2.5">
              {/* Amazon Smile Icon SVG */}
              <div className="flex items-center text-amber-400">
                <svg className="h-6 w-auto fill-current" viewBox="0 0 100 30">
                  {/* Amazon Text Mark */}
                  <text x="0" y="20" fontFamily="sans-serif" fontSize="20" fontWeight="800" fill="#FFFFFF">
                    amazon
                  </text>
                  <text x="74" y="20" fontFamily="sans-serif" fontSize="13" fontWeight="700" fill="#FF9900">
                    .com.au
                  </text>
                  {/* Smile Arrow Path */}
                  <path
                    d="M 12 23 C 35 32, 60 30, 78 22"
                    fill="none"
                    stroke="#FF9900"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path d="M 76 20 L 80 23 L 75 25.5 Z" fill="#FF9900" />
                </svg>
              </div>

              <span className="h-3.5 w-px bg-neutral-700" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400">
                Smart Home Hub
              </span>
            </div>

            {/* Minimal Title */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors duration-300 leading-snug">
              Upgrade Your Living Space with Amazon Smart Tech
            </h3>

            {/* Minimal Description */}
            <p className="text-xs text-neutral-300 line-clamp-1 sm:line-clamp-2 leading-relaxed">
              Explore Australian deals on Alexa Echo Displays, Matter Security, Smart Lights & Automated Hubs.
            </p>
          </div>

          {/* Right Block: Interactive Animated Smart Nodes SVG & CTA */}
          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0 pt-2 sm:pt-0">
            
            {/* Interactive SVG Smart Mesh Diagram (Visible on sm screens and up) */}
            <div className="hidden md:flex items-center gap-3">
              {smartNodes.map((node) => {
                const isActive = activeNode === node.id || isHovered
                return (
                  <div
                    key={node.id}
                    onMouseEnter={(e) => {
                      e.stopPropagation()
                      setActiveNode(node.id)
                    }}
                    className={`relative flex flex-col items-center justify-center size-10 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'border-amber-400/80 bg-amber-400/10 text-amber-400 shadow-md shadow-amber-400/20 scale-105'
                        : 'border-white/10 bg-white/5 text-neutral-400'
                    }`}
                    title={node.label}
                  >
                    <svg
                      className="size-5 transition-transform duration-300 group-hover:rotate-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={node.icon} />
                    </svg>

                    {/* WiFi Pulse Ring when active */}
                    {isActive && (
                      <span className="absolute -inset-0.5 rounded-xl border border-amber-400/40 animate-ping pointer-events-none" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Minimal Animated Call To Action Button */}
            <div className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-neutral-950 transition-all duration-300 group-hover:bg-amber-400 group-hover:shadow-lg group-hover:shadow-amber-500/25 shrink-0">
              <span>Shop Smart Home</span>
              <svg
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>

          </div>

        </div>
      </a>
    </div>
  )
}
