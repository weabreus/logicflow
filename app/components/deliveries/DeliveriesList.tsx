"use client";
import React, { useEffect, useState } from "react";

async function getTasks(activeTab: string) {
  const res = await fetch("/api/tasks/tasks");
  const data = await res.json();

  if (activeTab === "Pendientes") {
    // @ts-ignore
    return data.filter((task) => task.assigned_status === false) as any[];
  } else if (activeTab === "Asignadas") {
    
    return data.filter(
      // @ts-ignore
      (task) => task.assigned_status === true && task.task_status === false
    );
  } else if (activeTab === "Completadas") {
    // @ts-ignore
    return data.filter(
      // @ts-ignore
      (task) => task.assigned_status === true && task.task_status === true
    );
  }
}

const DeliveriesList: React.FC<{ 
  activeTab: string; 
  setOrigin: React.Dispatch<React.SetStateAction<{lat: number; lng: number;}>>; 
  setDestination: React.Dispatch<React.SetStateAction<{lat: number; lng: number;}>>;
  setLoadDirections:  React.Dispatch<React.SetStateAction<boolean>>;
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
  setDirections: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | undefined>>;
  currentLocation: google.maps.LatLngLiteral;
}> = ({ 
    activeTab, 
    setOrigin, 
    setDestination, 
    setLoadDirections,
    mapRef,
    setDirections,
    currentLocation
  }) => {
  
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    async function tasks() {
      const tasksList = await getTasks(activeTab);
      // @ts-ignore
      setTasks(tasksList);
    }
    tasks();
  }, [tasks, activeTab]);

  return (
    <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
      <div className="relative">
        <ul role="list" className="relative z-0 divide-y divide-gray-200">
          {tasks.map((task) => (
            // @ts-ignore
            <li key={task.id} 
            >
              {/* @ts-ignore */}
              <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50">
                {/* @ts-ignore */}
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    //   @ts-ignore
                    src={task.pickup_image}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  {/* @ts-ignore */}
                  <button className="focus:outline-none" onClick={() => { setOrigin({ lat: task.pickup_latitude, lng: task.pickup_longitude}); setDestination({ lat: task.delivery_latitude,lng: task.delivery_longitude}); setLoadDirections(true);
              }}
              onBlur={() => {
                setLoadDirections(false)
                setDirections(undefined)
                mapRef.current?.panTo(currentLocation)
                }}>
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {/* @ts-ignore */}
                      {task.pickup_name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {/* @ts-ignore */}
                      {task.pickup_address}
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
