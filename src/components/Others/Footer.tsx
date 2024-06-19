import React, { useState } from "react"
import { useDispatch } from "react-redux"
import footerSchema from "../../validation/footer"
import { ToastContainer, toast } from "react-toastify"
import { setFooterEmail } from "../../reducers/footerReducer"
import { useSelector } from "react-redux"
import { RootState } from "../../types/reducerSchema"

export const Footer = () => {
  const [email, setEmail] = useState<string>('')

  const dispatch = useDispatch()
  const emailList = useSelector((state: RootState) => state.footerEmail.emails)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const validation = footerSchema.safeParse({ email })

    if (!validation.success) {
      const error = validation.error.errors[0]
      toast.error(`${error.message}`)
      return
    }

    if (emailList.includes(email)) {
      toast.error('Email already exists in the list')
      return
    }

    dispatch(setFooterEmail(email))
    toast.success('Email saved successfully')
    setEmail('')
  }

  return (
    <footer className="border-t">
      <ToastContainer />

      <div className="container flex flex-wrap justify-between px-24 py-12 border-b mx-auto">
        <div className="max-w-72 flex flex-col gap-14">
          <h4 className="font-Poppins font-bold text-2xl">Furniro.</h4>
          <div className="font-Poppins font-normal text-gray2">
            <p>400 University Drive Suite 200 Coral Gables,</p>
            <p>FL 33134 USA</p>
          </div>
          <div className="max-w-48 flex gap-4">
            <a target="_brank" href="https://www.facebook.com" className="w-34px h-34px rounded-full shadow-mdn flex items-center justify-center">
              <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/facebook.svg" alt="facebook" /></i>
            </a>
            <a target="_brank" href="https://www.instagram.com" className="w-34px h-34px rounded-full shadow-mdn flex items-center justify-center">
              <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/instagram.svg" alt="instagram" /></i>
            </a>
            <a target="_brank" href="https://x.com/?lang=pt-br" className="w-34px h-34px rounded-full shadow-mdn flex items-center justify-center">
              <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/twitter.svg" alt="twitter" /></i>
            </a>
            <a target="_brank" href="https://www.linkedin.com" className="w-34px h-34px rounded-full shadow-mdn flex items-center justify-center">
              <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/linkedin.svg" alt="linkedin" /></i>
            </a>
          </div>
        </div>

        <div className="font-Poppins font-medium">
          <p className="text-gray2 mb-11">Links</p>
          <ul className="flex flex-col gap-11">
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="font-Poppins font-medium">
          <p className="text-gray2 mb-11">Help</p>
          <ul className="flex flex-col gap-11">
            <li><a href="/payment">Payment Options</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/policies">Privacy Policies</a></li>
          </ul>
        </div>

        <div className="font-Poppins">
          <p className="font-medium text-gray2 mb-11">Newsletter</p>
          <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Enter Your Email Address" className="font-normal text-sm border-b border-black focus:outline-none focus:ring-0" value={email} onChange={handleInputChange} />
            <button type="submit" className="font-normal text-sm border-b border-black ml-3">SUBSCRIBE</button>
          </form>
        </div>
      </div>

      <div className="container py-9 font-Poppins font-normal px-24 mx-auto">
        <p>2023 furino. All rights reverved</p>
      </div>
    </footer>
  )
}
