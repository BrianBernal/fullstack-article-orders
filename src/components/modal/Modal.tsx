// libraries
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

// types
import { TModal } from "./types";

function Modal({
  ok,
  cancel,
  title,
  isOpen,
  hideActions = false,
  children,
}: TModal) {
  // const { buttonText: okButtonText, handler: okHandler } = ok;
  const { buttonText: cancelButtonText, handler: cancelHandler } = cancel;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={cancelHandler}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">{children}</div>
                  </div>

                  {!hideActions && (
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={cancelHandler}
                        type="button"
                      >
                        {cancelButtonText}
                      </button>
                      <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={ok?.handler}
                        type="button"
                      >
                        {ok?.buttonText}
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;
