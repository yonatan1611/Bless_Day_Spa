import { ImageFrame } from '../ui/ImageFrame'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import type { Service } from '../../content/services'

type TreatmentIndexRowProps = {
  service: Service
  image: string
  demo: boolean
  index: number
  reversed: boolean
}

export const TreatmentIndexRow = ({ service, image, demo, index, reversed }: TreatmentIndexRowProps) => (
  <Reveal className={`treatment-row ${reversed ? 'treatment-row--reversed' : ''}`}>
    <div className="treatment-row__media">
      <ImageFrame
        variant="service"
        src={image}
        demo={demo}
        alt={demo ? `Demonstration ${service.title.toLowerCase()} photography` : `${service.title} at Bless Day Spa`}
      />
    </div>
    <div className="treatment-row__copy">
      <span className="treatment-row__number">0{index + 1}</span>
      <p className="eyebrow">Treatment</p>
      <h3 className="display-md">{service.title}</h3>
      <p className="body-lg">{service.description}</p>
      <p className="body-sm treatment-row__note">{service.note}</p>
      <div className="treatment-row__actions">
        <Button to={`/treatments/${service.slug}`} variant="secondary" arrow="up-right">View details</Button>
        <Button to={`/book?service=${service.slug}`} variant="primary" arrow="down-right">Book appointment</Button>
      </div>
    </div>
  </Reveal>
)
