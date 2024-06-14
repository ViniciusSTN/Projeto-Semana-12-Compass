import { ListCartItemsSection } from "../components/Cart/ListCartItemsSection"
import { AdvantagesSection } from "../components/Others/AdvantagesSection"
import { TitleSection } from "../components/Others/TitleSection"

export const Cart = () => {
  return (
    <main className="max-w-1440px mx-auto">
      <TitleSection logo />
      <ListCartItemsSection />
      <AdvantagesSection />
    </main>
  )
}
