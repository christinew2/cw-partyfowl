import React from 'react'

// components
import PhotoCommentList from './PhotoCommentList'
import CreatePhotoComment from '../CreateComponents/CreatePhotoComment/CreatePhotoComment'

// services
import { createPhotoComment, deletePhotoComment } from '../../services/photoCommentService'

const PhotoCommentSection = (props) => {
    console.log('props 4', props)
    const handleCreatePhotoComment = async (formData) => {
        
        console.log('form data', formData)
        try {
            const newPhotoComment = await createPhotoComment(props.eventId, formData)
            console.log('photo', newPhotoComment)
            // newPhotoComment.owner = props.user
            props.setPhotoCommentsArray([newPhotoComment, ...props.photoCommentsArray])
        } catch (error) {
            throw error
        }
    }
    const handleDeletePhotoComment = async (photoCommentId) => {
        try {
            await deletePhotoComment(props.eventId, photoCommentId)
            props.setPhotoCommentsArray(props.photoCommentsArray.filter(photoComment => photoComment._id !== photoCommentId))
        } catch (error) {
            throw error
        }
    }

    return (
        <div className='photo-comment-section'>
            <div className='header'>
                <h3>Photo Section</h3>
            </div>
            <CreatePhotoComment 
                {...props}
                handleCreatePhotoComment={handleCreatePhotoComment}
            ></CreatePhotoComment>
            <div className="comment-list">
                <PhotoCommentList 
                    {...props}
                    handleDeletePhotoComment={handleDeletePhotoComment}
                />
            </div>
        </div>
    )
}

export default PhotoCommentSection