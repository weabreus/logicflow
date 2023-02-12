import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Form:React.FC<{open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>}> = ({open, setOpen}) => {
  return (
    /* @ts-ignore */
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="pointer-events-auto w-screen max-w-[72rem]">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-500 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">Agregar transportista</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Cerrar panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300 text-left">
                            Llene la información requerida para agregar al transportista.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between ">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="pt-6 pb-5 grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label htmlFor="driver-name" className="block text-sm font-medium text-gray-900 text-left">
                                            Nombre
                                        </label>
                                        <div className="mt-1">
                                            <input
                                            type="text"
                                            name="driver-name"
                                            id="driver-name"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="driver-email" className="block text-sm font-medium text-gray-900 text-left">
                                            Email
                                        </label>
                                        <div className="mt-1">
                                            <input
                                            type="email"
                                            name="driver-email"
                                            id="driver-email"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="driver-phone" className="block text-sm font-medium text-gray-700 text-left">
                                            Telefono
                                        </label>
                                        <div className="relative mt-1 rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 flex items-center">
                                            <label htmlFor="country" className="sr-only">
                                                Pais
                                            </label>
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country"
                                                className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option>US</option>
                                                <option>CA</option>
                                                <option>EU</option>
                                            </select>
                                            </div>
                                            <input
                                            type="text"
                                            name="driver-phone"
                                            id="driver-phone"
                                            className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="+1 (555) 987-6543"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                                        Password
                                        </label>
                                        <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        />
                                        </div>
                                    </div>
                                    {/* En el futuro la direccion debe usar API de google para conseguir LAT/LONG */}
                                    <div className="col-span-1">
                                        <label htmlFor="driver-address" className="block text-sm font-medium text-gray-900 text-left">
                                            Dirección
                                        </label>
                                        <div className="mt-1">
                                            <input
                                            type="text"
                                            name="driver-address"
                                            id="driver-address"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="driver-vtype" className="block text-sm font-medium text-gray-700 text-left">
                                            Tipo de Vehiculo
                                        </label>
                                        <select
                                            id="driver-vtype"
                                            name="driver-vtype"
                                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            defaultValue="Motor"
                                        >
                                            <option>Motor</option>
                                            <option>Platanera</option>
                                            <option>Camion rigido (16 pies)</option>
                                            <option>Camion rigido (20 pies)</option>
                                            <option>Camion rigido (26 pies)</option>
                                            <option>Cabezote</option>
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="driver-vplate" className="block text-sm font-medium text-gray-900 text-left">
                                            Placa
                                        </label>
                                        <div className="mt-1">
                                            <input
                                            type="text"
                                            name="driver-vplate"
                                            id="driver-vplate"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="driver-vcolor" className="block text-sm font-medium text-gray-900 text-left">
                                            Color
                                        </label>
                                        <div className="mt-1">
                                            <input
                                            type="text"
                                            name="driver-vcolor"
                                            id="driver-vcolor"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="driver-vdesc" className="block text-sm font-medium text-gray-700 text-left">
                                            Descripción del vehiculo
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                            rows={4}
                                            name="driver-vdesc"
                                            id="driver-vdesc"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            defaultValue={''}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                           <div className="col-span-1">
                                <div className="">
                                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700 sr-only">
                                        Photo
                                    </label>
                                    <div className="">
                                        <div className="flex flex-col items-center">
                                            <span className="h-48 w-48 overflow-hidden rounded-full bg-gray-100">
                                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </span>
                                            <button
                                                type="button"
                                                className="mt-4 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Cambiar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                           </div>
                            
                           
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Form;
