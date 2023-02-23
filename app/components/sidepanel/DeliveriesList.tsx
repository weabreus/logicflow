"use client";
import React, { useEffect, useState } from "react";

async function getDeliveries(activeTab: string) {
  const res = await fetch("/api/deliveries/deliveries");
  const data = await res.json();

  if (activeTab === "Pendientes") {
    // @ts-ignore
    return data.data.filter((delivery) => delivery.assigned_status === false) as any[];
  } else if (activeTab === "Asignadas") {
    return data.data.filter(
      // @ts-ignore
      (delivery) => delivery.assigned_status === true && delivery.task_status === false
    );
  } else if (activeTab === "Completadas") {
    // @ts-ignore
    return data.data.filter(
      // @ts-ignore
      (delivery) => delivery.assigned_status === true && delivery.task_status === true
    );
  }
}

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
}> = ({ activeTab, mapRef, rendererRef, setDirections, currentLocation, fetchDirections }) => {
  const [deliveries, setDeliveries] = useState([]);

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
            <li key={delivery.id}>
              {/* @ts-ignore */}
              <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50">
                {/* @ts-ignore */}
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    //   @ts-ignore
                    src={delivery.pickup_image}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  {/* @ts-ignore */}
                  <button
                    className="focus:outline-none"
                    // @ts-ignore
                    onClick={() => {fetchDirections({lat: delivery.pickup_latitude, lng: delivery.pickup_longitude}, {lat: delivery.delivery_latitude, lng: delivery.delivery_longitude})}}
                    onBlur={() => {
                      setDirections(undefined);
                      rendererRef.current?.setMap(null)
                      mapRef.current?.panTo(currentLocation);
                    }}
                  >
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {/* @ts-ignore */}
                      {delivery.pickup_name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {/* @ts-ignore */}
                      {delivery.pickup_address}
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
