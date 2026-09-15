type ImageFrameProps = {
  alt: string
  caption?: string
  className?: string
  src?: string
  demo?: boolean
}

/**
 * Keeps image behavior consistent while official, licensed photography is being collected.
 * Pass `src` only for an approved business-owned asset.
 */
export function ImageFrame({ alt, caption, className = '', src, demo = false }: ImageFrameProps) {
  return (
    <figure className={`image-frame ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      ) : (
        <div className="image-frame__pending" role="img" aria-label={alt}>
          <span>Official photography<br />awaiting approval</span>
        </div>
      )}
      {(caption || demo) && <figcaption>{caption}{caption && demo ? ' · ' : ''}{demo ? 'Demo image — replace before launch' : ''}</figcaption>}
    </figure>
  )
}
