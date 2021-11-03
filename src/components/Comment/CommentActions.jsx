import React from 'react'
import './CommentCard.css'

const CommentActions = (props) => {
    
    return (
        <div className='actions'>
            {
                props.user &&
                props.user._id === props.comment.owner._id &&
                <button onClick={() => props.handleDeleteComment(props.comment._id)} id='delete-btn'>Delete
                </button>
            }
        </div>
    )
}

export default CommentActions