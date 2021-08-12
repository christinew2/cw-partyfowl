import { Event } from "../models/event.js"
import { Profile } from "../models/profile.js"
import axios from "axios"
import mongoose from 'mongoose'

const create = async (req,res) => {
    try {
        const newEvent = await Event.create({
            event_id: req.params.id,
            comments: [],
            user_photos: [],
            profiles_attending: [],
        })
        return res.status(200).json(newEvent)
    } catch (error) {
        throw error
    }
}

const doesEventExist = async (req,res) => {
    try {
        const eventData = await Event.find({event_id: req.params.id}).populate("users_photos").populate("profiles_attending")
        if (eventData.length) {
            return res.status(200).json(eventData) 
        } else {
            return res.status(200).json(null) // event does exist in DB
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const createUserAttendsEvent = async (req,res) => {
    try {
        console.log("I'm in the user/event controller")
        
        const updatedEvent = await Event.findOneAndUpdate(
            {event_id: req.params.id},
            { $set: {profiles_attending: req.params.profile}},
            {upsert: true}
        )
        
        const updatedProfile = await Profile.findOneAndUpdate(
            {_id : req.params.profile},
            { $set: {events_attending: updatedEvent._id}},
            {upsert:true}
        )

        return updatedProfile // does this need to return anything?
    } catch (error) {
        res.status(400).send(error.message)
    }
}



const createComment = async (req, res) => {

    try {
        const event = await Event.findOne({event_id: req.params.id})
        const commentData = {
            content: req.body.content,
            event: event._id,
            owner: req.user._id
        }
        event.comments.push(commentData)
        await event.save()
        const newComment = event.comments[event.comments.length - 1]
        return res.status(201).json(newComment)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteComment = async (req, res) => {
    try {
        const event = await Event.findOne({event_id: req.params.event_id})
        const idx = event.comments.findIndex((comment) =>
            comment._id.equals(req.params.comment_id)
        )
        const removedComment = event.comments.splice(idx, 1)
        await event.save()
        return res.status(200).json(removedComment)
    } catch (err) {
        res.json(err)
    }
}

function getAllEvents (req, res) {
    console.log("I'M HITTING GETALLEVENTS")
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=100&sort=random&apikey=${process.env.API_KEY}`)
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
}

function getEventsByPostalCode (req,res) {
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=${req.params.size}&postalCode=${req.params.postalCode}&apikey=${process.env.API_KEY}`)
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
        console.log(err)
    })
}

function getEventById (req,res){
    console.log("GTFO")
    axios.get(`https://app.ticketmaster.com/discovery/v2/events/${req.params.id}.json?apikey=${process.env.API_KEY}`)
    .then(response => {
        res.json(response.data)
    })  
    .catch(err => {
        console.log(err)
    })
}



export {
    create,
    createComment,
    deleteComment,
    getAllEvents,
    getEventsByPostalCode,
    getEventById,
    doesEventExist,
    createUserAttendsEvent 
}

