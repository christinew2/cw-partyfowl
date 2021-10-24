import React, { useEffect, useState } from "react";
import { usePrevious } from "../../hooks/usePrevious";
import styles from "./Landing.module.css";

// Assets
import birds from "../../assets/animation/launch.json"

//Services
import { getAllEvents } from "../../services/ticketmasterAPI";

//Components
import Feed from "../../components/Feed/Feed";
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
    <main className={styles.container}>
      <div>
        {eventData &&
          <Feed className='feed-parent'
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
      <div className="launch-animation">
                <Animation animData={birds}></Animation>
            </div>
    </main>
  );
};

export default Landing;
