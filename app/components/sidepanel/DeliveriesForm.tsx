import React, { useRef, useState } from "react";
import { Fragment } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../helpers/helpers";
import { Autocomplete } from "@react-google-maps/api";

const DeliveriesForm: React.FC<{
  formOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ formOpen, setFormOpen }) => {
  const [pickupAutocomplete, setPickupAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const pickupLatitude = useRef<HTMLInputElement | null>(null);
  const pickupLongitude = useRef<HTMLInputElement | null>(null);

  const [deliveryAutocomplete, setDeliveryAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const deliveryLatitude = useRef<HTMLInputElement | null>(null);
  const deliveryLongitude = useRef<HTMLInputElement | null>(null);

  const onLoadPickupAutocomplete = (
    autoComplete: google.maps.places.Autocomplete
  ) => {
    setPickupAutocomplete(autoComplete);
  };
  const onLoadDeliveryAutocomplete = (
    autoComplete: google.maps.places.Autocomplete
  ) => {
    setDeliveryAutocomplete(autoComplete);
  };

  const onPlaceChangedPickupAutocomplete = () => {
    const lat = pickupAutocomplete?.getPlace().geometry?.location?.lat();
    const lng = pickupAutocomplete?.getPlace().geometry?.location?.lng();

    if (pickupLatitude !== null && pickupLongitude !== null) {
      // @ts-ignore
      pickupLatitude.current!.value = lat;
      // @ts-ignore
      pickupLongitude.current!.value = lng;
    }
  };

  const onPlaceChangedDeliveryAutocomplete = () => {
    const lat = deliveryAutocomplete?.getPlace().geometry?.location?.lat();
    const lng = deliveryAutocomplete?.getPlace().geometry?.location?.lng();

    if (deliveryLatitude !== null && deliveryLongitude !== null) {
      // @ts-ignore
      deliveryLatitude.current!.value = lat;
      // @ts-ignore
      deliveryLongitude.current!.value = lng;
    }
  };

  return (
    <Transition.Root show={formOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setFormOpen}>
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
                        <Dialog.Title className="text-lg font-medium text-white">
                          Agregar nueva entrega
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setFormOpen(false)}
                          >
                            <span className="sr-only">Cerrar panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-indigo-300 text-left">
                          Llene la información requerida para agregar la
                          entrega.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between ">
                      <div className="divide-y divide-gray-200 px-4 sm:px-6">
                        <div className="divide-y divide-gray-200 border-t">
                          {/* Pickup */}
                          <Disclosure
                            as="div"
                            className={"my-4 px-4 border border-indigo-500"}
                          >
                            {({ open }) => (
                              <>
                                <h3>
                                  <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                    <span
                                      className={classNames(
                                        open
                                          ? "text-indigo-600"
                                          : "text-gray-900",
                                        "text-sm font-medium"
                                      )}
                                    >
                                      Recogido
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel
                                  as="div"
                                  className="prose prose-sm pb-6"
                                >
                                  <div className="flex flex-1 flex-col justify-between border-t border-indigo-500 ">
                                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                      <div className="pt-6 pb-5 grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-1">
                                              <label
                                                htmlFor="pickup-name"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Nombre
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                  type="text"
                                                  name="pickup-name"
                                                  id="pickup-name"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-span-1">
                                              <label
                                                htmlFor="pickup-phone"
                                                className="block text-sm font-medium text-gray-700 text-left"
                                              >
                                                Telefono
                                              </label>
                                              <div className="relative mt-1 rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 flex items-center">
                                                  <label
                                                    htmlFor="country"
                                                    className="sr-only"
                                                  >
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
                                                  name="pickup-phone"
                                                  id="pickup-phone"
                                                  className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                  placeholder="+1 (555) 987-6543"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-span-1">
                                              <label
                                                htmlFor="pickup-email"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Email
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                  type="email"
                                                  name="pickup-email"
                                                  id="pickup-email"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-span-1">
                                              <label
                                                htmlFor="pickup-reference"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Referencia
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                  type="text"
                                                  name="pickup-reference"
                                                  id="pickup-reference"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>

                                            <div className="col-span-2">
                                              <label
                                                htmlFor="pickup-address"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Dirección
                                              </label>
                                              <div className="mt-1">
                                                <Autocomplete
                                                  onLoad={onLoadPickupAutocomplete}
                                                  onPlaceChanged={
                                                    onPlaceChangedPickupAutocomplete
                                                  }
                                                >
                                                  <input
                                                    type="text"
                                                    name="pickup-address"
                                                    id="pickup-address"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                  />
                                                </Autocomplete>
                                              </div>
                                            </div>

                                            <div className="col-span-1">
                                              <label
                                                htmlFor="pickup-latitude"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Latitud
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                  ref={pickupLatitude}
                                                  type="text"
                                                  name="pickup-latitude"
                                                  id="pickup-latitude"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>

                                            <div className="col-span-1">
                                              <label
                                                htmlFor="pickup-longitude"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Longitud
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                  ref={pickupLongitude}
                                                  type="text"
                                                  name="pickup-longitude"
                                                  id="pickup-longitude"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>

                                            <div className="col-span-2">
                                              <label
                                                htmlFor="pickup-datetime"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Fecha/Hora limite para recogido
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                  type="datetime-local"
                                                  name="pickup-datetime"
                                                  id="pickup-datetime"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>

                          {/* Delivery */}
                          <Disclosure
                            as="div"
                            className={"my-4 px-4 border border-indigo-500"}
                          >
                            {({ open }) => (
                              <>
                                <h3>
                                  <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                    <span
                                      className={classNames(
                                        open
                                          ? "text-indigo-600"
                                          : "text-gray-900",
                                        "text-sm font-medium"
                                      )}
                                    >
                                      Entrega
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel
                                  as="div"
                                  className="prose prose-sm pb-6"
                                >
                                  <div className="flex flex-1 flex-col justify-between border-t border-indigo-500 ">
                                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                      <div className="pt-6 pb-5 grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-1">
                                              <label
                                                htmlFor="delivery-name"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Nombre
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                  type="text"
                                                  name="delivery-name"
                                                  id="delivery-name"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-span-1">
                                              <label
                                                htmlFor="delivery-phone"
                                                className="block text-sm font-medium text-gray-700 text-left"
                                              >
                                                Telefono
                                              </label>
                                              <div className="relative mt-1 rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 flex items-center">
                                                  <label
                                                    htmlFor="country"
                                                    className="sr-only"
                                                  >
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
                                                  name="delivery-phone"
                                                  id="delivery-phone"
                                                  className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                  placeholder="+1 (555) 987-6543"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-span-1">
                                              <label
                                                htmlFor="delivery-email"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Email
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                  type="email"
                                                  name="delivery-email"
                                                  id="delivery-email"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-span-1">
                                              <label
                                                htmlFor="delivery-reference"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Referencia
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                  type="text"
                                                  name="delivery-reference"
                                                  id="delivery-reference"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>

                                            <div className="col-span-2">
                                              <label
                                                htmlFor="delivery-address"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Dirección
                                              </label>
                                              <div className="mt-1">
                                                <Autocomplete
                                                onLoad={onLoadDeliveryAutocomplete}
                                                onPlaceChanged={onPlaceChangedDeliveryAutocomplete}
                                                >
                                                  <input
                                                    type="text"
                                                    name="delivery-address"
                                                    id="delivery-address"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                  />
                                                </Autocomplete>
                                              </div>
                                            </div>

                                            <div className="col-span-1">
                                              <label
                                                htmlFor="delivery-latitude"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Latitud
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                    ref={deliveryLatitude}
                                                  type="text"
                                                  name="delivery-latitude"
                                                  id="delivery-latitude"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                            </div>

                                            <div className="col-span-1">
                                              <label
                                                htmlFor="delivery-longitude"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Longitud
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                ref={deliveryLongitude}
                                                  type="text"
                                                  name="delivery-longitude"
                                                  id="delivery-longitude"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                              

                                            </div>

                                            <div className="col-span-2">
                                              <label
                                                htmlFor="delivery-datetime"
                                                className="block text-sm font-medium text-gray-900 text-left"
                                              >
                                                Fecha/Hora limite para entrega
                                              </label>
                                              <div className="mt-1">
                                                <input
                                                
                                                  type="datetime-local"
                                                  name="delivery-datetime"
                                                  id="delivery-datetime"
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                              </div>
                                              

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 justify-end px-4 py-4">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setFormOpen(false)}
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
};

export default DeliveriesForm;
