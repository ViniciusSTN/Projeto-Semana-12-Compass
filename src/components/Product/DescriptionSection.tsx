import { useState } from "react"
import { DescriptionSectionProps } from "../../types/singleProductSchemas"

export const DescriptionSection = ({ description, additional, images, name }: DescriptionSectionProps) => {
  const [sectionActive, setSectionActive] = useState<'Description' | 'Additional'>('Description')

  const descriptionParagraph = description.split('\n')
  const additionalParagraph = additional.split('\n')

  return (
    <section className="border-t border-gray400 pt-12 pb-16 px-24 flex flex-col items-center">
      <div className="font-medium text-2xl flex justify-center gap-32 mb-9">
        <button className={`${sectionActive !== 'Description' && 'text-gray2'}`} onClick={() => setSectionActive('Description')}>Description</button>
        <button className={`${sectionActive !== 'Additional' && 'text-gray2'}`} onClick={() => setSectionActive('Additional')}>Additional Information</button>
      </div>

      <div className="flex flex-col gap-7 max-w-1060px mb-9">
        {
          sectionActive === 'Description' ? (
            descriptionParagraph.map((paragraph, index) => (
              <p key={index} className="text-gray2">{paragraph}</p>
            ))
          ) : (
            additionalParagraph.map((paragraph, index) => (
              <p key={index} className="text-gray2">{paragraph}</p>
            ))
          )
        } 
      </div>

      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-7">
          <div className="max-w-604px h-348px">
            <img src={images[0]} alt={name} className="object-cover w-full h-full" />
          </div>
  
          <div className="max-w-604px h-348px">
            <img src={images[1]} alt={name} className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
