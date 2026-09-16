import { useState } from 'react'
import type { MediaAsset } from '../data/types'

export function ResponsiveImage({ asset, loading = 'lazy' }: { asset: MediaAsset; loading?: 'eager' | 'lazy' }) {
  return <img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} loading={loading} decoding="async" />
}

export function YouTubeFacade({ id, title, thumbnail }: { id: string; title: string; thumbnail?: MediaAsset }) {
  const [isLoaded, setIsLoaded] = useState(false)

  if (isLoaded) {
    return (
      <iframe
        className="video-facade"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  return (
    <button className="video-facade" type="button" aria-label={`Load ${title}`} onClick={() => setIsLoaded(true)}>
      {thumbnail && <img src={thumbnail.src} alt="" width={thumbnail.width} height={thumbnail.height} loading="lazy" decoding="async" />}
      <span aria-hidden="true">Play</span>
    </button>
  )
}
