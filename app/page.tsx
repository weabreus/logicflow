"use client";
import React, { useMemo } from "react";
import Map from "./components/map/Map";
import { useLoadScript } from "@react-google-maps/api";

function page() {
  const libraries: (
    | "places"
    | "drawing"
    | "geometry"
    | "localContext"
    | "visualization"
  )[] = useMemo(() => ["places"], []);
  const { isLoaded } = useLoadScript({
    // @ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  return (
    <>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && <Map />}
    </>
  );
}

export default page;
