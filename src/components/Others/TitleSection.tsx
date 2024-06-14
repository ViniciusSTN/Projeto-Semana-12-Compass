import { useLocation } from "react-router-dom"
import { TitleSectionProps } from "../../types/TitleSectionSchemas"

export const TitleSection = ({ logo = false }: TitleSectionProps) => {
  const path = useLocation()
  const name = path.pathname.replace('/', '')

  return (
    <div className="bg-title-section h-316px flex flex-col justify-center items-center relative font-Poppins">
      {
        logo && <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/icone-logo.svg" alt="Furniro" className="absolute top-20" />
      }
      <h2 className="font-medium text-5xl capitalize">{name}</h2>
      <div className="flex gap-2 absolute bottom-24">
        <a href="/" className="font-medium">Home</a>
        <span className="font-medium">&gt;</span>
        <a href={`/${name}`} className="font-light capitalize">{name}</a>
      </div>
    </div>
  )
}
