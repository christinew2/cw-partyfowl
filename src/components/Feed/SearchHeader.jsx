import React from "react";
import { useHistory } from "react-router-dom";
import { convertSearchQueryToLatLong } from "../../services/geocodioAPI";
import { getEventsByGeoHash } from "../../services/ticketmasterAPI";
import geohash from "ngeohash"
import "./SearchHeader.css";

//Components
import Search from "./Search";

const SearchHeader = (props) => {
  const history = useHistory();
  const {
    keyword,
    setKeyword,

    clearSearch,
    hasSearchRun,
    setHasSearchRun,

  } = props;

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setHasSearchRun(true);
      history.push(`/events/search/${keyword}`);
      
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    
      <div className="header">
        {!hasSearchRun && (
          <Search
            {...props}
            handleSearch={handleSearch}
            handleChange={handleChange}
          />
        )}

        <div className="header-buttons">
          <>
            {hasSearchRun && (
              <button onClick={clearSearch}>Clear Results</button>
            )}
          </>
        </div>
      </div>
    
  );
};

export default SearchHeader;
