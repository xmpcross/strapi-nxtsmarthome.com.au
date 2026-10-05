'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: () => void;
    };
  }
}

export default function FlyonuiScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Dynamic import to avoid SSR issues with window/document references
    import('flyonui/flyonui').then(() => {
      if (typeof window !== 'undefined' && window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      }
    });
  }, [pathname]);

  return null;
}
