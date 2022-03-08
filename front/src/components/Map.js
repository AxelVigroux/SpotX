import { React, useCallback, useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";
import myPos from "../assets/mypos.png";
import useFetch from "../hooks/useFetch";

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

  const { data, loading, error } = useFetch("/spot/all", {
    method: "GET",
  });

  useEffect(() => {
    if (data) {
      setMarkers(data.spots);
    }
  }, [data]);

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
        setCenter(coords);
      });
    } else {
      console.log("Ton navigateur ne supporte pas la géolocalisation");
    }
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Erreur pendant le chargement";
  if (!isLoaded) return "Chargement de la Map";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      options={options}
      onLoad={onMapLoad}
    >
      <Marker position={center} icon={myPos} />

      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={{
            lat: marker.location.coordinates[0],
            lng: marker.location.coordinates[1],
          }}
          onClick={() => {
            setSelected(marker);
            console.log(selected);
          }}
        />
      ))}
      {selected ? (
        <InfoWindow
          position={{
            lat: selected.location.coordinates[0],
            lng: selected.location.coordinates[1],
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div className="info-window">
            <h1>{selected.name}</h1>
            <h2>catégorie: {selected.category}</h2>
            <img id="spot-picture" src={selected.imageURL} alt={"spot"} />
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default Map;
