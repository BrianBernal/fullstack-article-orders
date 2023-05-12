// libraries
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

type TModalButton = {
  buttonText: string;
  handler?: (p?: unknown) => void;
};

type TModal = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement;
  ok?: TModalButton;
  cancel?: TModalButton;
  hideActions?: boolean;
};

function Modal({
  ok = { buttonText: "Ok" },
  hideActions = false,
  cancel = { buttonText: "Cancel" },
  isOpen,
  setIsOpen,
  title,
  children,
}: TModal) {
  const { buttonText: okButtonText, handler: okHandler } = ok;
  const { buttonText: cancelButtonText, handler: cancelHandler } = cancel;

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onOk = () => {
    if (okHandler) okHandler();
    closeModal();
  };

  const onCancel = () => {
    if (cancelHandler) cancelHandler();
    closeModal();
  };

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                        onClick={onCancel}
                        type="button"
                      >
                        {cancelButtonText}
                      </button>
                      <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onOk}
                        type="button"
                      >
                        {okButtonText}
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
