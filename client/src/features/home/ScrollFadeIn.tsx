import { useEffect, useRef, useState, type ReactNode } from "react"

export interface Props {
  children: ReactNode,
  delay?: number
}

export const ScrollFadeIn = ({
  children,
  delay = 200
}: Props) => {

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current)
    }
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        transition: 'all 1s ease-out',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
      }}
    >
      {children}
    </div>
  )
}