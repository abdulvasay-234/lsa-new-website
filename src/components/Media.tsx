import type { MediaAsset } from '../data/types'

export function ResponsiveImage({ asset, loading = 'lazy' }: { asset: MediaAsset; loading?: 'eager' | 'lazy' }) {
  return <img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} loading={loading} decoding="async" />
}

export function YouTubeFacade({ title, thumbnail, url }: { title: string; thumbnail?: MediaAsset; url: string }) {
  return (
    <a className="video-facade" href={url} target="_blank" rel="noreferrer" aria-label={`Watch ${title} on YouTube`}>
      {thumbnail && <img src={thumbnail.src} alt="" width={thumbnail.width} height={thumbnail.height} loading="lazy" decoding="async" />}
      <span aria-hidden="true" />
    </a>
  )
}
