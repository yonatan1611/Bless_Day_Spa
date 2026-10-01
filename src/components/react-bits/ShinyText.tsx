// Adapted from React Bits' ShinyText (reactbits.dev) — a shimmer sweep
// across text via a CSS animation on a background-clip gradient (simplified
// from the original's Motion+useAnimationFrame version to a pure-CSS
// @keyframes, since the effect itself is just a looping background-position
// shift and doesn't need per-frame JS).
type ShinyTextProps = {
  text: string
  className?: string
  speed?: number
}

export const ShinyText = ({ text, className = '', speed = 3 }: ShinyTextProps) => (
  <span className={`shiny-text ${className}`.trim()} style={{ animationDuration: `${speed}s` }}>
    {text}
  </span>
)
