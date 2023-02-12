"use client";
import React, { useEffect, useRef, useState } from "react";
import Map from "./components/map/Map";
import Deliveries from "./components/deliveries/Deliveries";
import { useLoadScript } from "@react-google-maps/api";


type LatLngLiteral = google.maps.LatLngLiteral;

function page() {
  const mapRef = useRef<google.maps.Map>()

  // Get location of the user to center map
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | undefined>(undefined);
  const [origin, setOrigin] = useState({lat: 0, lng: 0})
  const [destination, setDestination] = useState({lat: 0, lng: 0})
  const [loadDirections, setLoadDirections] = useState(false)
  
  const { isLoaded, loadError } = useLoadScript({
    // @ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });
  
  return (
    <>
      <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
        {/* Primary column */}
        <section
          aria-labelledby="primary-heading"
          className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
        ></section>
        {loadError && <div>Error loading maps</div>}
        {!isLoaded && <div>Loading Maps</div>}
        {!loadError && isLoaded && <Map origin={origin} destination={destination} loadDirections={loadDirections} mapRef={mapRef} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} directions={directions} setDirections={setDirections}/>}
        {/* Secondary column (hidden on smaller screens) */}
        <aside className="hidden lg:order-first lg:block lg:flex-shrink-0">
          <div className="relative flex h-full w-md flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
            <Deliveries setOrigin={setOrigin} setDestination={setDestination} setLoadDirections={setLoadDirections} mapRef={mapRef} setDirections={setDirections} currentLocation={currentLocation}/>
          </div>
        </aside>
      </main>
    </>
  );
}

export default page;
