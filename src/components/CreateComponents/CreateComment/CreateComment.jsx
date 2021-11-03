import React, { useState } from 'react'
import './CreateComment.css'

const CreateComment = (props) => {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = { 
            content: text,
            eventId: props.eventId,
            owner: props.user._id,
        }
        props.handleCreateComment(formData)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit} className='create-form'>
            <label id='comment-label'>Enter Your Comment Here:</label>
            <input id='comment-input'
                required
                autoComplete='off'
                placeholder='Comment'
                name='content'
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></input>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default CreateComment