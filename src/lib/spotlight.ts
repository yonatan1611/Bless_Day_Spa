import type { MouseEvent } from 'react'

// Tracks the cursor's local position on an element as --spotlight-x/y CSS
// vars, for a radial-gradient glow that follows the pointer. Desktop-only
// effects should gate the CSS itself behind @media (hover: hover).
export const onSpotlightPointerMove = (event: MouseEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
}
