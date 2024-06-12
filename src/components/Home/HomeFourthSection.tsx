import { fourthSectionItems } from "../../mocks/homeMocks"
import Slider from "../Others/Slider"

export const HomeFourthSection = () => {
  return (
    <section className="bg-antiquewhite flex justify-center">
      <div className="container flex gap-10 pl-24">
        <div className="flex flex-col justify-center">
          <h2 className="font-Poppins font-bold text-4.5xl text-darkgreen leading-12 mb-2">50+ Beautiful rooms inspiration</h2>
          <p className="font-Poppins font-medium text-gray200 leading-6 mb-6">Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
          <a href="/shop" className="flex bg-goldenbrown text-white font-Poppins font-semibold w-44 h-12 items-center justify-center">Explore More</a>
        </div>

        <div className="overflow-hidden">
          <Slider rooms={fourthSectionItems} />
        </div>
      </div>
    </section>
  )
}
