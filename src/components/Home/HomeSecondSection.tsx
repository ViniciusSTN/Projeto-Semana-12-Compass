import { secondSectionImg } from "../../mocks/homeMocks"

export const HomeSecondSection = () => {
  return (
    <section className="max-w-1184px mx-auto py-14">
      <h3 className="font-Poppins font-bold text-3.3xl text-center text-darkcharcoal">Browse The Range</h3>
      <p className="font-Poppins font-normal text-xl text-center text-darkcharcoal mb-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="flex flex-wrap gap-5 justify-center">
        {
          secondSectionImg.map((item) => (
            <div key={item.title}>
              <img src={item.src} alt={item.title} className="object-cover mb-7" />
              <p className="font-Poppins font-semibold text-2xl text-darkcharcoal text-center">{item.title}</p>
            </div>
          ))
        }
      </div>
    </section>
  )
}
