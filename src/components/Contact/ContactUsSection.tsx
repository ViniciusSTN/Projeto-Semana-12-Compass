import { useRef, useState } from "react"
import contactSchema from "../../validation/contact"
import { toast } from "react-toastify"

export const ContactUsSection = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const subjectRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const errorInicialState = {
    nameError: '',
    emailError: '',
    subjectError: '',
    messageError: '',
  }

  const [error, setError] = useState(errorInicialState)

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = {
      name: nameRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      subject: subjectRef.current?.value ?? '',
      message: messageRef.current?.value ?? ''
    }

    const validations = contactSchema.safeParse(formData)

    if (!validations.success) {
      const errorMessages = { ...errorInicialState }

      validations.error.errors.forEach(error => {
        if (error.path[0] === 'name') errorMessages.nameError = error.message
        else if (error.path[0] === 'email') errorMessages.emailError = error.message
        else if (error.path[0] === 'subject') errorMessages.subjectError = error.message
        else if (error.path[0] === 'message') errorMessages.messageError = error.message
      })

      setError(errorMessages)
    } else {
      setError(errorInicialState)

      if (nameRef.current) nameRef.current.value = ''
      if (emailRef.current) emailRef.current.value = ''
      if (subjectRef.current) subjectRef.current.value = ''
      if (messageRef.current) messageRef.current.value = ''

      toast.success('Thank you for contacting us')
    }
  }

  return (
    <section className="pt-24 font-Poppins">
      <div className="mx-6">
        <h3 className="font-semibold text-4xl text-center mb-2">Get In Touch With Us</h3>
        <p className="text-center font-normal text-gray2 max-w-643px mx-auto">For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-4 pt-16 px-10 sm:px-32 lg:px-48">
        <div className="flex flex-col gap-11 py-14 md:pl-14 md:pr-76px">
          <div className="flex gap-7">
            <div><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/location-icon.svg" alt="Address" /></div>
            <div>
              <h4 className="font-medium text-2xl">Address</h4>
              <p className="max-w-212px">236 5th SE Avenue, New York NY10000, United States</p>
            </div>
          </div>

          <div className="flex gap-7">
            <div><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/phone-icon.svg" alt="Phone" /></div>
            <div>
              <h4 className="font-medium text-2xl">Phone</h4>
              <p className="max-w-212px">Mobile: +(84) 546-6789</p>
              <p className="max-w-212px">Hotline: +(84) 456-6789</p>
            </div>
          </div>

          <div className="flex gap-7">
            <div><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/time-icon.svg" alt="Working Time" /></div>
            <div>
              <h4 className="font-medium text-2xl">Working Time</h4>
              <p className="max-w-212px">Monday-Friday: 9:00 - 22:00</p>
              <p className="max-w-212px">Saturday-Sunday: 9:00 - 21:00</p>
            </div>
          </div>
        </div>

        <div className="max-w-636px p-14 grow">
          <form className='flex flex-col gap-9 w-full' onSubmit={handleFormSubmit}>
            <label>
              <p className='font-medium mb-5'>Your name</p>
              <input type="text" placeholder='Abc' className='w-full border border-gray2 py-6 px-8 rounded-lg focus:outline-none' ref={nameRef} onChange={() => setError((prevState) => ({ ...prevState, nameError: '' }))} />
              {error.nameError && <p className="text-red-500">{error.nameError}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>Email address</p>
              <input type="text" placeholder='Abc@def.com' className='w-full border border-gray2 py-6 px-8 rounded-lg focus:outline-none' ref={emailRef} onChange={() => setError((prevState) => ({ ...prevState, emailError: '' }))} />
              {error.emailError && <p className="text-red-500">{error.emailError}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>Subject</p>
              <input type="text" placeholder='This is an optional' className='w-full border border-gray2 py-6 px-8 rounded-lg focus:outline-none' ref={subjectRef} onChange={() => setError((prevState) => ({ ...prevState, subjectError: '' }))} />
              {error.subjectError && <p className="text-red-500">{error.subjectError}</p>}
            </label>

            <label>
              <p className='font-medium mb-5'>Message</p>
              <textarea placeholder="Hi! i'd like to ask about" className='w-full border border-gray2 py-6 px-8 rounded-lg focus:outline-none' ref={messageRef} onChange={() => setError((prevState) => ({ ...prevState, messageError: '' }))} />
              {error.messageError && <p className="text-red-500">{error.messageError}</p>}
            </label>

            <button type='submit' className='bg-goldenbrown px-24 py-3 text-white rounded-md max-w-60 flex items-center justify-center hover:text-black'>Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}
