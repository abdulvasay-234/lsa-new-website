import { siteInfo } from '../data/site'

export type SeoInput = {
  title: string
  description: string
  path: string
  image?: string
}

export function createSeo(input: SeoInput) {
  return {
    ...input,
    canonical: siteInfo.url ? new URL(input.path, siteInfo.url).toString() : input.path,
    image: input.image && siteInfo.url ? new URL(input.image, siteInfo.url).toString() : input.image,
  }
}
