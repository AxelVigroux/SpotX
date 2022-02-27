import { React, useCallback, useState, useRef, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getMyPosition } from "../actions/position/positionAction";
import { getAllSpots } from "../actions/spots/spotAction";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import myPos from "../assets/mypos.png";

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
    setMarkers(props.spots.spots);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let coords = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        };
        setCenter(coords);
        props.getMyPosition(coords);
      });
    } else {
      console.log("Ton navigateur ne supporte pas la géolocalisation");
    }
  }, []);

  console.log("MARKERSSS", markers);

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

  if (loadError) return "Erreur pendant le chargement";
  if (!isLoaded) return "Chargement de la Map";

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

const mapStateToProps = (store) => {
  return {
    spots: store.spots,
  };
};

const mapDispatchToProps = {
  getMyPosition,
  getAllSpots,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
