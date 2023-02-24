"use client";
import React, { useEffect, useState } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;

const DeliveriesList: React.FC<{
  activeTab: string;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  rendererRef: React.MutableRefObject<google.maps.DirectionsRenderer | undefined>;
  setDirections: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | undefined>
  >;
  currentLocation: google.maps.LatLngLiteral;
  fetchDirections: (origin: LatLngLiteral, destination: LatLngLiteral) => void;
  getDeliveries: (activeTab: string) => Promise<any>;
  setDeliveries: React.Dispatch<React.SetStateAction<any[]>>;
  deliveries: any[];
}> = ({ activeTab, mapRef, rendererRef, setDirections, currentLocation, fetchDirections, getDeliveries, deliveries, setDeliveries }) => {
  

  useEffect(() => {
    async function deliveries() {
      const deliveriesList = await getDeliveries(activeTab);
      // @ts-ignore
      setDeliveries(deliveriesList);
    }
    deliveries();
  }, [deliveries, activeTab]);

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
                  <img
                    className="h-10 w-10 rounded-full"
                    //   @ts-ignore
                    src={delivery.pickup.image}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  {/* @ts-ignore */}
                  <button
                    className="focus:outline-none"
                    // @ts-ignore
                    onClick={() => {fetchDirections({lat: delivery.pickup.coordinates.lat, lng: delivery.pickup.coordinates.lng}, {lat: delivery.delivery.coordinates.lat, lng: delivery.delivery.coordinates.lng})}}
                    onBlur={() => {
                      setDirections(undefined);
                      rendererRef.current?.setMap(null)
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
