import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyles from './mapStyles';
import './Map.css'

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 60.69121,
  lng: 28.77368,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
} 

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
    <h1 className="header-name">Find a bench {" "} </h1>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options} >
        
      </GoogleMap>
    </div>
  );
}
