import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setError('')

      const result = await signIn('google', {
        redirect: false,
        callbackUrl: window.location.origin
      })

      if (result?.error) {
        setError('Failed to sign in with Google. Please try again.')
      } else if (result?.ok) {
        // Wait briefly for the session to update
        await new Promise(resolve => setTimeout(resolve, 1000))
        onClose()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Google sign-in error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true)
      setError('')

      const result = await signIn('facebook', {
        redirect: false,
        callbackUrl: window.location.origin
      })

      if (result?.error) {
        setError('Failed to sign in with Facebook. Please try again.')
      } else if (result?.ok) {
        // Wait briefly for the session to update
        await new Promise(resolve => setTimeout(resolve, 1000))
        onClose()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Facebook sign-in error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Close modal if user becomes authenticated
  if (status === 'authenticated' && isOpen) {
    onClose()
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div>
                  <Dialog.Title as="div" className="flex items-center justify-center text-lg font-semibold leading-6 text-gray-900">
                    Sign in to&nbsp;
                    <Image src="/recipe_ideas_logo.png" alt="Recipe Ideas Logo" width={24} height={24} className="mx-1" />
                    Recipe Ideas
                  </Dialog.Title>
                  
                  {error && (
                    <div className="mt-2 rounded-md bg-red-50 p-4">
                      <div className="text-sm text-red-700">{error}</div>
                    </div>
                  )}

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isLoading || status === 'loading'}
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Image className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" width={20} height={20} />
                      {isLoading ? 'Signing in...' : 'Continue with Google'}
                    </button>

                    <button
                      onClick={handleFacebookLogin}
                      disabled={isLoading || status === 'loading'}
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1877F2] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#166FE5] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Image className="h-5 w-5" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook logo" width={20} height={20} />
                      {isLoading ? 'Signing in...' : 'Continue with Facebook'}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AuthModal 