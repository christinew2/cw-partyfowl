import React from 'react'

//Components
import SearchHeader from './SearchHeader'
import EventList from '../Event/EventList'

const Feed = (props) => {

    return (
        <div className="feed-container">
            <SearchHeader {...props} />
            <h1 className="results-h1">Search Results</h1>
            <EventList
                eventsArray={props.eventData}
            />
        </div>
    )
}

export default Feed
