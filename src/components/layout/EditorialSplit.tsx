import type { ReactNode } from 'react'

type EditorialSplitProps = {
  media: ReactNode
  children: ReactNode
  className?: string
  /** Which side the media sits on at desktop widths. Stacks media-first on mobile either way. */
  mediaSide?: 'left' | 'right'
  /** Gives the media column more width than a plain 50/50 split. */
  mediaWeight?: 'balanced' | 'wide'
}

export const EditorialSplit = ({
  media,
  children,
  className = '',
  mediaSide = 'left',
  mediaWeight = 'balanced',
}: EditorialSplitProps) => (
  <div
    className={`editorial-split editorial-split--media-${mediaSide} editorial-split--${mediaWeight} ${className}`.trim()}
  >
    <div className="editorial-split__media">{media}</div>
    <div className="editorial-split__content">{children}</div>
  </div>
)
