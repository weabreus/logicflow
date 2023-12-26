"use client";

import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  InfoWindowF,
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
  const [activeMarker, setActiveMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [driverLocations, setDriverLocations] = useState<
    {
      name: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    }[]
  >([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const rendererRef = useRef<google.maps.DirectionsRenderer>();
  const [directions, setDirections] = useState<DirectionsResult | undefined>();
  const service = useMemo(() => new google.maps.DirectionsService(), []);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "860cd9ed5c715514",
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );

  const centerMarker = {
    path: "M50,10c-18.401,0-33.333,14.915-33.333,33.333c0,9.199,3.73,17.533,9.766,23.568L50,90l23.574-23.105 c6.035-6.028,9.766-14.362,9.759-23.567C83.333,24.932,68.411,10,50,10z M61.667,43.333v13.334h-8.334v-10h-6.666v10h-8.334V43.333 h-5L50,26.667l16.667,16.666H61.667z",
    fillColor: "#6365f1",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.5,
    anchor: new google.maps.Point(0, 20),
  };
  const transportMarker = {
    path: "M55.241 31.667L44.759 31.667L40.593 40L59.407 40z M55 46.667a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M40 46.667a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M50,10c-18.401,0-33.333,14.915-33.333,33.333c0,9.199,3.73,17.533,9.766,23.568L50,90l23.574-23.105  c6.035-6.028,9.766-14.362,9.759-23.567C83.333,24.932,68.411,10,50,10z M68.333,40L65,41.667v15c0,0.918-0.749,1.666-1.667,1.666  H60c-0.918,0-1.667-0.748-1.667-1.666v-3.334H41.667v3.334c0,0.918-0.749,1.666-1.667,1.666h-3.333  c-0.918,0-1.667-0.748-1.667-1.666v-15L31.667,40v-3.333h5l4.254-8.51c0.41-0.82,1.494-1.49,2.412-1.49h13.334  c0.918,0,2.002,0.67,2.412,1.49l4.254,8.51h5V40z",
    fillColor: "#6365f1",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 0.5,
    anchor: new google.maps.Point(0, 20),
  };

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onLoad = useCallback(async (map: google.maps.Map) => {
    mapRef.current = map;
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    const drivers = await getDrivers();
    setDriverLocations(drivers);
  }, []);

  const onLoadRenderer = useCallback(
    (renderer: google.maps.DirectionsRenderer) => {
      rendererRef.current = renderer;
    },
    []
  );

  const onDirectionsChanged = useCallback(() => {
    rendererRef.current?.setMap(mapRef.current);
  }, [directions]);

  const fetchDirections = (
    origin: LatLngLiteral,
    destination: LatLngLiteral
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

  const getDrivers = async () => {
    const res = await fetch("/api/drivers/drivers");
    const data = await res.json();

    const activeDrivers = data.data.filter(
      (driver: any) => driver.status === "active" || driver.status === "busy"
    );
    const coords = activeDrivers.map((driver: any) => {
      return { name: driver.name, coordinates: driver.coordinates };
    });

    return coords;
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
          onClick={() => handleActiveMarker(null)}
        >
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeWeight: 5,
                strokeColor: "#6365f1",
              },
            }}
            onLoad={onLoadRenderer}
            onDirectionsChanged={onDirectionsChanged}
          />

          {currentLocation && (
            <MarkerF position={currentLocation} icon={centerMarker} />
          )}
          {driverLocations &&
            driverLocations.map((location) => (
              <MarkerF
                onClick={() => handleActiveMarker(location.name)}
                position={
                  new google.maps.LatLng(
                    location.coordinates.lat,
                    location.coordinates.lng
                  )
                }
                icon={transportMarker}
                title={location.name}
              >
                {activeMarker === location.name ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div>{location.name}</div>
                  </InfoWindowF>
                ): null}
              </MarkerF>
            ))}
        </GoogleMap>
      </section>

      {/* Secondary column (hidden on smaller screens) */}
      <aside className="hidden lg:order-first lg:block lg:flex-shrink-0">
        <div className="relative flex h-full w-md flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
          <SidePanel
            mapRef={mapRef}
            rendererRef={rendererRef}
            setDirections={setDirections}
            currentLocation={currentLocation}
            fetchDirections={fetchDirections}
          />
        </div>
      </aside>
    </main>
  );
};

export default Map;
