import React from "react";
import SearchIcon from "../../assets/icons/search.png";
import './Search.css'

const Search = (props) => {
  return (
    <div className="cover">
      <form className="search" onSubmit={props.handleSearch}>
        <div class="tb">
          <div class="td">
            <input 
              type="text" 
              autoComplete="off"
              placeholder="Search a Zip!"
              name="keyword"
              value={props.keyword}
              onChange={props.handleChange}
            />
          </div>
          <div class="td" id="s-cover">
            <button type="submit">
              <div id="s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default Search;
