"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map: React.FC<{
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  loadDirections: boolean;
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
  currentLocation: google.maps.LatLngLiteral;
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral>
  >;
  directions: google.maps.DirectionsResult | undefined;
  setDirections: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | undefined>
  >;
}> = ({
  origin,
  destination,
  loadDirections,
  mapRef,
  currentLocation,
  setCurrentLocation,
  directions,
  setDirections,
}) => {
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "860cd9ed5c715514",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    navigator.geolocation.getCurrentPosition((position) => {
      if (!directions) {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    });
  }, []);

  const updateDirections = useCallback((response: google.maps.DirectionsResult | null) => {
    if (response !== null) {
      setDirections(response);
    } else {
      setDirections(undefined);
      console.log(response);
    }
  }, [directions]);

  useEffect(() => {
    if (directions === null) {
      setDirections(undefined);
      console.log(directions, loadDirections);
    }
  }, [directions]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={currentLocation}
      zoom={12}
      onLoad={onMapLoad}
    >
      <MarkerF position={currentLocation} />

      {loadDirections && <DirectionsRenderer directions={directions} />}

      {loadDirections && (
        <DirectionsService
          options={{
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          }}
          callback={(result) => updateDirections(result)}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
