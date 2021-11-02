import React from "react";
import SearchIcon from "../../assets/icons/search.png";
import './Search.css'

const Search = (props) => {
  return (
    <div className="search-container">
      <form className="search" onSubmit={props.handleSearch}>
        <div class="tb">
          <div class="td"><input type="text" placeholder="Search" required/></div>
          <div class="td" id="s-cover">
            <button type="submit">
              <div id="s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
        
        
        
        {/* <img
          className="search-icon"
          src={SearchIcon}
          alt="magnifying glass"
        ></img> */}
        <input
          autoComplete="off"
          placeholder="Search"
          name="keyword"
          value={props.keyword}
          onChange={props.handleChange}
        />
      </form>
    </div>
  );
};

export default Search;
