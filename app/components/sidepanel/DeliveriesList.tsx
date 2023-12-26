"use client";
import React, { useEffect, useState } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;

const DeliveriesList: React.FC<{
  activeTab: string;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  rendererRef: React.MutableRefObject<
    google.maps.DirectionsRenderer | undefined
  >;
  setDirections: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | undefined>
  >;
  currentLocation: google.maps.LatLngLiteral;
  fetchDirections: (origin: LatLngLiteral, destination: LatLngLiteral) => void;
  getDeliveries: (activeTab: string) => Promise<any>;
  setDeliveries: React.Dispatch<React.SetStateAction<any[]>>;
  deliveries: any[];
}> = ({
  activeTab,
  mapRef,
  rendererRef,
  setDirections,
  currentLocation,
  fetchDirections,
  getDeliveries,
  deliveries,
  setDeliveries,
}) => {
  useEffect(() => {
    async function deliveries() {
      const deliveriesList = await getDeliveries(activeTab);
      // @ts-ignore
      setDeliveries(deliveriesList);
    }
    deliveries();
  }, [activeTab]);

  return (
    <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
      <div className="relative">
        <ul role="list" className="relative z-0 divide-y divide-gray-200">
          {deliveries.map((delivery) => (
            // @ts-ignore
            <li key={delivery._id}>
              {/* @ts-ignore */}
              <div className="relative flex items-center space-x-3 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50">
                {/* @ts-ignore */}
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-8 h-9 rounded-full text-indigo-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                    />
                  </svg>

                  {/* <img
                    className="h-10 w-10 rounded-full"
                    //   @ts-ignore
                    src={delivery.pickup.image}
                    alt=""
                  /> */}
                </div>
                <div className="min-w-0 flex-1">
                  {/* @ts-ignore */}
                  <button
                    className="focus:outline-none"
                    // @ts-ignore
                    onClick={() => {
                      fetchDirections(
                        {
                          lat: delivery.pickup.coordinates.lat,
                          lng: delivery.pickup.coordinates.lng,
                        },
                        {
                          lat: delivery.delivery.coordinates.lat,
                          lng: delivery.delivery.coordinates.lng,
                        }
                      );
                    }}
                    onBlur={() => {
                      setDirections(undefined);
                      rendererRef.current?.setMap(null);
                      mapRef.current?.panTo(currentLocation);
                    }}
                  >
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 text-left">
                      {/* @ts-ignore */}
                      {delivery.pickup.name}
                    </p>
                    <p className="text-sm text-gray-500 text-left">
                      {/* @ts-ignore */}
                      {delivery.pickup.address}
                    </p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default DeliveriesList;
