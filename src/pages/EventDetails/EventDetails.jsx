import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EventDetails.css";

// Services
import * as ticketService from "../../services/ticketmasterAPI";
import * as eventService from "../../services/eventService"

// Components
import CommentSection from "../../components/Comment/CommentSection";
import PhotoCommentSection from "../../components/PhotoComment/PhotoCommentSection";
import EventDetailsMap from "../../components/Event/EventDetailsMap";

// Assets?

const EventDetails = (props) => {
  const { id } = useParams();
  const profile = props?.user?.profile
  const [eventExists, setEventExists] = useState(false)
  const [eventDetails, setEventDetails] = useState()

  const [commentsArray, setCommentsArray] = useState([])
  const [photoCommentsArray, setPhotoCommentsArray] = useState([])
  const [profilesArray, setProfilesArray] = useState([])
  
  const startDate = new Date(eventDetails?.dates?.start?.localDate)
  const fixedDate = startDate.toDateString()

  function tConvert (time) {
    if (time === undefined) {
      return 'No time given'
    } else {
      // Check correct time format and split into components
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
      if (time.length > 1) {                      // If time format correct
        time = time.slice (1);                    // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM';  // Set AM/PM
        time[0] = +time[0] % 12 || 12;            // Adjust hours
    }
      return time.join (''); // return adjusted time or original string
    }
  }
  const fixedTime = tConvert(eventDetails?.dates?.start?.localTime)
  
  
  const createEventOnClick = async() => {
    const res = await eventService.createEvent(id, eventDetails.name)
    setEventExists(true)
    setCommentsArray(res.comments)
    setPhotoCommentsArray(res.user_photos)
    setProfilesArray(res.profiles_attending)
  }


  const handleAttendClick = async() => {
    if (!eventExists) {
      await createEventOnClick()
    } 
    const updatedEvent = await eventService.createUserAttendsEvent(id, profile)
    setProfilesArray(updatedEvent[0].profiles_attending)
  }
  

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventService.doesEventExist(id)
        if (res) {
          setEventExists(true)
          setCommentsArray(res[0].comments)
          setPhotoCommentsArray(res[0].user_photos)
          setProfilesArray(res[0].profiles_attending) 
        } else {
          setEventExists(false)
        }

        const event = await ticketService.getEventById(id)
        setEventDetails(event)
      } catch (error) {
        throw error
      }
    }
    fetchEvent()
  }, [id, eventExists])

  if (eventDetails === undefined) {
    return <>Still loading...</>;
  }
  return (
    <div className='details-div'>
      <div className="details-top">
        <div className="details-top-left">
          <div className="details-h1-cover">
            <h1 className='details-h1'>{eventDetails.name}</h1>
          </div>
          <img className='details-img' src={eventDetails.images[1].url} alt="event" />
        </div>
        <div className="details-top-right">
          <div className="details-location">
            <EventDetailsMap 
              eventDetails={eventDetails}
              />
            <p>Location:</p>
          </div>
          <div className='details-text'>
            <p>Description: {eventDetails.description}</p>
            <p>Date: {fixedDate} at {fixedTime}</p>
            <div className='links-container'>
              <a href={eventDetails?._embedded?.venues[0]?.url} rel='noreferrer' target='_blank'>
                  <button>Click to see the venue</button>
              </a>
              <a href={eventDetails.url}  rel='noreferrer' target='_blank'>
                  <button type='button'>Click to see available tickets</button>
              </a>
            </div>
            
            <div className="attending-users">
              {eventExists && 
                <div>
                  <p><strong>List of Profiles Attending</strong></p>
                  {profilesArray.map((profile) => (
                      <div className="profile-listing">
                          <img src={profile.avatar} alt="avatar" />
                          {profile.name}
                      </div>
                  ))}
                </div>
              }
            </div>
            <button className='comment-btn' onClick={() => handleAttendClick()}>
              I'm Attending This Event
            </button>   
          </div>
        </div>
      </div>
      <div className="details-bottom">
        <div className="comments">
          {!eventExists && 
            <button className='comment-btn' onClick={() => createEventOnClick()}>
              Make The First Comment!
            </button>
          }
          {eventExists && 
            <CommentSection
              user={props.user}
              eventId={id}
              commentsArray={commentsArray}
              setCommentsArray={setCommentsArray}
              />
            }     
        </div>
        <div className="photo-comments">
          {!eventExists && 
            <button className='photo-comment-btn' onClick={() => createEventOnClick()}>
              Add The First Photo!
            </button>
          }
          {eventExists && 
            <PhotoCommentSection
            user={props.user}
            eventId={id}
            photoCommentsArray={photoCommentsArray}
            setPhotoCommentsArray={setPhotoCommentsArray}
            />
          }       
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
