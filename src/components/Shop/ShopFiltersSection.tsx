import { useDispatch, useSelector } from "react-redux"
import { selectSortFilter, selectTypeFilter } from "../../reducers/filterReducer"
import { useState } from "react"
import { RootState } from "../../types/reducerSchema"
import { ShopSectionsProps } from "../../types/shopSchemas"

export const ShopFiltersSection = ({ itemsPerPage }: ShopSectionsProps) => {
  const [filterActive, setFilterActive] = useState<boolean>(false)
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    livingRoom: true,
    kitchen: true,
    bedroom: true,
  })

  const amountResults = useSelector((state: RootState) => state.filters.results)
  const currentPage = useSelector((state: RootState) => state.filters.currentPage)
  const amountShowing = useSelector((state: RootState) => state.filters.amountShowing)

  const dispatch = useDispatch()

  function handleFilterChange() {
    setFilterActive(!filterActive)
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    })
  }

  function handleSortByChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    dispatch(selectSortFilter(value))
  }

  function handleFilterConfirm() {
    const selectedTypes = Object.keys(checkboxes).filter(type => checkboxes[type])
    dispatch(selectTypeFilter(selectedTypes))
    setFilterActive(false)
  }

  function calculateShowingRange() {
    const start = (currentPage - 1) * itemsPerPage + 1
    const end = Math.min(currentPage * itemsPerPage, amountResults)
    return { start, end }
  }

  const { start, end } = calculateShowingRange()

  return (
    <section className="font-Poppins mb-14">
      <div className="bg-off-white200 flex flex-wrap gap-6 justify-center items-center py-6 px-10 sm:px-20 xl:px-24 lg:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative">
            <button className="flex items-center gap-2" onClick={handleFilterChange}>
              <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/filter.svg" alt="filter" /></i>
              <span className="font-normal text-xl">Filter</span>
            </button>

            {filterActive && (
              <div className="absolute z-20 top-12 font-Poppins flex flex-col px-5 py-3 w-40 bg-white rounded-lg shadow-mdn">
                <div>
                  <input type="checkbox" id="livingRoom" name="livingRoom" value="livingRoom" checked={checkboxes["livingRoom"]} onChange={handleCheckboxChange} className="mr-1" />
                  <label htmlFor="livingRoom">Living Room</label>
                </div>

                <div>
                  <input type="checkbox" id="kitchen" name="kitchen" value="kitchen" checked={checkboxes["kitchen"]} onChange={handleCheckboxChange} className="mr-1" />
                  <label htmlFor="kitchen">Kitchen</label>
                </div>

                <div>
                  <input type="checkbox" id="bedroom" name="bedroom" value="bedroom" checked={checkboxes["bedroom"]} onChange={handleCheckboxChange} className="mr-1" />
                  <label htmlFor="bedroom">Bedroom</label>
                </div>

                <button onClick={handleFilterConfirm} className="mt-2">Confirm</button>
              </div>
            )}
          </div>
  
          <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/filter-type1.svg" alt="filter type 1" /></i>
          <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/filter-type2.svg" alt="filter type 2" /></i>
  
          <p className="border-l border-black pl-6">Showing {start}-{end} of {amountResults} results</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center sm:gap-0">
          <div className="mr-8 font-normal text-xl flex gap-4 items-center">
            <p>Show</p>
            <p className="text-gray2 h-14 w-14 bg-white flex items-center justify-center">{amountShowing}</p>
          </div>

          <div className="flex items-center">
            <p className="font-Poppins font-normal text-xl mr-4">Sort by</p>
            <select className="font-Poppins font-normal text-xl w-44 h-14 px-4 appearance-none focus:outline-none" onChange={handleSortByChange}>
              <option value="default">Default</option>
              <option value="priceAsc">Price asc</option>
              <option value="priceDesc">Price desc</option>
              <option value="discountAsc">Discount asc</option>
              <option value="discountDesc">Discount desc</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}
