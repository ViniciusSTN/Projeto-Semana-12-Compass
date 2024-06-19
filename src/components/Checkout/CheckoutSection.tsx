import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../types/reducerSchema'
import checkoutSchema from '../../validation/checkout'
import getAddressByCep from '../../data/getAddress'
import { toast } from 'react-toastify'

export const CheckoutSection = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    companyName: '',
    zipCode: '',
    country: '',
    streetAddress: '',
    city: '',
    province: '',
    addOnAddress: '',
    email: '',
    additionalInfo: '',
    paymentMethod: 'directBankTransfer'
  }

  const [formData, setFormData] = useState({ ...initialFormData })

  const [formErrors, setFormErrors] = useState({
    ...initialFormData,
    additionalInfo: ''
  })

  const [subtotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)

  const cartItems = useSelector((state: RootState) => state.shoppingCart.cartItems)

  useEffect(() => {
    const valueSubtotal = cartItems.reduce((acc, item) => item.total + acc, 0)
    const valueTotal = cartItems.reduce((acc, item) => (item.total - (item.total * item.discount_percentage / 100)) + acc, 0)

    setSubtotal(valueSubtotal)
    setTotal(valueTotal)
  }, [cartItems])

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target

    setFormErrors(prevState => ({
      ...prevState,
      [name]: ''
    }))

    if (name === 'zipCode') {
      const numericValue = value.replace(/\D/g, '').slice(0, 8)
      const formattedValue = numericValue.length > 5 ? numericValue.slice(0, 5) + '-' + numericValue.slice(5) : numericValue

      setFormData(prevState => ({
        ...prevState,
        zipCode: formattedValue,
      }))

      if (numericValue.length === 8) {
        const data = await getAddress(numericValue)
      
        if (data) {
          setFormData(prevState => ({
            ...prevState,
            country: 'Brasil',
            streetAddress: `${data.logradouro}, ${data.bairro}`,
            city: data.localidade,
            province: data.uf,
            addOnAddress: data.complemento,
          }))
        }
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  async function getAddress(cep: string) {
    const response = await getAddressByCep(cep)
    return response
  }

  function handleRadioChange (e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    setFormData(prevState => ({
      ...prevState,
      paymentMethod: value,
    }))
  }

  function handleFormSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const validations = checkoutSchema.safeParse(formData)

    if (!validations.success) {
      const errorField = { ...formErrors }

      validations.error.errors.forEach(error => {
        const path = error.path[0]
        if (typeof path === "string") errorField[path as keyof typeof errorField] = error.message
      })

      setFormErrors(errorField)
    } else {
      toast.success('Order confirmed')
      setFormData({ ...initialFormData })
    }
  }

  return (
    <section>
      <form className='flex justify-between flex-wrap gap-6 py-16 px-24 font-Poppins' onSubmit={handleFormSubmit}>
        <div className='flex-grow max-w-608px px-76px py-9'>
          <h3 className='font-semibold text-4xl mb-9'>Billing details</h3>

          <div className='flex flex-col gap-9 w-full font-medium'>
            <div className='flex justify-between flex-wrap gap-3'>
              <label className='max-w-52'>
                <p className='font-medium mb-5'>First Name</p>
                <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.firstName} name='firstName' onChange={handleChange} />
                {formErrors.firstName && <p className='text-red-500'>{formErrors.firstName}</p>}
              </label>

              <label className='max-w-52'>
                <p className='font-medium mb-5'>Last Name</p>
                <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.lastName} name='lastName' onChange={handleChange} />
                {formErrors.lastName && <p className='text-red-500'>{formErrors.lastName}</p>}
              </label>
            </div>

            <label>
              <p className='font-medium mb-5'>Company Name (Optional)</p>
              <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.companyName} name='companyName' onChange={handleChange} />
              {formErrors.companyName && <p className='text-red-500'>{formErrors.companyName}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>ZIP code</p>
              <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.zipCode} name='zipCode' onChange={handleChange} />
              {formErrors.zipCode && <p className='text-red-500'>{formErrors.zipCode}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>Country / Region</p>
              <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.country} name='country' onChange={handleChange} />
              {formErrors.country && <p className='text-red-500'>{formErrors.country}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>Street address</p>
              <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.streetAddress} name='streetAddress' onChange={handleChange} />
              {formErrors.streetAddress && <p className='text-red-500'>{formErrors.streetAddress}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>Town / City</p>
              <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.city} name='city' onChange={handleChange} />
              {formErrors.city && <p className='text-red-500'>{formErrors.city}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>Province</p>
              <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.province} name='province' onChange={handleChange} />
              {formErrors.province && <p className='text-red-500'>{formErrors.province}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>Add-on address</p>
              <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.addOnAddress} name='addOnAddress' onChange={handleChange} />
              {formErrors.addOnAddress && <p className='text-red-500'>{formErrors.addOnAddress}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>Email address</p>
              <input type='text' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.email} name='email' onChange={handleChange} />
              {formErrors.email && <p className='text-red-500'>{formErrors.email}</p>}
            </label>

            <div>
              <input type='text' placeholder='Additional information' className='w-full border font-normal border-gray2 py-6 px-8 rounded-lg focus:outline-none' value={formData.additionalInfo} name='additionalInfo' onChange={handleChange} />
              {formErrors.additionalInfo && <p className='text-red-500'>{formErrors.additionalInfo}</p>}
            </div>
          </div>
        </div>
  
        <div className='flex-grow max-w-608px py-16 px-9 flex flex-col gap-6'>
          <div className='flex justify-between items-center'>
            <p className='text-2xl font-medium'>Product</p>
            <p className='text-2xl font-medium'>Subtotal</p>
          </div>
  
          <div className='flex flex-col gap-2'>
            { 
              cartItems.length > 0 && cartItems.map(item => (
                <p key={item.id} className='flex justify-between '>
                  <span>
                    <span className='text-gray2 mr-3 font-normal'>{item.title}</span>
                    <span className='text-xs font-medium'>x {item.quantity}</span>
                  </span>
                  <span className='font-light'>Rs. {item.total.toFixed(2)}</span>
                </p>
              ))
            }
          </div>
  
          <div className='flex justify-between items-center'>
            <p className='font-normal'>Subtotal</p>
            <p className='font-light'>Rs. {subtotal}</p>
          </div>
  
          <div className='flex justify-between items-center'>
            <p className='font-normal'>Total</p>
            <p className='font-bold text-2xl text-goldenbrown'>Rs. {total}</p>
          </div>
  
          <div className='pt-6 border-t border-gray400'>
            <div className='flex gap-3 items-center mb-3'>
              <div className='w-3 h-3 rounded-full bg-black'></div>
              <p>Direct Bank Transfer</p>
            </div>
    
            <p className='font-light text-gray2 mb-6'>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
  
            <div className='flex flex-col gap-3 text-gray2 mb-5'>
              <label className='flex items-center gap-4'>
                <input type="radio" defaultChecked={true} name="paymentMethod" value='directBankTransfer' onChange={handleRadioChange} />
                <span>Direct Bank Transfer</span>
              </label>
    
              <label className='flex items-center gap-4'>
                <input type="radio" defaultChecked={false} name="paymentMethod" value='cashOnDelivery' onChange={handleRadioChange} />
                <span>Cash On Delivery</span>
              </label>
            </div>
  
            <p className='font-light mb-10'>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className='font-semibold'>privacy policy.</span></p>
  
            <div className='flex justify-center'>
              <button type='submit' className='px-24 py-4 border border-black text-xl rounded-2xl'>Place order</button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
