import React, { useState } from 'react'
import VideoMainComments from '../VideoMainComments/VideoMainComments'
import { ACTION_LIKE, ACTION_REMOVE, ACTION_ADD } from '../../action.js';

export default function PostVideo({ data, dispatch }) {
    const [message, setMessage] = useState('');
    const [heartColor, setHeartColor] = useState('');
    const [heartLiked, setHeartLiked] = useState(false);

    const handleSave = evt => {
        let message = evt.target.value;
        setMessage(message);
    };

    const handleLike = () => {
        if (heartLiked) {
            setHeartLiked(false);
            setHeartColor('black');
        } else {
            setHeartLiked(true);
            setHeartColor('red');
        }
        dispatch({ type: ACTION_LIKE, likePostId: data.id });
    };

    const handleRemove = () => {
        dispatch({ type: ACTION_REMOVE, removePostId: data.id });
    };

    const addComment = evt => {
        evt.preventDefault();
        dispatch({ type: ACTION_ADD, addPostId: data.id, message: message })
        setMessage('');
    };

    return (
        <li className="blockvideo">
            <video controls className="video">
                <source src={data.videoUrl} />
            </video>
            <button onClick={handleLike} className={heartColor}>♥{data.likes}</button>
            <button onClick={handleRemove}>x</button>
            <p>{data.videoName}</p>
            <label htmlFor="post-video-add-comment">Comment</label>
            <form onSubmit={addComment}>
                <input type="text" id="post-video-add-comment" placeholder="add your comment" onChange={handleSave} value={message} />
                <button onClick={addComment}>Add</button>
            </form>
            <div className="common">
                {
                    data.comments.map(o => <VideoMainComments
                        mainComments={o}
                        dispatch={dispatch}
                    />)
                }
            </div>
        </li>
    )
}