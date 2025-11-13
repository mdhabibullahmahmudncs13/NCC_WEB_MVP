import { Metadata } from 'next'
import { segmentsService } from '../../../../lib/services'

type Props = {
  params: { segmentId: string }
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const segment = await segmentsService.get(params.segmentId)
    
    return {
      title: `${segment.title} - NITER Computer Club`,
      description: segment.description || `Learn more about ${segment.title} segment at NITER Computer Club`,
      openGraph: {
        title: `${segment.title} - NITER Computer Club`,
        description: segment.description || `Learn more about ${segment.title} segment at NITER Computer Club`,
        images: segment.photoId ? [
          {
            url: segmentsService.getPhotoUrl(segment.photoId).href,
            width: 800,
            height: 600,
            alt: `${segment.title} photo`,
          }
        ] : undefined,
      },
    }
  } catch (error) {
    return {
      title: 'Segment - NITER Computer Club',
      description: 'Segment information at NITER Computer Club',
    }
  }
}

export const viewport = {
  themeColor: '#2563eb',
}

export default function SegmentLayout({ children }: Props) {
  return children
}