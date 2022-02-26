import { React, useCallback, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { get_my_position } from "../actions/position/positionAction";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "75vw",
  height: "75vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = (props) => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState("");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let coords = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        };
        console.log("COORDS from components / Map.js", coords);
        setCenter(coords);
        props.get_my_position(coords);
      });
    } else {
      console.log("Ton navigateur ne supporte pas la géolocalisation");
    }
  }, []);

  // FONCTION QUI PERMET D'AJOUTER UN PIN SUR LA MAP
  // const onMapClick = useCallback((event) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //     },
  //   ]);
  // }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Maps!";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      options={options}
      // AJOUT DU PIN
      // onClick={onMapClick}
      onLoad={onMapLoad}
    >
      <Marker
        position={center}
        // icon={}
      />

      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
          }}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <h1>Hey</h1>
            <p></p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

const mapDispatchToProps = {
  get_my_position,
};

export default connect(null, mapDispatchToProps)(Map);
