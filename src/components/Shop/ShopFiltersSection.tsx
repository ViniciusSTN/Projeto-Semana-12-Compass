export const ShopFiltersSection = () => {
  return (
    <section className="max-w-1440px mx-auto font-Poppins mb-14">
      <div className="bg-shop-fsection h-316px flex flex-col justify-center items-center relative">
        <h2 className="font-medium text-5xl mb-2">Shop</h2>
        <div className="flex gap-2 absolute bottom-24">
          <a href="/" className="font-medium">Home</a>
          <span className="font-medium">&gt;</span>
          <a href="/shop" className="font-light">Shop</a>
        </div>
      </div>

      <div className="h-24 bg-off-white200 flex justify-between items-center px-24">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2">
            <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/filter.svg" alt="filter" /></i>
            <span className="font-normal text-xl">Filter</span>
          </button>
  
          <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/filter-type1.svg" alt="filter type 1" /></i>
          <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/filter-type2.svg" alt="filter type 2" /></i>
  
          <p className="border-l border-black pl-6">Showing 1-16 of 32 results</p>
        </div>

        <div className="flex items-center">
          <p className="mr-8 font-normal text-xl flex gap-4 items-center">
            <span>Show</span>
            <div className="text-gray2 h-14 w-14 bg-white flex items-center justify-center"></div>
          </p>

          <p className="font-Poppins font-normal text-xl mr-4">Short by</p>
          <select className="font-Poppins font-normal text-xl w-44 h-14 px-7 appearance-none focus:outline-none">
            <option value="default">Default</option>
          </select>
        </div>
      </div>
    </section>
  )
}
