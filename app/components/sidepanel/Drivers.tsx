import React, { useState } from "react";
import DriversTabs from "./DriversTabs";
import DriversList from "./DriversList";
import { ReactTag } from "@headlessui/react/dist/types";

const Drivers: React.FC<{
  setToggle: React.Dispatch<React.SetStateAction<"Deliveries" | "Drivers">>
}> = ({
  setToggle
}) => {

  const [activeTab, setActiveTab] = useState<("Disponibles" | "Ocupados" | "Inactivos")>("Disponibles");
  const tabs: {
    name: ("Disponibles" | "Ocupados" | "Inactivos");
    current: boolean
  }[] = [
    {
      name: "Disponibles",
      current: activeTab === "Disponibles" ? true : false,
    },
    {
      name: "Ocupados",
      current: activeTab === "Ocupados" ? true : false,
    },
    {
      name: "Inactivos",
      current: activeTab === "Inactivos" ? true : false,
    },
  ];
  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
      <div className="bg-indigo-500 py-2 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-white">Agentes</div>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-sm leading-4 text-indigo-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setToggle("Deliveries")}
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
      <DriversTabs tabs={tabs} setActiveTab={setActiveTab} />
      <div className="relative mt-6 flex-1 px-4 sm:px-6">
        {/* Replace with your content */}
        <DriversList activeTab={activeTab} />
        {/* /End replace */}
      </div>
    </div>
  );
}

export default Drivers;
