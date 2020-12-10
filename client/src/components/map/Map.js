import React from "react";
import "./Map.css";
import BenchService from '../../services/benchService'
import { Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router"
import EditBench from "../../components/editBench/EditBench"

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
//import EditBench from "../editBench/EditBench";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

// function EditBenchData() {
//   let { id } = useParams()
//   return <EditBench props={id} />
// }

export default function Map(props) {
  let service = new BenchService()

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [mapBenches, setMapBenches] = React.useState(props.benches)

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    console.log(e.latLng.lat())
    console.log(e.latLng.lng())
    const loc = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }
    submitHandler(loc)
  }, []);



  const submitHandler = (loc) => {
    console.log("marker");
    service
    .addBench(loc.lat, loc.lng)
    .then(bench => {
     // setMarkers(...markers, {lat: loc.lat, lng: loc.lng})
      console.log(bench, "bench")
      setMapBenches([...mapBenches, bench])
    })
    
  };

  console.log(markers, "markers")


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
   
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


 // console.log(props)
 // console.log(markers)
 console.log(selected)

  return (
    <div>
      {/* <h1>Find a bench! </h1> */}

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      //  onClick={submitHandler}
       onClick={onMapClick}
        onLoad={onMapLoad}
      >
      {/* {props.benches.map((marker) => {
        console.log(marker)
      })} */}
    
          {mapBenches.map((marker) => (
          //  <form onSubmit={submitHandler}>
          <Marker
            // key={`${marker.lat}-${marker.lng}`}
            key={marker._id}
             position={{  lat: Number( marker.location.lat), lng: Number(marker.location.lng )}}
          //  position={{  lat: 58.26625984910455, lng: -136.13453987657067}}
             onClick={() => setSelected(marker)}
            icon={{
              url: `/bench.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
          //     </form>
        ))}

        {selected && (
          <InfoWindow
          // position={{ lat: selected.lat, lng: selected.lng }}
          position={{  lat: Number( selected.location.lat), lng: Number(selected.location.lng )}}
          //  position={{  lat: 58.26625984910455, lng: -136.13453987657067 }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bench">
                  <img
                    style={{ width: 25 }}
                    src="/bench.png"
                    alt="bench-is-here"
                  />
                   <Link to={`/bench/${selected._id}` } >Edit</Link>
                </span>  
               
              </h2>
              
              {/* <Route
              exact
              path="/bench/:id"
              render={() => <EditBench test={selected} />}
            /> */}
              

            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img style={{ width: 40 }} src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
