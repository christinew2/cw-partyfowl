import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ReactMapGL, { Marker } from 'react-map-gl'
import pinImage from '../../assets/icons/pin.png'
import "./EventDetailsMap.css";

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const EventDetailsMap = (props) => {

  const lat = parseFloat(props?.eventDetails?._embedded?.venues[0]?.location?.latitude)
  const long = parseFloat(props?.eventDetails?._embedded?.venues[0]?.location?.longitude)
  
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long, 
    zoom: 13,
    width: "200px",
    height: "200px"
  });
  
  return (
    <div className='details-map'>
      <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/wcrosby/cks530lbr9l0s17t68dk9ozze"
      onViewportChange={setViewport}
      mapboxApiAccessToken={TOKEN}
      >
      <div className="pin" key={"test"}>
          <Link to={`/events/${"test"}`}>
            <Marker latitude={lat} longitude={long} ><img className="pin" src={pinImage} alt="pin"></img></Marker>
          </Link>
      </div>
      </ReactMapGL>
    </div>
  );
  }

export default EventDetailsMap
