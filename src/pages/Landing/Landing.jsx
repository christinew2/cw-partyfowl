import React, { useEffect, useState } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import Split from "react-split"
import "./Landing.css";

// Assets
import birds from "../../assets/animation/launch.json"

//Services
import { getAllEvents } from "../../services/ticketmasterAPI";

//Components
import SearchHeader from '../../components/Feed/SearchHeader'
import Animation from "../../components/misc/Animation"

const Landing = ({ user }) => {
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
    getAllEvents().then((data) => {
      data.hasOwnProperty("_embedded")
        ? setEventData(data._embedded.events)
        : setEventData([]);
    });
  }, []);

  return (
    <Split
      className="split"
      minSize={300}
      maxSize={1000}
      gutterSize={10}
    >
      <div className="landing-left">
        <h3>PartyFowl</h3>
        <p>
          About PartyFowl
        </p>
      </div>
      <div className="landing-right">
        <div className="landing-search">
          {eventData && 
          <SearchHeader 
            eventData={eventData}
            setEventData={setEventData}
            keyword={keyword}
            setKeyword={setKeyword}
            clearSearch={clearSearch}
            hasSearchRun={hasSearchRun}
            setHasSearchRun={setHasSearchRun}
          />
          }
        </div>
        
      </div>
      {/* <div className="launch-animation">
                <Animation animData={birds}></Animation>
      </div> */}
    </Split>
  );
};

export default Landing;
