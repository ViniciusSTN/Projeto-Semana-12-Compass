import { useState, useEffect, useRef } from 'react'
import { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, UserCredential, updateProfile, AuthError } from "firebase/auth"
import { auth } from '../../firebase/firebaseConfig'
import { UserProfile } from '../../types/facebookLoginSchemas'
import loginSchema from '../../validation/login'
import axios from 'axios'
import { toast } from 'react-toastify'

export const LoginSection = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  
  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>('')

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  
  const facebookProvider = new FacebookAuthProvider()
  const googleProvider = new GoogleAuthProvider()

  function getProfilePicture() {
    const storedUserProfile = localStorage.getItem('userProfile')
    if (storedUserProfile) {
      const userProfile: UserProfile = JSON.parse(storedUserProfile)
      return userProfile.photoURL
    }
    return ''
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      handleLoginResult(result)
      toast.success('Logged in successfully with Google.')
    } catch (err) {
      console.log(err)
    }
  }

  const handleEmailSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = {
      name: nameRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      passwordConfirm: passwordConfirmRef.current?.value ?? ''
    }

    const validation = loginSchema.safeParse(formData)
    if (!validation.success) {
      validation.error.errors.forEach(error => {
        if (error.path[0] === 'name') {
          setNameError(error.message)
        } else if (error.path[0] === 'email') {
          setEmailError(error.message)
        } else if (error.path[0] === 'password') {
          setPasswordError(error.message)
        } else if (error.path[0] === 'passwordConfirm') {
          setPasswordConfirmError(error.message)
        }
      })
      return
    } else {
      setNameError('')
      setEmailError('')
      setPasswordError('')
      setPasswordConfirmError('')
    }

    try {
      const { email, password, name } = validation.data
      const result = await signInWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, {
        displayName: name,
        photoURL: "https://project3-images-storage.s3.us-east-2.amazonaws.com/static/user-photo.png"
      })
      handleLoginResult(result)
      toast.success('Logged in successfully with email')
    } catch (err) {
      if ((err as AuthError).code === "auth/invalid-credential") {
        toast.error('Invalid email or password.')
      } else {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    const storedUserProfile = localStorage.getItem('userProfile')
    if (storedUserProfile) {
      const userProfile: UserProfile = JSON.parse(storedUserProfile)
      setUser(userProfile)
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userProfile: UserProfile = {
          email: currentUser.email ?? '',
          displayName: currentUser.displayName ?? '',
          photoURL: currentUser.photoURL ?? '',
        }
        setUser(userProfile)
        localStorage.setItem('userProfile', JSON.stringify(userProfile))
      } else {
        setUser(null)
        localStorage.removeItem('userProfile')
      }
    })

    return () => unsubscribe()
  }, [])

  function saveProfilePictureInlocalStorage(photoURL: string) {
    const storedUserProfile = localStorage.getItem('userProfile')
    if (storedUserProfile) {
      const userProfile: UserProfile = JSON.parse(storedUserProfile)
      userProfile.photoURL = photoURL
      localStorage.setItem('userProfile', JSON.stringify(userProfile))
    }
  }

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      handleLoginResult(result)
      toast.success('Logged in successfully with Facebook.')
  
      const credential = FacebookAuthProvider.credentialFromResult(result)
      const accessToken = credential?.accessToken
  
      if (accessToken) {
        try {
          const profilePictureResponse = await axios.get(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`, {
            responseType: 'blob'
          })
  
          const imageURL = URL.createObjectURL(profilePictureResponse.data)
          setUser(prevUser => ({
            ...prevUser!,
            photoURL: imageURL
          }))

          saveProfilePictureInlocalStorage(imageURL)
        } catch (error) {
          console.error('Failed to fetch profile picture:', error)
        }
      } else {
        console.error('Failed to retrieve Facebook access token.')
      }
    } catch (error) {
      if ((error as AuthError).code === "auth/account-exists-with-different-credential") {
        toast.error('Error: The account already exists with different credentials. Please try logging in another way.')
      } else {
        console.log(error)
      }
    }
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (err) {
      console.log(err)
    }
  }

  const handleLoginResult = (result: UserCredential) => {
    const currentUser = result.user
    const userProfile: UserProfile = {
      email: currentUser.email ?? '',
      displayName: currentUser.displayName ?? '',
      photoURL: currentUser.photoURL ?? '',
    }
    setUser(userProfile)
    localStorage.setItem('userProfile', JSON.stringify(userProfile))
  }

  return (
    <section className='max-w-1440px mx-auto font-Poppins'>
      {
        user ? (
          <div className='flex flex-col items-center gap-14 py-36'>
            <h3 className='font-medium text-3xl'>Hello {user.displayName}</h3>

            <div className='w-24 h-24'>
              <img src={getProfilePicture() ?? ''} alt="profile" className='object-cover w-full h-full' />
            </div>

            <button onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        ) : (
          <div className='max-w-643px mx-auto flex flex-col items-center justify-center py-32 px-14'>
            <form className='flex flex-col gap-9 w-full' onSubmit={handleEmailSignIn}>
              <label>
                <p className='font-medium mb-5'>Your name</p>
                <input type="text" placeholder='Abc' className='w-full border border-gray2 py-6 px-8 rounded-lg focus:outline-none' ref={nameRef} onChange={() => setNameError('')} />
                {nameError && <p className="text-red-500">{nameError}</p>}
              </label>

              <label>
                <p className='font-medium mb-5'>Your email</p>
                <input type="text" placeholder='Abc@def.com' className='w-full border border-gray2 py-6 px-8 rounded-lg focus:outline-none' ref={emailRef} onChange={() => setEmailError('')} />
                {emailError && <p className="text-red-500">{emailError}</p>}
              </label>
              
              <label>
                <p className='font-medium mb-5'>Your password</p>
                <input type="password" placeholder='@Abcdef2' className='w-full border border-gray2 py-6 px-8 rounded-lg focus:outline-none' ref={passwordRef} onChange={() => setPasswordError('')} />
                {passwordError && <p className="text-red-500">{passwordError}</p>}
              </label>

              <label>
                <p className='font-medium mb-5'>Confirm password</p>
                <input type="password" placeholder='@Abcdef2' className='w-full border border-gray2 py-6 px-8 rounded-lg focus:outline-none' ref={passwordConfirmRef} onChange={() => setPasswordConfirmError('')} />
                {passwordConfirmError && <p className="text-red-500">{passwordConfirmError}</p>}
              </label>

              <div className='flex justify-center mt-5'>
                <button type='submit' className='bg-goldenbrown px-24 py-3 text-white rounded-md max-w-64 flex items-center justify-center'>Submit</button>
              </div>
            </form>

            <p className='my-8'>or</p>

            <div className='flex gap-8'>
              <button onClick={handleFacebookLogin}>
                <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/facebook-logo.svg" alt="facebook" />
              </button>

              <button onClick={handleGoogleLogin}>
                <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/google-logo.svg" alt="google" />
              </button>
            </div>
          </div>
        )
      }
    </section>
  )
}
