/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef } from 'react';
import {
  GoogleMap, Marker, DirectionsRenderer,
} from '@react-google-maps/api';
import { Button } from '@material-ui/core';

function MapContainer({
  isAdding, getLocation, originLatLng, destinationLatLng,
}) {
  const [currentPosition] = useState(originLatLng || {});

  const markerRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const destination = destinationLatLng || { lat: 27.139759, lng: 80.867531 };
  const origin = originLatLng;
  const defaultCenter = {
    lat: 36.773,
    lng: 119.417,
  };

  const footer = (
    <div className="footer">
      <div className="inner-footer">
        <span className="location-text">Choose location and press</span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => getLocation(currentPosition)}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const mapStyles = () => {
    if (!isAdding) {
      return {
        height: '400px',
        width: '100%',
      };
    }
    return {
      height: '400px',
      width: '100%',
    };
  };
  // function that is calling the directions service
  const changeDirection = (origin, destination) => {
    if (!directionsService) {
      return;
    }
    directionsService.route(
      {
        origin: { lat: Number(origin.lat), lng: Number(origin.lng) },
        destination: { lat: Number(destination.lat), lng: Number(destination.lng) },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
        // changing the state of directions to the result of direction service
          setDirections(result);
        } else {
          // console.error(`error fetching directions ${result}`);
        }
      },
    );
  };

  useEffect(() => {
    directionsService && changeDirection(originLatLng, destinationLatLng);
  }, [originLatLng.lat, destinationLatLng.lat, originLatLng.lng, destinationLatLng.lng]);

  const onMapLoad = () => {
    const ds = new google.maps.DirectionsService();
    setDirectionsService(ds);
  };

  useEffect(() => {
    // load default origin and destination
    changeDirection(origin, destination);
  }, [directionsService]);

  return (
    <>
      <GoogleMap
        id="example-map"
        mapContainerStyle={mapStyles()}
        zoom={13}
        onLoad={(map) => onMapLoad(map)}
        center={currentPosition.lat ? currentPosition : defaultCenter}
      >
        <Marker
          position={currentPosition}
          ref={() => markerRef}
        />
        {directions !== null && (
        <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
      {isAdding ? footer : null}
    </>
  );
}

export default MapContainer;
