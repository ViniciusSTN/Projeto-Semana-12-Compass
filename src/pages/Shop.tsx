import { AdvantagesSection } from "../components/Others/AdvantagesSection"
import { TitleSection } from "../components/Others/TitleSection"
import { ShopFiltersSection } from "../components/Shop/ShopFiltersSection"
import { ShopProducts } from "../components/Shop/ShopProducts"

export const Shop = () => {
  const itemsPerPage = 16

  return (
    <main className="max-w-1440px mx-auto">
      <TitleSection />
      <ShopFiltersSection itemsPerPage={itemsPerPage} />
      <ShopProducts itemsPerPage={itemsPerPage} />
      <AdvantagesSection />
    </main>
  )
}
