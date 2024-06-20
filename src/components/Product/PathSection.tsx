import { PathSectionPropsSchema } from "../../types/singleProductSchemas"

export const PathSection = ({ name }: PathSectionPropsSchema) => {
  return (
    <section className="bg-off-white200 py-10 px-24 flex gap-6 items-center">
      <span className="text-gray2">
        <a href="/">Home</a>
      </span>

      <span className="text-2xl">&gt;</span>

      <span className="text-gray2">
        <a href="/shop">Shop</a>
      </span>

      <span className="text-2xl">&gt;</span>

      <span className="border-l border-black py-2 pl-6">{name}</span>
    </section>
  )
}
