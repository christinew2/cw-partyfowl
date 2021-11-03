import React from 'react'

const PhotoCommentActions = (props) => {

    return (
        <div className='actions'>
            {
                props.user &&
                props.user?._id === props.photoComment?.owner?._id &&
                <button onClick={() => props.handleDeletePhotoComment(props.photoComment._id)} id='delete-btn'>
                    Delete
                </button>
            }
        </div>
    )
}

export default PhotoCommentActions