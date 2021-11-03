import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMapGL, { Marker } from "react-map-gl";
import pinImage from "../../assets/icons/pin.png";
import "./SearchResultsMap.css";


const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const SearchResultsMap = ({ eventData, latitude, longitude }) => {

  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 13,
  });

  useEffect(() => {
    setViewport({
      latitude: latitude,
      longitude: longitude,
      zoom: 13,
    })

  }, [latitude, longitude])

  return (
    <div style={{ height: "85vh", width: "45vw" }} className="map">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/wcrosby/cks530lbr9l0s17t68dk9ozze"
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}
        width="100%"
        height="100%"
      >
        {eventData.map((event, index) => (
          <div className="pin" key={index}>
            <Link to={`/events/${event.id}`}>
              <Marker
                latitude={parseFloat(
                  event._embedded?.venues[0]?.location?.latitude
                )}
                longitude={parseFloat(
                  event._embedded?.venues[0]?.location?.longitude
                )}
              >
                <img className="pin" src={pinImage} alt="pin"></img>
              </Marker>
            </Link>
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default SearchResultsMap;
