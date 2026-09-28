type ImageFrameVariant = 'hero' | 'editorial' | 'service' | 'gallery' | 'thumbnail'

const defaultAspectByVariant: Record<ImageFrameVariant, string> = {
  hero: 'wide',
  editorial: 'portrait',
  service: 'portrait',
  gallery: 'square',
  thumbnail: 'square',
}

type ImageFrameProps = {
  src?: string
  alt: string
  caption?: string
  variant?: ImageFrameVariant
  /** Overrides the variant's default aspect ratio. */
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'auto'
  /** CSS object-position, e.g. "center top". Defaults to center. */
  objectPosition?: string
  className?: string
  priority?: boolean
  /** Marks the image as temporary placeholder photography, not licensed Bless Day Spa imagery. */
  demo?: boolean
}

export const ImageFrame = ({
  src,
  alt,
  caption,
  variant = 'editorial',
  aspectRatio,
  objectPosition = 'center',
  className = '',
  priority = false,
  demo = false,
}: ImageFrameProps) => {
  const resolvedAspect = aspectRatio ?? defaultAspectByVariant[variant]
  const aspectClass = resolvedAspect !== 'auto' ? `aspect-${resolvedAspect}` : ''

  return (
    <figure className={`image-frame image-frame--${variant} ${aspectClass} ${className}`.trim()}>
      <div className="image-frame__container">
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            style={{ objectPosition }}
          />
        ) : (
          <div className="image-frame__placeholder" role="img" aria-label={alt}>
            <span className="image-frame__placeholder-label">Official photography awaiting approval</span>
          </div>
        )}
      </div>
      {(caption || demo) && (
        <figcaption className="body-sm">
          {caption}
          {caption && demo ? ' · ' : ''}
          {demo && 'Demo image — replace before launch'}
        </figcaption>
      )}
    </figure>
  )
}
