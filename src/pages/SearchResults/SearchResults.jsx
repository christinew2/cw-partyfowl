import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom'
import { usePrevious } from "../../hooks/usePrevious";
import "./SearchResults.css";
import geohash from "ngeohash"

//Components
import SearchResultsMap from "../../components/SearchResultFeed/SearchResultsMap";
import Feed from "../../components/Feed/Feed";

//Services
import { convertSearchQueryToLatLong } from "../../services/geocodioAPI";
import { getEventsByGeoHash } from "../../services/ticketmasterAPI";

const SearchResults = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [geoHashLocation, setGeoHashLocation] = useState();
  
  const [eventData, setEventData] = useState([]);

  const prevEventDataState = usePrevious(eventData);
  const [keyword, setKeyword] = useState("");
  const [hasSearchRun, setHasSearchRun] = useState(false);

  const clearSearch = () => {
    setKeyword("");
    setHasSearchRun(false);
    setEventData(prevEventDataState);
  };

  useEffect(() => {
    const searchQuery = props?.match?.params?.searchQuery

    //Convert incoming search quety to lat/long
    convertSearchQueryToLatLong(searchQuery).then((data) => {

      const lat = data?.results[0]?.location?.lat;
      const long = data?.results[0]?.location?.lng;

      const geoHashConversion = geohash.encode(lat, long);

      setLatitude(lat);
      setLongitude(long);
      setGeoHashLocation(geoHashConversion.toString());

    });
  }, [props?.match?.params?.searchQuery]);
  
  useEffect(() => {
    getEventsByGeoHash(150, geoHashLocation).then((data) => {
        data.hasOwnProperty("_embedded")
          ? setEventData(data._embedded.events)
          : setEventData([]);
      });
  }, [geoHashLocation]);

  return (
    <main className="results">
      <div className="results-left">
        <h1 className="results-h1">Search Results</h1>
        <Feed className='feed-parent'
          eventData={eventData}
          setEventData={setEventData}
          keyword={keyword}
          setKeyword={setKeyword}
          clearSearch={clearSearch}
          hasSearchRun={hasSearchRun}
          setHasSearchRun={setHasSearchRun}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setGeoHashLocation={setGeoHashLocation}
        />
      </div>
      <div className="results-right">
        {latitude && longitude && geoHashLocation && 
          <SearchResultsMap
            className="results-map"
            eventData={eventData}
            latitude={latitude}
            longitude={longitude}
          />
        }
      </div>
    </main>
  );
};

export default withRouter(SearchResults);
