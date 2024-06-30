import React, { useEffect, useState } from "react";
import classes from "./map.module.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { toast } from "react-toastify";
import * as L from "leaflet";
import axios from "axios";
import Button from "../Button/Button";

export default function Map({ location, onChange }) {
  const [address, setAddress] = useState("");

  console.log(location);

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let totalAddress = "";
          const { road, house_number, suburb, city, country } = data.address;
          if (house_number == undefined) {
            totalAddress += `${road},${" " + suburb},${" " + city}`;
          } else {
            totalAddress += `${road}${" " + house_number},${" " + suburb},${" " + city}`;
          }

          setAddress(totalAddress);
          onChange(totalAddress);
        });
    });
  }

  return (
    <>
      <div>
        <Button
          text="Get current location"
          onClick={getCurrentLocation}
          backgroundColor="#e72929"
          color="white"
          fontSize="1.2rem"
          width="16rem"
          height="3.5rem"
        />
      </div>
    </>
  );
}
