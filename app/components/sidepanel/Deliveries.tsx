import React, { Dispatch, SetStateAction, useState } from "react";
import DeliveriesTabs from "./DeliveriesTabs";
import DeliveriesList from "./DeliveriesList";
import DeliveriesForm from "./DeliveriesForm";

type LatLngLiteral = google.maps.LatLngLiteral;

const Deliveries: React.FC<{
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  rendererRef: React.MutableRefObject<
    google.maps.DirectionsRenderer | undefined
  >;
  setDirections: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | undefined>
  >;
  currentLocation: google.maps.LatLngLiteral;
  fetchDirections: (origin: LatLngLiteral, destination: LatLngLiteral) => void;
  setToggle: Dispatch<SetStateAction<"Deliveries" | "Drivers">>;
}> = ({
  mapRef,
  rendererRef,
  setDirections,
  currentLocation,
  fetchDirections,
  setToggle,
}) => {
  const [activeTab, setActiveTab] = useState("Pendientes");
  const [formOpen, setFormOpen] = useState<boolean>(false);
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
      <DeliveriesForm formOpen={formOpen} setFormOpen={setFormOpen}/>
      <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
        <div className="bg-indigo-500 py-2 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium text-white">Entregas</div>
            <div>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-sm leading-4 text-indigo-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setFormOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-sm leading-4 text-indigo-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setToggle("Drivers")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <DeliveriesTabs tabs={tabs} setActiveTab={setActiveTab} />
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          {/* Replace with your content */}
          <DeliveriesList
            activeTab={activeTab}
            mapRef={mapRef}
            rendererRef={rendererRef}
            setDirections={setDirections}
            currentLocation={currentLocation}
            fetchDirections={fetchDirections}
          />
          {/* /End replace */}
        </div>
      </div>
    </>
  );
};

export default Deliveries;
