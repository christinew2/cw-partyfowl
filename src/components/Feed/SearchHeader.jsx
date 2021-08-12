import React from "react";
import { useHistory } from "react-router-dom";
import "./SearchHeader.css";

//Components
import Search from "./Search";

const SearchHeader = (props) => {
  const history = useHistory();
  const {
    eventData,
    setEventData,
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
    <div className="hidden-container">
      <div className="header">
        <h3 className="h3-search">
          {!hasSearchRun ? "Enter Zip Code" : `Search Results: ${keyword}`}
        </h3>

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
    </div>
  );
};

export default SearchHeader;
