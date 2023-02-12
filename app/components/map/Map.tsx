"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import SidePanel from "../sidepanel/SidePanel";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>({lat: 0, lng: 0});
  const mapRef = useRef<google.maps.Map | null>(null);
  const rendererRef = useRef<google.maps.DirectionsRenderer>()
  const [directions, setDirections] = useState<DirectionsResult | undefined>();
  const service = useMemo(() => (new google.maps.DirectionsService()), [])
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "860cd9ed5c715514",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const onLoadRenderer = useCallback((renderer: google.maps.DirectionsRenderer) => {rendererRef.current = renderer}, [])

  const onDirectionsChanged = useCallback(() => {
    rendererRef.current?.setMap(mapRef.current)
  }, [directions])

  const fetchDirections = (
    origin: LatLngLiteral,
    destination: LatLngLiteral,
  ) => {

    service.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
      {/* Primary column */}
      <section
        aria-labelledby="primary-heading"
        className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          options={options}
          center={currentLocation}
          zoom={12}
          onLoad={onLoad}
        >
          
            <DirectionsRenderer
              directions={directions}
              options={{
                
                polylineOptions: {
                  zIndex: 50,
                  strokeWeight: 5,
                  strokeColor: "#6365f1"
                },
              }}
              onLoad={onLoadRenderer}
              onDirectionsChanged={onDirectionsChanged}
            />
          

          {currentLocation && <MarkerF position={currentLocation} />}
        </GoogleMap>
      </section>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden lg:order-first lg:block lg:flex-shrink-0">
        <div className="relative flex h-full w-md flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
          <SidePanel mapRef={mapRef} rendererRef={rendererRef} setDirections={setDirections} currentLocation={currentLocation} fetchDirections={fetchDirections}/>
        </div>
      </aside>
    </main>
  );
};

export default Map;
