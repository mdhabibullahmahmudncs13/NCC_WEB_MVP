import GalleryGrid from '../../../components/GalleryGrid'

const SAMPLE = [
  { id: 'g1', src: undefined, caption: 'Tech Fest 2024' },
  { id: 'g2', src: undefined, caption: 'Workshop' }
]

export default function GalleryPage(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <GalleryGrid items={SAMPLE} />
    </div>
  )
}
