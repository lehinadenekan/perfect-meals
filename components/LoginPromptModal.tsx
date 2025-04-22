'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, LockClosedIcon } from '@heroicons/react/24/outline'

interface LoginPromptModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginClick?: () => void // Optional: To trigger the main login modal
}

const LoginPromptModal = ({ isOpen, onClose, onLoginClick }: LoginPromptModalProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
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

        {/* Modal Panel */}
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
                {/* Close Button */}
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Content */}
                <div className="mt-3 text-center sm:mt-5">
                   <LockClosedIcon className="mx-auto h-12 w-12 text-yellow-500" aria-hidden="true" />
                  <Dialog.Title as="h3" className="mt-2 text-lg font-semibold leading-6 text-gray-900">
                    Authentication Required
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please log in to unlock this feature and more personalized experiences.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {onLoginClick && (
                     <button
                       type="button"
                       className="inline-flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 sm:col-start-2"
                       onClick={() => {
                         onClose(); // Close this modal first
                         onLoginClick(); // Then trigger the main login modal
                       }}
                     >
                       Log In / Sign Up
                     </button>
                   )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default LoginPromptModal 