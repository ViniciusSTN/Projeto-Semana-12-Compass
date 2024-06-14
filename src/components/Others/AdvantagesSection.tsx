export const AdvantagesSection = () => {
  return (
    <section className="max-w-1440px mx-auto">
      <div className="bg-off-white300 py-24 px-12 flex flex-wrap gap-14 justify-between font-Poppins">
        <div className="flex gap-2 items-center">
          <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/trofeu.svg" alt="quality" />
          <div>
            <h4 className="text-strong-gray font-semibold text-2xl">High Quality</h4>
            <p className="text-gray100 font-medium text-xl">crafted from top materials</p>
          </div>
        </div>
  
        <div className="flex gap-2 items-center">
          <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/verificado.svg" alt="protection" />
          <div>
            <h4 className="text-strong-gray font-semibold text-2xl">Warranty Protection</h4>
            <p className="text-gray100 font-medium text-xl">Over 2 years</p>
          </div>
        </div>
  
        <div className="flex gap-2 items-center">
          <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/shipping.svg" alt="shipping" />
          <div>
            <h4 className="text-strong-gray font-semibold text-2xl">Free Shipping</h4>
            <p className="text-gray100 font-medium text-xl">Order over 150 $</p>
          </div>
        </div>
  
        <div className="flex gap-2 items-center">
          <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/customer-support.svg" alt="support" />
          <div>
            <h4 className="text-strong-gray font-semibold text-2xl">24 / 7 Support</h4>
            <p className="text-gray100 font-medium text-xl">Dedicated support</p>
          </div>
        </div>
      </div>
    </section>
  )
}
