import { ContactUsSection } from "../components/Contact/ContactUsSection"
import { AdvantagesSection } from "../components/Others/AdvantagesSection"
import { TitleSection } from "../components/Others/TitleSection"

export const Contact = () => {
  return (
    <main className="max-w-1440px mx-auto">
      <TitleSection logo />
      <ContactUsSection />
      <AdvantagesSection />
    </main>
  )
}
