import { AdvantagesSection } from "../components/Shop/AdvantagesSection"
import { ShopFiltersSection } from "../components/Shop/ShopFiltersSection"
import { ShopProducts } from "../components/Shop/ShopProducts"

export const Shop = () => {
  const itemsPerPage = 16

  return (
    <main>
      <ShopFiltersSection itemsPerPage={itemsPerPage} />
      <ShopProducts itemsPerPage={itemsPerPage} />
      <AdvantagesSection />
    </main>
  )
}
