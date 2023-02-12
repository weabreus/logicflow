"use client";

import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Deliveries from "./Deliveries";
import Drivers from "./Drivers";

type LatLngLiteral = google.maps.LatLngLiteral;

const SidePanel: React.FC<{
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  rendererRef: React.MutableRefObject<
    google.maps.DirectionsRenderer | undefined
  >;
  setDirections: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | undefined>
  >;
  currentLocation: google.maps.LatLngLiteral;
  fetchDirections: (origin: LatLngLiteral, destination: LatLngLiteral) => void;
}> = ({
  mapRef,
  rendererRef,
  setDirections,
  currentLocation,
  fetchDirections,
}) => {
  const [open, setOpen] = useState(true);
  const [toggle, setToggle] = useState<("Deliveries" | "Drivers")>("Deliveries")
  

  return (
    <>
      <Transition show={!open}>
        <div className="pt-2 pl-2 fixed top-16 left-20">
          <button
            type="button"
            className="rounded-md text-white bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Close panel</span>
            <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </Transition>
      <Transition.Root show={open} as={Fragment}>
        <div className="fixed overflow-hidden z-10">
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
                        className="rounded-md text-white bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Deliveries */}
                  {toggle === "Deliveries" && (<Deliveries mapRef={mapRef} rendererRef={rendererRef} setDirections={setDirections} currentLocation={currentLocation} fetchDirections={fetchDirections} setToggle={setToggle}/>)}

                  {/* Drivers */}
                  {toggle === "Drivers" && (<Drivers setToggle={setToggle}/>)}
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Transition.Root>
      {open && (
        <div className="relative flex h-full w-[19rem] flex-col overflow-y-auto z-0">
          {/* Your content */}
        </div>
      )}
    </>
  );
};

export default SidePanel;
