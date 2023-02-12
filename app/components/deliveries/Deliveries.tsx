"use client";

import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import DeliveriesTabs from "./DeliveriesTabs";
import DeliveriesList from "./DeliveriesList";

const Deliveries: React.FC<{
  setOrigin: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setDestination: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setLoadDirections: React.Dispatch<React.SetStateAction<boolean>>;
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
  setDirections: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | undefined>>;
  currentLocation: google.maps.LatLngLiteral;
}> = ({ setOrigin, setDestination, setLoadDirections, mapRef, setDirections, currentLocation }) => {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Pendientes");

  const tabs = [
    {
      name: "Pendientes",
      current: activeTab === "Pendientes" ? true : false,
    },
    {
      name: "Asignadas",
      current: activeTab === "Asignadas" ? true : false,
    },
    {
      name: "Completadas",
      current: activeTab === "Completadas" ? true : false,
    },
  ];

  return (
    <>
      <Transition show={!open}>
        <div className="pt-2 pl-2 fixed top-16 left-20">
          <button
            type="button"
            className="rounded-md text-white bg-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Close panel</span>
            <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </Transition>
      <Transition.Root show={open} as={Fragment}>
        <div className="fixed overflow-hidden">
          <div className="absolute overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pl-20 pt-16 pr-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-0"
                enterTo="translate-x-xs"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-xs"
                leaveTo="translate-x-0"
              >
                <div className="pointer-events-auto relative w-screen max-w-xs">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-[-3rem] -ml-8 flex pt-2 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-white bg-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
                    <div className="bg-indigo-500 py-2 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-medium text-white">
                          Entregas
                        </div>
                      </div>
                    </div>
                    <DeliveriesTabs tabs={tabs} setActiveTab={setActiveTab} />
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <DeliveriesList
                        activeTab={activeTab}
                        setOrigin={setOrigin}
                        setDestination={setDestination}
                        setLoadDirections={setLoadDirections}
                        mapRef={mapRef}
                        setDirections={setDirections}
                        currentLocation={currentLocation}
                      />
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Transition.Root>
    </>
  );
};

export default Deliveries;
