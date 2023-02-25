import React, { useEffect, useState } from 'react'

async function getDrivers(activeTab: string) {
    const res = await fetch("/api/drivers/drivers");
    const data = await res.json();
  
    if (activeTab === "Disponibles") {
      // @ts-ignore
      return data.data.filter((driver) => driver.status === "active") as any[];
    } else if (activeTab === "Ocupados") {
      return data.data.filter(
        // @ts-ignore
        (driver) => driver.status === "busy"
      );
    } else if (activeTab === "Inactivos") {
      // @ts-ignore
      return data.data.filter(
        // @ts-ignore
        (driver) => driver.status === "inactive"
      );
    }
  }
const DriversList: React.FC<{
    activeTab: string;
}> = ({activeTab}) => {
    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        async function drivers() {
          const driversList = await getDrivers(activeTab);
          // @ts-ignore
          setDrivers(driversList);
        }
        drivers();
      }, [drivers, activeTab]);
  return (
    <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
      <div className="relative">
        <ul role="list" className="relative z-0 divide-y divide-gray-200">
          {drivers.map((driver) => (
            // @ts-ignore
            <li key={driver.id}>
              {/* @ts-ignore */}
              <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50">
                {/* @ts-ignore */}
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    //   @ts-ignore
                    src={driver.image}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  {/* @ts-ignore */}
                  <button
                    className="focus:outline-none"
                  >
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {/* @ts-ignore */}
                      {driver.name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {/* @ts-ignore */}
                      {driver.phone}
                    </p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default DriversList