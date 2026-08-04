'use client';
import { useEffect, useState } from 'react';

interface UseSectionVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useSectionVisibility(
  sectionId: string,
  options: UseSectionVisibilityOptions = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);

          // Calculate scroll progress within the section
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;

            // Progress from 0 (entering) to 1 (leaving)
            const scrolled = windowHeight - rect.top;
            const total = windowHeight + elementHeight;
            const sectionProgress = Math.max(0, Math.min(1, scrolled / total));

            setProgress(sectionProgress);
          } else {
            setProgress(0);
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    // Also track scroll for progress updates
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = windowHeight - rect.top;
        const total = windowHeight + elementHeight;
        const sectionProgress = Math.max(0, Math.min(1, scrolled / total));
        setProgress(sectionProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionId, options.threshold, options.rootMargin]);

  return { isVisible, progress };
}
