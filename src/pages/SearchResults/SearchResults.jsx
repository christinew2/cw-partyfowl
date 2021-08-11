import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePrevious } from "../../hooks/usePrevious";
import styles from "./SearchResults.module.css";

//Services
import { getEventsByPostalCode } from "../../services/ticketmasterAPI";

//Components
import Feed from "../../components/Feed/Feed";

const Landing = ({ user }) => {
  const zipcode = 80202
  const [eventData, setEventData] = useState([]);

  // const prevEventDataState = usePrevious(eventData);
  // const [keyword, setKeyword] = useState("");
  // const [hasSearchRun, setHasSearchRun] = useState(false);

  // const clearSearch = () => {
  //   setKeyword("");
  //   setHasSearchRun(false);
  //   setEventData(prevEventDataState);
  // };

  useEffect(() => {
    getEventsByPostalCode(25, zipcode).then((data) => {
      data.hasOwnProperty("_embedded")
        ? setEventData(data._embedded.events)
        : setEventData([]);
    });
  }, []);

  console.log(eventData)

  return (
    <main className={styles.container}>
      <div>
        <h1 className='landing-h1'>Search Results</h1>
        
        





        {/* <Feed
          eventData={eventData}
          setEventData={setEventData}
          keyword={keyword}
          setKeyword={setKeyword}
          clearSearch={clearSearch}
          hasSearchRun={hasSearchRun}
          setHasSearchRun={setHasSearchRun}
        /> */}
      </div>
    </main>
  );
};

export default Landing;
